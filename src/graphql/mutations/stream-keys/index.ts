import { checkRight } from "miracle-tv/db/acl/roles";
import { AuthorizationError } from "miracle-tv/graphql/errors/auth";
import { IncorrectUserError } from "miracle-tv/graphql/errors/users";
import { AccessUnit, MutationResolvers } from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";
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
