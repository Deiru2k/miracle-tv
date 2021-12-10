import { ResolverContext } from "miracle-tv-server/types/resolver";
import {
  Maybe,
  QueryResolvers,
  Resolver,
  ResolversTypes,
} from "miracle-tv-shared/graphql";

export const fileResolvers: QueryResolvers<ResolverContext> = {
  async fileInfo(_, { id }, { db: { files } }) {
    return await files.getFileById(id);
  },
};

type FileResolver = (
  field: string
) => Resolver<Maybe<ResolversTypes["File"]>, any, ResolverContext>;

export const fileResolver: FileResolver =
  (field) =>
  async (record: any, _: any, { db: { files } }: ResolverContext) => {
    return record[field as keyof typeof record]
      ? await files.getFileById(record[field as keyof typeof record])
      : null;
  };
