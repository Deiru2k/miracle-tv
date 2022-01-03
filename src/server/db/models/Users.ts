import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  CreateUserInput,
  QueryLimit,
  UpdateUserAccountInput,
  UpdateUserInput,
  User,
  UserAccountDetails,
  UsersFilter,
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
import { DbUser, DbUserSafe } from "miracle-tv-server/db/models/types";

export class UsersModel extends Model {
  table = db.table("users");

  sanitizeUser(dbUser: DbUser): DbUserSafe {
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
      .insert({
        ...input,
        password: hashed,
        roles: ["user"],
        singleUserMode: false,
      })
      .run(this.conn)
      .then(async (result) => {
        const key = head(result.generated_keys);
        return await this.table.get(key).run(this.conn).then(this.sanitizeUser);
      })) as User;
  }

  async getUserById(id: string): Promise<DbUser | null> {
    return (await this.table.get(id).run(this.conn)) as DbUser | null;
  }

  async getUsersForDirectory(limit?: QueryLimit): Promise<User[]> {
    const usersForDirectory = await db
      .table("user-settings")
      .filter({ featureInDirectory: true })
      .pluck("id")
      .coerceTo("array")
      .run(this.conn);

    const users = await this.getUsers(
      { ids: usersForDirectory.map((usr) => usr.id) },
      limit
    );
    return users.map(this.sanitizeUser) as any as User[];
  }

  async getUserByUsername(username: string): Promise<DbUser | null> {
    return head(
      (await this.table
        .filter({ username })
        .limit(1)
        .coerceTo("array")
        .run(this.conn)) as DbUser[]
    ) as DbUser | null;
  }

  async getUserByIdSafe(id: string): Promise<DbUserSafe> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return this.sanitizeUser(user);
  }

  async getUserByUsernameSafe(username: string): Promise<DbUserSafe> {
    const user = await this.getUserByUsername(username);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return this.sanitizeUser(user);
  }

  async getUsers(
    { ids, username, displayName, ...filter }: UsersFilter = {},
    limit?: QueryLimit
  ): Promise<DbUser[]> {
    const query = ids ? this.table.getAll(...ids) : this.table;
    let filteredQuery = query
      .filter((doc: any) => {
        if (username) {
          return doc("username").downcase().match(username.toLowerCase());
        }
        return true;
      })
      .filter(filter);

    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }

    return (await filteredQuery.coerceTo("array").run(this.conn)) as DbUser[];
  }

  async getUsersSafe(filter: UsersFilter = {}): Promise<User[]> {
    return (await this.getUsers(filter).then(map(this.sanitizeUser))) as User[];
  }

  async updateUser({ id, ...input }: UpdateUserInput): Promise<DbUser> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const { errors } = await this.table.get(id).update(input).run(this.conn);
    if (errors) {
      throw new ServerError("Error updating user");
    }
    return { id, ...user, ...input } as DbUser;
  }

  async updateUserAccount({
    id,
    ...input
  }: UpdateUserAccountInput & { id: string }): Promise<UserAccountDetails> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { errors } = await this.table.get(id).update(input).run(this.conn);

    if (errors) {
      throw new ServerError("Updating user account failed");
    }

    return { id, username: user.username, ...input };
  }

  async updatePassword(id: string, password: string) {
    const hashed = await hash(password, 11);
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { errors } = await this.table
      .get(id)
      .update({ password: hashed })
      .run(this.conn);

    if (errors) {
      throw new ServerError("Updating password failed");
    }

    return true;
  }
}
