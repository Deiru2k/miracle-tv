import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { head } from "ramda";
import { InputErrorLogin } from "miracle-tv-server/graphql/errors/auth";
import { DbUser } from "miracle-tv-server/db/types";
import { compare } from "bcrypt";

export const signInMutation: MutationResolvers<ResolverContext>["signIn"] =
  async (_, { input: { username, password } }, { db: { users, sessions } }) => {
    const userList = await users.getUsers({ username });
    const user: DbUser = head<DbUser>(userList);
    if (await compare(password, user?.password || '')) {
      return await sessions.createSession(user?.id!);
    }
    throw new InputErrorLogin();
  };
