import { checkRight } from "miracle-tv-server/db/acl/roles";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import {
  AccessUnit,
  QueryResolvers,
  StreamKey,
  StreamKeyResolvers,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { NotFoundError } from "miracle-tv-server/graphql/errors/general";
import { IncorrectUserError } from "miracle-tv-server/graphql/errors/users";
import { DbChannel } from "miracle-tv-server/db/models/types";

export const streamKeysQueryResolver: QueryResolvers<ResolverContext>["streamKeys"] =
  async (_, _args, { userRoles, db: { streamKeys } }) => {
    return streamKeys.getStreamKeys() as any;
  };

export const selfStreamKeysQueryResolver: QueryResolvers<ResolverContext>["selfStreamKeys"] =
  async (_, _args, { user, userRoles, db: { streamKeys } }) => {
    return streamKeys.getStreamKeys({ userId: user.id }) as any;
  };

export const streamKeysByChannelIdResolver: QueryResolvers<ResolverContext>["streamKeysByChannelId"] =
  async (
    _,
    { channelId },
    { user, userRoles, db: { streamKeys, channels } }
  ) => {
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
  };

export const streamKeysResolver: StreamKeyResolvers<ResolverContext> = {
  user: async (streamKey, _, { db: { users } }) => {
    return (await users.getUserByIdSafe((streamKey as any).userId)) as any;
  },
  channel: async (streamKey, _, { db: { channels } }) => {
    return await channels.getChannelById((streamKey as any).channelId);
  },
};
