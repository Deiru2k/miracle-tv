import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server";
import glob from "glob";
import path from "path";
import { red } from "chalk";
import { connection } from "miracle-tv-server/db/setup-db";
import { readFileSync } from "fs";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { createExecutableSchema } from "./executableSchema";
import { createDBContext } from "miracle-tv-server/db";
import { createSessionContext } from "./sessionContext";

const schemaString = glob
  .sync(path.resolve(__dirname, "./**/*.graphql"))
  .map((filename) => {
    return readFileSync(filename).toString();
  })
  .join("\n");

export const schema = gql(schemaString);
const executableSchema = createExecutableSchema(schema);

export const graphqlEndpoint = new ApolloServer({
  schema: executableSchema,
  introspection: true,
  formatError: (err) => {
    if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
      console.error(
        red`There was an internal server error while handling a request:`
      );
      console.error(err.originalError);
    }
    return err;
  },
  context: async ({ req }) => {
    const con = await connection();
    const db = createDBContext(con);

    const sessionContext = await createSessionContext(
      req.headers?.authorization,
      req.headers["user-agent"],
      req.ip,
      db
    );

    return {
      db,
      ...sessionContext,
    } as ResolverContext;
  },
});
