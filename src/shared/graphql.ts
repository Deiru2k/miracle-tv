import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccessRights = {
  __typename?: "AccessRights";
  activities?: Maybe<Array<Maybe<AccessUnit>>>;
  channels?: Maybe<Array<Maybe<AccessUnit>>>;
  roles?: Maybe<Array<Maybe<AccessUnit>>>;
  streamKeys?: Maybe<Array<Maybe<AccessUnit>>>;
  system?: Maybe<Array<Maybe<AccessUnit>>>;
  userSettings?: Maybe<Array<Maybe<AccessUnit>>>;
  users?: Maybe<Array<Maybe<AccessUnit>>>;
};

export type AccessRightsInput = {
  activities?: InputMaybe<Array<InputMaybe<AccessUnit>>>;
  channels?: InputMaybe<Array<InputMaybe<AccessUnit>>>;
  roles?: InputMaybe<Array<InputMaybe<AccessUnit>>>;
  streamKeys?: InputMaybe<Array<InputMaybe<AccessUnit>>>;
  userSettings?: InputMaybe<Array<InputMaybe<AccessUnit>>>;
  users?: InputMaybe<Array<InputMaybe<AccessUnit>>>;
};

export type AccessTargetInput = {
  actions: ActionsInput;
  rights: AccessRightsInput;
};

export type AccessTargets = {
  __typename?: "AccessTargets";
  actions: Actions;
  rights: AccessRights;
};

export enum AccessUnit {
  Deny = "DENY",
  Inherit = "INHERIT",
  Read = "READ",
  Self = "SELF",
  Write = "WRITE",
}

export type Actions = {
  __typename?: "Actions";
  user?: Maybe<UserActions>;
};

export type ActionsInput = {
  user?: InputMaybe<UserActionsInput>;
};

export type Activity = {
  __typename?: "Activity";
  icon?: Maybe<File>;
  id: Scalars["ID"];
  image?: Maybe<File>;
  name: Scalars["String"];
  verb?: Maybe<Scalars["String"]>;
};

export type ActivityFilter = {
  ids?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  verb?: InputMaybe<Scalars["String"]>;
};

