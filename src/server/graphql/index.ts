import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server";
import { GraphQLUpload } from "graphql-upload";
import glob from "glob";
import path from "path";
import { DateTime } from "luxon";
import { connection } from "miracle-tv-server/db/setup-db";
import { readFileSync } from "fs";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import {
  userQueryResolver,
  userResolver,
  userSelfQueryResolver,
  userSettingsQueryResolver,
  usersQueryResolver,
  userTestQueryResolver,
} from "miracle-tv-server/graphql/resolvers/users";
import { userMutations } from "miracle-tv-server/graphql/mutations/users";
import { signInMutation } from "miracle-tv-server/graphql/mutations/users/auth";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import {
  channelQueryResolver,
  channelResolver,
  channelsQueryResolver,
} from "miracle-tv-server/graphql/resolvers/channels";
import {
  createChannelMutation,
  deleteChannelMutation,
  updateChannelMutation,
} from "miracle-tv-server/graphql/mutations/channels";
import { ActivitiesModel } from "miracle-tv-server/db/models/Activities";
import {
  createActivityMutaiton,
  updateActivityMutation,
} from "miracle-tv-server/graphql/mutations/activities";
import {
  activitiesQueryResolver,
  activityQueryResolver,
  activityResolver,
} from "miracle-tv-server/graphql/resolvers/activities";
import { RolesModel } from "miracle-tv-server/db/models/Roles";
import { getCompleteRights } from "miracle-tv-server/db/acl/roles";
import { roleResolvers } from "miracle-tv-server/graphql/resolvers/roles";
import config from "miracle-tv-server/config";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import {
  selfStreamKeysQueryResolver,
  streamKeysQueryResolver,
  streamKeysResolver,
} from "miracle-tv-server/graphql/resolvers/stream-keys";
import {
  createStreamKeyMutation,
  revokeStreamKeyMutation,
} from "miracle-tv-server/graphql/mutations/stream-keys";
import { fileMutations } from "./mutations/file";
import { FilesModel } from "miracle-tv-server/db/models/Files";
import { fileResolvers } from "./resolvers/file";
import { red } from "chalk";
import { DbSession, DbUser } from "miracle-tv-server/db/models/types";
import { authDirective } from "miracle-tv-server/graphql/directives/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { UserSettingsModel } from "miracle-tv-server/db/models/UserSettings";

const schemaString = glob
  .sync(path.resolve(__dirname, "./**/*.graphql"))
  .map((filename) => {
    return readFileSync(filename).toString();
  })
  .join("\n");

export const schema = gql`
  ${schemaString}
`;

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
      user: userQueryResolver,
      users: usersQueryResolver,
      channel: channelQueryResolver,
      channels: channelsQueryResolver,
      activity: activityQueryResolver,
      activities: activitiesQueryResolver,
      streamKeys: streamKeysQueryResolver,
      self: userSelfQueryResolver,
      userSettings: userSettingsQueryResolver,
      selfStreamKeys: selfStreamKeysQueryResolver,
      test: userTestQueryResolver,
      ...fileResolvers,
    },
    Mutation: {
      ping: () => {
        return "pong";
      },
      ...userMutations,
      ...fileMutations,
      signIn: signInMutation,
      createChannel: createChannelMutation,
      updateChannel: updateChannelMutation,
      deleteChannel: deleteChannelMutation,
      createActivity: createActivityMutaiton,
      updateActivity: updateActivityMutation,
      createStreamKey: createStreamKeyMutation,
      revokeStreamKey: revokeStreamKeyMutation,
    },
    User: userResolver,
    Channel: channelResolver,
    Activity: activityResolver,
    Role: roleResolvers,
    StreamKey: streamKeysResolver,
  },
});

executableSchema = authDirective(executableSchema, "auth");

export const graphqlEndpoint = new ApolloServer({
  schema: executableSchema,
  introspection: true,
  formatError: (err) => {
    if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
      console.error(
        red`There was an internal server error while handling a request:`
      );
      console.log(err.originalError);
    }
    return err;
  },
  context: async ({ req }) => {
    const con = await connection;
    const db = {
      userSettings: new UserSettingsModel(con),
      sessions: new SessionsModel(con),
      users: new UsersModel(con),
      channels: new ChanelsModel(con),
      activities: new ActivitiesModel(con),
      streamKeys: new StreamKeysModel(con),
      roles: new RolesModel(con),
      files: new FilesModel(con),
    } as ResolverContext["db"];
    const isSessionTooLong = req.headers?.authorization?.length > 127;
    const session = isSessionTooLong
      ? null
      : ((await db.sessions.getSessionById(
          req.headers.authorization || ""
        )) as DbSession | null);
    const sessionIsValid =
      DateTime.fromISO(session?.expiresAt).diffNow("seconds").seconds > 0 ||
      false;
    const user = sessionIsValid
      ? ((await db.users.getUserById(session?.user)) as DbUser | null)
      : null;

    const allRoles = await db.roles.list();
    const userRoles =
      user?.roles?.map((role) =>
        getCompleteRights(allRoles, role as unknown as string)
      ) || [];
    return {
      db,
      session,
      user,
      userRoles,
    } as ResolverContext;
  },
});
