import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import * as r from "rethinkdb";
import {
  ChannelsQueryFilter,
  CreateChannelInput,
  QueryLimit,
  UpdateChannelInput,
} from "miracle-tv-shared/graphql";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import { DbChannel } from "miracle-tv-server/db/models/types";
import { StreamKeysModel } from "./StreamKeys";
import { ChannelAccessKeysModel } from "./ChannelAccesKeys";

export class ChanelsModel extends Model {
  table = db.table("channels");

  async createChannel(
    input: CreateChannelInput,
    userId: String
  ): Promise<DbChannel> {
    return await this.table
      .insert({
        ...input,
        disabled: false,
        shelved: false,
        mature: false,
        passwordProtected: false,
        userId,
      })
      .run(this.conn)
      .then(async (res) => {
        const key = head(res.generated_keys);
        const channel = await this.getChannelById(key);
        if (channel) {
          return channel;
        }
        throw new ServerError("Couldn't create session");
      });
  }

  async getChannelById<T extends object = DbChannel>(
    id: string,
    includeDisabled: boolean = false
  ): Promise<T | null> {
    const channel = (await this.table
      .get(id)
      .run(this.conn)) as DbChannel | null;
    if (
      !channel ||
      ((!!channel.disabled || !!channel.shelved) && !includeDisabled)
    ) {
      return null;
    }
    return channel as T;
  }

  async getChannelBySlug<T extends object = DbChannel>(
    slug: string,
    includeDisabled: boolean = false
  ): Promise<T | null> {
    const channel = head(
      await this.table
        .filter({ slug, disabled: false })
        .limit(1)
        .coerceTo("array")
        .run(this.conn)
    ) as DbChannel | null;
    if (
      !channel ||
      ((!!channel.disabled || !!channel.shelved) && !includeDisabled)
    ) {
      return null;
    }
    return channel as T;
  }

  channelsFilter(
    {
      ids,
      userIds = [],
      activityIds = [],
      name,
      ...filter
    }: ChannelsQueryFilter = {},
    limit?: QueryLimit,
    includeDisabled: boolean = false
  ) {
    const query = ids ? this.table.getAll(...ids) : this.table;
    let filteredQuery = query.filter(filter);

    if (name) {
      filteredQuery = filteredQuery.filter((doc: any) => {
        return doc("name").downcase().match(name.toLowerCase());
      });
    }
    if (userIds.length > 0) {
      filteredQuery = filteredQuery.filter((doc: any) => {
        return r.expr(userIds).contains(doc("userId"));
      });
    }

    if (activityIds.length > 0) {
      filteredQuery = filteredQuery.filter((doc: any) => {
        return r.expr(activityIds).contains(doc("activityId"));
      });
    }

    if (!includeDisabled) {
      filteredQuery = filteredQuery.filter({ disabled: false, shelved: false });
    }
    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }

    return filteredQuery;
  }

  async getChannelCount(
    filter?: ChannelsQueryFilter,
    includeDisabled: boolean = false
  ) {
    return this.channelsFilter(filter, undefined, includeDisabled)
      .count()
      .run(this.conn);
  }

  async getChannels(
    filter?: ChannelsQueryFilter,
    limit?: QueryLimit,
    includeDisabled: boolean = false
  ): Promise<DbChannel[]> {
    return this.channelsFilter(filter, limit, includeDisabled)
      .coerceTo("array")
      .run(this.conn);
  }

  async updateChannel<T extends object = DbChannel>({
    id,
    ...input
  }: UpdateChannelInput): Promise<T> {
    const channel = (await this.table.get(id).run(this.conn)) as DbChannel;
    if (!channel) {
      throw new NotFoundError("Chanel not found");
    }
    if (channel.password !== input.password) {
      const channelAccess = new ChannelAccessKeysModel(this.conn);
      await channelAccess.deleteAccessKeysByChannelId(id);
    }
    const result = await this.table
      .get(channel.id!)
      .update(input)
      .run(this.conn);
    if (result.errors !== 0) {
      throw new ServerError("Could not update any chanels");
    }
    return { ...channel, id, ...input } as T;
  }

  async setChannelAsMain(id: string, userId: string): Promise<boolean> {
    const resultDisable = await this.table
      .filter((doc) => doc("id").ne(id).and(doc("userId").eq(userId)))
      .update({ shelved: true })
      .run(this.conn);
    const resultMain = await this.table
      .get(id)
      .update({ shelved: false })
      .run(this.conn);

    if (resultDisable.errors || resultMain.errors) {
      throw new ServerError("Could not update any channels");
    }
    return true;
  }

  async resetMainChannel(userId: string): Promise<boolean> {
    const result = await this.table
      .filter({ userId })
      .update({ shelved: false })
      .run(this.conn);

    if (result.errors) {
      throw new ServerError("Could not update any channels");
    }
    return true;
  }

  async deleteChannel(id: string): Promise<boolean> {
    const channel = (await this.table.get(id).run(this.conn)) as DbChannel;
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    const result = await this.table.get(channel.id!).delete().run(this.conn);
    if (result.errors !== 0) {
      throw new ServerError("Could not delete any channels");
    }
    await db
      .table("user-settings")
      .filter({ singleUserChannel: id })
      .update({ singleUserChannel: null })
      .run(this.conn);
    const streamKeys = new StreamKeysModel(this.conn);
    await streamKeys.deleteStreamKeysByChannelId(channel.id);
    return true;
  }

  // "Toggles" disabled state on channel
  async toggleChannelDisabled(id: string, disabled: boolean): Promise<boolean> {
    const channel = await this.getChannelById(id, true);
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    const res = await this.table.get(id).update({ disabled }).run(this.conn);
    return res.errors === 0;
  }
}
