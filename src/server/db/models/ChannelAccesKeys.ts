import { Model } from "miracle-tv-server/db/models";
import db from "miracle-tv-server/db";
import { DateTime } from "luxon";
import { ChannelAccessKey } from "miracle-tv-shared/graphql";
import { head } from "ramda";

export class ChannelAccessKeysModel extends Model {
  table = db.table("channel-access-keys");
  name = "role";

  async createAccessKey(channelId: string): Promise<ChannelAccessKey> {
    const result = await this.table
      .insert({
        channel: channelId,
        expiresAt: DateTime.now().plus({ days: 10 }).toJSDate(),
      })
      .run(this.conn);
    const channelAccessKey = await this.table
      .get(head(result.generated_keys))
      .run(this.conn);
    return channelAccessKey as ChannelAccessKey;
  }

  async checkAccessKey(id: string | undefined): Promise<boolean> {
    if (!id) {
      return false;
    }
    const key = (await this.table.get(id).run(this.conn)) as ChannelAccessKey;
    if (!key) {
      return false;
    }
    const dateDiff = Math.abs(
      DateTime.fromJSDate(key.expiresAt).diffNow("days").days
    );
    if (dateDiff > 10) {
      await this.deleteAccessKey(id);
      return false;
    }
    const channel = await db.table("channels").get(key.channel).run(this.conn);
    if (!channel) {
      await this.deleteAccessKey(id);
      return false;
    }
    return true;
  }

  async deleteAccessKey(id: string): Promise<Boolean> {
    const result = await this.table.get(id).delete().run(this.conn);
    return result.errors === 0;
  }

  async deleteAccessKeysByChannelId(id: string): Promise<Boolean> {
    const result = await this.table
      .filter({ channelId: id })
      .delete()
      .run(this.conn);
    return result.errors === 0;
  }
}
