import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";
import { generateRoles } from "miracle-tv-server/db/generate-roles";
import prompts from "prompts";
import { connection } from "miracle-tv-server/db/setup-db";

const systemRoles = ["admin", "moderator", "user", "volunteer"];

export const regenerateRoles = async () => {
  const conn = await connection();
  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message:
      "Are you sure you want to regenerate roles? This will delete system roles and generate them again.",
    initial: false,
  });
  if (confirm) {
    await rdb
      .db(config.database?.db)
      .table("roles")
      .getAll(...systemRoles)
      .delete()
      .run(conn);
    await generateRoles();
  }

  conn.close();
};
