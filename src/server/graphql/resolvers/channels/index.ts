import { ChannelResolvers, QueryResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const channelsQueryResolver: QueryResolvers<ResolverContext>["channels"] =
  async (_, { filter }, { db: { channels } }) => {
    return await channels.getChannels(filter);
  };

export const channelQueryResolver: QueryResolvers<ResolverContext>["channel"] =
  async (_, { id }, { db: { channels } }) => {
    return await channels.getChannelById(id);
  };

export const channelResolver: ChannelResolvers<ResolverContext> = {
  activity: async (channel, _, { db: { activities } }) => {
    const activityId: string | null = (channel as any).activityId;
    if (activityId) {
      return await activities.getActivityById(activityId);
    }
    return null;
  },
  user: async (channel, _, { db: { users } }) => {
    return await users.getUserByIdSafe((channel as any).userId);
  },
};
