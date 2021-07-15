import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  Activity,
  ActivityFilter,
  CreateActivityInput,
  UpdateActivityInput,
} from "miracle-tv-server/types/graphql";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";

export class ActivitiesModel extends Model {
  table = db.table("activities");

  async createActivity(input: CreateActivityInput): Promise<Activity> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't create an activity");
    }
    const key = head(result.generated_keys);
    return (await this.table.get(key).run(this.conn)) as Activity;
  }

  async updateActivity({
    id,
    ...input
  }: UpdateActivityInput): Promise<Activity> {
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

  async getActivityById(id: string): Promise<Activity | null> {
    return (await this.table.get(id).run(this.conn)) as Activity;
  }

  async getActivities(filter: ActivityFilter = {}): Promise<Activity[]> {
    return (await this.table
      .filter(filter)
      .coerceTo("array")
      .run(this.conn)) as Activity[];
  }
}
