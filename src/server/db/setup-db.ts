import * as rdb from "rethinkdb";
import config from "miracle-tv-server/config";
import { generateRoles } from "./generate-roles";
import { green, yellow } from "chalk";

const tables: string[] = [
  "users",
  "user-settings",
  "sessions",
  "activities",
  "stream-keys",
  "channel-status",
  "channels",
  "subscriptions",
  "roles",
  "files",
];

export const connection = () =>
  rdb.connect({
    host: config.database?.host || "localhost",
    port: config.database?.port || 28015,
  });

export const setupDB = async () => {
  const con = await connection();
  console.info("");
  console.info(green`[Checking Database Setup]`);
  console.info(
    yellow`- Checking database \`${config.database?.db || "miracle-tv"}\`...`
  );
  const dbList = await rdb.dbList().run(con);
  if (!dbList.includes(config.database?.db || "miracle-tv")) {
    console.info(
      yellow`-- Creating database \`${config.database?.db || "miracle-tv"}\`...`
    );
    await rdb.dbCreate(config.database?.db || "miracle-tv").run(con);
  }
  console.info(
    green`-- ✔ Database \`${config.database?.db || "miracle-tv"}\` ok!`
  );
  const tableList = await rdb.db(config.database.db).tableList().run(con);
  await Promise.all(
    tables.map((table) => {
      console.info(yellow`- Checking \`${table}\` Table`);
      if (!tableList.includes(table)) {
        console.info(yellow`-- Creating \`${table}\` table...`);
        return rdb.db(config.database.db).tableCreate(table).run(con);
      } else {
        console.info(green`-- Table \`${table}\` ok!`);
      }
    })
  );
  console.info(green`- ✔ Table Check Complete!`);
  console.info(green`✔ Database Check Complete!`);
  con.close();
  const res = await generateRoles();
  console.info("");
  return res;
};
