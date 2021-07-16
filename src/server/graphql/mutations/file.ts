import { FileUpload } from "graphql-upload";
import path from "path";
import fs from "fs";
import { MutationResolvers } from "miracle-tv-shared/graphql";
import config from "miracle-tv-server/config";

import { v4 as uuidv4 } from "uuid";
import { last } from "ramda";
import { ResolverContext } from "miracle-tv-server/types/resolver";

const currentDir = process.cwd();

type FileMutations = Pick<MutationResolvers<ResolverContext>, "uploadFile">;
export const fileMutations: FileMutations = {
  async uploadFile(
    _,
    { file }: { file: Promise<FileUpload> },
    { db: { files } }
  ) {
    const id = uuidv4();
    const { createReadStream, encoding, mimetype, filename } = await file;
    const saveDir = path.join(config.dataDir || currentDir, "/media");

    const filenameSplit = filename.split(".");
    const extension = filenameSplit.length > 1 ? `.${last(filenameSplit)}` : "";
    const newFilename = `${id}${extension}`;

    const stream = createReadStream();
    const out = fs.createWriteStream(path.join(saveDir, newFilename));
    stream.pipe(out);

    const response = await files.createFile({
      id,
      encoding,
      mimetype,
      filename: newFilename,
    });
    return response;
  },
};
