import { checkRight } from "miracle-tv/db/acl/roles";
import { AuthorizationError } from "miracle-tv/graphql/errors/auth";
import {
  AccessUnit,
  QueryResolvers,
  StreamKeyResolvers,
} from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";

export const streamKeysQueryResolver: QueryResolvers<ResolverContext>["streamKeys"] =
  async (_, _args, { user, userRoles, db: { streamKeys } }) => {
    if (
      checkRight(userRoles, AccessUnit.Write, "streamKeys") ||
      checkRight(userRoles, AccessUnit.Read, "streamKeys")
    ) {
      return streamKeys.getStreamKeys();
    }
    throw new AuthorizationError();
  };

export const selfStreamKeysQueryResolver: QueryResolvers<ResolverContext>["selfStreamKeys"] =
  async (_, _args, { user, userRoles, db: { streamKeys } }) => {
    if (checkRight(userRoles, AccessUnit.Self, "streamKeys")) {
      return streamKeys.getStreamKeys({ userId: user.id });
    }
    throw new AuthorizationError();
  };

export const streamKeysResolver: StreamKeyResolvers<ResolverContext> = {
  user: async (streamKey, _, { db: { users } }) => {
    return await users.getUserByIdSafe((streamKey as any).userId);
  },
  channel: async (streamKey, _, { db: { channels } }) => {
    return await channels.getChannelById((streamKey as any).channelId);
  },
};
