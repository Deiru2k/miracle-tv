import { Operation } from "rethinkdb";

import { DbSession, DbUser } from "miracle-tv-server/db/models/types";

import { SystemModel } from "miracle-tv-server/db/models/System";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { UserSettingsModel } from "miracle-tv-server/db/models/UserSettings";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { ChannelStatusModel } from "miracle-tv-server/db/models/ChannelStatus";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import { SubscriptionsModel } from "miracle-tv-server/db/models/Subscriptions";
import { ActivitiesModel } from "miracle-tv-server/db/models/Activities";
import { RolesModel } from "miracle-tv-server/db/models/Roles";
import { Role } from "miracle-tv-shared/graphql";
import { FilesModel } from "miracle-tv-server/db/models/Files";
import { ChannelAccessKeysModel } from "miracle-tv-server/db/models/ChannelAccesKeys";
import { PanelsModel } from "miracle-tv-server/db/models/Panels";

export type DbRunFn = <T>(request: Operation<T>) => Promise<T>;

export type DBContext = {
  system: SystemModel;
  users: UsersModel;
  userSettings: UserSettingsModel;
  sessions: SessionsModel;
  channelStatus: ChannelStatusModel;
  channelAccessKeys: ChannelAccessKeysModel;
  channels: ChanelsModel;
  streamKeys: StreamKeysModel;
  subscriptions: SubscriptionsModel;
  activities: ActivitiesModel;
  panels: PanelsModel;
  roles: RolesModel;
  files: FilesModel;
};

export type ResolverContext = {
  session: DbSession;
  user: DbUser;
  userRoles?: Role[];
  db: DBContext;
};
