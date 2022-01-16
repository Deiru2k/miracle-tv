import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { File } from "miracle-tv-shared/graphql";
import { ServerError } from "miracle-tv-server/graphql/errors/general";
import { DbFile } from "miracle-tv-server/db/models/types";

export class FilesModel extends Model {
  table = db.table("files");

  async createFile<T extends object = DbFile>(input: File): Promise<T> {
    return await this.table
      .insert(input)
      .run(this.conn)
      .then(async (_) => {
        const file = await this.getFileById(input.id);
        if (file) {
          return file;
        }
        throw new ServerError("Couldn't create file");
      });
  }

  async getFileById<T extends object = DbFile>(id: string): Promise<T> {
    return this.table.get(id).run(this.conn) as Promise<T>;
  }
}
