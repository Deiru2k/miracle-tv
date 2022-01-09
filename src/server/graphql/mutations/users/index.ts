import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { compare } from "bcrypt";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";

type UserMutationResolvers = MutationResolvers<ResolverContext>;

export const userMutations: UserMutationResolvers = {
  async signUp(_, { input }, { db: { users } }) {
    return await users.createUserSafe(input);
  },
  async updateSelf(_, { input }, { db: { users }, user }) {
    const id = user?.id;
    return users.updateUser({ id, ...input }) as any;
  },
  async updateUserSettings(
    _,
    { input },
    { db: { userSettings, channels }, user }
  ) {
    const settings = await userSettings.getUserSettingsById(user.id);
    if (input.singleUserMode && input.singleUserChannel) {
      const channel = await channels.getChannelById(
        input.singleUserChannel,
        true
      );
      if (channel.userId !== user.id) {
        throw new AuthorizationError("Channel does not belong to the user");
      }
      await channels.setChannelAsMain(input.singleUserChannel, user.id);
    } else if (!input.singleUserMode && settings.singleUserMode) {
      await channels.resetMainChannel(user.id);
    }
    return userSettings.updateSettings(input, user.id);
  },
  async updateSelfAccount(_, { input }, { db: { users }, user }) {
    return users.updateUserAccount({
      id: user.id,
      ...input,
    });
  },
  async changeSelfPassword(
    _,
    { input: { currentPassword: password, newPassword } },
    { db: { users, sessions }, user }
  ) {
    if (await compare(password, user.password || "")) {
      await users.updatePassword(user.id, newPassword);
      return await sessions.revokeAllSessionsByUserId(user.id);
    }
  },
};
