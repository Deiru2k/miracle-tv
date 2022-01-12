import { ActivityResolvers, QueryResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { propOr } from "ramda";
import { fileResolver } from "miracle-tv-server/graphql/resolvers/file";

export const activitiesQueryResolver: QueryResolvers<ResolverContext> = {
  async activity(_, { id }, { db: { activities } }) {
    return await activities.getActivityById(id);
  },
  async activities(_, { filter, limit }, { db: { activities } }) {
    return await activities.getActivities(filter, limit);
  },
  async activitiesCount(_, { filter }, { db: { activities } }) {
    return await activities.getActivitiesCount(filter);
  },
};

export const activityEntityResolver: ActivityResolvers<ResolverContext> = {
  image: fileResolver("image"),
  icon: fileResolver("icon"),
  verb: propOr("playing", "verb"),
};
