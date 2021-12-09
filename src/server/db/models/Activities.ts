import db from "miracle-tv-server/db";
import * as r from "rethinkdb";
import { Model } from "miracle-tv-server/db/models";
import {
  ActivityFilter,
  ActivityLimit,
  CreateActivityInput,
  UpdateActivityInput,
} from "miracle-tv-shared/graphql";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import { DbActivity } from "miracle-tv-server/db/models/types";

export class ActivitiesModel extends Model {
  table = db.table("activities");

  async createActivity(input: CreateActivityInput): Promise<DbActivity> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't create an activity");
    }
    const key = head(result.generated_keys);
    return (await this.table.get(key).run(this.conn)) as DbActivity;
  }

  async updateActivity({
    id,
    ...input
  }: UpdateActivityInput): Promise<DbActivity> {
    const activity = await this.getActivityById(id);
    if (!activity) {
      throw new NotFoundError("Activity not found");
    }
    const result = await this.table.get(id).update(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't update an activity");
    }
    return { id, ...input };
  }

  async getActivityById(id: string): Promise<DbActivity | null> {
    return (await this.table.get(id).run(this.conn)) as DbActivity;
  }

  async getActivities(
    { ids, name, ...filter }: ActivityFilter = {},
    limit?: ActivityLimit
  ): Promise<DbActivity[]> {
    const query = ids ? this.table.getAll(...ids) : this.table;
    let filteredQuery = query
      .filter((doc: any) => {
        if (name) {
          return doc("name").downcase().match(name.toLowerCase());
        }
        return true;
      })
      .filter(filter);

    if (limit?.skip) {
      filteredQuery = filteredQuery.skip(limit.skip);
    }
    if (limit?.limit) {
      filteredQuery = filteredQuery.limit(limit.limit);
    }

    return (await filteredQuery
      .coerceTo("array")
      .run(this.conn)) as DbActivity[];
  }
}
