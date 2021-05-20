import { Connection } from "rethinkdb";

export class Model {
  conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }
}

// class extends Model {
//   table = db.table(tableName);
//   name = name ? name : tableName.slice(0, tableName.length - 2);

//   constructor(conn: Connection) {
//     super(conn);
//   }

//   async create(input: CI): Promise<T> {
//     const result = await this.table.insert(input).run(this.conn);
//     if (result.errors > 0) {
//       throw new ServerError(`There was an error creating ${this.name}`);
//     }
//     const newItem = await this.table
//       .get(head(result.generated_keys))
//       .run(this.conn);
//     return newItem as T;
//   }

//   async update(input: UI): Promise<T> {
//     const item = await this.table.get(idGetter(input)).run(this.conn);
//     if (!item) {
//       throw new NotFoundError(
//         `${this.name} not found | ID: ${idGetter(input)}`
//       );
//     }
//     const result = await this.table
//       .get(idGetter(input))
//       .update(input)
//       .run(this.conn);
//     if (result.errors > 0) {
//       throw new ServerError(
//         `There was an error updating ${this.name} | ID: ${idGetter(item as T)}`
//       );
//     }
//     return { ...item, ...input, id: idGetter(item as T) } as unknown as T;
//   }

//   async deleteItem(id: string): Promise<boolean> {
//     const item = await this.table.get(id).run(this.conn);
//     if (!item) {
//       throw new NotFoundError(`${this.name} not found | ID: ${id}`);
//     }
//     const result = await this.table.get(id).delete().run(this.conn);
//     if (result.errors > 0) {
//       throw new ServerError(
//         `There was an error deleting ${this.name} | ID: ${id}`
//       );
//     }
//     return true;
//   }

//   async list(filter: Partial<FT> = {}): Promise<T[]> {
//     return this.table.filter(filter).coerceTo("array").run(this.conn);
//   }

//   async item(id: string): Promise<T | null> {
//     return this.table.get(id).run(this.conn) as T | null;
//   }
// }
