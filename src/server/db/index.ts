import rethinkdb from "rethinkdb";
import config from "miracle-tv-server/config";

const db = rethinkdb.db(config.database?.db || "miracle-tv");

export default db;
