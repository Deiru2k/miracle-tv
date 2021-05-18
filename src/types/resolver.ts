import { SessionsModel } from "miracle-tv/db/models/Sessions"
import { UsersModel } from "miracle-tv/db/models/Users"
import { DbSession, DbUser } from "miracle-tv/db/types"
import { Operation } from "rethinkdb"

export type DbRunFn = <T>(request: Operation<T>) => Promise<T>

export type ResolverContext = {
  session: DbSession
  user: DbUser
  db: {
    users: UsersModel,
    sessions: SessionsModel,
  }
}
