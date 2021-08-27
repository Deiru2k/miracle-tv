import {
  AuthenticationError,
  AuthorizationError,
} from "miracle-tv-server/graphql/errors/auth";
import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const createActivityMutaiton: MutationResolvers<ResolverContext>["createActivity"] =
  async (_, { input }, { db: { activities }, user, userRoles }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    return await activities.createActivity(input);
  };

export const updateActivityMutation: MutationResolvers<ResolverContext>["updateActivity"] =
  async (_, { input }, { db: { activities }, user, userRoles }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    return await activities.updateActivity(input);
  };
