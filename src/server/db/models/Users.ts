import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  CreateUserInput,
  FullUsersFilter,
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

const defaultUser = {
  roles: ["user"],
  singleUserMode: false,
  loginDisabled: false,
  deleted: false,
  suspended: false,
  silenced: false,
};

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
        ...defaultUser,
      })
      .run(this.conn)
      .then(async (result) => {
        const key = head(result.generated_keys);
        return await this.table.get(key).run(this.conn).then(this.sanitizeUser);
      })) as User;
  }

  async getUserById<T extends object = DbUser>(id: string): Promise<T | null> {
    return this.table.get(id).run(this.conn) as T | null;
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

  async getUserByIdSafe(
    id: string,
    includeDisabled: boolean = false
  ): Promise<DbUserSafe> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if ((user.deleted || user.suspended) && !includeDisabled) {
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

  userFilter(
    { ids, username, roles, ...filter }: UsersFilter & FullUsersFilter = {},
    limit?: QueryLimit,
    includeDisabled: boolean = false
  ) {
    const disabledFilter = {
      suspended: false,
      deleted: false,
    };
    let filteredQuery = ids ? this.table.getAll(...ids) : this.table;
    if (!includeDisabled) {
      filteredQuery = filteredQuery.filter(disabledFilter);
    }
    filteredQuery = filteredQuery
      .filter((doc: any) => {
        let reply: any = doc;
        if (username) {
          reply = doc("username").downcase().match(username.toLowerCase());
        }
        if (roles && roles?.length) {
          reply = reply.and(doc("roles").setIntersection(roles).count().gt(0));
        }
        return reply;
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

  async getUsers<T = DbUser>(
    filter: UsersFilter,
    limit?: QueryLimit,
    includeDisabled: boolean = false
  ): Promise<T[]> {
    const filteredQuery = this.userFilter(filter, limit, includeDisabled);
    return (await filteredQuery.coerceTo("array").run(this.conn)) as T[];
  }

  async getUserCount(
    filter: UsersFilter,
    limit?: QueryLimit,
    includeDisabled: boolean = false
  ): Promise<number> {
    const filteredQuery = this.userFilter(filter, limit, includeDisabled);
    return (await filteredQuery.count().run(this.conn)) as number;
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
  async bulkUpdate(ids: string[], input: Partial<DbUser>) {
    const result = await this.table
      .getAll(...ids)
      .update(input)
      .run(this.conn);
    if (result.errors) {
      throw new ServerError("Error deleting users");
    }
    return true;
  }
}
