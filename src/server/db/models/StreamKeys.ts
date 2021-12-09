import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { head } from "ramda";
import { ServerError } from "miracle-tv-server/graphql/errors/general";
import { DbStreamKey } from "miracle-tv-server/db/models/types";

type StreamKeyFilter = {
  userId?: string;
  streamId?: string;
};

export class StreamKeysModel extends Model {
  table = db.table("stream-keys");

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

  async getStreamKeys(filter: StreamKeyFilter = {}): Promise<DbStreamKey[]> {
    return (await this.table
      .filter(filter)
      .coerceTo("array")
      .run(this.conn)) as DbStreamKey[];
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

  async deleteStreamKey(keyId: string): Promise<boolean> {
    const res = await this.table.get(keyId).delete().run(this.conn);
    return res.errors <= 0;
  }
}
