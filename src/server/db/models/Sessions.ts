import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { SessionResponse } from "miracle-tv-shared/graphql";
import { DateTime } from "luxon";
import { head } from "ramda";
import { ServerError } from "miracle-tv-server/graphql/errors/general";
import { DbSession, DbUser } from "miracle-tv-server/db/models/types";

export class SessionsModel extends Model {
  table = db.table("sessions");

  async createSession(userId: string): Promise<SessionResponse> {
    return await this.table
      .insert({
        user: userId,
        expiresAt: DateTime.now().plus({ days: 30 }).toLocal().toISO(),
      })
      .run(this.conn)
      .then(async (res) => {
        console.log("RES", res);
        const key = head(res.generated_keys);
        const session = await this.getSessionById(key);
        if (session) {
          return { token: session.id, expiresAt: session.expiresAt };
        }
        throw new ServerError("Couldn't create session");
      });
  }

  async getSessionById(id: string): Promise<DbSession> {
    return (await this.table.get(id).run(this.conn)) as DbSession;
  }

  async getUsers(filter?: Record<keyof DbUser, any>): Promise<DbSession[]> {
    return (await this.table
      .filter(filter)
      .coerceTo("array")
      .run(this.conn)) as DbSession[];
  }
}
