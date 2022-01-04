import { ResolverContext } from "miracle-tv-server/types/resolver";
import {
  FullUser,
  FullUserResolvers,
  QueryResolvers,
  Role,
} from "miracle-tv-shared/graphql";
import { fileResolver } from "../file";

export const fullUserResolvers: QueryResolvers<ResolverContext> = {
  async fullUsers(_, { filter, limit }, { db: { users } }) {
    return users.getUsers<FullUser>(filter, limit, true);
  },
  async fullUserCount(_, { filter }, { db: { users } }) {
    return users.getUserCount(filter, undefined, true);
  },
  async fullUser(_, { id }, { db: { users } }) {
    return users.getUserById(id);
  },
};

export const fullUserEntityResolver: FullUserResolvers<ResolverContext> = {
  id: (user) => user.id,
  username: (user) => user.username,
  email: (user) => user.email,
  channels: async (user, _, { db: { channels } }) => {
    return await channels.getChannels({ userId: user.id! });
  },
  roles: async (user, _, { db: { roles } }) => {
    const rolesList = await roles.getAll(
      (user.roles as unknown as string[]) || []
    );
    return rolesList as Role[];
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
  suspended: (user) => !!user.suspended,
  silenced: (user) => !!user.silenced,
  loginDisabled: (user) => !!user.loginDisabled,
  deleted: (user) => !!user.deleted,
};
