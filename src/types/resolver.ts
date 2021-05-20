import { ActivitiesModel } from "miracle-tv/db/models/Activities";
import { ChanelsModel } from "miracle-tv/db/models/Channels";
import { SessionsModel } from "miracle-tv/db/models/Sessions";
import { RolesModel } from "miracle-tv/db/models/Roles";
import { UsersModel } from "miracle-tv/db/models/Users";
import { DbSession, DbUser } from "miracle-tv/db/types";
import { Role } from "miracle-tv/types/graphql";
import { Operation } from "rethinkdb";

export type DbRunFn = <T>(request: Operation<T>) => Promise<T>;

export type ResolverContext = {
  session: DbSession;
  user: DbUser;
  userRoles?: Role[];
  db: {
    users: UsersModel;
    sessions: SessionsModel;
    channels: ChanelsModel;
    activities: ActivitiesModel;
    roles: RolesModel;
  };
};
