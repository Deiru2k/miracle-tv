import { ActivitiesModel } from "miracle-tv-server/db/models/Activities";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { RolesModel } from "miracle-tv-server/db/models/Roles";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { DbSession, DbUser } from "miracle-tv-server/db/types";
import { Role } from "miracle-tv-shared/graphql";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import { Operation } from "rethinkdb";
import { FilesModel } from "miracle-tv-server/db/models/Files";

export type DbRunFn = <T>(request: Operation<T>) => Promise<T>;

export type ResolverContext = {
  session: DbSession;
  user: DbUser;
  userRoles?: Role[];
  db: {
    users: UsersModel;
    sessions: SessionsModel;
    channels: ChanelsModel;
    streamKeys: StreamKeysModel;
    activities: ActivitiesModel;
    roles: RolesModel;
    files: FilesModel;
  };
};
