import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";
import prompts from "prompts";

export const fixMatureChannels = async () => {
  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: "Are you sure you want to unmark all channels as mature?",
    initial: false,
  });
  if (confirm) {
    const conn = await rdb.connect({
      host: config.database?.host,
      port: config.database?.port,
    });
    await rdb
      .db(config.database?.db)
      .table("channels")
      .filter({})
      .update({ mature: false })
      .run(conn);

    conn.close();
  }
};
