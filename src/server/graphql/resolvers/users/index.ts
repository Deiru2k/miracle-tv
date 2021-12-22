import md5 from "md5";
import { AuthenticationError } from "miracle-tv-server/graphql/errors/auth";
import {
  QueryResolvers,
  Role,
  SessionResolvers,
  User,
  UserResolvers,
  UserSettingsResolvers,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { fileResolver } from "miracle-tv-server/graphql/resolvers/file";

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

export const userSelfAccountResolver: QueryResolvers<ResolverContext>["selfAccount"] =
  (_, _args, { user }) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  };

export const userSelfSessionsResolver: QueryResolvers<ResolverContext>["selfSessions"] =
  (_, _args, { db: { sessions }, user }) => {
    return sessions.getSessionsByUserId(user.id);
  };

const gravatarResolver: UserResolvers["useGravatar"] = async (
  user,
  _,
  { db: { userSettings } }
) => (await userSettings.getUserSettingsById(user.id)).useGravatar;

export const sessionResolver: SessionResolvers<ResolverContext> = {
  isCurrentSession: (session, _, { session: currentSession }) => {
    return session.id === currentSession.id;
  },
};

export const settingsResolver: UserSettingsResolvers<ResolverContext> = {
  singleUserChannel: async (settings, _, { db: { channels } }) => {
    return settings.singleUserChannel
      ? await channels.getChannelById(
          settings.singleUserChannel as unknown as string
        )
      : null;
  },
};

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
