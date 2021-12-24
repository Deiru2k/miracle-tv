import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { ServerError } from "miracle-tv-server/graphql/errors/general";
import { DbChannelStatus, DbFile } from "miracle-tv-server/db/models/types";

export class ChannelStatusModel extends Model {
  table = db.table("channel-status");

  async createStatus(input: DbChannelStatus): Promise<DbChannelStatus> {
    return await this.table
      .insert(input)
      .run(this.conn)
      .then(async (_) => {
        const status = await this.getStatusById(input.id);
        if (status) {
          return status;
        }
        throw new ServerError("Couldn't create file");
      });
  }

  async updateStatus({ id, ...input }: DbChannelStatus) {
    const status = await this.getStatusById(id);
    if (!status) {
      throw new ServerError("Couldn't create file");
    }
    this.table.get(id).update(input).run(this.conn);
  }

  async upsertStatus({ id, ...input }: DbChannelStatus) {
    const status = await this.getStatusById(id);
    if (!status) {
      this.createStatus({ id, ...input });
    }
    this.table.get(id).update(input).run(this.conn);
  }

  async getStatusById(id: string): Promise<DbChannelStatus> {
    return (await this.table.get(id).run(this.conn)) as DbChannelStatus;
  }
}
