import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import {
  CreateRoleInput,
  Role,
  UpdateRoleInput,
} from "miracle-tv-server/types/graphql";
import { head } from "ramda";
import { Connection } from "rethinkdb";

export class RolesModel extends Model {
  table = db.table("roles");
  name = "role";

  constructor(conn: Connection) {
    super(conn);
  }

  async create(input: CreateRoleInput): Promise<Role> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError(`There was an error creating ${this.name}`);
    }
    const newItem = await this.table
      .get(head(result.generated_keys))
      .run(this.conn);
    return newItem as Role;
  }

  async update({ id, ...input }: UpdateRoleInput): Promise<Role> {
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
    return { ...item, ...input, id } as Role;
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

  async list(filter: Partial<UpdateRoleInput> = {}): Promise<Role[]> {
    return this.table.filter(filter).coerceTo("array").run(this.conn);
  }

  async getAll(ids: string[]): Promise<Role[]> {
    return this.table
      .getAll(...ids)
      .coerceTo("array")
      .run(this.conn);
  }
}
