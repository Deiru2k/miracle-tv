var initialTables = [
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
  "channel-access-keys",
];

module.exports = {
  up: function (db, connection) {
    return db
      .tableList()
      .run(connection)
      .then(function (tableNames) {
        return Promise.all(
          initialTables
            .filter(function (tn) {
              return !tableNames.includes(tn);
            })
            .map(function (tableName) {
              return db.tableCreate(tableName).run(connection);
            })
        );
      });
  },
  down: function (db, connection) {
    return Promise.all(
      initialTables.map(function (tableName) {
        return db.tableDrop(tableName).run(connection);
      })
    );
  },
};
