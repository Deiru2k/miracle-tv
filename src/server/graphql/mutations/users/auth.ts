import {
  MutationResolvers,
  PasswordResetMethod,
  PasswordResetStatus,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { head } from "ramda";
import {
  AuthorizationError,
  DeletedErrorLogin,
  DisabledErrorLogin,
  InputErrorLogin,
  SuspendedErrorLogin,
} from "miracle-tv-server/graphql/errors/auth";
import { compare, hash } from "bcrypt";
import { DbUser } from "miracle-tv-server/db/models/types";
import { generatePassword } from "miracle-tv-shared/utils/password";
import { UserInputError } from "apollo-server-errors";

export const authMutationResolvers: MutationResolvers<ResolverContext> = {
  async signIn(
    _,
    { input: { username, password } },
    { db: { users, sessions } }
  ) {
    const userList = await users.getUsers({ username }, undefined, true);
    const user: DbUser = head<DbUser>(userList);
    const isPasswordValid = await compare(password, user?.password || "");
    if (user?.loginDisabled) {
      throw new DisabledErrorLogin();
    }
    if (user?.suspended) {
      throw new SuspendedErrorLogin();
    }
    if (user?.deleted) {
      throw new DeletedErrorLogin();
    }
    if (isPasswordValid) {
      return await sessions.createSession(user?.id!);
    }
    throw new InputErrorLogin();
  },
  async revokeSelfSessions(_, { input }, { db: { sessions }, user }) {
    const sessionsToRevoke = await sessions.getSessionsByIds(input);
    const sessionsNotBelongingToUser = sessionsToRevoke.filter(
      (session) => session.user !== user.id
    );
    if (sessionsNotBelongingToUser.length) {
      throw new AuthorizationError("Sessions found not belonging to user");
    }
    return sessions.revokeAllSessionsBySessionIds(input);
  },
  async resetUserPassword(_, { id, input }, { db: { users, sessions } }) {
    if (input.method === PasswordResetMethod.Echo) {
      const newPassword = generatePassword(18);
      const hashed = await hash(newPassword, 11);
      await users.bulkUpdate([id], { password: hashed });
      await sessions.revokeAllSessionsByUserId(id);
      return {
        status: PasswordResetStatus.Success,
        data: newPassword,
      };
    } else {
      throw new UserInputError("Reset method not implemented yet");
    }
  },
};
