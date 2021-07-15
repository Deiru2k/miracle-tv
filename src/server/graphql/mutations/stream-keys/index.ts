import { checkRight } from "miracle-tv-server/db/acl/roles";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import { IncorrectUserError } from "miracle-tv-server/graphql/errors/users";
import { AccessUnit, MutationResolvers } from "miracle-tv-server/types/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { prop } from "ramda";

export const createStreamKeyMutation: MutationResolvers<ResolverContext>["createStreamKey"] =
  async (
    _,
    { input: { userId, channelId } },
    { user, userRoles, db: { streamKeys, users, channels } }
  ) => {
    const isWrite = checkRight(userRoles, AccessUnit.Write, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");
    const userChannels = await channels.getChannels({ userId: user.id });
    const userChannelIds = userChannels.map(prop("id")) as string[];
    if (isWrite || isSelf) {
      if (
        !isWrite &&
        (userId !== user.id || !userChannelIds.includes(channelId))
      ) {
        throw new IncorrectUserError();
      }
      await streamKeys.deleteStreamKeysByPair(userId, channelId);
      return await streamKeys.createStreamKey(userId, channelId);
    }
    throw new AuthorizationError();
  };

export const revokeStreamKeyMutation: MutationResolvers<ResolverContext>["revokeStreamKey"] =
  async (
    _,
    { input: { userId, channelId } },
    { user, userRoles, db: { streamKeys } }
  ) => {
    const isWrite = checkRight(userRoles, AccessUnit.Write, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");
    if (isWrite || isSelf) {
      if (!isWrite && userId !== user.id) {
        throw new AuthorizationError();
      }
      return await streamKeys.deleteStreamKeysByPair(userId, channelId);
    }
  };
