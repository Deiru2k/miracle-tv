import { UserInputError } from "apollo-server-errors";
import { DbUser } from "miracle-tv-server/db/models/types";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { MutationResolvers, RoleRaw } from "miracle-tv-shared/graphql";
import { identity, intersection } from "ramda";
import { Expression } from "rethinkdb";

const systemRoles = ["admin", "moderator", "user", "volunteer"];

export const rolesMutations: MutationResolvers<ResolverContext> = {
  async createRole(_, { input }, { db: { roles } }) {
    const role = await roles.create(input);
    return role;
  },
  async createRoleRaw(_, { input }, { db: { roles } }) {
    const role = await roles.create<RoleRaw>(input);
    return role;
  },
  async updateRole(_, { input }, { db: { roles } }) {
    const role = await roles.update(input);
    return role;
  },
  async updateRoleRaw(_, { input }, { db: { roles } }) {
    const role = await roles.update<RoleRaw>(input);
    return role;
  },
  async deleteRole(_, { id }, { db: { roles, users } }) {
    if (systemRoles.includes(id)) {
      throw new UserInputError(`Cannot delete a system role: ${id}`);
    }
    await users.table
      .filter((doc) => doc("roles").contains(id))
      .update((doc: Expression<DbUser>) => {
        const dbRoles = doc("roles") as any;
        return {
          roles: dbRoles.difference([id]),
        };
      })
      .run(users.conn);
    return await roles.deleteItem(id);
  },
  async bulkDeleteRoles(_, { ids }, { db: { roles, users } }) {
    const systemIntersect = intersection(systemRoles, ids);
    if (systemIntersect.length > 0) {
      throw new UserInputError(
        `Cannot delete a system roles: ${systemIntersect.join(", ")}`
      );
    }
    await users.table
      .update((doc: Expression<DbUser>) => {
        const dbRoles = doc("roles") as any;
        return {
          roles: dbRoles.difference(ids),
        };
      })
      .run(users.conn);
    return await roles.deleteItems(ids);
  },
};
