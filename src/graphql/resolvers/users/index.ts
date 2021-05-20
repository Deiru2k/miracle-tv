import md5 from "md5";
import { AuthenticationError } from "miracle-tv/graphql/errors/auth";
import {
  QueryResolvers,
  Role,
  User,
  UserResolvers,
} from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";
import { pick } from "ramda";

export const usersQueryResolver: QueryResolvers<ResolverContext>["users"] = (
  _,
  _args,
  { db: { users } }
): Promise<User[]> => {
  return users.getUsersSafe();
};

export const userQueryResolver: QueryResolvers<ResolverContext>["user"] = (
  _,
  args,
  { db: { users } }
) => {
  return users.getUserByIdSafe(args.id);
};

export const userSelfQueryResolver: QueryResolvers<ResolverContext>["self"] =
  async (_, _args, { user }) => {
    if (user) {
      return user;
    }
    throw new AuthenticationError();
  };

export const userTestQueryResolver: QueryResolvers<ResolverContext>["test"] = (
  _,
  _args,
  { user }
) => {
  if (user) {
    return { secret: "sauce" };
  }
  throw new AuthenticationError();
};

export const userResolver: UserResolvers = {
  id: (user) => user.id,
  username: (user) => user.username,
  emailHash: (user) => md5((user as any).email || ""),
  roles: async (user, _, { db: { roles } }) => {
    const rolesList = await roles.getAll(user.roles || []);
    return rolesList as Role[];
  },
};
