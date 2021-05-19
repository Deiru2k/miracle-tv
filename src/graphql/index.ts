import { Resolvers } from "miracle-tv/types/graphql";
import { connection } from "miracle-tv/db/setup-db";
import { ResolverContext } from "miracle-tv/types/resolver";
import {
  userQueryResolver,
  userResolver,
  userListQueryResolver,
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
      version: process.env.npm_package_version || "none",
      packageName: process.env.npm_package_name || "none",
    }),
    users: userListQueryResolver,
    user: userQueryResolver,
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
  },
  User: userResolver,
};

export const graphqlEndpoint = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const con = await connection;
    const db = {
      sessions: new SessionsModel(con),
      users: new UsersModel(con),
    };
    const session = (await db.sessions.getSessionById(
      req.headers.authorization || ""
    )) as DbSession | null;
    const sessionIsValid =
      DateTime.fromISO(session?.expiresAt).diffNow("seconds").seconds > 0 ||
      false;
    const user = sessionIsValid
      ? ((await db.users.getUserById(session?.user)) as DbUser | null)
      : null;
    return {
      db,
      session,
      user,
    };
  },
});
