import db from "miracle-tv-server/db";
import { Model } from "miracle-tv-server/db/models";
import { SessionResponse } from "miracle-tv-shared/graphql";
import { DateTime } from "luxon";
import { head } from "ramda";
import {
  NotFoundError,
  ServerError,
} from "miracle-tv-server/graphql/errors/general";
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
        const key = head(res.generated_keys);
        const session = await this.getSessionById(key);
        if (session) {
          return { token: session.id, expiresAt: session.expiresAt };
        }
        throw new ServerError("Couldn't create session");
      });
  }

  async getSessionsByUserId(userId: string): Promise<DbSession[]> {
    return await this.table
      .filter({ user: userId })
      .coerceTo("array")
      .run(this.conn);
  }

  async getSessionById(id: string): Promise<DbSession> {
    return (await this.table.get(id).run(this.conn)) as DbSession;
  }

  async revokeAllSessionsByUserId(userId: string): Promise<boolean> {
    const { errors } = await this.table
      .filter({ user: userId })
      .delete()
      .run(this.conn);
    if (errors) {
      throw new ServerError("Couldn't revoke sessions");
    }
    return true;
  }

  async getSessionsByIds(ids: string[]): Promise<DbSession[]> {
    return (await this.table
      .getAll(...ids)
      .coerceTo("array")
      .run(this.conn)) as DbSession[];
  }

  async revokeAllSessionsBySessionIds(ids: string[]): Promise<boolean> {
    const { errors } = await this.table
      .getAll(...ids)
      .delete()
      .run(this.conn);
    if (errors) {
      throw new ServerError("Couldn't revoke sessions");
    }
    return true;
  }

  async updateSessionInfo(
    id: string,
    ip: string,
    userAgent: string
  ): Promise<boolean> {
    const session = await this.getSessionById(id);
    if (!session) {
      throw new NotFoundError("Session not found");
    }
    await this.table
      .get(id)
      .update({
        lastUsedAt: DateTime.now().toISO(),
        userAgent,
        ip,
      })
      .run(this.conn);
    return true;
  }
}
