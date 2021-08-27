import { checkRight } from "miracle-tv-server/db/acl/roles";
import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import {
  AccessUnit,
  QueryResolvers,
  StreamKeyResolvers,
} from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";

export const streamKeysQueryResolver: QueryResolvers<ResolverContext>["streamKeys"] =
  async (_, _args, { userRoles, db: { streamKeys } }) => {
    return streamKeys.getStreamKeys() as any;
  };

export const selfStreamKeysQueryResolver: QueryResolvers<ResolverContext>["selfStreamKeys"] =
  async (_, _args, { user, userRoles, db: { streamKeys } }) => {
    return streamKeys.getStreamKeys({ userId: user.id }) as any;
  };

export const streamKeysResolver: StreamKeyResolvers<ResolverContext> = {
  user: async (streamKey, _, { db: { users } }) => {
    return (await users.getUserByIdSafe((streamKey as any).userId)) as any;
  },
  channel: async (streamKey, _, { db: { channels } }) => {
    return await channels.getChannelById((streamKey as any).channelId);
  },
};
