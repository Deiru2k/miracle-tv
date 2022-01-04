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

  async getChannelById(
    id: string,
    includeDisabled: boolean = false
  ): Promise<DbChannel> {
    const channel = (await this.table
      .get(id)
      .run(this.conn)) as DbChannel | null;
    if (!channel || (!!channel.disabled && !includeDisabled)) {
      throw new NotFoundError("Channel not found");
    }
    return channel;
  }

  async getChannelBySlug(slug: string): Promise<DbChannel | null> {
    const channel = head(
      await this.table
        .filter({ slug, disabled: false })
        .limit(1)
        .coerceTo("array")
        .run(this.conn)
    ) as DbChannel | null;
    return channel;
  }

  async getChannels(
    { ids, userIds, name, ...filter }: ChannelsQueryFilter = {},
    limit?: QueryLimit,
    includeDisabled: boolean = false
  ): Promise<DbChannel[]> {
    const query = ids ? this.table.getAll(...ids) : this.table;
    let filteredQuery = query
      .filter((doc: any) => {
        if (userIds) {
          return r.expr(userIds).contains(doc("userId"));
        } else if (name) {
          return doc("name").downcase().match(name.toLowerCase());
        }
        return true;
      })
      .filter(filter);

    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }
    if (!includeDisabled) {
      filteredQuery = filteredQuery.filter({ disabled: false });
    }

    return (await filteredQuery
      .coerceTo("array")
      .run(this.conn)) as DbChannel[];
  }

  async updateChannel({
    id,
    ...input
  }: UpdateChannelInput): Promise<DbChannel> {
    const channel = (await this.table.get(id).run(this.conn)) as DbChannel;
    if (!channel) {
      throw new NotFoundError("Chanel not found");
    }
    const result = await this.table
      .get(channel.id!)
      .update(input)
      .run(this.conn);
    if (result.errors !== 0) {
      throw new ServerError("Could not update any chanels");
    }
    return { ...channel, id, ...input };
  }

  async setChannelAsMain(id: string, userId: string): Promise<boolean> {
    const resultDisable = await this.table
      .filter((doc) => doc("id").ne(id).and(doc("userId").eq(userId)))
      .update({ disabled: true })
      .run(this.conn);
    const resultMain = await this.table
      .get(id)
      .update({ disabled: false })
      .run(this.conn);

    if (resultDisable.errors || resultMain.errors) {
      throw new ServerError("Could not update any channels");
    }
    return true;
  }

  async resetMainChannel(userId: string): Promise<boolean> {
    const result = await this.table
      .filter({ userId })
      .update({ disabled: false })
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
    const streamKeys = new StreamKeysModel(this.conn);
    streamKeys.deleteStreamKeysByChannelId(channel.id);
    return true;
  }
}
