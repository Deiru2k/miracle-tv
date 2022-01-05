import { getCompleteRights } from "miracle-tv-shared/acl/utils";
import { QueryResolvers, RoleResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const rolesQueryresolvers: QueryResolvers<ResolverContext> = {
  role(_, { id }, { db: { roles } }) {
    return roles.get(id);
  },
  roles(_, { filter, limit }, { db: { roles } }) {
    return roles.list(filter, limit);
  },
};

export const roleResolvers: RoleResolvers = {
  access: async ({ id }, _, { db: { roles } }) => {
    const roleList = await roles.list();
    const completeRole = getCompleteRights(roleList, id);
    return completeRole.access;
  },
};
