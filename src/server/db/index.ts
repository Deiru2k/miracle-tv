import rethinkdb, { Connection } from "rethinkdb";
import config from "miracle-tv-server/config";
import { DBContext } from "miracle-tv-server/types/resolver";

import { UserSettingsModel } from "miracle-tv-server/db/models/UserSettings";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import { ActivitiesModel } from "miracle-tv-server/db/models/Activities";
import { RolesModel } from "miracle-tv-server/db/models/Roles";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import { FilesModel } from "miracle-tv-server/db/models/Files";
import { ChannelStatusModel } from "miracle-tv-server/db/models/ChannelStatus";
import { SubscriptionsModel } from "miracle-tv-server/db/models/Subscriptions";
import { SystemModel } from "miracle-tv-server/db/models/System";
import { ChannelAccessKeysModel } from "miracle-tv-server/db/models/ChannelAccesKeys";
import { PanelsModel } from "miracle-tv-server/db/models/Panels";

const db = rethinkdb.db(config.database?.db || "miracle-tv");

export const createDBContext = (con: Connection): DBContext => ({
  system: new SystemModel(con),
  userSettings: new UserSettingsModel(con),
  sessions: new SessionsModel(con),
  users: new UsersModel(con),
  channels: new ChanelsModel(con),
  panels: new PanelsModel(con),
  channelStatus: new ChannelStatusModel(con),
  subscriptions: new SubscriptionsModel(con),
  activities: new ActivitiesModel(con),
  streamKeys: new StreamKeysModel(con),
  roles: new RolesModel(con),
  files: new FilesModel(con),
  channelAccessKeys: new ChannelAccessKeysModel(con),
});

export default db;
