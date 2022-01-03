import { AuthenticationError } from "miracle-tv-server/graphql/errors/auth";
import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const subscribeMutaiton: MutationResolvers<ResolverContext>["subscribe"] =
  async (_, { input }, { db: { subscriptions }, user }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    return await subscriptions.subscribe(user.id, input);
  };

export const unsubscribeMutation: MutationResolvers<ResolverContext>["unsubscribe"] =
  async (_, { input }, { db: { subscriptions }, user }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    return await subscriptions.unsubscribe(user.id, input);
  };
