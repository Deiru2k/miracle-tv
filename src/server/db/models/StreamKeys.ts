import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { head } from "ramda";
import { ServerError } from "miracle-tv-server/graphql/errors/general";
import { DbStreamKey } from "miracle-tv-server/db/models/types";
import { QueryLimit, StreamKeyFilter } from "miracle-tv-shared/graphql";

export class StreamKeysModel extends Model {
  table = db.table("stream-keys");

  filterKeys(filter?: StreamKeyFilter, limit?: QueryLimit) {
    let filteredQuery = this.table.filter(filter);

    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }

    return filteredQuery;
  }

  getStreamKeysCount(filter: StreamKeyFilter): Promise<number> {
    return this.filterKeys(filter).count().run(this.conn);
  }

  async createStreamKey(
    userId: string,
    channelId: string,
    name: string = null
  ): Promise<DbStreamKey> {
    return await this.table
      .insert({
        userId,
        channelId,
        name,
      })
      .run(this.conn)
      .then(async (res) => {
        const key = head(res.generated_keys);
        const streamKey = await this.getStreamKeyById(key);
        if (streamKey) {
          return streamKey;
        }
        throw new ServerError("Couldn't create Stream Key");
      });
  }

  async getStreamKeyById(id: string): Promise<DbStreamKey> {
    return (await this.table.get(id).run(this.conn)) as DbStreamKey;
  }

  async getStreamKeysByChannelId(channelId: string): Promise<DbStreamKey[]> {
    return (await this.table
      .filter({ channelId })
      .coerceTo("array")
      .run(this.conn)) as DbStreamKey[];
  }

  async getStreamKeys<T extends object = DbStreamKey>(
    filter: StreamKeyFilter = {},
    limit?: QueryLimit
  ): Promise<T[]> {
    return await this.filterKeys(filter, limit)
      .coerceTo("array")
      .run(this.conn);
  }

  async deleteStreamKeysByPair(
    userId: string,
    channelId: string
  ): Promise<boolean> {
    const res = await this.table
      .filter({ userId, channelId })
      .delete()
      .run(this.conn);
    return res.errors <= 0;
  }

  async deleteStreamKeysByUser(userId: string): Promise<boolean> {
    const res = await this.table.filter({ userId }).delete().run(this.conn);
    return res.errors <= 0;
  }

  async deleteStreamKeysByChannelId(channelId: string): Promise<boolean> {
    const res = await this.table.filter({ channelId }).delete().run(this.conn);
    return res.errors <= 0;
  }

  async deleteStreamKey(keyId: string): Promise<boolean> {
    const res = await this.table.get(keyId).delete().run(this.conn);
    return res.errors <= 0;
  }

  async deleteStreamKeysById(keyIds: string[]): Promise<boolean> {
    const res = await this.table
      .getAll(...keyIds)
      .delete()
      .run(this.conn);
    return res.errors <= 0;
  }
}
