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
      if (user.deleted === undefined || user.deleted === null)
        update.deleted = false;
      if (user.suspended === undefined || user.suspended === null)
        update.suspended = false;
      if (user.loginDisabled === undefined || user.loginDisabled === null)
        update.loginDisabled = false;
      if (user.silenced === undefined || user.silenced === null)
        update.silenced = false;
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
