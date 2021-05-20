import { ActivityResolvers, QueryResolvers } from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";
import { propOr } from "ramda";

export const activityQueryResolver: QueryResolvers<ResolverContext>["activity"] =
  async (_, { id }, { db: { activities } }) => {
    return await activities.getActivityById(id);
  };

export const activitiesQueryResolver: QueryResolvers<ResolverContext>["activities"] =
  async (_, { filter }, { db: { activities } }) => {
    return await activities.getActivities(filter);
  };

export const activityResolver: ActivityResolvers<ResolverContext> = {
  verb: propOr("playing", "verb"),
};
