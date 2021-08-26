import { AccessUnit, MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import {
  AuthenticationError,
  AuthorizationError,
} from "miracle-tv-server/graphql/errors/auth";
import { checkRight } from "miracle-tv-server/db/acl/roles";

type UserMutationResolvers = MutationResolvers<ResolverContext>;

export const userMutations: UserMutationResolvers = {
  async signUp(_, { input }, { db: { users } }) {
    return await users.createUserSafe(input);
  },
  async updateSelf(_, { input }, { db: { users }, user }) {
    if (!user) {
      throw new AuthenticationError();
    }
    const id = user?.id;
    return users.updateUser({ id, ...input }) as any;
  },
  async updateUser(_, { input }, { db: { users }, user, userRoles }) {
    if (!user) {
      throw new AuthenticationError();
    }
    const hasRight = checkRight(userRoles, AccessUnit.Write, "users");
    if (!hasRight && input.id !== user.id) {
      throw new AuthorizationError();
    }
    return users.updateUser(input) as any;
  },
};
