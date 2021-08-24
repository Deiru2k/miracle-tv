import Express from "express";
import { graphqlEndpoint } from "miracle-tv-server/graphql";
import { setupDB } from "miracle-tv-server/db/setup-db";
import { graphqlUploadExpress } from "graphql-upload";
import config from "miracle-tv-server/config";
import { green } from "chalk";

const { pathPrefix, dataDir } = config;
// app.get("/", (_, res) => res.send("FUCK!"));
// app.use(graphqlUploadExpress());

// graphqlEndpoint.applyMiddleware({ app });

const main = async () => {
  await setupDB();
  await graphqlEndpoint.start();
  const app = Express();
  const prefix = pathPrefix ? `/${pathPrefix}/` : '/'
  app.use(graphqlUploadExpress());
  app.use(`${prefix}media/`, Express.static(`${dataDir}/media`));
  const graphqlPath = prefix + 'graphql'
  graphqlEndpoint.applyMiddleware({ app, path: prefix + 'graphql' });
  app.listen(
    config.server?.port || 4000,
    config.server?.hostname || "0.0.0.0",
    () => {
      console.info(
        green`Server started on ${config.server?.hostname || "0.0.0.0"}:${
          config.server?.port || 4000
        }`
      );
      console.info(
        `Playground: http://${config.domain || "localhost"}:${
          config.server?.port || 4000
        }${prefix}graphql`
      );
    }
  );
};

main();
