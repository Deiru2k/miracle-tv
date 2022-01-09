import config from "miracle-tv-server/config";
import * as rdb from "rethinkdb";
import { Model } from ".";

export class SystemModel extends Model {
  table = rdb.db("rethinkdb").table("stats");

  async getDbSize() {
    return this.table
      .filter(
        rdb
          .row("id")
          .contains("table_server")
          .and(rdb.row("db").eq(config.database?.db))
      )
      .pluck({
        storage_engine: {
          disk: { space_usage: { data_bytes: true } },
        },
      } as any)
      .map((doc) => doc("storage_engine")("disk")("space_usage")("data_bytes"))
      .reduce((left: any, right: any) => {
        return left.add(right);
      })
      .run(this.conn);
  }
}
