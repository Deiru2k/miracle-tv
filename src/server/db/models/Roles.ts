import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import {
  CreateRoleInput,
  QueryLimit,
  RolesFilter,
  UpdateRoleInput,
} from "miracle-tv-shared/graphql";
import { Connection } from "rethinkdb";
import { DbRole } from "miracle-tv-server/db/models/types";

export class RolesModel extends Model {
  table = db.table("roles");
  name = "role";

  constructor(conn: Connection) {
    super(conn);
  }

  async create<T extends object = DbRole>(input: CreateRoleInput): Promise<T> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError(`There was an error creating ${this.name}`);
    }
    const newItem = await this.table.get(input.id).run(this.conn);
    return newItem as T;
  }

  async update<T extends object = DbRole>({
    id,
    ...input
  }: UpdateRoleInput): Promise<T> {
    const item = await this.table.get(id).run(this.conn);
    if (!item) {
      throw new NotFoundError(`${this.name} not found | ID: ${id}`);
    }
    const result = await this.table.get(id).update(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError(
        `There was an error updating ${this.name} | ID: ${id}`
      );
    }
    return { ...item, ...input, id } as T;
  }

  async deleteItem(id: string): Promise<boolean> {
    const item = await this.table.get(id).run(this.conn);
    if (!item) {
      throw new NotFoundError(`${this.name} not found | ID: ${id}`);
    }
    const result = await this.table.get(id).delete().run(this.conn);
    if (result.errors > 0) {
      throw new ServerError(
        `There was an error deleting ${this.name} | ID: ${id}`
      );
    }
    return true;
  }

  async deleteItems(ids: string[]): Promise<boolean> {
    const result = await this.table
      .getAll(...ids)
      .delete()
      .run(this.conn);
    if (result.errors > 0) {
      throw new ServerError(`There was an error deleting roles`);
    }
    return true;
  }

  roleFilter({ ids, name, ...filter }: RolesFilter = {}, limit?: QueryLimit) {
    const query = ids ? this.table.getAll(...ids) : this.table;
    let filteredQuery = query
      .filter((doc: any) => {
        if (name) {
          return doc("name").downcase().match(name.toLowerCase());
        }
        return true;
      })
      .filter({ ...filter });

    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }
    return filteredQuery;
  }

  async list<T extends object = DbRole>(
    filter: RolesFilter = {},
    limit?: QueryLimit
  ): Promise<T[]> {
    const filteredQuery = this.roleFilter(filter, limit);
    return filteredQuery.coerceTo("array").run(this.conn) as Promise<T[]>;
  }

  async getAll(ids: string[]): Promise<DbRole[]> {
    return this.table
      .getAll(...ids)
      .coerceTo("array")
      .run(this.conn);
  }

  async get<T extends object = DbRole>(id: string): Promise<T> {
    return this.table.get(id).run(this.conn) as Promise<T>;
  }
}
