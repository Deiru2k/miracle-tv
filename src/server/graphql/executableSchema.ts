import { GraphQLUpload } from "graphql-upload";
import {
  roleResolvers,
  rolesQueryresolvers,
} from "miracle-tv-server/graphql/resolvers/roles";
import config from "miracle-tv-server/config";
import { activitiesMutations } from "miracle-tv-server/graphql/mutations/activities";
import {
  activitiesQueryResolver,
  activityEntityResolver,
} from "miracle-tv-server/graphql/resolvers/activities";
import {
  channelResolver,
  channelsQueryResolvers,
} from "miracle-tv-server/graphql/resolvers/channels";
import { channelMutationResolvers } from "miracle-tv-server/graphql/mutations/channels";
import { userMutations } from "miracle-tv-server/graphql/mutations/users";
import { authMutationResolvers } from "miracle-tv-server/graphql/mutations/users/auth";
import {
  streamKeysQueryResolvers,
  streamKeysResolver,
} from "miracle-tv-server/graphql/resolvers/stream-keys";
import { streamKeyMutations } from "miracle-tv-server/graphql/mutations/stream-keys";
import { fileMutations } from "./mutations/file";
import { fileResolvers } from "./resolvers/file";
import { authDirective } from "miracle-tv-server/graphql/directives/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { subscriptionQueryResolvers } from "./resolvers/subscriptions";
import { subscribtionMutaitonResolvers } from "./mutations/subscriptions";
import {
  fullUserEntityResolver,
  fullUserResolvers,
} from "./resolvers/full-users";
import { fullUserMutations } from "./mutations/full-users";
import { rolesMutations } from "./mutations/roles";
import { systemResolvers } from "./resolvers/system";
import { serverConfigQueryResolvers } from "./resolvers/server-config";
import {
  sessionResolver,
  settingsResolver,
  userQueryResolvers,
  userResolver,
} from "./resolvers/users";
import { DocumentNode, GraphQLSchema } from "graphql";
import { channelAccessMutations } from "./mutations/channel-access";
import { channelAccessKeyResolver } from "./resolvers/channel-access";

export const createExecutableSchema = (schema: DocumentNode): GraphQLSchema => {
  let executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: {
      Upload: GraphQLUpload,
      Query: {
        info: () => ({
          name: `${config.name || "Miracle TV"}`,
          version: process.env.npm_package_version || "none",
          packageName: process.env.npm_package_name || "none",
        }),
        ...subscriptionQueryResolvers,
        ...userQueryResolvers,
        ...streamKeysQueryResolvers,
        ...activitiesQueryResolver,
        ...channelsQueryResolvers,
        ...rolesQueryresolvers,
        ...fullUserResolvers,
        ...fileResolvers,
        ...systemResolvers,
        ...serverConfigQueryResolvers,
      },
      Mutation: {
        ping: () => {
          return "pong";
        },
        ...userMutations,
        ...fileMutations,
        ...authMutationResolvers,
        ...subscribtionMutaitonResolvers,
        ...channelMutationResolvers,
        ...streamKeyMutations,
        ...activitiesMutations,
        ...rolesMutations,
        ...fullUserMutations,
        ...channelAccessMutations,
      },
      User: userResolver,
      FullUser: fullUserEntityResolver,
      UserSettings: settingsResolver,
      Session: sessionResolver,
      Channel: channelResolver,
      SelfChannel: channelResolver,
      Activity: activityEntityResolver,
      Role: roleResolvers,
      StreamKey: streamKeysResolver,
      ChannelAccessKey: channelAccessKeyResolver,
    },
  });

  executableSchema = authDirective(executableSchema, "auth");

  return executableSchema;
};
