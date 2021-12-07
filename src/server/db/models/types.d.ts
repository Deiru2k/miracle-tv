import {
  User,
  Activity,
  Channel,
  File,
  Role,
  Session,
} from "miracle-tv-shared/graphql";

export type DbUser = {
  channels: [string];
  roles: [string];
  avatar: string;
  header: string;
  streamThumbnail: string;
  email: string;
  password: string;
} & Omit<User, "channels" | "roles" | "avatar" | "header" | "streamThumbnail">;

export type DbUserSettings = {
  id: string;
  useGravatar?: boolean;
  singleUserMode?: boolean;
};

export type DbUserSafe = Omit<DbUser, "password">;

export type DbRole = Role;

export type DbActivity = Activity;

export type DbChannel = {
  activityId: string;
  userId: string;
} & Omit<Channel, "activity", "user">;

export type DbFile = File;

export type DbSession = {
  expiresAt: string;
} & Omit<Session, "expiresAt">;

export type DbStreamKey = {
  channelId: string;
} & Omit<StreamKey, "channel">;
