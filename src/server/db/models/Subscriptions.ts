import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import {
  SubscriptionsFilter,
  SubscriptionInput,
  Subscription,
  QueryLimit,
  SubscriptionTarget,
  SubscriptionByTargetId,
} from "miracle-tv-shared/graphql";

export class SubscriptionsModel extends Model {
  table = db.table("subscriptions");

  async subscribe(
    sourceId: string,
    { targetId, target }: SubscriptionInput
  ): Promise<Subscription> {
    switch (target) {
      case SubscriptionTarget.Channel:
        return this._subscribeToChannel(sourceId, targetId);
      case SubscriptionTarget.User:
        return this._subscribeToUser(sourceId, targetId);
    }
  }

  async _subscribeToUser(
    sourceId: string,
    targetId: string
  ): Promise<Subscription> {
    const target = await db.table("users").get(targetId).run(this.conn);
    if (!target) {
      throw new NotFoundError("Subscription user not found");
    }
    const result = await this.table
      .insert({ sourceId, targetId, target: SubscriptionTarget.User })
      .run(this.conn);
    const key = head(result.generated_keys);
    return this.table.get(key).run(this.conn) as Promise<Subscription>;
  }

  async _subscribeToChannel(
    sourceId: string,
    targetId: string
  ): Promise<Subscription> {
    const target = await db.table("channels").get(targetId).run(this.conn);
    if (!target) {
      throw new NotFoundError("Subscription channel not found");
    }
    const result = await this.table
      .insert({ sourceId, targetId, target: SubscriptionTarget.Channel })
      .run(this.conn);
    const key = head(result.generated_keys);
    return this.table.get(key).run(this.conn) as Promise<Subscription>;
  }

  async getSubscriptionById(id: string): Promise<Subscription | null> {
    return (await this.table.get(id).run(this.conn)) as Subscription | null;
  }

  async getSubscriptionByTargetId(
    sourceId: string,
    input: SubscriptionByTargetId
  ): Promise<Subscription | null> {
    const subs = (await this.table
      .filter({ sourceId, ...input })
      .limit(1)
      .coerceTo("array")
      .run(this.conn)) as Subscription[];
    return head(subs) || null;
  }

  async getSubscriptions(
    filter: SubscriptionsFilter = {},
    limit?: QueryLimit
  ): Promise<Subscription[]> {
    let filteredQuery = this.table.filter(filter);

    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }

    return (await filteredQuery
      .coerceTo("array")
      .run(this.conn)) as Subscription[];
  }

  async unsubscribe(sourceId: string, input: SubscriptionInput) {
    const { errors } = await this.table
      .filter({ sourceId, ...input })
      .delete()
      .run(this.conn);
    if (!errors) {
      return true;
    }
  }
}
