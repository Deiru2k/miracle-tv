import md5 from "md5";
import { AuthenticationError } from "miracle-tv-server/graphql/errors/auth";
import {
  QueryResolvers,
  Role,
  User,
  UserResolvers,
  UserSettingsResolvers,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

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
  return users.getUserByIdSafe(args.id) as any;
};

export const userSelfQueryResolver: QueryResolvers<ResolverContext>["self"] =
  async (_, _args, { user }) => {
    if (user) {
      return user as any;
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

export const userSettingsQueryResolver: QueryResolvers<ResolverContext>["userSettings"] =
  (_, _args, { db: { userSettings }, user }) => {
    return userSettings.getUserSettingsById(user.id);
  };

type FileResolver = (field: string) => UserResolvers["avatar"];
const fileResolver: FileResolver =
  (field) =>
  async (user, _, { db: { files } }) => {
    return user[field as keyof typeof user]
      ? await files.getFileById(user[field as keyof typeof user])
      : null;
  };

const gravatarResolver: UserResolvers["useGravatar"] = async (
  user,
  _,
  { db: { userSettings } }
) => (await userSettings.getUserSettingsById(user.id)).useGravatar;

export const userResolver: UserResolvers = {
  id: (user) => user.id,
  username: (user) => user.username,
  emailHash: (user) => md5((user as any).email || ""),
  channels: async (user, _, { db: { channels } }) => {
    return await channels.getChannels({ userId: user.id! });
  },
  roles: async (user, _, { db: { roles } }) => {
    const rolesList = await roles.getAll(user.roles || []);
    return rolesList as Role[];
  },
  avatar: fileResolver("avatar"),
  header: fileResolver("header"),
  streamThumbnail: fileResolver("streamThumbnail"),
  useGravatar: gravatarResolver,
};
