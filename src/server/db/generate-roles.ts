import * as rdb from "rethinkdb";

import config from "miracle-tv-server/config";

import { AccessUnit, Role } from "miracle-tv-shared/graphql";
import { green, red, yellow } from "chalk";

const defaultAdminRole: Role = {
  id: "admin",
  name: "Admin",
  parentId: "moderator",
  access: {
    rights: {
      channels: AccessUnit.Write,
      streamKeys: AccessUnit.Write,
      users: AccessUnit.Write,
      roles: AccessUnit.Write,
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

const defaultVolunteerRole: Role = {
  id: "volunteer",
  name: "Volunteer",
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
      roles: AccessUnit.Read,
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
  defaultVolunteerRole,
  defaultModeratorRole,
  defaultAdminRole,
];

export const generateRoles = async () => {
  const conn = await rdb.connect({
    host: config.database?.host,
    port: config.database?.port,
  });
  const table = rdb.db(config.database?.db || "miracle-tv").table("roles");
  const roles = await table.filter({}).coerceTo("array").run(conn);
  const roleIds = roles.map((role) => role.id);
  console.info("");
  console.info(green`[Checking role setup]`);
  return await Promise.all(
    defaultRoles.map(async (dr) => {
      console.info(yellow`- Checking role [${dr.id}] ${dr.name}`);
      if (!roleIds.includes(dr.id)) {
        const res = await table.insert(dr).run(conn);
        if (res.errors > 0) {
          console.info(
            red`-- Error with [${dr.id}] ${dr.name}`,
            res.first_error
          );
        } else {
          console.info(green`-- Created role [${dr.id}] ${dr.name}`);
        }
        return res;
      }
      console.info(green`-- Role [${dr.id}] ${dr.name} Ok!`);
    })
  );
};
