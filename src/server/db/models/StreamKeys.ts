import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { StreamKey } from "miracle-tv-shared/graphql";
import { head } from "ramda";
import { ServerError } from "miracle-tv-server/graphql/errors/general";

type StreamKeyFilter = {
  userId?: string;
  streamId?: string;
};

export class StreamKeysModel extends Model {
  table = db.table("stream-keys");

  async createStreamKey(userId: string, channelId: string): Promise<StreamKey> {
    return await this.table
      .insert({
        userId,
        channelId,
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

  async getStreamKeyById(id: string): Promise<StreamKey> {
    return (await this.table.get(id).run(this.conn)) as StreamKey;
  }

  async getStreamKeys(filter: StreamKeyFilter = {}): Promise<StreamKey[]> {
    return (await this.table
      .filter(filter)
      .coerceTo("array")
      .run(this.conn)) as StreamKey[];
  }

  async deleteStreamKeysByPair(
    userId: string,
    channelId: string
  ): Promise<boolean> {
    const res = await this.table
      .filter({ userId, channelId })
      .delete()
      .run(this.conn);
    if (res.errors > 0) {
      return false;
    }
    return true;
  }
}
