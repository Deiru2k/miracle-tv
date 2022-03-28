module.exports = {
  up: function async(db, connection) {
    return db
      .tableList()
      .run(connection)
      .then(function (tables) {
        if (!tables.includes("panels")) {
          return db
            .tableCreate("panels")
            .run(connection)
            .then(function () {
              return db
                .table("channels")
                .filter({})
                .update({ panels: [] })
                .run(connection);
            });
        }
        return Promise.resolve();
      });
  },
  down: function (db, connection) {
    return db
      .table("channels")
      .filter({})
      .update({ panels: undefined })
      .run(connection)
      .then(function () {
        return db.tableDrop("panels").run(connection);
      });
  },
};
