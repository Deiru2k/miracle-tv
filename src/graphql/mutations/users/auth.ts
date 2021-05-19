import { MutationResolvers } from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";
import { head } from "ramda";
import { InputErrorLogin } from "miracle-tv/graphql/errors/auth";

export const signInMutation: MutationResolvers<ResolverContext>["signIn"] =
  async (_, { input: { username, password } }, { db: { users, sessions } }) => {
    const userList = await users.getUsers({ username });
    const user = head(userList);
    if (user?.password === `salted+${password}`) {
      return await sessions.createSession(user?.id!);
    }
    throw new InputErrorLogin();
  };
