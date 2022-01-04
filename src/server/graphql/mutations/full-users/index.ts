import { ResolverContext } from "miracle-tv-server/types/resolver";
import { MutationResolvers } from "miracle-tv-shared/graphql";

export const fullUserMutations: MutationResolvers<ResolverContext> = {
  async updateFullUser(_, { input: { id, ...input } }, { db: { users } }) {
    await users.bulkUpdate([id], input);
    return await users.getUserById(id);
  },
  // Delete / Restore users
  async deleteFullUser(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { deleted: true });
    return await users.getUserById(id);
  },
  async deleteFullUsers(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { deleted: true });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  async restoreFullUser(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { deleted: false });
    return await users.getUserById(id);
  },
  async restoreFullUsers(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { deleted: false });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  // Suspend / Unsuspend users
  async suspendFullUser(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { suspended: true });
    return await users.getUserById(id);
  },
  async suspendFullUsers(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { suspended: true });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  async unsuspendFullUser(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { suspended: false });
    return await users.getUserById(id);
  },
  async unsuspendFullUsers(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { suspended: false });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  // Disable / Enable login
  async disableFullUserLogin(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { loginDisabled: true });
    return await users.getUserById(id);
  },
  async disableFullUsersLogin(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { loginDisabled: true });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  async enableFullUserLogin(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { loginDisabled: false });
    return await users.getUserById(id);
  },
  async enableFullUsersLogin(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { loginDisabled: false });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  // Silence / Unsilence login
  async silenceFullUser(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { silenced: true });
    return await users.getUserById(id);
  },
  async silenceFullUsers(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { silenced: true });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
  async unsilenceFullUser(_, { id }, { db: { users } }) {
    await users.bulkUpdate([id], { silenced: false });
    return await users.getUserById(id);
  },
  async unsilenceFullUsers(_, { ids }, { db: { users } }) {
    await users.bulkUpdate(ids, { silenced: false });
    return (await users.getUsers({ ids }, undefined, true)) as any;
  },
};
