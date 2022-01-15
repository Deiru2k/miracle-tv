import { checkRight } from "miracle-tv-shared/acl/utils";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import { IncorrectUserError } from "miracle-tv-server/graphql/errors/users";
import { AccessUnit, MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { prop } from "ramda";
import { NotFoundError } from "miracle-tv-server/graphql/errors/general";

export const streamKeyMutations: MutationResolvers<ResolverContext> = {
  async createStreamKey(
    _,
    { input: { userId, channelId, name } },
    { user, userRoles, db: { streamKeys, channels } }
  ) {
    const isWrite = checkRight(userRoles, AccessUnit.Write, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");
    const userChannels = await channels.getChannels({ userId: user.id });
    const userChannelIds = userChannels.map(prop("id")) as string[];
    if (isWrite || isSelf) {
      // Check if user owns the channel or user is admin
      if (
        !isWrite &&
        (userId !== user.id || !userChannelIds.includes(channelId))
      ) {
        throw new IncorrectUserError();
      }
      return (await streamKeys.createStreamKey(userId, channelId, name)) as any;
    }
    throw new AuthorizationError();
  },

  async revokeStreamKey(_, { key }, { user, userRoles, db: { streamKeys } }) {
    const isWrite = checkRight(userRoles, AccessUnit.Write, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");
    const streamKey = await streamKeys.getStreamKeyById(key);
    if (isWrite || isSelf) {
      if (!streamKey) {
        throw new NotFoundError("Stream key not found");
      }
      if (!isWrite && streamKey.userId !== user.id) {
        throw new AuthorizationError();
      }
      return await streamKeys.deleteStreamKey(key);
    }
  },

  async revokeStreamKeys(
    _,
    { input: { userId, channelId } },
    { user, userRoles, db: { streamKeys } }
  ) {
    const isWrite = checkRight(userRoles, AccessUnit.Write, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");
    if (isWrite || isSelf) {
      if (!isWrite && userId !== user.id) {
        throw new AuthorizationError();
      }
      return await streamKeys.deleteStreamKeysByPair(userId, channelId);
    }
  },

  async revokeAllStreamKeys(
    _,
    { input: { userId } },
    { user, userRoles, db: { streamKeys } }
  ) {
    const isWrite = checkRight(userRoles, AccessUnit.Write, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");
    if (isWrite || isSelf) {
      if (!isWrite && userId !== user.id) {
        throw new AuthorizationError();
      }
      return await streamKeys.deleteStreamKeysByUser(userId);
    }
  },

  async bulkRevokeStreamKeys(_, { keys }, { db: { streamKeys } }) {
    return await streamKeys.deleteStreamKeysById(keys);
  },
};
