import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";
import prompts from "prompts";

export const fixShelvedChannels = async () => {
  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message:
      "Are you sure you want to unshelf all channels? Single user mode users will need to reconfigure their settings again.",
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
      .update({ shelved: false })
      .run(conn);

    conn.close();
  }
};
