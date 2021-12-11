import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { head } from "ramda";
import {
  AuthorizationError,
  InputErrorLogin,
} from "miracle-tv-server/graphql/errors/auth";
import { compare } from "bcrypt";
import { DbUser } from "miracle-tv-server/db/models/types";

export const signInMutation: MutationResolvers<ResolverContext>["signIn"] =
  async (_, { input: { username, password } }, { db: { users, sessions } }) => {
    const userList = await users.getUsers({ username });
    const user: DbUser = head<DbUser>(userList);
    if (await compare(password, user?.password || "")) {
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
