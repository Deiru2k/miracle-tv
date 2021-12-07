import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  ActivityFilter,
  UpdateUserSettingsInput,
  UpdateActivityInput,
} from "miracle-tv-shared/graphql";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import { DbUserSettings } from "miracle-tv-server/db/models/types";

export class UserSettingsModel extends Model {
  table = db.table("user-settings");

  async createSettings(
    input: UpdateUserSettingsInput,
    userId: string
  ): Promise<DbUserSettings> {
    const result = await this.table
      .insert({ id: userId, ...input })
      .run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Couldn't create user settings");
    }
    return (await this.table.get(userId).run(this.conn)) as DbUserSettings;
  }

  async updateSettings(
    input: UpdateUserSettingsInput,
    userId: string
  ): Promise<DbUserSettings> {
    const settings = await this.getRawUserSettingsById(userId);

    if (settings) {
      const { errors } = await this.table
        .get(userId)
        .update(input)
        .run(this.conn);
      if (errors) {
        throw new ServerError("Couldn't update settings");
      }
      return { id: userId, ...settings, ...input };
    } else {
      return await this.createSettings(input, userId);
    }
  }

  async getUserSettingsById(id: string): Promise<DbUserSettings> {
    const dbSettings = await this.getRawUserSettingsById(id);
    return (
      dbSettings || {
        id,
        useGravatar: false,
        singleUserMode: false,
      }
    );
  }

  async getRawUserSettingsById(id: string): Promise<DbUserSettings | null> {
    return (await this.table.get(id).run(this.conn)) as DbUserSettings;
  }
}
