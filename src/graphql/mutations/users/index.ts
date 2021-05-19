import { MutationResolvers } from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";

export const signUpMutation: MutationResolvers<ResolverContext>['signUp'] = (_, { input }, { db: { users }}) => {
  return users.createUserSafe(input)
};
