import * as rdb from 'rethinkdb';
import config from 'src/config/local.json';

const tables: string[] = ['users', 'sessions'];

export const connection = rdb.connect({ host: 'localhost', port: 28015 }).then((con) => {
  console.log('\x1b[33m', '[Checking Database Setup]', '\x1b[0m')
  console.log('\x1b[33m', `- Checking database \`${config.database.db}\`...`, '\x1b[0m')
  return rdb.dbList().run(con).then((dbList) => {
    if (!dbList.includes(config.database.db)) {
      console.log('\x1b[33m', `-- Creating database \`${config.database.db}\`...`, '\x1b[0m')
      return rdb.dbCreate(config.database.db).run(con);
    } else {
      console.log('\x1b[32m', `-- ✔ Database \`${config.database.db}\` ok!`, '\x1b[0m')
    }
  }).then(() => {
    rdb.db(config.database.db).tableList().run(con).then((tableList) => {
      tables.forEach((table) => {
        console.log('\x1b[33m', `- Checking \`${table}\` Table`, '\x1b[0m')
        if (!tableList.includes(table)) {
            console.log('\x1b[33m', `-- Creating \`${table}\` table...`, '\x1b[0m')
            rdb.db(config.database.db).tableCreate(table).run(con);
        } else {
            console.log('\x1b[32m', `-- Table \`${table}\` ok!`, '\x1b[0m')
        }
      })
      console.log('\x1b[32m', '- ✔ Table Check Complete!', '\x1b[0m')
      console.log('\x1b[32m', '✔ Database Check Complete!', '\x1b[0m')
    })
    return con
  })
})
