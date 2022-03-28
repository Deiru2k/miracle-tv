import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import {
  PanelFilter,
  CreatePanelInput,
  QueryLimit,
  UpdatePanelInput,
} from "miracle-tv-shared/graphql";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
import { DbPanel } from "miracle-tv-server/db/models/types";

export class PanelsModel extends Model {
  table = db.table("panels");

  async createPanel<T extends object = DbPanel>(
    input: CreatePanelInput
  ): Promise<T> {
    const result = await this.table.insert(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't create a panel");
    }
    const key = head(result.generated_keys);
    return this.getPanelById<T>(key);
  }

  async updatePanel<T extends object = DbPanel>({
    id,
    ...input
  }: UpdatePanelInput): Promise<T> {
    const activity = await this.getPanelById(id);
    if (!activity) {
      throw new NotFoundError("Panel not found");
    }
    const result = await this.table.get(id).update(input).run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't update an activity");
    }
    return this.getPanelById<T>(id);
  }

  async deletePanel(id: string) {
    const activity = await this.getPanelById(id);
    if (!activity) {
      throw new NotFoundError("Panel not found");
    }
    const result = await this.table.get(id).delete().run(this.conn);
    if (result.errors > 0) {
      throw new ServerError("Coulnd't delete a panel");
    }
    return true;
  }

  async getPanelById<T extends object = DbPanel>(
    id: string
  ): Promise<T | null> {
    return (await this.table.get(id).run(this.conn)) as T;
  }

  panelsFilter(
    { ids, title, ...filter }: PanelFilter = {},
    limit?: QueryLimit
  ) {
    const query = ids ? this.table.getAll(...ids) : this.table;
    let filteredQuery = query
      .filter((doc: any) => {
        if (title) {
          return doc("name").downcase().match(title.toLowerCase());
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

  async getPanels<T extends object = DbPanel>(
    filter?: PanelFilter,
    limit?: QueryLimit
  ): Promise<T[]> {
    return (await this.panelsFilter(filter, limit)
      .coerceTo("array")
      .run(this.conn)) as T[];
  }

  async getPanelsCount(
    filter?: PanelFilter,
    limit?: QueryLimit
  ): Promise<number> {
    return (await this.panelsFilter(filter, limit)
      .count()
      .run(this.conn)) as number;
  }
}
