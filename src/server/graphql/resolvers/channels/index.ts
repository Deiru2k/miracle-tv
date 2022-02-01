import {
  AccessUnit,
  Channel,
  ChannelResolvers,
  QueryResolvers,
  SelfChannel,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { fileResolver } from "miracle-tv-server/graphql/resolvers/file";
import { validate as uuidValidate } from "uuid";
import { checkRight } from "miracle-tv-shared/acl/utils";
import config from "miracle-tv-server/config";
import superagent from "superagent";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import { getOmeStatus } from "miracle-tv-server/utils/ome";

export const channelsQueryResolvers: QueryResolvers<ResolverContext> = {
  async channels(_, { filter }, { db: { channels } }) {
    return await channels.getChannels(filter, null);
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

  async channel(_, { id }, { db: { channels }, userRoles }) {
    const hasReadPermissions = checkRight(
      userRoles,
      AccessUnit.Read,
      "channels"
    );
    if (uuidValidate(id)) {
      return await channels.getChannelById(id, hasReadPermissions);
    }
    return await channels.getChannelBySlug(id, hasReadPermissions);
  },
  async selfChannel(_, { id }, { db: { channels }, user }) {
    const channel = await channels.getChannelById(id);
    if (channel.userId !== user.id) {
      throw new AuthorizationError("Channel does not belong to this user");
    }
    return channel as unknown as SelfChannel;
  },
  async selfChannels(_, { filter }, { db: { channels }, user }) {
    return await channels.getChannels(
      { ...filter, userId: user.id },
      null,
      true
    );
  },
  async channelStatus(_, { id }, { db: { channelStatus } }) {
    if (!config.omeEnabled) {
      const status = await channelStatus.getStatusById(id);
      const defaultStatus = { id: id, isLive: false };
      return {
        ...(status ?? defaultStatus),
        viewers: 0,
        length: 0,
      };
    }
    return await getOmeStatus(id);
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
    return await getOmeStatus(channel.id);
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
