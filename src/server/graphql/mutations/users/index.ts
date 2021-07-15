import { MutationResolvers } from "miracle-tv-server/types/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const signUpMutation: MutationResolvers<ResolverContext>["signUp"] = (
  _,
  { input },
  { db: { users } }
) => {
  return users.createUserSafe(input);
};
