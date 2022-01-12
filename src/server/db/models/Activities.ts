import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  ActivityFilter,
  CreateActivityInput,
  QueryLimit,
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

  async createActivity<T extends object = DbActivity>(
    input: CreateActivityInput
  ): Promise<T> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't create an activity");
    }
    const key = head(result.generated_keys);
    return this.getActivityById<T>(key);
  }

  async updateActivity<T extends object = DbActivity>({
    id,
    ...input
  }: UpdateActivityInput): Promise<T> {
    const activity = await this.getActivityById(id);
    if (!activity) {
      throw new NotFoundError("Activity not found");
    }
    const result = await this.table.get(id).update(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't update an activity");
    }
    return this.getActivityById<T>(id);
  }

  async deleteActivity(id: string) {
    const activity = await this.getActivityById(id);
    if (!activity) {
      throw new NotFoundError("Activity not found");
    }
    const result = await this.table.get(id).delete().run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't delete an activity");
    }
    return true;
  }

  async getActivityById<T extends object = DbActivity>(
    id: string
  ): Promise<T | null> {
    return (await this.table.get(id).run(this.conn)) as T;
  }

  activtiesFilter(
    { ids, name, ...filter }: ActivityFilter = {},
    limit?: QueryLimit
  ) {
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

    return filteredQuery;
  }

  async getActivities<T extends object = DbActivity>(
    filter?: ActivityFilter,
    limit?: QueryLimit
  ): Promise<T[]> {
    return (await this.activtiesFilter(filter, limit)
      .coerceTo("array")
      .run(this.conn)) as T[];
  }

  async getActivitiesCount(
    filter?: ActivityFilter,
    limit?: QueryLimit
  ): Promise<number> {
    return (await this.activtiesFilter(filter, limit)
      .count()
      .run(this.conn)) as number;
  }
}
