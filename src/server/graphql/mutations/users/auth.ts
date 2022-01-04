import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { head } from "ramda";
import {
  AuthorizationError,
  DeletedErrorLogin,
  DisabledErrorLogin,
  InputErrorLogin,
  SuspendedErrorLogin,
} from "miracle-tv-server/graphql/errors/auth";
import { compare } from "bcrypt";
import { DbUser } from "miracle-tv-server/db/models/types";

export const signInMutation: MutationResolvers<ResolverContext>["signIn"] =
  async (_, { input: { username, password } }, { db: { users, sessions } }) => {
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
  };

export const revokeSelfSessionsMutation: MutationResolvers<ResolverContext>["revokeSelfSessions"] =
  async (_, { input }, { db: { sessions }, user }) => {
    const sessionsToRevoke = await sessions.getSessionsByIds(input);
    const sessionsNotBelongingToUser = sessionsToRevoke.filter(
      (session) => session.user !== user.id
    );
    if (sessionsNotBelongingToUser.length) {
      throw new AuthorizationError("Sessions found not belonging to user");
    }
    return sessions.revokeAllSessionsBySessionIds(input);
  };
