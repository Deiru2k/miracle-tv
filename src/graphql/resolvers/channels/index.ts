import {
  ChannelResolvers,
  QueryResolvers,
  ResolversTypes,
} from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";

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
    return await activities.getActivityById((channel as any).activityId);
  },
  user: async (channel, _, { db: { users } }) => {
    return await users.getUserByIdSafe((channel as any).userId);
  },
};
