import { Connection, Table } from "rethinkdb";

export class Model {
  conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }
}
