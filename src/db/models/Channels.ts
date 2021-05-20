import db from "miracle-tv/db";
import { Model } from "miracle-tv/db/models";
import {
  Channel,
  CreateChannelInput,
  UpdateChannelInput,
} from "miracle-tv/types/graphql";
import { head } from "ramda";
import { NotFoundError, ServerError } from "miracle-tv/graphql/errors/general";

type ChanelsFilter = Partial<Record<keyof Channel, any>>;

export class ChanelsModel extends Model {
  table = db.table("channels");

  async createChannel(
    input: CreateChannelInput,
    userId: String
  ): Promise<Channel> {
    return await this.table
      .insert({
        ...input,
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

  async getChannelById(id: string): Promise<Channel> {
    const channel = (await this.table.get(id).run(this.conn)) as Channel | null;
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    return channel;
  }

  async getChannels(filter: ChanelsFilter = {}): Promise<Channel[]> {
    return (await this.table
      .filter(filter)
      .coerceTo("array")
      .run(this.conn)) as Channel[];
  }

  async updateChannel({ id, ...input }: UpdateChannelInput): Promise<Channel> {
    const channel = (await this.table.get(id).run(this.conn)) as Channel;
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
}
