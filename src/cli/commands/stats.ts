import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";
import { green } from "chalk";
import prettyBytes from "pretty-bytes";
import { readdir, stat } from "fs/promises";
import path from "path";

export const dirSize = async (directory: string) => {
  const files = await readdir(directory);
  const stats = files.map((file) => stat(path.join(directory, file)));

  return (await Promise.all(stats)).reduce(
    (accumulator, { size }) => accumulator + size,
    0
  );
};

export const getDbSize = (db: rdb.Db) => {
  return db
    .table("stats")
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
    });
};

export const getDbStats = async () => {
  const conn = await rdb.connect({
    host: config.database?.host,
    port: config.database?.port,
  });
  const dbSize = await getDbSize(rdb.db("rethinkdb")).run(conn);

  const userCount = await rdb
    .db(config.database?.db)
    .table("users")
    .count()
    .run(conn);
  const channelCount = await rdb
    .db(config.database?.db)
    .table("channels")
    .count()
    .run(conn);
  const streamKeyCount = await rdb
    .db(config.database?.db)
    .table("stream-keys")
    .count()
    .run(conn);
  const sessionsCount = await rdb
    .db(config.database?.db)
    .table("sessions")
    .count()
    .run(conn);

  const mediaDirSize = await dirSize(`${config.dataDir}/media`);

  console.info("[Current Server Stats]\n");
  console.info("DB stats");
  console.info("├ Current Users: " + green`${userCount}`);
  console.info("├ Current Channels: " + green`${channelCount}`);
  console.info("├ Current Stream Keys: " + green`${streamKeyCount}`);
  console.info("└ Current Sessions: " + green`${sessionsCount}\n`);
  console.info("Disk stats");
  console.info("├ DB Disc Usage: " + green`${prettyBytes(dbSize)}`);
  console.info("├ Media Disc Usage: " + green`${prettyBytes(mediaDirSize)}`);
  console.info("└ Total: " + green`${prettyBytes(dbSize + mediaDirSize)}`);

  conn.close();
};
