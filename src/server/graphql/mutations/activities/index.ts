import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const activitiesMutations: MutationResolvers<ResolverContext> = {
  async createActivity(_, { input }, { db: { activities }, user }) {
    return await activities.createActivity(input);
  },
  async updateActivity(_, { input }, { db: { activities }, user }) {
    return await activities.updateActivity(input);
  },
  async deleteActivity(_, { id }, { db: { activities } }) {
    return await activities.deleteActivity(id);
  },
};
