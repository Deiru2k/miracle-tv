import {
  QueryResolvers,
  SubscriptionTarget,
  User,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { uniq } from "ramda";

export const subscriptionQueryResolvers: QueryResolvers<ResolverContext> = {
  async subscription(_, { input }, { user, db: { subscriptions } }) {
    if (!user) {
      return null;
    }
    const sub = await subscriptions.getSubscriptionByTargetId(user.id, input);
    return sub;
  },
  async selfSubscribedChannels(
    _,
    _args,
    { user, db: { subscriptions, channels } }
  ) {
    const subTargets = await subscriptions.getSubscriptions({
      sourceId: user.id,
      target: SubscriptionTarget.Channel,
    });
    const subUsers = await subscriptions.getSubscriptions({
      sourceId: user.id,
      target: SubscriptionTarget.User,
    });
    const subbedUserChannels = await channels.getChannels({
      userIds: subUsers.map((usr) => usr.targetId),
    });
    const subbedChannels = await channels.getChannels({
      ids: subTargets.map((sub) => sub.targetId),
    });
    return uniq([...subbedChannels, ...subbedUserChannels]);
  },
  async selfSubscribedUsers(_, _args, { user, db: { subscriptions, users } }) {
    const subTargets = await subscriptions.getSubscriptions({
      sourceId: user.id,
      target: SubscriptionTarget.User,
    });
    return users.getUsers({
      ids: subTargets.map((sub) => sub.targetId),
    }) as any as Promise<User>[];
  },
};
