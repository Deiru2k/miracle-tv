import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";

import { AccessUnit, Role } from "miracle-tv-shared/graphql";

const defaultAdminRole: Role = {
  id: "admin",
  name: "Admin",
  parentId: "moderator",
  access: {
    rights: {
      channels: AccessUnit.Write,
      streamKeys: AccessUnit.Write,
      users: AccessUnit.Write,
    },
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
    rights: {
      activities: AccessUnit.Write,
    },
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
    rights: {},
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
    rights: {
      streamKeys: AccessUnit.Self,
      channels: AccessUnit.Self,
      users: AccessUnit.Self,
      activities: AccessUnit.Read,
    },
    actions: {
      user: {
        silence: false,
        ban: false,
        warn: false,
      },
    },
  },
};

const defaultRoles = [
  defaultUserRole,
  defaultVolounteerRole,
  defaultModeratorRole,
  defaultAdminRole,
];

export const generateRoles = async () => {
  const conn = await rdb.connect({ host: config.database?.host, port: config.database?.port });
  const table = rdb.db(config.database?.db || "miracle-tv").table("roles");
  const roles = await table.filter({}).coerceTo("array").run(conn);
  const roleIds = roles.map((role) => role.id);
  return await Promise.all(
    defaultRoles.map(async (dr) => {
      if (!roleIds.includes(dr.id)) {
        const res = await table.insert(dr).run(conn);
        if (res.errors > 0) {
          console.info(`Error with ${dr.id}`, res.first_error);
        } else {
          console.info(`${dr.id} Ok!`);
        }
        return res;
      }
    })
  );
};
