import { MutationResolvers, UpdateUserInput } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { compare } from "bcrypt";

type UserMutationResolvers = MutationResolvers<ResolverContext>;

export const userMutations: UserMutationResolvers = {
  async signUp(_, { input }, { db: { users } }) {
    return await users.createUserSafe(input);
  },
  async updateSelf(_, { input }, { db: { users }, user }) {
    const id = user?.id;
    return users.updateUser({ id, ...input }) as any;
  },
  async updateUserSettings(_, { input }, { db: { userSettings }, user }) {
    return userSettings.updateSettings(input, user.id);
  },
  async updateUser(_, { input }, { db: { users } }) {
    return users.updateUser(input) as any;
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
