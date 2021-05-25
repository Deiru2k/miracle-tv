import { Resolvers } from "miracle-tv/types/graphql";
import { connection } from "miracle-tv/db/setup-db";
import { ResolverContext } from "miracle-tv/types/resolver";
import {
  userQueryResolver,
  userResolver,
  usersQueryResolver,
  userSelfQueryResolver,
  userTestQueryResolver,
} from "./resolvers/users";
import { signUpMutation } from "./mutations/users";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server";
import { signInMutation } from "./mutations/users/auth";
import { DbSession, DbUser } from "miracle-tv/db/types";
import { DateTime } from "luxon";
import { SessionsModel } from "miracle-tv/db/models/Sessions";
import { UsersModel } from "miracle-tv/db/models/Users";
import glob from "glob";
import path from "path";
import { readFileSync } from "fs";
import { ChanelsModel } from "miracle-tv/db/models/Channels";
import {
  channelQueryResolver,
  channelResolver,
  channelsQueryResolver,
} from "./resolvers/channels";
import {
  createChannelMutation,
  updateChannelMutation,
} from "./mutations/channels";
import { ActivitiesModel } from "miracle-tv/db/models/Activities";
import {
  createActivityMutaiton,
  updateActivityMutation,
} from "./mutations/activities";
import {
  activitiesQueryResolver,
  activityQueryResolver,
  activityResolver,
} from "./resolvers/activities";
import { RolesModel } from "miracle-tv/db/models/Roles";
import { getCompleteRights } from "miracle-tv/db/acl/roles";
import { roleResolvers } from "./resolvers/roles";
import config from "miracle-tv/config";

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
    self: userSelfQueryResolver,
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
  },
  User: userResolver,
  Channel: channelResolver,
  Activity: activityResolver,
  Role: roleResolvers,
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
