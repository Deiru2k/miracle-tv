import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";

export const fixUserFlags = async () => {
  const conn = await rdb.connect({
    host: config.database?.host,
    port: config.database?.port,
  });
  const users = await rdb
    .db(config.database?.db)
    .table("users")
    .filter({})
    .coerceTo("array")
    .run(conn);
  await Promise.all(
    users.map(async (user: any) => {
      let update: any = {};
      if (user.disabled === undefined) update.disabled = false;
      if (user.suspended === undefined) update.suspended = false;
      if (user.loginDisabled === undefined) update.loginDisabled = false;
      if (user.silenced === undefined) update.silenced = false;
      return rdb
        .db(config.database?.db)
        .table("users")
        .get(user.id)
        .update(update)
        .run(conn);
    })
  );

  conn.close();
};
