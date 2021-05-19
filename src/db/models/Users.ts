import db from "miracle-tv/db";
import { DbUser } from "miracle-tv/db/types";
import { Model } from "miracle-tv/db/models";
import { CreateUserInput, User } from "miracle-tv/types/graphql";
import { head, map, omit } from "ramda";
import {
  EmailExistsError,
  UserExistsError,
} from "miracle-tv/graphql/errors/users";

type UsersFilter = Partial<Record<keyof DbUser, any>>;

export class UsersModel extends Model {
  table = db.table("users");

  sanitizeUser(dbUser: DbUser): User {
    return omit(["password"], dbUser);
  }

  async createUserSafe({ password, ...input }: CreateUserInput): Promise<User> {
    const saltedPassword = `salted+${password}`;
    const dbUsers = await this.getUsers({ username: input.username });
    const dbEmails = await this.getUsers({ email: input.email });
    if (dbUsers.length > 0) {
      throw new UserExistsError();
    }
    if (dbEmails.length > 0) {
      throw new EmailExistsError();
    }
    return (await this.table
      .insert({ password: saltedPassword, ...input, singleUserMode: false })
      .run(this.conn)
      .then((result) => {
        const key = head(result.generated_keys);
        return this.table.get(key).run(this.conn).then(this.sanitizeUser);
      })) as User;
  }

  async getUserById(id: string): Promise<DbUser | null> {
    return (await this.table.get(id).run(this.conn)) as DbUser | null;
  }

  async getUserByIdSafe(id: string): Promise<User> {
    return await this.getUserById(id).then(this.sanitizeUser);
  }

  async getUsers(filter: UsersFilter = {}): Promise<DbUser[]> {
    return (await this.table
      .filter(filter)
      .coerceTo("array")
      .run(this.conn)) as DbUser[];
  }

  async getUsersSafe(filter: UsersFilter = {}): Promise<User[]> {
    return (await this.getUsers(filter).then(map(this.sanitizeUser))) as User[];
  }
}
