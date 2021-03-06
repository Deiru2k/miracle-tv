import {
  User,
  Activity,
  Channel,
  File,
  Role,
  Session,
  ChannelStatus,
} from "miracle-tv-shared/graphql";

export type DbUser = {
  channels: string[];
  roles: string[];
  avatar: string;
  header: string;
  streamThumbnail: string;
  email: string;
  password: string;
  silenced?: boolean;
  suspended?: boolean;
  loginDisabled?: boolean;
  deleted?: boolean;
} & Omit<User, "channels" | "roles" | "avatar" | "header" | "streamThumbnail">;

export type DbUserSettings = {
  id: string;
  useGravatar?: boolean;
  singleUserMode?: boolean;
  singleUserChannel?: string;
};

export type DbUserSafe = Omit<DbUser, "password">;

export type DbRole = Role;

export type DbActivity = Activity;

export type DbChannel = Omit<Channel, "activity" | "user"> & {
  activityId: string;
  userId: string;
  disabled: boolean;
  shelved: boolean;
  password?: string;
};

export type DbFile = File;

export type DbSession = {
  expiresAt: string;
} & Omit<Session, "expiresAt">;

export type DbStreamKey = {
  channelId: string;
} & Omit<StreamKey, "channel">;

export type DbChannelStatus = Omit<ChannelStatus, "viewers" | "length">;
