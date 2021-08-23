import db from "miracle-tv-server/db";
import { DbUser } from "miracle-tv-server/db/types";
import { Model } from "miracle-tv-server/db/models";
import {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "miracle-tv-shared/graphql";
import { head, map, omit } from "ramda";
import {
  EmailExistsError,
  UserExistsError,
} from "miracle-tv-server/graphql/errors/users";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import { hash } from "bcrypt";

type UsersFilter = Partial<Record<keyof DbUser, any>>;

export class UsersModel extends Model {
  table = db.table("users");

  sanitizeUser(dbUser: DbUser): User {
    return omit(["password"], dbUser);
  }

  async createUserSafe({ password, ...input }: CreateUserInput): Promise<User> {
    const hashed = await hash(password, 11);
    const dbUsers = await this.getUsers({ username: input.username });
    const dbEmails = await this.getUsers({ email: input.email });
    if (dbUsers.length > 0) {
      throw new UserExistsError();
    }
    if (dbEmails.length > 0) {
      throw new EmailExistsError();
    }
    return (await this.table
      .insert({ password: hashed, ...input, singleUserMode: false })
      .run(this.conn)
      .then(async (result) => {
        const key = head(result.generated_keys);
        return await this.table.get(key).run(this.conn).then(this.sanitizeUser);
      })) as User;
  }

  async getUserById(id: string): Promise<DbUser | null> {
    return (await this.table.get(id).run(this.conn)) as DbUser | null;
  }

  async getUserByIdSafe(id: string): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return this.sanitizeUser(user);
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

  async updateUser({ id, ...input }: UpdateUserInput): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { errors } = await this.table.get(id).update(input).run(this.conn);
    if (errors) {
      throw new ServerError("Error updating user");
    }
    return { id, ...user, ...input } as User;
  }
}
