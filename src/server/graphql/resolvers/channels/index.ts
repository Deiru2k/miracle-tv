import {
  AccessUnit,
  ChannelResolvers,
  QueryResolvers,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { fileResolver } from "miracle-tv-server/graphql/resolvers/file";
import { validate as uuidValidate } from "uuid";
import { checkRight } from "miracle-tv-shared/acl/utils";
import config from "miracle-tv-server/config";
import superagent from "superagent";

export const channelsQueryResolvers: QueryResolvers<ResolverContext> = {
  async channels(_, { filter }, { db: { channels }, userRoles }) {
    const hasReadPerms = checkRight(userRoles, AccessUnit.Read, "channels");
    return await channels.getChannels(filter, null, hasReadPerms);
  },

  async channel(_, { id }, { db: { channels }, userRoles }) {
    const hasReadPermissions = checkRight(
      userRoles,
      AccessUnit.Read,
      "channels"
    );
    if (uuidValidate(id)) {
      return await channels.getChannelById(id, hasReadPermissions);
    }
    return await channels.getChannelBySlug(id);
  },

  async channelsCount(_, { filter }, { db: { channels } }) {
    return await channels.getChannelCount(filter);
  },

  async fullChannels(_, { filter, limit }, { db: { channels } }) {
    return await channels.getChannels(filter, limit, true);
  },

  async fullChannelsCount(_, { filter }, { db: { channels } }) {
    return await channels.getChannelCount(filter, true);
  },

  async selfChannels(_, { filter }, { db: { channels }, user }) {
    return await channels.getChannels(
      { ...filter, userId: user.id },
      null,
      true
    );
  },
};

export const channelResolver: ChannelResolvers<ResolverContext> = {
  activity: async (channel, _, { db: { activities } }) => {
    const activityId: string | null = (channel as any).activityId;
    if (activityId) {
      return await activities.getActivityById(activityId);
    }
    return null;
  },
  status: async (channel, _, { db: { channelStatus } }) => {
    if (!config.omeEnabled) {
      const status = await channelStatus.getStatusById(channel.id);
      const defaultStatus = { id: channel.id, isLive: false };
      return {
        ...(status ?? defaultStatus),
        viewers: 0,
        length: 0,
      };
    }
    try {
      const omeRequest = await superagent
        .get(`${config.omeAPIUrl}/streams/${channel.id}`)
        .set("Authorization", "Basic b21lLWFjY2Vzcy10b2tlbg==")
        .send();
      return {
        id: channel.id,
        isLive: true,
        viewers: omeRequest.body.response.totalConnections,
        length: 0,
      };
    } catch {}
    return {
      id: channel.id,
      isLive: false,
      viewers: 0,
      length: 0,
    };
  },
  thumbnail: fileResolver("thumbnail"),
  user: async (channel, _, { db: { users } }) => {
    return (await users.getUserByIdSafe((channel as any).userId)) as any;
  },
  meta: async (channel, _, { db: { subscriptions } }) => {
    return {
      subscriberCount: await subscriptions.getSubscribersCount(channel.id),
    };
  },
};
