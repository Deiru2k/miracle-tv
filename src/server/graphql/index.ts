import { Resolvers } from "miracle-tv-server/types/graphql";
import { connection } from "miracle-tv-server/db/setup-db";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import {
  userQueryResolver,
  userResolver,
  usersQueryResolver,
  userSelfQueryResolver,
  userTestQueryResolver,
} from "miracle-tv-server/graphql/resolvers/users";
import { signUpMutation } from "miracle-tv-server/graphql/mutations/users";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server";
import { signInMutation } from "miracle-tv-server/graphql/mutations/users/auth";
import { DbSession, DbUser } from "miracle-tv-server/db/types";
import { DateTime } from "luxon";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import glob from "glob";
import path from "path";
import { readFileSync } from "fs";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import {
  channelQueryResolver,
  channelResolver,
  channelsQueryResolver,
} from "./resolvers/channels";
import {
  createChannelMutation,
  updateChannelMutation,
} from "./mutations/channels";
import { ActivitiesModel } from "miracle-tv-server/db/models/Activities";
import {
  createActivityMutaiton,
  updateActivityMutation,
} from "./mutations/activities";
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

const schemaString = glob
  .sync(path.resolve(__dirname, "./**/*.graphql"))
  .map((filename) => {
    const contents = readFileSync(filename).toString();
    return contents;
  })
  .join("\n");

export const schema = gql`
  ${schemaString}
`;

const resolvers: Resolvers<ResolverContext> = {
  Query: {
    info: () => ({
      name: config.name || "MiracleTV",
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
    selfStreamKeys: selfStreamKeysQueryResolver,
    test: userTestQueryResolver,
  },
  Mutation: {
    ping: (...args) => {
      args;
      return "pong";
    },
    signUp: signUpMutation,
    signIn: signInMutation,
    createChannel: createChannelMutation,
    updateChannel: updateChannelMutation,
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
};

export const graphqlEndpoint = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    const con = await connection;
    const db = {
      sessions: new SessionsModel(con),
      users: new UsersModel(con),
      channels: new ChanelsModel(con),
      activities: new ActivitiesModel(con),
      streamKeys: new StreamKeysModel(con),
      roles: new RolesModel(con),
    } as ResolverContext["db"];
    const session = (await db.sessions.getSessionById(
      req.headers.authorization || ""
    )) as DbSession | null;
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
