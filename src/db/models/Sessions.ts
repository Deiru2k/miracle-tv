import db from 'miracle-tv/db';
import { DbUser } from 'miracle-tv/db/types';
import { Model } from 'miracle-tv/db/models';
import { Session, SessionResponse } from 'miracle-tv/types/graphql';
import { DateTime } from 'luxon';
import { head } from 'ramda'
import { ServerError } from 'miracle-tv/grpahql/errors/general';

export class SessionsModel extends Model {
  table = db.table('sessions')

  async createSession(userId: string): Promise<SessionResponse> {
    return await this.table.insert({
      user: userId,
      expiresAt: DateTime.now().plus({ days: 30 }).toLocal().toISO(),
    })
    .run(this.conn)
    .then(async (res) => {
      const key = head(res.generated_keys)
      const session = await this.getSessionById(key)
      if (session) {
        return { token: session.id, expiresAt: session.expiresAt }
      }
      throw new ServerError('Couldn\'t create session')
    })
  }

  async getSessionById(id: string): Promise<Session> {
    return await this.table.get(id).run(this.conn) as Session
  }

  async getUsers(filter?: Record<keyof DbUser, any>): Promise<Session[]> {
    return await this.table.filter(filter).coerceTo('array').run(this.conn) as Session[]
  }
}
