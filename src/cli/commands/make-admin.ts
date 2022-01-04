import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";
import { green, red } from "chalk";
import { head, uniq } from "ramda";
import prompts from "prompts";

export const makeAdmin = async ({ username }: { username: string }) => {
  const conn = await rdb.connect({
    host: config.database?.host,
    port: config.database?.port,
  });
  const table = rdb.db(config.database?.db || "miracle-tv").table("users");
  const user = head(
    await table.filter({ username }).limit(1).coerceTo("array").run(conn)
  );
  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: "Are you sure you want to make this users admin?",
    initial: false,
  });

  if (user && confirm) {
    const { errors } = await table
      .filter({ username })
      .update({ roles: uniq([...user.roles, "admin"]) })
      .run(conn);
    if (errors) {
      console.error(red`Could not make user an admin: Unexpected error.`);
    } else {
      console.info(green`Successfully made ${username} admin`);
    }
  } else {
    console.error(red`User not found: ${username}`);
  }
  conn.close();
};
