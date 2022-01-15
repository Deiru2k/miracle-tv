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
import { validate as uuidValidate } from "uuid";
import { getCompleteRights } from "miracle-tv-shared/acl/utils";

export const userQueryResolvers: QueryResolvers<ResolverContext> = {
  test(_, _args, { user }) {
    if (user) {
      return { secret: "sauce" };
    }
    throw new AuthenticationError();
  },
  async user(_, args, { db: { users } }) {
    if (uuidValidate(args.id)) {
      return users.getUserByIdSafe(args.id) as any;
    } else {
      return users.getUserByUsernameSafe(args.id) as any;
    }
  },
  async users(_, _args, { db: { users } }): Promise<User[]> {
    return users.getUsersSafe();
  },
  async userDirectory(_, _args, { db: { users } }): Promise<User[]> {
    return users.getUsersForDirectory() as Promise<User[]>;
  },
  async self(_, _args, { user }) {
    if (user) {
      return user as any;
    }
    throw new AuthenticationError();
  },
  async selfAccount(_, _args, { user }) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  },
  async userSettings(_, _args, { db: { userSettings }, user }) {
    return userSettings.getUserSettingsById(user.id);
  },
  async selfSessions(_, _args, { db: { sessions }, user }) {
    return sessions.getSessionsByUserId(user.id);
  },
  async sessions(_, { filter, limit }, { db: { sessions } }) {
    return sessions.getSessions(filter, limit);
  },
  async sessionsCount(_, { filter }, { db: { sessions } }) {
    return sessions.getSessionCount(filter);
  },
};

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

export const userResolver: UserResolvers<ResolverContext> = {
  id: (user) => user.id,
  username: (user) => user.username,
  emailHash: (user) => md5((user as any).email || ""),
  channels: async (user, _, { db: { channels } }) => {
    return await channels.getChannels({ userId: user.id! });
  },
  roles: async (user, _, { db: { roles } }) => {
    const allRoles = await roles.list();
    const completeRoles = user.roles.map((role) =>
      getCompleteRights(allRoles, role as unknown as string)
    );
    return completeRoles as Role[];
  },
  avatar: fileResolver("avatar"),
  header: fileResolver("header"),
  streamThumbnail: fileResolver("streamThumbnail"),
  settings: async (user, _, { db: { userSettings } }) => {
    const settings = await userSettings.getUserSettingsById(user.id);
    return settings;
  },
  meta: async (user, _, { db: { subscriptions } }) => {
    return {
      followerCount: await subscriptions.getFollowersCount(user.id),
    };
  },
};