export type ActivityLimit = {
  limit?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type AuthRightConfig = {
  subject: Scalars["String"];
  unit: AccessUnit;
};

export type ChangePasswordInput = {
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type Channel = {
  __typename?: "Channel";
  activity?: Maybe<Activity>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  meta?: Maybe<ChannelMeta>;
  name: Scalars["String"];
  slug?: Maybe<Scalars["String"]>;
  status?: Maybe<ChannelStatus>;
  thumbnail?: Maybe<File>;
  user?: Maybe<User>;
};

export type ChannelMeta = {
  __typename?: "ChannelMeta";
  subscriberCount: Scalars["Int"];
};

export type ChannelStatus = {
  __typename?: "ChannelStatus";
  id?: Maybe<Scalars["ID"]>;
  isLive?: Maybe<Scalars["Boolean"]>;
  length?: Maybe<Scalars["Int"]>;
  viewers?: Maybe<Scalars["Int"]>;
};

export type ChannelsQueryFilter = {
  activityId?: InputMaybe<Scalars["ID"]>;
  activityIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["ID"]>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type CreateActivityInput = {
  icon?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  verb?: InputMaybe<Scalars["String"]>;
};

export type CreateChannelInput = {
  activityId?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  slug?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  userId?: InputMaybe<Scalars["ID"]>;
};

export type CreateRoleInput = {
  access: AccessTargetInput;
  id: Scalars["ID"];
  name: Scalars["String"];
  parentId?: InputMaybe<Scalars["ID"]>;
};

export type CreateStreamKeyInput = {
  channelId: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  userId: Scalars["ID"];
};

export type CreateUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type File = {
  __typename?: "File";
  encoding: Scalars["String"];
  filename: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  mimetype: Scalars["String"];
};

export type FullUser = {
  __typename?: "FullUser";
  avatar?: Maybe<File>;
  bio?: Maybe<Scalars["String"]>;
  channels: Array<Maybe<Channel>>;
  deleted?: Maybe<Scalars["Boolean"]>;
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  header?: Maybe<File>;
  id?: Maybe<Scalars["ID"]>;
  loginDisabled?: Maybe<Scalars["Boolean"]>;
  meta?: Maybe<UserMeta>;
  roles: Array<Maybe<Role>>;
  settings?: Maybe<UserSettings>;
  silenced?: Maybe<Scalars["Boolean"]>;
  streamThumbnail?: Maybe<File>;
  suspended?: Maybe<Scalars["Boolean"]>;
  username: Scalars["String"];
};

export type FullUsersFilter = {
  deleted?: InputMaybe<Scalars["Boolean"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  loginDisabled?: InputMaybe<Scalars["Boolean"]>;
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  silenced?: InputMaybe<Scalars["Boolean"]>;
  suspended?: InputMaybe<Scalars["Boolean"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type InfoResponse = {
  __typename?: "InfoResponse";
  name: Scalars["String"];
  packageName: Scalars["String"];
  version: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  bulkDeleteRoles: Scalars["Boolean"];
  changeSelfPassword?: Maybe<Scalars["Boolean"]>;
  createActivity: Activity;
  createChannel: Channel;
  createRole: Role;
  createStreamKey: StreamKey;
  deleteActivity: Scalars["Boolean"];
  deleteChannel: Scalars["Boolean"];
  deleteFullUser: FullUser;
  deleteFullUsers: Array<Maybe<FullUser>>;
  deleteRole: Scalars["Boolean"];
  disableFullUserLogin: FullUser;
  disableFullUsersLogin: Array<Maybe<FullUser>>;
  enableFullUserLogin: FullUser;
  enableFullUsersLogin: Array<Maybe<FullUser>>;
  ping: Scalars["String"];
  resetUserPassword?: Maybe<ResetUserPasswordReturn>;
  restoreFullUser: FullUser;
  restoreFullUsers: Array<Maybe<FullUser>>;
  revokeAllStreamKeys: Scalars["Boolean"];
  revokeSelfSessions?: Maybe<Scalars["Boolean"]>;
  revokeStreamKey: Scalars["Boolean"];
  revokeStreamKeys: Scalars["Boolean"];
  signIn?: Maybe<SessionResponse>;
  signUp: User;
  silenceFullUser: FullUser;
  silenceFullUsers: Array<Maybe<FullUser>>;
  subscribe: Subscription;
  suspendFullUser: FullUser;
  suspendFullUsers: Array<Maybe<FullUser>>;
  unsilenceFullUser: FullUser;
  unsilenceFullUsers: Array<Maybe<FullUser>>;
  unsubscribe: Scalars["Boolean"];
  unsuspendFullUser: FullUser;
  unsuspendFullUsers: Array<Maybe<FullUser>>;
  updateActivity: Activity;
  updateChannel: Channel;
  updateFullUser: FullUser;
  updateRole: Role;
  updateSelf?: Maybe<User>;
  updateSelfAccount?: Maybe<UserAccountDetails>;
  updateUserSettings?: Maybe<UserSettings>;
  uploadFile: File;
};

export type MutationBulkDeleteRolesArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationChangeSelfPasswordArgs = {
  input?: InputMaybe<ChangePasswordInput>;
};

export type MutationCreateActivityArgs = {
  input?: InputMaybe<CreateActivityInput>;
};

export type MutationCreateChannelArgs = {
  input?: InputMaybe<CreateChannelInput>;
};

export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};

export type MutationCreateStreamKeyArgs = {
  input: CreateStreamKeyInput;
};

export type MutationDeleteActivityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChannelArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFullUserArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFullUsersArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationDeleteRoleArgs = {
  id: Scalars["ID"];
};

export type MutationDisableFullUserLoginArgs = {
  id: Scalars["ID"];
};

export type MutationDisableFullUsersLoginArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationEnableFullUserLoginArgs = {
  id: Scalars["ID"];
};

export type MutationEnableFullUsersLoginArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationResetUserPasswordArgs = {
  id: Scalars["ID"];
  input: ResetUserPasswordInput;
};

export type MutationRestoreFullUserArgs = {
  id: Scalars["ID"];
};

export type MutationRestoreFullUsersArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationRevokeAllStreamKeysArgs = {
  input: RevokeAllStreamKeysInput;
};

export type MutationRevokeSelfSessionsArgs = {
  input: Array<InputMaybe<Scalars["String"]>>;
};

export type MutationRevokeStreamKeyArgs = {
  key: Scalars["ID"];
};

export type MutationRevokeStreamKeysArgs = {
  input: RevokeStreamKeysInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignUpArgs = {
  input: CreateUserInput;
};

export type MutationSilenceFullUserArgs = {
  id: Scalars["ID"];
};

export type MutationSilenceFullUsersArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationSubscribeArgs = {
  input: SubscriptionInput;
};

export type MutationSuspendFullUserArgs = {
  id: Scalars["ID"];
};

export type MutationSuspendFullUsersArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationUnsilenceFullUserArgs = {
  id: Scalars["ID"];
};

export type MutationUnsilenceFullUsersArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationUnsubscribeArgs = {
  input: SubscriptionInput;
};

export type MutationUnsuspendFullUserArgs = {
  id: Scalars["ID"];
};

export type MutationUnsuspendFullUsersArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type MutationUpdateActivityArgs = {
  input?: InputMaybe<UpdateActivityInput>;
};

export type MutationUpdateChannelArgs = {
  input?: InputMaybe<UpdateChannelInput>;
};

export type MutationUpdateFullUserArgs = {
  input?: InputMaybe<UpdateFullUserInput>;
};

export type MutationUpdateRoleArgs = {
  input?: InputMaybe<UpdateRoleInput>;
};

export type MutationUpdateSelfArgs = {
  input: UpdateSelfInput;
};

export type MutationUpdateSelfAccountArgs = {
  input?: InputMaybe<UpdateUserAccountInput>;
};

export type MutationUpdateUserSettingsArgs = {
  input: UpdateUserSettingsInput;
};

export type MutationUploadFileArgs = {
  file: Scalars["Upload"];
};

export enum PasswordResetMethod {
  Echo = "ECHO",
  Email = "EMAIL",
}

export enum PasswordResetStatus {
  FaIl = "FAIl",
  Success = "SUCCESS",
}

export type Query = {
  __typename?: "Query";
  activities: Array<Maybe<Activity>>;
  activitiesCount: Scalars["Int"];
  activity?: Maybe<Activity>;
  channel?: Maybe<Channel>;
  channelStatus?: Maybe<ChannelStatus>;
  channelSubscriptions: Array<Maybe<Channel>>;
  channels: Array<Maybe<Channel>>;
  channelsCount: Scalars["Int"];
  fileInfo?: Maybe<File>;
  fullChannels: Array<Maybe<Channel>>;
  fullChannelsCount: Scalars["Int"];
  fullUser?: Maybe<FullUser>;
  fullUserCount?: Maybe<Scalars["Int"]>;
  fullUsers: Array<Maybe<FullUser>>;
  info: InfoResponse;
  role?: Maybe<Role>;
  roles: Array<Maybe<Role>>;
  self: User;
  selfAccount: UserAccountDetails;
  selfChannels: Array<Maybe<Channel>>;
  selfSessions?: Maybe<Array<Maybe<Session>>>;
  selfStreamKeys: Array<Maybe<StreamKey>>;
  selfSubscribedChannels: Array<Maybe<Channel>>;
  selfSubscribedUsers: Array<Maybe<User>>;
  selfSubscriptions: Array<Maybe<Subscription>>;
  streamKeys: Array<Maybe<StreamKey>>;
  streamKeysByChannelId: Array<Maybe<StreamKey>>;
  subscription?: Maybe<Subscription>;
  systemLoad: SystemLoadInfo;
  test: TestResponse;
  user?: Maybe<User>;
  userDirectory: Array<Maybe<User>>;
  userSettings: UserSettings;
  userStats: UserStatsInfo;
  users: Array<Maybe<User>>;
};

export type QueryActivitiesArgs = {
  filter?: InputMaybe<ActivityFilter>;
  limit?: InputMaybe<ActivityLimit>;
};

export type QueryActivitiesCountArgs = {
  filter?: InputMaybe<ActivityFilter>;
};

export type QueryActivityArgs = {
  id: Scalars["ID"];
};

export type QueryChannelArgs = {
  id: Scalars["ID"];
};

export type QueryChannelStatusArgs = {
  id: Scalars["ID"];
};

export type QueryChannelSubscriptionsArgs = {
  filter?: InputMaybe<ChannelsQueryFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QueryChannelsArgs = {
  filter?: InputMaybe<ChannelsQueryFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QueryChannelsCountArgs = {
  filter?: InputMaybe<ChannelsQueryFilter>;
};

export type QueryFileInfoArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFullChannelsArgs = {
  filter?: InputMaybe<ChannelsQueryFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QueryFullChannelsCountArgs = {
  filter?: InputMaybe<ChannelsQueryFilter>;
};

export type QueryFullUserArgs = {
  id: Scalars["ID"];
};

export type QueryFullUserCountArgs = {
  filter?: InputMaybe<FullUsersFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QueryFullUsersArgs = {
  filter?: InputMaybe<FullUsersFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
};

export type QueryRolesArgs = {
  filter?: InputMaybe<RolesFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QuerySelfChannelsArgs = {
  filter?: InputMaybe<ChannelsQueryFilter>;
};

export type QueryStreamKeysByChannelIdArgs = {
  channelId: Scalars["ID"];
};

export type QuerySubscriptionArgs = {
  input?: InputMaybe<SubscriptionByTargetId>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUserDirectoryArgs = {
  limit?: InputMaybe<QueryLimit>;
};

export type QueryUsersArgs = {
  filter?: InputMaybe<UsersFilter>;
  limit?: InputMaybe<QueryLimit>;
};

export type QueryLimit = {
  limit?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type ResetUserPasswordInput = {
  method: PasswordResetMethod;
};

export type ResetUserPasswordReturn = {
  __typename?: "ResetUserPasswordReturn";
  data?: Maybe<Scalars["String"]>;
  status?: Maybe<PasswordResetStatus>;
};

export type RevokeAllStreamKeysInput = {
  userId: Scalars["ID"];
};

export type RevokeStreamKeysInput = {
  channelId: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  userId: Scalars["ID"];
};

export type Role = {
  __typename?: "Role";
  access: AccessTargets;
  id: Scalars["ID"];
  name: Scalars["String"];
  parentId?: Maybe<Scalars["ID"]>;
};

export type RolesFilter = {
  id?: InputMaybe<Scalars["ID"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  parentId?: InputMaybe<Scalars["ID"]>;
};

export type Session = {
  __typename?: "Session";
  expiresAt: Scalars["DateTime"];
  id: Scalars["ID"];
  ip: Scalars["String"];
  isCurrentSession: Scalars["Boolean"];
  lastUsedAt: Scalars["DateTime"];
  user: Scalars["ID"];
  userAgent: Scalars["String"];
};

export type SessionResponse = {
  __typename?: "SessionResponse";
  expiresAt: Scalars["DateTime"];
  token: Scalars["ID"];
};

export type SignInInput = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type StreamKey = {
  __typename?: "StreamKey";
  channel: Channel;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  user: User;
};

export type Subscription = {
  __typename?: "Subscription";
  id: Scalars["ID"];
  sourceId: Scalars["ID"];
  target: SubscriptionTarget;
  targetId: Scalars["ID"];
};

export type SubscriptionByTargetId = {
  target: SubscriptionTarget;
  targetId: Scalars["ID"];
};

export type SubscriptionInput = {
  target: SubscriptionTarget;
  targetId: Scalars["ID"];
};

export enum SubscriptionTarget {
  Channel = "CHANNEL",
  User = "USER",
}

export type SubscriptionsFilter = {
  sourceId?: InputMaybe<Scalars["ID"]>;
  target?: InputMaybe<SubscriptionTarget>;
  targetId?: InputMaybe<Scalars["ID"]>;
};

export type SystemLoadInfo = {
  __typename?: "SystemLoadInfo";
  cpuPercentage: Scalars["Float"];
  dbSize: Scalars["Float"];
  drivePercentage: Scalars["Float"];
  mediaDirSize: Scalars["Float"];
  memPercentage: Scalars["Float"];
  networkDown: Scalars["Float"];
  networkUp: Scalars["Float"];
  totalDrive: Scalars["Float"];
  totalMem: Scalars["Float"];
  usedDrive: Scalars["Float"];
  usedMem: Scalars["Float"];
};

export type TestResponse = {
  __typename?: "TestResponse";
  secret: Scalars["String"];
};

export type UpdateActivityInput = {
  icon?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  verb?: InputMaybe<Scalars["String"]>;
};

export type UpdateChannelInput = {
  activityId?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
};

export type UpdateFullUserInput = {
  deleted?: InputMaybe<Scalars["Boolean"]>;
  id?: InputMaybe<Scalars["ID"]>;
  loginDisabled?: InputMaybe<Scalars["Boolean"]>;
  roles?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  silenced?: InputMaybe<Scalars["Boolean"]>;
  suspended?: InputMaybe<Scalars["Boolean"]>;
};

export type UpdateRoleInput = {
  access?: InputMaybe<AccessTargetInput>;
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  parentId?: InputMaybe<Scalars["ID"]>;
};

export type UpdateSelfInput = {
  avatar?: InputMaybe<Scalars["ID"]>;
  bio?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  header?: InputMaybe<Scalars["ID"]>;
  singleUserMode?: InputMaybe<Scalars["Boolean"]>;
  streamThumbnail?: InputMaybe<Scalars["ID"]>;
};

export type UpdateUserAccountInput = {
  email: Scalars["String"];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars["ID"]>;
  bio?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  header?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
  singleUserMode?: InputMaybe<Scalars["Boolean"]>;
  streamThumbnail?: InputMaybe<Scalars["ID"]>;
};

export type UpdateUserSettingsInput = {
  featureInDirectory?: InputMaybe<Scalars["Boolean"]>;
  singleUserChannel?: InputMaybe<Scalars["ID"]>;
  singleUserMode?: InputMaybe<Scalars["Boolean"]>;
  useGravatar?: InputMaybe<Scalars["Boolean"]>;
};

export type User = {
  __typename?: "User";
  avatar?: Maybe<File>;
  bio?: Maybe<Scalars["String"]>;
  channels: Array<Maybe<Channel>>;
  displayName?: Maybe<Scalars["String"]>;
  emailHash?: Maybe<Scalars["String"]>;
  header?: Maybe<File>;
  id?: Maybe<Scalars["ID"]>;
  meta?: Maybe<UserMeta>;
  roles: Array<Maybe<Role>>;
  settings?: Maybe<UserSettings>;
  streamThumbnail?: Maybe<File>;
  username: Scalars["String"];
};

export type UserAccountDetails = {
  __typename?: "UserAccountDetails";
  email: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
  username: Scalars["String"];
};

export type UserActions = {
  __typename?: "UserActions";
  ban?: Maybe<Scalars["Boolean"]>;
  silence?: Maybe<Scalars["Boolean"]>;
  warn?: Maybe<Scalars["Boolean"]>;
};

export type UserActionsInput = {
  ban?: InputMaybe<Scalars["Boolean"]>;
  silence?: InputMaybe<Scalars["Boolean"]>;
  warn?: InputMaybe<Scalars["Boolean"]>;
};

export type UserMeta = {
  __typename?: "UserMeta";
  followerCount: Scalars["Int"];
};

export type UserSettings = {
  __typename?: "UserSettings";
  featureInDirectory?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["ID"]>;
  singleUserChannel?: Maybe<Channel>;
  singleUserMode?: Maybe<Scalars["Boolean"]>;
  useGravatar?: Maybe<Scalars["Boolean"]>;
};

export type UserStatsInfo = {
  __typename?: "UserStatsInfo";
  channelCount: Scalars["Int"];
  sessionCount: Scalars["Int"];
  streamKeyCount: Scalars["Int"];
  userCount: Scalars["Int"];
};

export type UsersFilter = {
  displayName?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  ids?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  username?: InputMaybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessRights: ResolverTypeWrapper<AccessRights>;
  AccessRightsInput: AccessRightsInput;
  AccessTargetInput: AccessTargetInput;
  AccessTargets: ResolverTypeWrapper<AccessTargets>;
  AccessUnit: AccessUnit;
  Actions: ResolverTypeWrapper<Actions>;
  ActionsInput: ActionsInput;
  Activity: ResolverTypeWrapper<Activity>;
  ActivityFilter: ActivityFilter;
  ActivityLimit: ActivityLimit;
  AuthRightConfig: AuthRightConfig;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  ChangePasswordInput: ChangePasswordInput;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelMeta: ResolverTypeWrapper<ChannelMeta>;
  ChannelStatus: ResolverTypeWrapper<ChannelStatus>;
  ChannelsQueryFilter: ChannelsQueryFilter;
  CreateActivityInput: CreateActivityInput;
  CreateChannelInput: CreateChannelInput;
  CreateRoleInput: CreateRoleInput;
  CreateStreamKeyInput: CreateStreamKeyInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  File: ResolverTypeWrapper<File>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  FullUser: ResolverTypeWrapper<FullUser>;
  FullUsersFilter: FullUsersFilter;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  InfoResponse: ResolverTypeWrapper<InfoResponse>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  PasswordResetMethod: PasswordResetMethod;
  PasswordResetStatus: PasswordResetStatus;
  Query: ResolverTypeWrapper<{}>;
  QueryLimit: QueryLimit;
  ResetUserPasswordInput: ResetUserPasswordInput;
  ResetUserPasswordReturn: ResolverTypeWrapper<ResetUserPasswordReturn>;
  RevokeAllStreamKeysInput: RevokeAllStreamKeysInput;
  RevokeStreamKeysInput: RevokeStreamKeysInput;
  Role: ResolverTypeWrapper<Role>;
  RolesFilter: RolesFilter;
  Session: ResolverTypeWrapper<Session>;
  SessionResponse: ResolverTypeWrapper<SessionResponse>;
  SignInInput: SignInInput;
  StreamKey: ResolverTypeWrapper<StreamKey>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionByTargetId: SubscriptionByTargetId;
  SubscriptionInput: SubscriptionInput;
  SubscriptionTarget: SubscriptionTarget;
  SubscriptionsFilter: SubscriptionsFilter;
  SystemLoadInfo: ResolverTypeWrapper<SystemLoadInfo>;
  TestResponse: ResolverTypeWrapper<TestResponse>;
  UpdateActivityInput: UpdateActivityInput;
  UpdateChannelInput: UpdateChannelInput;
  UpdateFullUserInput: UpdateFullUserInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateSelfInput: UpdateSelfInput;
  UpdateUserAccountInput: UpdateUserAccountInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSettingsInput: UpdateUserSettingsInput;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  User: ResolverTypeWrapper<User>;
  UserAccountDetails: ResolverTypeWrapper<UserAccountDetails>;
  UserActions: ResolverTypeWrapper<UserActions>;
  UserActionsInput: UserActionsInput;
  UserMeta: ResolverTypeWrapper<UserMeta>;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  UserStatsInfo: ResolverTypeWrapper<UserStatsInfo>;
  UsersFilter: UsersFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessRights: AccessRights;
  AccessRightsInput: AccessRightsInput;
  AccessTargetInput: AccessTargetInput;
  AccessTargets: AccessTargets;
  Actions: Actions;
  ActionsInput: ActionsInput;
  Activity: Activity;
  ActivityFilter: ActivityFilter;
  ActivityLimit: ActivityLimit;
  AuthRightConfig: AuthRightConfig;
  Boolean: Scalars["Boolean"];
  ChangePasswordInput: ChangePasswordInput;
  Channel: Channel;
  ChannelMeta: ChannelMeta;
  ChannelStatus: ChannelStatus;
  ChannelsQueryFilter: ChannelsQueryFilter;
  CreateActivityInput: CreateActivityInput;
  CreateChannelInput: CreateChannelInput;
  CreateRoleInput: CreateRoleInput;
  CreateStreamKeyInput: CreateStreamKeyInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars["DateTime"];
  File: File;
  Float: Scalars["Float"];
  FullUser: FullUser;
  FullUsersFilter: FullUsersFilter;
  ID: Scalars["ID"];
  InfoResponse: InfoResponse;
  Int: Scalars["Int"];
  Mutation: {};
  Query: {};
  QueryLimit: QueryLimit;
  ResetUserPasswordInput: ResetUserPasswordInput;
  ResetUserPasswordReturn: ResetUserPasswordReturn;
  RevokeAllStreamKeysInput: RevokeAllStreamKeysInput;
  RevokeStreamKeysInput: RevokeStreamKeysInput;
  Role: Role;
  RolesFilter: RolesFilter;
  Session: Session;
  SessionResponse: SessionResponse;
  SignInInput: SignInInput;
  StreamKey: StreamKey;
  String: Scalars["String"];
  Subscription: {};
  SubscriptionByTargetId: SubscriptionByTargetId;
  SubscriptionInput: SubscriptionInput;
  SubscriptionsFilter: SubscriptionsFilter;
  SystemLoadInfo: SystemLoadInfo;
  TestResponse: TestResponse;
  UpdateActivityInput: UpdateActivityInput;
  UpdateChannelInput: UpdateChannelInput;
  UpdateFullUserInput: UpdateFullUserInput;
  UpdateRoleInput: UpdateRoleInput;
  UpdateSelfInput: UpdateSelfInput;
  UpdateUserAccountInput: UpdateUserAccountInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserSettingsInput: UpdateUserSettingsInput;
  Upload: Scalars["Upload"];
  User: User;
  UserAccountDetails: UserAccountDetails;
  UserActions: UserActions;
  UserActionsInput: UserActionsInput;
  UserMeta: UserMeta;
  UserSettings: UserSettings;
  UserStatsInfo: UserStatsInfo;
  UsersFilter: UsersFilter;
};

export type AuthDirectiveArgs = {
  rights?: Maybe<Array<Maybe<AuthRightConfig>>>;
  roles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type AuthDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccessRightsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AccessRights"] = ResolversParentTypes["AccessRights"]
> = {
  activities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  channels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  roles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  streamKeys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  system?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  userSettings?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccessTargetsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AccessTargets"] = ResolversParentTypes["AccessTargets"]
> = {
  actions?: Resolver<ResolversTypes["Actions"], ParentType, ContextType>;
  rights?: Resolver<ResolversTypes["AccessRights"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Actions"] = ResolversParentTypes["Actions"]
> = {
  user?: Resolver<
    Maybe<ResolversTypes["UserActions"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Activity"] = ResolversParentTypes["Activity"]
> = {
  icon?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  verb?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Channel"] = ResolversParentTypes["Channel"]
> = {
  activity?: Resolver<
    Maybe<ResolversTypes["Activity"]>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  meta?: Resolver<
    Maybe<ResolversTypes["ChannelMeta"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["ChannelStatus"]>,
    ParentType,
    ContextType
  >;
  thumbnail?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelMetaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ChannelMeta"] = ResolversParentTypes["ChannelMeta"]
> = {
  subscriberCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ChannelStatus"] = ResolversParentTypes["ChannelStatus"]
> = {
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  isLive?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  viewers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type FileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["File"] = ResolversParentTypes["File"]
> = {
  encoding?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FullUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FullUser"] = ResolversParentTypes["FullUser"]
> = {
  avatar?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  channels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType
  >;
  deleted?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  header?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  loginDisabled?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  meta?: Resolver<Maybe<ResolversTypes["UserMeta"]>, ParentType, ContextType>;
  roles?: Resolver<
    Array<Maybe<ResolversTypes["Role"]>>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<
    Maybe<ResolversTypes["UserSettings"]>,
    ParentType,
    ContextType
  >;
  silenced?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  streamThumbnail?: Resolver<
    Maybe<ResolversTypes["File"]>,
    ParentType,
    ContextType
  >;
  suspended?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InfoResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InfoResponse"] = ResolversParentTypes["InfoResponse"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  packageName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  bulkDeleteRoles?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationBulkDeleteRolesArgs, "ids">
  >;
  changeSelfPassword?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeSelfPasswordArgs, never>
  >;
  createActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateActivityArgs, never>
  >;
  createChannel?: Resolver<
    ResolversTypes["Channel"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChannelArgs, never>
  >;
  createRole?: Resolver<
    ResolversTypes["Role"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoleArgs, never>
  >;
  createStreamKey?: Resolver<
    ResolversTypes["StreamKey"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateStreamKeyArgs, "input">
  >;
  deleteActivity?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteActivityArgs, "id">
  >;
  deleteChannel?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteChannelArgs, "id">
  >;
  deleteFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFullUserArgs, "id">
  >;
  deleteFullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteFullUsersArgs, "ids">
  >;
  deleteRole?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRoleArgs, "id">
  >;
  disableFullUserLogin?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationDisableFullUserLoginArgs, "id">
  >;
  disableFullUsersLogin?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationDisableFullUsersLoginArgs, "ids">
  >;
  enableFullUserLogin?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationEnableFullUserLoginArgs, "id">
  >;
  enableFullUsersLogin?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationEnableFullUsersLoginArgs, "ids">
  >;
  ping?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  resetUserPassword?: Resolver<
    Maybe<ResolversTypes["ResetUserPasswordReturn"]>,
    ParentType,
    ContextType,
    RequireFields<MutationResetUserPasswordArgs, "id" | "input">
  >;
  restoreFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationRestoreFullUserArgs, "id">
  >;
  restoreFullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationRestoreFullUsersArgs, "ids">
  >;
  revokeAllStreamKeys?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeAllStreamKeysArgs, "input">
  >;
  revokeSelfSessions?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRevokeSelfSessionsArgs, "input">
  >;
  revokeStreamKey?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeStreamKeyArgs, "key">
  >;
  revokeStreamKeys?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeStreamKeysArgs, "input">
  >;
  signIn?: Resolver<
    Maybe<ResolversTypes["SessionResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "input">
  >;
  signUp?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "input">
  >;
  silenceFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationSilenceFullUserArgs, "id">
  >;
  silenceFullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationSilenceFullUsersArgs, "ids">
  >;
  subscribe?: Resolver<
    ResolversTypes["Subscription"],
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeArgs, "input">
  >;
  suspendFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationSuspendFullUserArgs, "id">
  >;
  suspendFullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationSuspendFullUsersArgs, "ids">
  >;
  unsilenceFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationUnsilenceFullUserArgs, "id">
  >;
  unsilenceFullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationUnsilenceFullUsersArgs, "ids">
  >;
  unsubscribe?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationUnsubscribeArgs, "input">
  >;
  unsuspendFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationUnsuspendFullUserArgs, "id">
  >;
  unsuspendFullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<MutationUnsuspendFullUsersArgs, "ids">
  >;
  updateActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateActivityArgs, never>
  >;
  updateChannel?: Resolver<
    ResolversTypes["Channel"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChannelArgs, never>
  >;
  updateFullUser?: Resolver<
    ResolversTypes["FullUser"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateFullUserArgs, never>
  >;
  updateRole?: Resolver<
    ResolversTypes["Role"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoleArgs, never>
  >;
  updateSelf?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSelfArgs, "input">
  >;
  updateSelfAccount?: Resolver<
    Maybe<ResolversTypes["UserAccountDetails"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSelfAccountArgs, never>
  >;
  updateUserSettings?: Resolver<
    Maybe<ResolversTypes["UserSettings"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserSettingsArgs, "input">
  >;
  uploadFile?: Resolver<
    ResolversTypes["File"],
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileArgs, "file">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  activities?: Resolver<
    Array<Maybe<ResolversTypes["Activity"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryActivitiesArgs, never>
  >;
  activitiesCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<QueryActivitiesCountArgs, never>
  >;
  activity?: Resolver<
    Maybe<ResolversTypes["Activity"]>,
    ParentType,
    ContextType,
    RequireFields<QueryActivityArgs, "id">
  >;
  channel?: Resolver<
    Maybe<ResolversTypes["Channel"]>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelArgs, "id">
  >;
  channelStatus?: Resolver<
    Maybe<ResolversTypes["ChannelStatus"]>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelStatusArgs, "id">
  >;
  channelSubscriptions?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelSubscriptionsArgs, never>
  >;
  channels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelsArgs, never>
  >;
  channelsCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<QueryChannelsCountArgs, never>
  >;
  fileInfo?: Resolver<
    Maybe<ResolversTypes["File"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFileInfoArgs, never>
  >;
  fullChannels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryFullChannelsArgs, never>
  >;
  fullChannelsCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    RequireFields<QueryFullChannelsCountArgs, never>
  >;
  fullUser?: Resolver<
    Maybe<ResolversTypes["FullUser"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFullUserArgs, "id">
  >;
  fullUserCount?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFullUserCountArgs, never>
  >;
  fullUsers?: Resolver<
    Array<Maybe<ResolversTypes["FullUser"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryFullUsersArgs, never>
  >;
  info?: Resolver<ResolversTypes["InfoResponse"], ParentType, ContextType>;
  role?: Resolver<
    Maybe<ResolversTypes["Role"]>,
    ParentType,
    ContextType,
    RequireFields<QueryRoleArgs, "id">
  >;
  roles?: Resolver<
    Array<Maybe<ResolversTypes["Role"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryRolesArgs, never>
  >;
  self?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  selfAccount?: Resolver<
    ResolversTypes["UserAccountDetails"],
    ParentType,
    ContextType
  >;
  selfChannels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QuerySelfChannelsArgs, never>
  >;
  selfSessions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Session"]>>>,
    ParentType,
    ContextType
  >;
  selfStreamKeys?: Resolver<
    Array<Maybe<ResolversTypes["StreamKey"]>>,
    ParentType,
    ContextType
  >;
  selfSubscribedChannels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType
  >;
  selfSubscribedUsers?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType
  >;
  selfSubscriptions?: Resolver<
    Array<Maybe<ResolversTypes["Subscription"]>>,
    ParentType,
    ContextType
  >;
  streamKeys?: Resolver<
    Array<Maybe<ResolversTypes["StreamKey"]>>,
    ParentType,
    ContextType
  >;
  streamKeysByChannelId?: Resolver<
    Array<Maybe<ResolversTypes["StreamKey"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryStreamKeysByChannelIdArgs, "channelId">
  >;
  subscription?: Resolver<
    Maybe<ResolversTypes["Subscription"]>,
    ParentType,
    ContextType,
    RequireFields<QuerySubscriptionArgs, never>
  >;
  systemLoad?: Resolver<
    ResolversTypes["SystemLoadInfo"],
    ParentType,
    ContextType
  >;
  test?: Resolver<ResolversTypes["TestResponse"], ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  userDirectory?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryUserDirectoryArgs, never>
  >;
  userSettings?: Resolver<
    ResolversTypes["UserSettings"],
    ParentType,
    ContextType
  >;
  userStats?: Resolver<
    ResolversTypes["UserStatsInfo"],
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, never>
  >;
};

export type ResetUserPasswordReturnResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ResetUserPasswordReturn"] = ResolversParentTypes["ResetUserPasswordReturn"]
> = {
  data?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["PasswordResetStatus"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Role"] = ResolversParentTypes["Role"]
> = {
  access?: Resolver<ResolversTypes["AccessTargets"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Session"] = ResolversParentTypes["Session"]
> = {
  expiresAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  ip?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isCurrentSession?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  lastUsedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  userAgent?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SessionResponse"] = ResolversParentTypes["SessionResponse"]
> = {
  expiresAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StreamKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StreamKey"] = ResolversParentTypes["StreamKey"]
> = {
  channel?: Resolver<ResolversTypes["Channel"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  id?: SubscriptionResolver<
    ResolversTypes["ID"],
    "id",
    ParentType,
    ContextType
  >;
  sourceId?: SubscriptionResolver<
    ResolversTypes["ID"],
    "sourceId",
    ParentType,
    ContextType
  >;
  target?: SubscriptionResolver<
    ResolversTypes["SubscriptionTarget"],
    "target",
    ParentType,
    ContextType
  >;
  targetId?: SubscriptionResolver<
    ResolversTypes["ID"],
    "targetId",
    ParentType,
    ContextType
  >;
};

export type SystemLoadInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SystemLoadInfo"] = ResolversParentTypes["SystemLoadInfo"]
> = {
  cpuPercentage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  dbSize?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  drivePercentage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  mediaDirSize?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  memPercentage?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  networkDown?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  networkUp?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  totalDrive?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  totalMem?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  usedDrive?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  usedMem?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TestResponse"] = ResolversParentTypes["TestResponse"]
> = {
  secret?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  avatar?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  channels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType
  >;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  emailHash?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  header?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes["UserMeta"]>, ParentType, ContextType>;
  roles?: Resolver<
    Array<Maybe<ResolversTypes["Role"]>>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<
    Maybe<ResolversTypes["UserSettings"]>,
    ParentType,
    ContextType
  >;
  streamThumbnail?: Resolver<
    Maybe<ResolversTypes["File"]>,
    ParentType,
    ContextType
  >;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAccountDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserAccountDetails"] = ResolversParentTypes["UserAccountDetails"]
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserActionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserActions"] = ResolversParentTypes["UserActions"]
> = {
  ban?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  silence?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  warn?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserMetaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserMeta"] = ResolversParentTypes["UserMeta"]
> = {
  followerCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserSettings"] = ResolversParentTypes["UserSettings"]
> = {
  featureInDirectory?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  singleUserChannel?: Resolver<
    Maybe<ResolversTypes["Channel"]>,
    ParentType,
    ContextType
  >;
  singleUserMode?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  useGravatar?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserStatsInfo"] = ResolversParentTypes["UserStatsInfo"]
> = {
  channelCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  sessionCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  streamKeyCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccessRights?: AccessRightsResolvers<ContextType>;
  AccessTargets?: AccessTargetsResolvers<ContextType>;
  Actions?: ActionsResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  ChannelMeta?: ChannelMetaResolvers<ContextType>;
  ChannelStatus?: ChannelStatusResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  FullUser?: FullUserResolvers<ContextType>;
  InfoResponse?: InfoResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResetUserPasswordReturn?: ResetUserPasswordReturnResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionResponse?: SessionResponseResolvers<ContextType>;
  StreamKey?: StreamKeyResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SystemLoadInfo?: SystemLoadInfoResolvers<ContextType>;
  TestResponse?: TestResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAccountDetails?: UserAccountDetailsResolvers<ContextType>;
  UserActions?: UserActionsResolvers<ContextType>;
  UserMeta?: UserMetaResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  UserStatsInfo?: UserStatsInfoResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};

export type AdminActivityCountQueryVariables = Exact<{
  filter?: InputMaybe<ActivityFilter>;
}>;

export type AdminActivityCountQuery = {
  __typename?: "Query";
  activitiesCount: number;
};

export type AdminActivityListQueryVariables = Exact<{
  filter?: InputMaybe<ActivityFilter>;
  limit?: InputMaybe<ActivityLimit>;
}>;

export type AdminActivityListQuery = {
  __typename?: "Query";
  activities: Array<
    | {
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: string | null | undefined;
        icon?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        image?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type AdminDeleteActivityMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AdminDeleteActivityMutation = {
  __typename?: "Mutation";
  deleteActivity: boolean;
};

export type AdminActivityPageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AdminActivityPageQuery = {
  __typename?: "Query";
  activity?:
    | {
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: string | null | undefined;
        icon?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        image?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type AdminUpdateActivityMutationVariables = Exact<{
  input: UpdateActivityInput;
}>;

export type AdminUpdateActivityMutation = {
  __typename?: "Mutation";
  updateActivity: {
    __typename?: "Activity";
    id: string;
    name: string;
    verb?: string | null | undefined;
    icon?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    image?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
  };
};

export type AdminCreateActivityMutationVariables = Exact<{
  input?: InputMaybe<CreateActivityInput>;
}>;

export type AdminCreateActivityMutation = {
  __typename?: "Mutation";
  createActivity: {
    __typename?: "Activity";
    id: string;
    name: string;
    verb?: string | null | undefined;
    icon?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    image?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
  };
};

export type AdminActivityFragmentFragment = {
  __typename?: "Activity";
  id: string;
  name: string;
  verb?: string | null | undefined;
  icon?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  image?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
};

export type AdminDashboardUserStatsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminDashboardUserStatsQuery = {
  __typename?: "Query";
  userStats: {
    __typename?: "UserStatsInfo";
    userCount: number;
    channelCount: number;
    streamKeyCount: number;
    sessionCount: number;
  };
};

export type AdminDashboardSystemLoadQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminDashboardSystemLoadQuery = {
  __typename?: "Query";
  systemLoad: {
    __typename?: "SystemLoadInfo";
    cpuPercentage: number;
    totalMem: number;
    usedMem: number;
    memPercentage: number;
    totalDrive: number;
    usedDrive: number;
    drivePercentage: number;
    mediaDirSize: number;
    dbSize: number;
    networkUp: number;
    networkDown: number;
  };
};

export type AdminChannelsCountQueryVariables = Exact<{
  filter?: InputMaybe<ChannelsQueryFilter>;
}>;

export type AdminChannelsCountQuery = {
  __typename?: "Query";
  fullChannelsCount: number;
};

export type AdminChannelsQueryVariables = Exact<{
  filter?: InputMaybe<ChannelsQueryFilter>;
  limit?: InputMaybe<QueryLimit>;
}>;

export type AdminChannelsQuery = {
  __typename?: "Query";
  fullChannels: Array<
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        description?: string | null | undefined;
        slug?: string | null | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
            }
          | null
          | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
              icon?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type AdminDeleteChannelMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AdminDeleteChannelMutation = {
  __typename?: "Mutation";
  deleteChannel: boolean;
};

export type AdminRolesQueryVariables = Exact<{
  filter?: InputMaybe<RolesFilter>;
  limit?: InputMaybe<QueryLimit>;
}>;

export type AdminRolesQuery = {
  __typename?: "Query";
  roles: Array<
    | {
        __typename?: "Role";
        id: string;
        parentId?: string | null | undefined;
        name: string;
        access: {
          __typename?: "AccessTargets";
          rights: {
            __typename?: "AccessRights";
            channels?: Array<AccessUnit | null | undefined> | null | undefined;
            streamKeys?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            roles?: Array<AccessUnit | null | undefined> | null | undefined;
            users?: Array<AccessUnit | null | undefined> | null | undefined;
            activities?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            userSettings?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
          };
          actions: {
            __typename?: "Actions";
            user?:
              | {
                  __typename?: "UserActions";
                  silence?: boolean | null | undefined;
                  ban?: boolean | null | undefined;
                  warn?: boolean | null | undefined;
                }
              | null
              | undefined;
          };
        };
      }
    | null
    | undefined
  >;
};

export type BulkDeleteRolesMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkDeleteRolesMutation = {
  __typename?: "Mutation";
  bulkDeleteRoles: boolean;
};

export type AdminRolePageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AdminRolePageQuery = {
  __typename?: "Query";
  role?:
    | {
        __typename?: "Role";
        id: string;
        parentId?: string | null | undefined;
        name: string;
        access: {
          __typename?: "AccessTargets";
          rights: {
            __typename?: "AccessRights";
            channels?: Array<AccessUnit | null | undefined> | null | undefined;
            streamKeys?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            roles?: Array<AccessUnit | null | undefined> | null | undefined;
            users?: Array<AccessUnit | null | undefined> | null | undefined;
            activities?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            userSettings?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
          };
          actions: {
            __typename?: "Actions";
            user?:
              | {
                  __typename?: "UserActions";
                  silence?: boolean | null | undefined;
                  ban?: boolean | null | undefined;
                  warn?: boolean | null | undefined;
                }
              | null
              | undefined;
          };
        };
      }
    | null
    | undefined;
};

export type AdminUpdateRoleMutationVariables = Exact<{
  input?: InputMaybe<UpdateRoleInput>;
}>;

export type AdminUpdateRoleMutation = {
  __typename?: "Mutation";
  updateRole: {
    __typename?: "Role";
    id: string;
    parentId?: string | null | undefined;
    name: string;
    access: {
      __typename?: "AccessTargets";
      rights: {
        __typename?: "AccessRights";
        channels?: Array<AccessUnit | null | undefined> | null | undefined;
        streamKeys?: Array<AccessUnit | null | undefined> | null | undefined;
        roles?: Array<AccessUnit | null | undefined> | null | undefined;
        users?: Array<AccessUnit | null | undefined> | null | undefined;
        activities?: Array<AccessUnit | null | undefined> | null | undefined;
        userSettings?: Array<AccessUnit | null | undefined> | null | undefined;
      };
      actions: {
        __typename?: "Actions";
        user?:
          | {
              __typename?: "UserActions";
              silence?: boolean | null | undefined;
              ban?: boolean | null | undefined;
              warn?: boolean | null | undefined;
            }
          | null
          | undefined;
      };
    };
  };
};

export type AdminRoleFragment = {
  __typename?: "Role";
  id: string;
  parentId?: string | null | undefined;
  name: string;
  access: {
    __typename?: "AccessTargets";
    rights: {
      __typename?: "AccessRights";
      channels?: Array<AccessUnit | null | undefined> | null | undefined;
      streamKeys?: Array<AccessUnit | null | undefined> | null | undefined;
      roles?: Array<AccessUnit | null | undefined> | null | undefined;
      users?: Array<AccessUnit | null | undefined> | null | undefined;
      activities?: Array<AccessUnit | null | undefined> | null | undefined;
      userSettings?: Array<AccessUnit | null | undefined> | null | undefined;
    };
    actions: {
      __typename?: "Actions";
      user?:
        | {
            __typename?: "UserActions";
            silence?: boolean | null | undefined;
            ban?: boolean | null | undefined;
            warn?: boolean | null | undefined;
          }
        | null
        | undefined;
    };
  };
};

export type ResetPasswordMutationVariables = Exact<{
  id: Scalars["ID"];
  input: ResetUserPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetUserPassword?:
    | {
        __typename?: "ResetUserPasswordReturn";
        status?: PasswordResetStatus | null | undefined;
        data?: string | null | undefined;
      }
    | null
    | undefined;
};

export type UpdateFullUserMutationVariables = Exact<{
  input: UpdateFullUserInput;
}>;

export type UpdateFullUserMutation = {
  __typename?: "Mutation";
  updateFullUser: {
    __typename?: "FullUser";
    id?: string | null | undefined;
    username: string;
    displayName?: string | null | undefined;
    bio?: string | null | undefined;
    email?: string | null | undefined;
    silenced?: boolean | null | undefined;
    suspended?: boolean | null | undefined;
    deleted?: boolean | null | undefined;
    loginDisabled?: boolean | null | undefined;
    roles: Array<
      | {
          __typename?: "Role";
          id: string;
          name: string;
          parentId?: string | null | undefined;
          access: {
            __typename?: "AccessTargets";
            rights: {
              __typename?: "AccessRights";
              channels?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
              streamKeys?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
              roles?: Array<AccessUnit | null | undefined> | null | undefined;
              users?: Array<AccessUnit | null | undefined> | null | undefined;
              activities?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
              userSettings?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
            };
            actions: {
              __typename?: "Actions";
              user?:
                | {
                    __typename?: "UserActions";
                    silence?: boolean | null | undefined;
                    ban?: boolean | null | undefined;
                    warn?: boolean | null | undefined;
                  }
                | null
                | undefined;
            };
          };
        }
      | null
      | undefined
    >;
    channels: Array<
      { __typename?: "Channel"; id: string; name: string } | null | undefined
    >;
    avatar?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    header?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    streamThumbnail?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    settings?:
      | {
          __typename?: "UserSettings";
          id?: string | null | undefined;
          useGravatar?: boolean | null | undefined;
          singleUserMode?: boolean | null | undefined;
          featureInDirectory?: boolean | null | undefined;
          singleUserChannel?:
            | { __typename?: "Channel"; id: string; name: string }
            | null
            | undefined;
        }
      | null
      | undefined;
    meta?:
      | { __typename?: "UserMeta"; followerCount: number }
      | null
      | undefined;
  };
};

export type AdminFullUserFragment = {
  __typename?: "FullUser";
  id?: string | null | undefined;
  username: string;
  displayName?: string | null | undefined;
  bio?: string | null | undefined;
  email?: string | null | undefined;
  silenced?: boolean | null | undefined;
  suspended?: boolean | null | undefined;
  deleted?: boolean | null | undefined;
  loginDisabled?: boolean | null | undefined;
  roles: Array<
    | {
        __typename?: "Role";
        id: string;
        name: string;
        parentId?: string | null | undefined;
        access: {
          __typename?: "AccessTargets";
          rights: {
            __typename?: "AccessRights";
            channels?: Array<AccessUnit | null | undefined> | null | undefined;
            streamKeys?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            roles?: Array<AccessUnit | null | undefined> | null | undefined;
            users?: Array<AccessUnit | null | undefined> | null | undefined;
            activities?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            userSettings?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
          };
          actions: {
            __typename?: "Actions";
            user?:
              | {
                  __typename?: "UserActions";
                  silence?: boolean | null | undefined;
                  ban?: boolean | null | undefined;
                  warn?: boolean | null | undefined;
                }
              | null
              | undefined;
          };
        };
      }
    | null
    | undefined
  >;
  channels: Array<
    { __typename?: "Channel"; id: string; name: string } | null | undefined
  >;
  avatar?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  header?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  streamThumbnail?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  settings?:
    | {
        __typename?: "UserSettings";
        id?: string | null | undefined;
        useGravatar?: boolean | null | undefined;
        singleUserMode?: boolean | null | undefined;
        featureInDirectory?: boolean | null | undefined;
        singleUserChannel?:
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined;
      }
    | null
    | undefined;
  meta?: { __typename?: "UserMeta"; followerCount: number } | null | undefined;
};

export type FullUserAdminQueryVariables = Exact<{
  filter?: InputMaybe<FullUsersFilter>;
  limit?: InputMaybe<QueryLimit>;
}>;

export type FullUserAdminQuery = {
  __typename?: "Query";
  fullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type FullUserAdminCountQueryVariables = Exact<{
  filter?: InputMaybe<FullUsersFilter>;
}>;

export type FullUserAdminCountQuery = {
  __typename?: "Query";
  fullUserCount?: number | null | undefined;
};

export type BulkDeleteUsersMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkDeleteUsersMutation = {
  __typename?: "Mutation";
  deleteFullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkRestoreUsersMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkRestoreUsersMutation = {
  __typename?: "Mutation";
  restoreFullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkSuspendUsersMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkSuspendUsersMutation = {
  __typename?: "Mutation";
  suspendFullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkUnsuspendUsersMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkUnsuspendUsersMutation = {
  __typename?: "Mutation";
  unsuspendFullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkDisableLoginsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkDisableLoginsMutation = {
  __typename?: "Mutation";
  disableFullUsersLogin: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkEnableLoginsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkEnableLoginsMutation = {
  __typename?: "Mutation";
  enableFullUsersLogin: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkSilenceUsersMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkSilenceUsersMutation = {
  __typename?: "Mutation";
  silenceFullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type BulkUnsilenceUsersMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>;
}>;

export type BulkUnsilenceUsersMutation = {
  __typename?: "Mutation";
  unsilenceFullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        email?: string | null | undefined;
        silenced?: boolean | null | undefined;
        suspended?: boolean | null | undefined;
        deleted?: boolean | null | undefined;
        loginDisabled?: boolean | null | undefined;
        roles: Array<
          | {
              __typename?: "Role";
              id: string;
              name: string;
              parentId?: string | null | undefined;
              access: {
                __typename?: "AccessTargets";
                rights: {
                  __typename?: "AccessRights";
                  channels?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  streamKeys?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  roles?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  users?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  activities?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                  userSettings?:
                    | Array<AccessUnit | null | undefined>
                    | null
                    | undefined;
                };
                actions: {
                  __typename?: "Actions";
                  user?:
                    | {
                        __typename?: "UserActions";
                        silence?: boolean | null | undefined;
                        ban?: boolean | null | undefined;
                        warn?: boolean | null | undefined;
                      }
                    | null
                    | undefined;
                };
              };
            }
          | null
          | undefined
        >;
        channels: Array<
          | { __typename?: "Channel"; id: string; name: string }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              id?: string | null | undefined;
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              featureInDirectory?: boolean | null | undefined;
              singleUserChannel?:
                | { __typename?: "Channel"; id: string; name: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type ChannelViewFragment = {
  __typename?: "Channel";
  id: string;
  name: string;
  description?: string | null | undefined;
  slug?: string | null | undefined;
  thumbnail?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  activity?:
    | {
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: string | null | undefined;
      }
    | null
    | undefined;
  user?:
    | {
        __typename?: "User";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              singleUserMode?: boolean | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  meta?:
    | { __typename?: "ChannelMeta"; subscriberCount: number }
    | null
    | undefined;
};

export type ChannelViewStatusFragment = {
  __typename?: "ChannelStatus";
  id?: string | null | undefined;
  isLive?: boolean | null | undefined;
};

export type DashboardChannelsQueryVariables = Exact<{ [key: string]: never }>;

export type DashboardChannelsQuery = {
  __typename?: "Query";
  channels: Array<
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        slug?: string | null | undefined;
        description?: string | null | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              filename: string;
              id?: string | null | undefined;
            }
          | null
          | undefined;
        status?:
          | {
              __typename?: "ChannelStatus";
              id?: string | null | undefined;
              isLive?: boolean | null | undefined;
              viewers?: number | null | undefined;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
            }
          | null
          | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
              avatar?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
              settings?:
                | {
                    __typename?: "UserSettings";
                    singleUserMode?: boolean | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type DashboardFollowedChannelsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DashboardFollowedChannelsQuery = {
  __typename?: "Query";
  selfSubscribedChannels: Array<
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        slug?: string | null | undefined;
        description?: string | null | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              filename: string;
              id?: string | null | undefined;
            }
          | null
          | undefined;
        status?:
          | {
              __typename?: "ChannelStatus";
              id?: string | null | undefined;
              isLive?: boolean | null | undefined;
              viewers?: number | null | undefined;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
            }
          | null
          | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
              avatar?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
              settings?:
                | {
                    __typename?: "UserSettings";
                    singleUserMode?: boolean | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type UserDirectoryProfileFragment = {
  __typename?: "User";
  id?: string | null | undefined;
  username: string;
  displayName?: string | null | undefined;
  bio?: string | null | undefined;
  emailHash?: string | null | undefined;
  avatar?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  header?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  meta?: { __typename?: "UserMeta"; followerCount: number } | null | undefined;
  settings?:
    | { __typename?: "UserSettings"; useGravatar?: boolean | null | undefined }
    | null
    | undefined;
};

export type UsersDirectoryQueryVariables = Exact<{ [key: string]: never }>;

export type UsersDirectoryQuery = {
  __typename?: "Query";
  userDirectory: Array<
    | {
        __typename?: "User";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        emailHash?: string | null | undefined;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              useGravatar?: boolean | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type UserProfileFragment = {
  __typename?: "User";
  id?: string | null | undefined;
  username: string;
  displayName?: string | null | undefined;
  bio?: string | null | undefined;
  emailHash?: string | null | undefined;
  channels: Array<
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        slug?: string | null | undefined;
        description?: string | null | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              filename: string;
              id?: string | null | undefined;
            }
          | null
          | undefined;
        status?:
          | {
              __typename?: "ChannelStatus";
              id?: string | null | undefined;
              isLive?: boolean | null | undefined;
              viewers?: number | null | undefined;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
            }
          | null
          | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
              avatar?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
              settings?:
                | {
                    __typename?: "UserSettings";
                    singleUserMode?: boolean | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
  avatar?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  header?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  streamThumbnail?:
    | { __typename?: "File"; filename: string }
    | null
    | undefined;
  meta?: { __typename?: "UserMeta"; followerCount: number } | null | undefined;
  settings?:
    | {
        __typename?: "UserSettings";
        useGravatar?: boolean | null | undefined;
        singleUserMode?: boolean | null | undefined;
        singleUserChannel?:
          | {
              __typename?: "Channel";
              id: string;
              name: string;
              description?: string | null | undefined;
              slug?: string | null | undefined;
              thumbnail?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
              activity?:
                | {
                    __typename?: "Activity";
                    id: string;
                    name: string;
                    verb?: string | null | undefined;
                  }
                | null
                | undefined;
              user?:
                | {
                    __typename?: "User";
                    id?: string | null | undefined;
                    username: string;
                    displayName?: string | null | undefined;
                    avatar?:
                      | {
                          __typename?: "File";
                          id?: string | null | undefined;
                          filename: string;
                        }
                      | null
                      | undefined;
                    settings?:
                      | {
                          __typename?: "UserSettings";
                          singleUserMode?: boolean | null | undefined;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
              meta?:
                | { __typename?: "ChannelMeta"; subscriberCount: number }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type SelfSessionsQueryVariables = Exact<{ [key: string]: never }>;

export type SelfSessionsQuery = {
  __typename?: "Query";
  selfSessions?:
    | Array<
        | {
            __typename?: "Session";
            id: string;
            expiresAt: any;
            lastUsedAt: any;
            userAgent: string;
            user: string;
            ip: string;
            isCurrentSession: boolean;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type RevokeSelfSessionsMutationVariables = Exact<{
  input: Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>;
}>;

export type RevokeSelfSessionsMutation = {
  __typename?: "Mutation";
  revokeSelfSessions?: boolean | null | undefined;
};

export type AccountDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type AccountDetailsQuery = {
  __typename?: "Query";
  selfAccount: {
    __typename?: "UserAccountDetails";
    id?: string | null | undefined;
    username: string;
    email: string;
  };
};

export type ChangeAccountPasswordMutationVariables = Exact<{
  input?: InputMaybe<ChangePasswordInput>;
}>;

export type ChangeAccountPasswordMutation = {
  __typename?: "Mutation";
  changeSelfPassword?: boolean | null | undefined;
};

export type SettingsUpdateAccountMutationVariables = Exact<{
  input?: InputMaybe<UpdateUserAccountInput>;
}>;

export type SettingsUpdateAccountMutation = {
  __typename?: "Mutation";
  updateSelfAccount?:
    | {
        __typename?: "UserAccountDetails";
        id?: string | null | undefined;
        username: string;
        email: string;
      }
    | null
    | undefined;
};

export type SettingsChangePasswordMutationVariables = Exact<{
  input?: InputMaybe<ChangePasswordInput>;
}>;

export type SettingsChangePasswordMutation = {
  __typename?: "Mutation";
  changeSelfPassword?: boolean | null | undefined;
};

export type SelfStreamKeysQueryVariables = Exact<{ [key: string]: never }>;

export type SelfStreamKeysQuery = {
  __typename?: "Query";
  selfStreamKeys: Array<
    | {
        __typename?: "StreamKey";
        id: string;
        name?: string | null | undefined;
        channel: { __typename?: "Channel"; id: string; name: string };
      }
    | null
    | undefined
  >;
};

export type RevokeSelfStreamKeysMutationVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type RevokeSelfStreamKeysMutation = {
  __typename?: "Mutation";
  revokeAllStreamKeys: boolean;
};

export type UserSettingsChannelQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserSettingsChannelQuery = {
  __typename?: "Query";
  channel?:
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        description?: string | null | undefined;
        slug?: string | null | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
            }
          | null
          | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
              icon?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type EditChannelMutationVariables = Exact<{
  input?: InputMaybe<UpdateChannelInput>;
}>;

export type EditChannelMutation = {
  __typename?: "Mutation";
  updateChannel: {
    __typename?: "Channel";
    id: string;
    name: string;
    description?: string | null | undefined;
    slug?: string | null | undefined;
    user?:
      | {
          __typename?: "User";
          id?: string | null | undefined;
          username: string;
          displayName?: string | null | undefined;
        }
      | null
      | undefined;
    thumbnail?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    activity?:
      | {
          __typename?: "Activity";
          id: string;
          name: string;
          verb?: string | null | undefined;
          icon?:
            | {
                __typename?: "File";
                id?: string | null | undefined;
                filename: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type UserSettingsChannelKeysQueryVariables = Exact<{
  channelId: Scalars["ID"];
}>;

export type UserSettingsChannelKeysQuery = {
  __typename?: "Query";
  streamKeysByChannelId: Array<
    | {
        __typename?: "StreamKey";
        id: string;
        name?: string | null | undefined;
        channel: { __typename?: "Channel"; id: string; name: string };
      }
    | null
    | undefined
  >;
};

export type UserSettingsRevokeAllStreamKeysMutationVariables = Exact<{
  channelId: Scalars["ID"];
  userId: Scalars["ID"];
}>;

export type UserSettingsRevokeAllStreamKeysMutation = {
  __typename?: "Mutation";
  revokeStreamKeys: boolean;
};

export type UserSettingsRevokeStreamKeyMutationVariables = Exact<{
  streamKey: Scalars["ID"];
}>;

export type UserSettingsRevokeStreamKeyMutation = {
  __typename?: "Mutation";
  revokeStreamKey: boolean;
};

export type UserSettingsChannelsQueryVariables = Exact<{
  filter?: InputMaybe<ChannelsQueryFilter>;
}>;

export type UserSettingsChannelsQuery = {
  __typename?: "Query";
  channels: Array<
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        description?: string | null | undefined;
        slug?: string | null | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
            }
          | null
          | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
              icon?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type UserSettingsDeleteChannelMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserSettingsDeleteChannelMutation = {
  __typename?: "Mutation";
  deleteChannel: boolean;
};

export type UserSettingsCreateChannelMutationVariables = Exact<{
  input?: InputMaybe<CreateChannelInput>;
}>;

export type UserSettingsCreateChannelMutation = {
  __typename?: "Mutation";
  createChannel: {
    __typename?: "Channel";
    id: string;
    name: string;
    description?: string | null | undefined;
    slug?: string | null | undefined;
    user?:
      | {
          __typename?: "User";
          id?: string | null | undefined;
          username: string;
          displayName?: string | null | undefined;
        }
      | null
      | undefined;
    thumbnail?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    activity?:
      | {
          __typename?: "Activity";
          id: string;
          name: string;
          verb?: string | null | undefined;
          icon?:
            | {
                __typename?: "File";
                id?: string | null | undefined;
                filename: string;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type UserSettingsCreateChannelKeyMutationVariables = Exact<{
  input: CreateStreamKeyInput;
}>;

export type UserSettingsCreateChannelKeyMutation = {
  __typename?: "Mutation";
  createStreamKey: {
    __typename?: "StreamKey";
    id: string;
    name?: string | null | undefined;
  };
};

export type UserSettingsProfileFragmentFragment = {
  __typename?: "User";
  id?: string | null | undefined;
  username: string;
  displayName?: string | null | undefined;
  emailHash?: string | null | undefined;
  bio?: string | null | undefined;
  avatar?:
    | {
        __typename?: "File";
        id?: string | null | undefined;
        filename: string;
        encoding: string;
        mimetype: string;
      }
    | null
    | undefined;
  streamThumbnail?:
    | {
        __typename?: "File";
        id?: string | null | undefined;
        filename: string;
        encoding: string;
        mimetype: string;
      }
    | null
    | undefined;
  header?:
    | {
        __typename?: "File";
        id?: string | null | undefined;
        filename: string;
        encoding: string;
        mimetype: string;
      }
    | null
    | undefined;
};

export type UserSettingsProfileQueryVariables = Exact<{ [key: string]: never }>;

export type UserSettingsProfileQuery = {
  __typename?: "Query";
  self: {
    __typename?: "User";
    id?: string | null | undefined;
    username: string;
    displayName?: string | null | undefined;
    emailHash?: string | null | undefined;
    bio?: string | null | undefined;
    avatar?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
          encoding: string;
          mimetype: string;
        }
      | null
      | undefined;
    streamThumbnail?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
          encoding: string;
          mimetype: string;
        }
      | null
      | undefined;
    header?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
          encoding: string;
          mimetype: string;
        }
      | null
      | undefined;
  };
};

export type UpdateUserSettingsProfileMutationVariables = Exact<{
  input: UpdateSelfInput;
}>;

export type UpdateUserSettingsProfileMutation = {
  __typename?: "Mutation";
  updateSelf?:
    | {
        __typename?: "User";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        emailHash?: string | null | undefined;
        bio?: string | null | undefined;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
              encoding: string;
              mimetype: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
              encoding: string;
              mimetype: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
              encoding: string;
              mimetype: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UserSettingsPreferencesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type UserSettingsPreferencesQuery = {
  __typename?: "Query";
  userSettings: {
    __typename?: "UserSettings";
    id?: string | null | undefined;
    useGravatar?: boolean | null | undefined;
    singleUserMode?: boolean | null | undefined;
    featureInDirectory?: boolean | null | undefined;
    singleUserChannel?:
      | { __typename?: "Channel"; id: string }
      | null
      | undefined;
  };
};

export type UpdateUserSettingsPreferencesMutationVariables = Exact<{
  input: UpdateUserSettingsInput;
}>;

export type UpdateUserSettingsPreferencesMutation = {
  __typename?: "Mutation";
  updateUserSettings?:
    | {
        __typename?: "UserSettings";
        id?: string | null | undefined;
        useGravatar?: boolean | null | undefined;
        singleUserMode?: boolean | null | undefined;
        featureInDirectory?: boolean | null | undefined;
        singleUserChannel?:
          | { __typename?: "Channel"; id: string }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetFileForUploaderQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetFileForUploaderQuery = {
  __typename?: "Query";
  fileInfo?:
    | {
        __typename?: "File";
        id?: string | null | undefined;
        filename: string;
        mimetype: string;
        encoding: string;
      }
    | null
    | undefined;
};

export type UploadFileWithUploaderMutationVariables = Exact<{
  input: Scalars["Upload"];
}>;

export type UploadFileWithUploaderMutation = {
  __typename?: "Mutation";
  uploadFile: {
    __typename?: "File";
    id?: string | null | undefined;
    filename: string;
    mimetype: string;
    encoding: string;
  };
};

export type ActivitesSelectQueryVariables = Exact<{
  filter?: InputMaybe<ActivityFilter>;
  limit?: InputMaybe<ActivityLimit>;
}>;

export type ActivitesSelectQuery = {
  __typename?: "Query";
  activities: Array<
    { __typename?: "Activity"; id: string; name: string } | null | undefined
  >;
};

export type ActivitiesSelectInitialQueryVariables = Exact<{
  filter?: InputMaybe<ActivityFilter>;
}>;

export type ActivitiesSelectInitialQuery = {
  __typename?: "Query";
  activities: Array<
    { __typename?: "Activity"; id: string; name: string } | null | undefined
  >;
};

export type RolesSelectQueryVariables = Exact<{
  filter?: InputMaybe<RolesFilter>;
  limit?: InputMaybe<QueryLimit>;
}>;

export type RolesSelectQuery = {
  __typename?: "Query";
  roles: Array<
    { __typename?: "Role"; id: string; name: string } | null | undefined
  >;
};

export type RolesSelectInitialQueryVariables = Exact<{
  filter?: InputMaybe<RolesFilter>;
}>;

export type RolesSelectInitialQuery = {
  __typename?: "Query";
  roles: Array<
    { __typename?: "Role"; id: string; name: string } | null | undefined
  >;
};

export type SelfChannelsSelectQueryVariables = Exact<{
  filter?: InputMaybe<ChannelsQueryFilter>;
}>;

export type SelfChannelsSelectQuery = {
  __typename?: "Query";
  selfChannels: Array<
    { __typename?: "Channel"; id: string; name: string } | null | undefined
  >;
};

export type UsersSelectQueryVariables = Exact<{
  filter?: InputMaybe<FullUsersFilter>;
  limit?: InputMaybe<QueryLimit>;
}>;

export type UsersSelectQuery = {
  __typename?: "Query";
  fullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        displayName?: string | null | undefined;
        username: string;
      }
    | null
    | undefined
  >;
};

export type UsersSelectInitialQueryVariables = Exact<{
  filter?: InputMaybe<FullUsersFilter>;
}>;

export type UsersSelectInitialQuery = {
  __typename?: "Query";
  fullUsers: Array<
    | {
        __typename?: "FullUser";
        id?: string | null | undefined;
        displayName?: string | null | undefined;
        username: string;
      }
    | null
    | undefined
  >;
};

export type AdminCreateRoleMutationVariables = Exact<{
  input?: InputMaybe<CreateRoleInput>;
}>;

export type AdminCreateRoleMutation = {
  __typename?: "Mutation";
  createRole: {
    __typename?: "Role";
    id: string;
    parentId?: string | null | undefined;
    name: string;
    access: {
      __typename?: "AccessTargets";
      rights: {
        __typename?: "AccessRights";
        channels?: Array<AccessUnit | null | undefined> | null | undefined;
        streamKeys?: Array<AccessUnit | null | undefined> | null | undefined;
        roles?: Array<AccessUnit | null | undefined> | null | undefined;
        users?: Array<AccessUnit | null | undefined> | null | undefined;
        activities?: Array<AccessUnit | null | undefined> | null | undefined;
        userSettings?: Array<AccessUnit | null | undefined> | null | undefined;
      };
      actions: {
        __typename?: "Actions";
        user?:
          | {
              __typename?: "UserActions";
              silence?: boolean | null | undefined;
              ban?: boolean | null | undefined;
              warn?: boolean | null | undefined;
            }
          | null
          | undefined;
      };
    };
  };
};

export type UserInfoQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserInfoQuery = {
  __typename?: "Query";
  user?:
    | {
        __typename?: "User";
        username: string;
        displayName?: string | null | undefined;
        avatar?: { __typename?: "File"; filename: string } | null | undefined;
      }
    | null
    | undefined;
};

export type ChannelCommonFragment = {
  __typename?: "Channel";
  id: string;
  name: string;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  thumbnail?:
    | { __typename?: "File"; filename: string; id?: string | null | undefined }
    | null
    | undefined;
  status?:
    | {
        __typename?: "ChannelStatus";
        id?: string | null | undefined;
        isLive?: boolean | null | undefined;
        viewers?: number | null | undefined;
      }
    | null
    | undefined;
  activity?:
    | {
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: string | null | undefined;
      }
    | null
    | undefined;
  user?:
    | {
        __typename?: "User";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              singleUserMode?: boolean | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ChannelFullFragment = {
  __typename?: "Channel";
  id: string;
  name: string;
  description?: string | null | undefined;
  slug?: string | null | undefined;
  user?:
    | {
        __typename?: "User";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
      }
    | null
    | undefined;
  thumbnail?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  activity?:
    | {
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: string | null | undefined;
        icon?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type CurrentUserFragment = {
  __typename?: "User";
  id?: string | null | undefined;
  username: string;
  displayName?: string | null | undefined;
  emailHash?: string | null | undefined;
  bio?: string | null | undefined;
  avatar?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  header?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  streamThumbnail?:
    | { __typename?: "File"; id?: string | null | undefined; filename: string }
    | null
    | undefined;
  roles: Array<
    | {
        __typename?: "Role";
        id: string;
        parentId?: string | null | undefined;
        name: string;
        access: {
          __typename?: "AccessTargets";
          rights: {
            __typename?: "AccessRights";
            channels?: Array<AccessUnit | null | undefined> | null | undefined;
            streamKeys?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
            users?: Array<AccessUnit | null | undefined> | null | undefined;
            activities?:
              | Array<AccessUnit | null | undefined>
              | null
              | undefined;
          };
          actions: {
            __typename?: "Actions";
            user?:
              | {
                  __typename?: "UserActions";
                  silence?: boolean | null | undefined;
                  ban?: boolean | null | undefined;
                  warn?: boolean | null | undefined;
                }
              | null
              | undefined;
          };
        };
      }
    | null
    | undefined
  >;
  channels: Array<
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        slug?: string | null | undefined;
        description?: string | null | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
              icon?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
              image?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined
  >;
};

export type CurrentUserFullQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserFullQuery = {
  __typename?: "Query";
  self: {
    __typename?: "User";
    id?: string | null | undefined;
    username: string;
    displayName?: string | null | undefined;
    emailHash?: string | null | undefined;
    bio?: string | null | undefined;
    avatar?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    header?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    streamThumbnail?:
      | {
          __typename?: "File";
          id?: string | null | undefined;
          filename: string;
        }
      | null
      | undefined;
    roles: Array<
      | {
          __typename?: "Role";
          id: string;
          parentId?: string | null | undefined;
          name: string;
          access: {
            __typename?: "AccessTargets";
            rights: {
              __typename?: "AccessRights";
              channels?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
              streamKeys?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
              users?: Array<AccessUnit | null | undefined> | null | undefined;
              activities?:
                | Array<AccessUnit | null | undefined>
                | null
                | undefined;
            };
            actions: {
              __typename?: "Actions";
              user?:
                | {
                    __typename?: "UserActions";
                    silence?: boolean | null | undefined;
                    ban?: boolean | null | undefined;
                    warn?: boolean | null | undefined;
                  }
                | null
                | undefined;
            };
          };
        }
      | null
      | undefined
    >;
    channels: Array<
      | {
          __typename?: "Channel";
          id: string;
          name: string;
          slug?: string | null | undefined;
          description?: string | null | undefined;
          activity?:
            | {
                __typename?: "Activity";
                id: string;
                name: string;
                verb?: string | null | undefined;
                icon?:
                  | {
                      __typename?: "File";
                      id?: string | null | undefined;
                      filename: string;
                    }
                  | null
                  | undefined;
                image?:
                  | {
                      __typename?: "File";
                      id?: string | null | undefined;
                      filename: string;
                    }
                  | null
                  | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined
    >;
  };
};

export type CurrentUserSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserSettingsQuery = {
  __typename?: "Query";
  userSettings: {
    __typename?: "UserSettings";
    id?: string | null | undefined;
    useGravatar?: boolean | null | undefined;
    singleUserMode?: boolean | null | undefined;
    singleUserChannel?:
      | { __typename?: "Channel"; id: string }
      | null
      | undefined;
  };
};

export type SignInMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn?:
    | { __typename?: "SessionResponse"; token: string; expiresAt: any }
    | null
    | undefined;
};

export type SignUpMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "User";
    id?: string | null | undefined;
    username: string;
  };
};

export type ChannelPageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ChannelPageQuery = {
  __typename?: "Query";
  channel?:
    | {
        __typename?: "Channel";
        id: string;
        name: string;
        description?: string | null | undefined;
        slug?: string | null | undefined;
        thumbnail?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        activity?:
          | {
              __typename?: "Activity";
              id: string;
              name: string;
              verb?: string | null | undefined;
            }
          | null
          | undefined;
        user?:
          | {
              __typename?: "User";
              id?: string | null | undefined;
              username: string;
              displayName?: string | null | undefined;
              avatar?:
                | {
                    __typename?: "File";
                    id?: string | null | undefined;
                    filename: string;
                  }
                | null
                | undefined;
              settings?:
                | {
                    __typename?: "UserSettings";
                    singleUserMode?: boolean | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        meta?:
          | { __typename?: "ChannelMeta"; subscriberCount: number }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ChannelPageStatusQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ChannelPageStatusQuery = {
  __typename?: "Query";
  channel?:
    | {
        __typename?: "Channel";
        status?:
          | {
              __typename?: "ChannelStatus";
              id?: string | null | undefined;
              isLive?: boolean | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type SubscribeToChannelMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SubscribeToChannelMutation = {
  __typename?: "Mutation";
  subscribe: { __typename?: "Subscription"; id: string };
};

export type UnsubscribeFromChannelMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UnsubscribeFromChannelMutation = {
  __typename?: "Mutation";
  unsubscribe: boolean;
};

export type ChannelSubscriptionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ChannelSubscriptionQuery = {
  __typename?: "Query";
  subscription?: { __typename?: "Subscription"; id: string } | null | undefined;
};

export type UserPageQueryVariables = Exact<{
  username: Scalars["ID"];
}>;

export type UserPageQuery = {
  __typename?: "Query";
  user?:
    | {
        __typename?: "User";
        id?: string | null | undefined;
        username: string;
        displayName?: string | null | undefined;
        bio?: string | null | undefined;
        emailHash?: string | null | undefined;
        channels: Array<
          | {
              __typename?: "Channel";
              id: string;
              name: string;
              slug?: string | null | undefined;
              description?: string | null | undefined;
              thumbnail?:
                | {
                    __typename?: "File";
                    filename: string;
                    id?: string | null | undefined;
                  }
                | null
                | undefined;
              status?:
                | {
                    __typename?: "ChannelStatus";
                    id?: string | null | undefined;
                    isLive?: boolean | null | undefined;
                    viewers?: number | null | undefined;
                  }
                | null
                | undefined;
              activity?:
                | {
                    __typename?: "Activity";
                    id: string;
                    name: string;
                    verb?: string | null | undefined;
                  }
                | null
                | undefined;
              user?:
                | {
                    __typename?: "User";
                    id?: string | null | undefined;
                    username: string;
                    displayName?: string | null | undefined;
                    avatar?:
                      | {
                          __typename?: "File";
                          id?: string | null | undefined;
                          filename: string;
                        }
                      | null
                      | undefined;
                    settings?:
                      | {
                          __typename?: "UserSettings";
                          singleUserMode?: boolean | null | undefined;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined
        >;
        avatar?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: "File";
              id?: string | null | undefined;
              filename: string;
            }
          | null
          | undefined;
        streamThumbnail?:
          | { __typename?: "File"; filename: string }
          | null
          | undefined;
        meta?:
          | { __typename?: "UserMeta"; followerCount: number }
          | null
          | undefined;
        settings?:
          | {
              __typename?: "UserSettings";
              useGravatar?: boolean | null | undefined;
              singleUserMode?: boolean | null | undefined;
              singleUserChannel?:
                | {
                    __typename?: "Channel";
                    id: string;
                    name: string;
                    description?: string | null | undefined;
                    slug?: string | null | undefined;
                    thumbnail?:
                      | {
                          __typename?: "File";
                          id?: string | null | undefined;
                          filename: string;
                        }
                      | null
                      | undefined;
                    activity?:
                      | {
                          __typename?: "Activity";
                          id: string;
                          name: string;
                          verb?: string | null | undefined;
                        }
                      | null
                      | undefined;
                    user?:
                      | {
                          __typename?: "User";
                          id?: string | null | undefined;
                          username: string;
                          displayName?: string | null | undefined;
                          avatar?:
                            | {
                                __typename?: "File";
                                id?: string | null | undefined;
                                filename: string;
                              }
                            | null
                            | undefined;
                          settings?:
                            | {
                                __typename?: "UserSettings";
                                singleUserMode?: boolean | null | undefined;
                              }
                            | null
                            | undefined;
                        }
                      | null
                      | undefined;
                    meta?:
                      | { __typename?: "ChannelMeta"; subscriberCount: number }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UserPageChannelStatusQueryVariables = Exact<{
  username: Scalars["ID"];
}>;

export type UserPageChannelStatusQuery = {
  __typename?: "Query";
  user?:
    | {
        __typename?: "User";
        id?: string | null | undefined;
        channels: Array<
          | {
              __typename?: "Channel";
              id: string;
              status?:
                | {
                    __typename?: "ChannelStatus";
                    id?: string | null | undefined;
                    isLive?: boolean | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export type SubscribeToUserMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type SubscribeToUserMutation = {
  __typename?: "Mutation";
  subscribe: { __typename?: "Subscription"; id: string };
};

export type UnsubscribeFromUserMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UnsubscribeFromUserMutation = {
  __typename?: "Mutation";
  unsubscribe: boolean;
};

export type UserSubscriptionQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserSubscriptionQuery = {
  __typename?: "Query";
  subscription?: { __typename?: "Subscription"; id: string } | null | undefined;
};
