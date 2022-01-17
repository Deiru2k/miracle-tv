import { AuthenticationError } from "miracle-tv-server/graphql/errors/auth";
import { MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const subscribtionMutaitonResolvers: MutationResolvers<ResolverContext> =
  {
    async subscribe(_, { input }, { db: { subscriptions }, user }) {
      if (!user) {
        throw new AuthenticationError();
      }
      return await subscriptions.subscribe(user.id, input);
    },
    async unsubscribe(_, { input }, { db: { subscriptions }, user }) {
      if (!user) {
        throw new AuthenticationError();
      }
      return await subscriptions.unsubscribe(user.id, input);
    },
  };
