import * as rdb from "rethinkdb";
import config from "miracle-tv/config";
import { generateRoles } from "./generate-roles";

const tables: string[] = [
  "users",
  "sessions",
  "activities",
  "stream-keys",
  "channels",
  "roles",
];

export const connection = rdb.connect({
  host: config.database?.host || "localhost",
  port: config.database?.port || 28015,
});

export const setupDB = async () => {
  const con = await connection;
  console.info("\x1b[33m", "[Checking Database Setup]", "\x1b[0m");
  console.info(
    "\x1b[33m",
    `- Checking database \`${config.database?.db || "miracle-tv"}\`...`,
    "\x1b[0m"
  );
  const dbList = await rdb.dbList().run(con);
  if (!dbList.includes(config.database?.db || "miracle-tv")) {
    console.info(
      "\x1b[33m",
      `-- Creating database \`${config.database?.db || "miracle-tv"}\`...`,
      "\x1b[0m"
    );
    await rdb.dbCreate(config.database?.db || "miracle-tv").run(con);
  }
  console.info(
    "\x1b[32m",
    `-- ✔ Database \`${config.database?.db || "miracle-tv"}\` ok!`,
    "\x1b[0m"
  );
  const tableList = await rdb.db(config.database.db).tableList().run(con);
  await Promise.all(
    tables.map((table) => {
      console.info("\x1b[33m", `- Checking \`${table}\` Table`, "\x1b[0m");
      if (!tableList.includes(table)) {
        console.info(
          "\x1b[33m",
          `-- Creating \`${table}\` table...`,
          "\x1b[0m"
        );
        return rdb.db(config.database.db).tableCreate(table).run(con);
      } else {
        console.info("\x1b[32m", `-- Table \`${table}\` ok!`, "\x1b[0m");
      }
    })
  );
  console.info("\x1b[32m", "- ✔ Table Check Complete!", "\x1b[0m");
  console.info("\x1b[32m", "✔ Database Check Complete!", "\x1b[0m");
  const res = await generateRoles();
  return res;
};
