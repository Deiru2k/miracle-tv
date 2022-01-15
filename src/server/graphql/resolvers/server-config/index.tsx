import config from "miracle-tv-server/config";
import { ResolverContext } from "miracle-tv-server/types/resolver";
import { QueryResolvers } from "miracle-tv-shared/graphql";

export const serverConfigQueryResolvers: QueryResolvers<ResolverContext> = {
  serverConfig() {
    return {
      omeEnabled: config.omeEnabled,
      publishURL: config.publishUrl,
    };
  },
};
