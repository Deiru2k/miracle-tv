import { checkRight } from "miracle-tv-server/db/acl/roles";
import {
  AuthenticationError,
  AuthorizationError,
} from "miracle-tv-server/graphql/errors/auth";
import { NotFoundError } from "miracle-tv-server/graphql/errors/general";
import { AccessUnit, MutationResolvers } from "miracle-tv-shared/graphql";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { UserInputError } from "apollo-server-express";

export const createChannelMutation: MutationResolvers<ResolverContext>["createChannel"] =
  async (_, { input }, { user, db: { channels } }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    if (input.slug) {
      const targetChannel = await channels.getChannelBySlug(input.slug);
      if (targetChannel) {
        throw new UserInputError("This slug is already taken");
      }
    }
    return await channels.createChannel(input, user.id!);
  };

export const updateChannelMutation: MutationResolvers<ResolverContext>["updateChannel"] =
  async (_, { input }, { user, userRoles, db: { channels } }) => {
    const channel = await channels.getChannelById(input.id);
    const channelRights =
      (user?.id === ((channel as any).userId as string) &&
        checkRight(userRoles, AccessUnit.Self, "channels")) ||
      checkRight(userRoles, AccessUnit.Write, "channels");
    if (!user) {
      throw new AuthenticationError();
    }
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    if (!channelRights) {
      throw new AuthorizationError();
    }
    if (input.slug) {
      const targetChannel = await channels.getChannelBySlug(input.slug);
      if (targetChannel && targetChannel.id !== channel.id) {
        throw new UserInputError("This slug is already taken");
      }
    }
    return await channels.updateChannel(input);
  };

export const deleteChannelMutation: MutationResolvers<ResolverContext>["deleteChannel"] =
  async (_, { id }, { user, userRoles, db: { channels } }) => {
    const channel = await channels.getChannelById(id);
    const channelRights =
      (user?.id === ((channel as any).userId as string) &&
        checkRight(userRoles, AccessUnit.Self, "channels")) ||
      checkRight(userRoles, AccessUnit.Write, "channels");
    if (!user) {
      throw new AuthenticationError();
    }
    if (!channel) {
      throw new NotFoundError("Channel not found");
    }
    if (!channelRights) {
      throw new AuthorizationError();
    }
    return await channels.deleteChannel(id);
  };
