import * as rdb from "rethinkdb";

import config from "miracle-tv/config/local.json";

import { AccessUnit, CreateRoleInput, Role } from "miracle-tv/types/graphql";

const defaultAdminRole: Role = {
  id: "admin",
  name: "Admin",
  parentId: "user",
  access: {
    channels: AccessUnit.Write,
    users: AccessUnit.Write,
    actions: {
      user: {
        silence: true,
        ban: true,
        warn: true,
      },
    },
  },
};

const defaultModeratorRole: Role = {
  id: "moderator",
  name: "Moderator",
  parentId: "user",
  access: {
    activities: AccessUnit.Write,
    actions: {
      user: {
        silence: true,
        ban: true,
        warn: true,
      },
    },
  },
};

const defaultVolounteerRole: Role = {
  id: "volounteer",
  name: "Volounteer",
  parentId: "user",
  access: {
    actions: {
      user: {
        warn: true,
      },
    },
  },
};

const defaultUserRole: Role = {
  id: "user",
  name: "user",
  access: {
    channels: AccessUnit.Self,
    users: AccessUnit.Read,
    activities: AccessUnit.Read,
    actions: {
      user: {
        silence: false,
        ban: false,
        warn: false,
      },
    },
  },
};

export const connection = rdb
  .connect({ host: "localhost", port: 28015 })
  .then(async (conn) => {
    const table = rdb.db(config.database.db).table("roles");
    const roles = await table.getAll().coerceTo("array").run(conn);
    if (roles.length === 0) {
      const result = await table
        .insert([
          defaultUserRole,
          defaultVolounteerRole,
          defaultModeratorRole,
          defaultAdminRole,
        ])
        .run(conn);
    }
  });
