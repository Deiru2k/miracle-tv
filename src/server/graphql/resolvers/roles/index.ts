import { getCompleteRights } from "miracle-tv-server/db/acl/roles";
import { QueryResolvers, RoleResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const rolesQueryResolver: QueryResolvers<ResolverContext>["roles"] =
  async (_, { filter }, { db: { roles } }) => {
    return roles.list(filter);
  };

export const roleResolvers: RoleResolvers = {
  access: async ({ id }, _, { db: { roles } }) => {
    const roleList = await roles.list();
    const completeRole = getCompleteRights(roleList, id);
    return completeRole.access;
  },
};
