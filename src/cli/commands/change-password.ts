import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";
import { green, red } from "chalk";
import { head } from "ramda";
import { hash } from "bcrypt";
import prompts from "prompts";

export const changePassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
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
    message:
      "Are you sure you want to change this users's password? This action is irreversible!",
    initial: false,
  });

  if (user && confirm) {
    const hashed = await hash(password, 11);
    const { errors } = await table
      .filter({ username })
      .update({ password: hashed })
      .run(conn);
    if (errors) {
      console.error(red`Could not change password: Unexpected error.`);
    } else {
      console.info(green`Successfully changed password for ${username}`);
    }
  } else {
    console.error(red`User not found: ${username}`);
  }
  conn.close();
};
