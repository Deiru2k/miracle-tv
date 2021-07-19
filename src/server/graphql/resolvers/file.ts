import { ResolverContext } from "miracle-tv-server/types/resolver";
import { QueryResolvers } from "miracle-tv-shared/graphql";

export const fileResolvers: QueryResolvers<ResolverContext> = {
  async fileInfo(_, { id }, { db: { files } }) {
    return await files.getFileById(id);
  },
};
