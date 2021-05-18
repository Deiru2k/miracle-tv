import rethinkdb from 'rethinkdb'
import config from 'miracle-tv/config/local.json';

const db = rethinkdb.db(config.database.db);

export default db;
