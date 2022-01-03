import { ActivitiesModel } from "miracle-tv-server/db/models/Activities";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { RolesModel } from "miracle-tv-server/db/models/Roles";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { Role } from "miracle-tv-shared/graphql";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import { Operation } from "rethinkdb";
import { FilesModel } from "miracle-tv-server/db/models/Files";
import { DbSession, DbUser } from "miracle-tv-server/db/models/types";
import { UserSettingsModel } from "miracle-tv-server/db/models/UserSettings";
import { ChannelStatusModel } from "miracle-tv-server/db/models/ChannelStatus";
import { SubscriptionsModel } from "miracle-tv-server/db/models/Subscriptions";

export type DbRunFn = <T>(request: Operation<T>) => Promise<T>;

export type ResolverContext = {
  session: DbSession;
  user: DbUser;
  userRoles?: Role[];
  db: {
    users: UsersModel;
    userSettings: UserSettingsModel;
    sessions: SessionsModel;
    channelStatus: ChannelStatusModel;
    channels: ChanelsModel;
    streamKeys: StreamKeysModel;
    subscriptions: SubscriptionsModel;
    activities: ActivitiesModel;
    roles: RolesModel;
    files: FilesModel;
  };
};
