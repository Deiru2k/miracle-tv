import {
  QueryResolvers,
  SubscriptionTarget,
  User,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const subsciptionByIdResolver: QueryResolvers<ResolverContext>["subscription"] =
  async (_, { input }, { user, db: { subscriptions } }) => {
    const sub = await subscriptions.getSubscriptionByTargetId(user.id, input);
    return sub;
  };

export const selfSubscribedChannelsResolver: QueryResolvers<ResolverContext>["selfSubscribedChannels"] =
  async (_, _args, { user, db: { subscriptions, channels } }) => {
    const subTargets = await subscriptions.getSubscriptions({
      sourceId: user.id,
      target: SubscriptionTarget.Channel,
    });
    return channels.getChannels({ ids: subTargets.map((sub) => sub.targetId) });
  };

export const selfSubscribedUsersResolver: QueryResolvers<ResolverContext>["selfSubscribedUsers"] =
  async (_, _args, { user, db: { subscriptions, users } }) => {
    const subTargets = await subscriptions.getSubscriptions({
      sourceId: user.id,
      target: SubscriptionTarget.User,
    });
    return users.getUsers({
      ids: subTargets.map((sub) => sub.targetId),
    }) as any as Promise<User>[];
  };
