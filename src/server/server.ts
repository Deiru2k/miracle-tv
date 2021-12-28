import Express from "express";
import { graphqlEndpoint } from "miracle-tv-server/graphql";
import { setupDB } from "miracle-tv-server/db/setup-db";
import { graphqlUploadExpress } from "graphql-upload";
import config from "miracle-tv-server/config";
import { green } from "chalk";
import webhooks from "miracle-tv-server/webhooks";
import http from "http";
import { websocketEntry } from "./websocket";

const { pathPrefix, dataDir } = config;

const main = async () => {
  await setupDB();
  await graphqlEndpoint.start();
  const app = Express();
  app.use(Express.urlencoded());

  const prefix = pathPrefix ? `/${pathPrefix}/` : "/";
  app.set('trust proxy', true)
  app.use(Express.json());
  app.use(graphqlUploadExpress());
  app.use(`${prefix}media/`, Express.static(`${dataDir}/media`));
  app.use(`${prefix}streaming/`, Express.static(`${dataDir}/streaming/dash`));
  app.use(`${prefix}hook/`, webhooks);
  const graphqlPath = prefix + "graphql";
  graphqlEndpoint.applyMiddleware({ app, path: graphqlPath });
  const httpServer = http.createServer(app);
  websocketEntry(httpServer);
  httpServer.listen(
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
