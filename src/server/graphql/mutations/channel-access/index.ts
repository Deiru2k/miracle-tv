import { AuthorizationError } from "miracle-tv-server/graphql/errors/auth";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { MutationResolvers } from "miracle-tv-shared/graphql";

export const channelAccessMutations: MutationResolvers<ResolverContext> = {
  async authorizeChannelAccess(
    _,
    { input },
    { db: { channels, channelAccessKeys } }
  ) {
    const channel = await channels.getChannelById(input.channelId);
    if (!channel) {
      throw new AuthorizationError("Invalid password");
    }
    if (channel?.password === input.password) {
      return await channelAccessKeys.createAccessKey(input.channelId);
    } else {
      throw new AuthorizationError("Invalid password");
    }
  },

  async checkAccessKey(_, { id }, { db: { channelAccessKeys } }) {
    const response = await channelAccessKeys.checkAccessKey(id);
    return response;
  },
};
