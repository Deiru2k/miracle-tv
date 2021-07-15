import {
  AuthenticationError,
  AuthorizationError,
} from "miracle-tv-server/graphql/errors/auth";
import { AccessUnit, MutationResolvers } from "miracle-tv-server/types/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { any } from "ramda";

export const createActivityMutaiton: MutationResolvers<ResolverContext>["createActivity"] =
  async (_, { input }, { db: { activities }, user, userRoles }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    if (
      !any(
        (role) => role.access.rights.activities === AccessUnit.Write,
        userRoles
      )
    ) {
      throw new AuthorizationError();
    }
    return await activities.createActivity(input);
  };

export const updateActivityMutation: MutationResolvers<ResolverContext>["updateActivity"] =
  async (_, { input }, { db: { activities }, user, userRoles }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    if (
      !any(
        (role) => role.access.rights.activities === AccessUnit.Write,
        userRoles
      )
    ) {
      throw new AuthorizationError();
    }
    return await activities.updateActivity(input);
  };
