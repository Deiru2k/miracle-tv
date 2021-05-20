import {
  AuthenticationError,
  AuthorizationError,
} from "miracle-tv/graphql/errors/auth";
import { NotFoundError } from "miracle-tv/graphql/errors/general";
import { MutationResolvers } from "miracle-tv/types/graphql";
import { ResolverContext } from "miracle-tv/types/resolver";

export const createChannelMutation: MutationResolvers<ResolverContext>["createChannel"] =
  async (_, { input }, { user, db: { channels } }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    return await channels.createChannel(input, user.id!);
  };

export const updateChannelMutation: MutationResolvers<ResolverContext>["updateChannel"] =
  async (_, { input }, { user, db: { channels } }) => {
    const channel = await channels.getChannelById(input.id);
    if (!user) {
      throw new AuthenticationError();
    }
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    if (user?.id !== (channel.user as unknown as string)) {
      throw new AuthorizationError();
    }
    return await channels.updateChannel(input);
  };
