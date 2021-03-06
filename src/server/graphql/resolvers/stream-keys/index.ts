import { checkRight } from "miracle-tv-shared/acl/utils";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import {
  AccessUnit,
  QueryResolvers,
  StreamKeyResolvers,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { NotFoundError } from "miracle-tv-server/graphql/errors/general";
import { IncorrectUserError } from "miracle-tv-server/graphql/errors/users";
import { DbChannel } from "miracle-tv-server/db/models/types";

export const streamKeysQueryResolvers: QueryResolvers<ResolverContext> = {
  async streamKeys(_, { filter, limit }, { db: { streamKeys } }) {
    return streamKeys.getStreamKeys(filter, limit);
  },

  async streamKeysCount(_, { filter }, { db: { streamKeys } }) {
    return streamKeys.getStreamKeysCount(filter);
  },

  async selfStreamKeys(_, _args, { user, db: { streamKeys } }) {
    return streamKeys.getStreamKeys({ userId: user.id }) as any;
  },

  async streamKeysByChannelId(
    _,
    { channelId },
    { user, userRoles, db: { streamKeys, channels } }
  ) {
    const isRead = checkRight(userRoles, AccessUnit.Read, "streamKeys");
    const isSelf = checkRight(userRoles, AccessUnit.Self, "streamKeys");

    if (isRead) {
      return streamKeys.getStreamKeysByChannelId(channelId) as any;
    }
    if (isSelf) {
      const channel = (await channels.getChannelById(
        channelId
      )) as DbChannel | null;
      if (!channel) {
        throw new NotFoundError("Channel not found");
      } else if (channel?.userId !== user.id) {
        throw new IncorrectUserError();
      }
      return streamKeys.getStreamKeysByChannelId(channelId) as any;
    }
    throw new AuthorizationError();
  },
};

export const streamKeysResolver: StreamKeyResolvers<ResolverContext> = {
  user: async (streamKey, _, { db: { users } }) => {
    return (await users.getUserByIdSafe((streamKey as any).userId)) as any;
  },
  channel: async (streamKey, _, { db: { channels } }) => {
    return await channels.getChannelById((streamKey as any).channelId, true);
  },
};
