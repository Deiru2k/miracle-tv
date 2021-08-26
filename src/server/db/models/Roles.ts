import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import { CreateRoleInput, UpdateRoleInput } from "miracle-tv-shared/graphql";
import { head } from "ramda";
import { Connection } from "rethinkdb";
import { DbRole } from "miracle-tv-server/db/models/types";

export class RolesModel extends Model {
  table = db.table("roles");
  name = "role";

  constructor(conn: Connection) {
    super(conn);
  }

  async create(input: CreateRoleInput): Promise<DbRole> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError(`There was an error creating ${this.name}`);
    }
    const newItem = await this.table
      .get(head(result.generated_keys))
      .run(this.conn);
    return newItem as DbRole;
  }

  async update({ id, ...input }: UpdateRoleInput): Promise<DbRole> {
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
    return { ...item, ...input, id } as DbRole;
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

  async list(filter: Partial<UpdateRoleInput> = {}): Promise<DbRole[]> {
    return this.table.filter(filter).coerceTo("array").run(this.conn);
  }

  async getAll(ids: string[]): Promise<DbRole[]> {
    return this.table
      .getAll(...ids)
      .coerceTo("array")
      .run(this.conn);
  }
}
