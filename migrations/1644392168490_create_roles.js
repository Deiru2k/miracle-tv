var defaultAdminRole = {
  id: "admin",
  name: "Admin",
  parentId: "moderator",
  access: {
    rights: {
      channels: ["WRITE", "READ"],
      streamKeys: ["WRITE", "READ"],
      roles: ["WRITE", "READ"],
      users: ["WRITE", "READ"],
      activities: ["WRITE", "READ"],
      userSettings: ["WRITE", "READ"],
      sessions: ["WRITE", "READ"],
      system: ["WRITE", "READ"],
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

const defaultModeratorRole = {
  id: "moderator",
  name: "Moderator",
  parentId: "user",
  access: {
    rights: {
      users: ["READ"],
      channels: ["READ"],
      activities: ["READ", "WRITE"],
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

const defaultVolunteerRole = {
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

const defaultUserRole = {
  id: "user",
  name: "User",
  access: {
    rights: {
      streamKeys: ["SELF"],
      channels: ["SELF"],
      users: ["SELF"],
      activities: ["SELF"],
      roles: ["SELF"],
      sessions: ["SELF"],
      userSettings: ["SELF"],
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

module.exports = {
  up: function (db, connection) {
    return db
      .table("roles")
      .getAll(...defaultRoles.map((role) => role.id))
      .coerceTo("array")
      .run(connection)
      .then((roles) => roles.map((role) => role.id))
      .then((roleNames) => {
        return Promise.all(
          defaultRoles
            .filter((role) => !roleNames.includes(role.id))
            .map((role) => db.table("roles").insert(role).run(connection))
        );
      });
  },
  down: function (db, connection) {
    const roleNames = defaultRoles.map((role) => role.id);
    return db
      .table("roles")
      .getAll(...roleNames)
      .delete()
      .run(connection);
  },
};
