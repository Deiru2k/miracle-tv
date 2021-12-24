import { ChannelResolvers, QueryResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { fileResolver } from "miracle-tv-server/graphql/resolvers/file";
import { validate as uuidValidate } from "uuid";

export const channelsQueryResolver: QueryResolvers<ResolverContext>["channels"] =
  async (_, { filter }, { db: { channels } }) => {
    return await channels.getChannels(filter);
  };

export const channelQueryResolver: QueryResolvers<ResolverContext>["channel"] =
  async (_, { id }, { db: { channels } }) => {
    if (uuidValidate(id)) {
      return await channels.getChannelById(id);
    }
    return await channels.getChannelBySlug(id);
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
    const status = await channelStatus.getStatusById(channel.id);
    const defaultStatus = { id: channel.id, isLive: false };
    return {
      ...(status ?? defaultStatus),
      viewers: 0,
      length: 0,
    };
  },
  thumbnail: fileResolver("thumbnail"),
  user: async (channel, _, { db: { users } }) => {
    return (await users.getUserByIdSafe((channel as any).userId)) as any;
  },
};
