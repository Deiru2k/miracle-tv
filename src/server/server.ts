import Express from "express";
import { graphqlEndpoint } from "miracle-tv-server/graphql";
import { setupDB } from "miracle-tv-server/db/setup-db";
import { graphqlUploadExpress } from "graphql-upload";
import config from "miracle-tv-server/config";
import { green } from "chalk";


// app.get("/", (_, res) => res.send("FUCK!"));
// app.use(graphqlUploadExpress());

// graphqlEndpoint.applyMiddleware({ app });

const main = async () => {
  await setupDB();
  await graphqlEndpoint.start();
  const app = Express();
  app.use(graphqlUploadExpress());
  app.use("/media/", Express.static(`${config.dataDir}/media`));
  graphqlEndpoint.applyMiddleware({ app });
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
        }/graphql`
      );
    }
  );
};

main();
