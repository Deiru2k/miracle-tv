import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
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
  channels?: Maybe<Array<Maybe<AccessUnit>>>;
  streamKeys?: Maybe<Array<Maybe<AccessUnit>>>;
  roles?: Maybe<Array<Maybe<AccessUnit>>>;
  users?: Maybe<Array<Maybe<AccessUnit>>>;
  activities?: Maybe<Array<Maybe<AccessUnit>>>;
  userSettings?: Maybe<Array<Maybe<AccessUnit>>>;
};

export type AccessTargets = {
  __typename?: "AccessTargets";
  rights: AccessRights;
  actions: Actions;
};

export type AccessTargetsInput = {
  channels?: Maybe<AccessUnit>;
  users?: Maybe<AccessUnit>;
  activities?: Maybe<AccessUnit>;
  actions: ActionsInput;
};

export enum AccessUnit {
  Deny = "DENY",
  Read = "READ",
  Write = "WRITE",
  Self = "SELF",
  Inherit = "INHERIT",
}

export type Actions = {
  __typename?: "Actions";
  user?: Maybe<UserActions>;
};

export type ActionsInput = {
  user?: Maybe<UserActionsInput>;
};

export type Activity = {
  __typename?: "Activity";
  id: Scalars["ID"];
  icon?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  verb?: Maybe<Scalars["String"]>;
};

export type ActivityFilter = {
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  icon?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  verb?: Maybe<Scalars["String"]>;
};

export type ActivityLimit = {
  limit?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
};

export type AuthRightConfig = {
  unit: AccessUnit;
  subject: Scalars["String"];
};

export type ChangePasswordInput = {
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type Channel = {
  __typename?: "Channel";
  id: Scalars["ID"];
  user?: Maybe<User>;
  activity?: Maybe<Activity>;
  slug?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<File>;
  status?: Maybe<ChannelStatus>;
  meta?: Maybe<ChannelMeta>;
};

export type ChannelMeta = {
  __typename?: "ChannelMeta";
  subscriberCount: Scalars["Int"];
};

export type ChannelStatus = {
  __typename?: "ChannelStatus";
  id?: Maybe<Scalars["ID"]>;
  isLive?: Maybe<Scalars["Boolean"]>;
  viewers?: Maybe<Scalars["Int"]>;
  length?: Maybe<Scalars["Int"]>;
};

export type ChannelsQueryFilter = {
  id?: Maybe<Scalars["ID"]>;
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  userId?: Maybe<Scalars["ID"]>;
  userIds?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  activityId?: Maybe<Scalars["ID"]>;
  slug?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type CommunityPost = {
  __typename?: "CommunityPost";
  id: Scalars["ID"];
  user: User;
  body: Scalars["String"];
};

export type CommunityPostInput = {
  body: Scalars["String"];
};

export type CommunityPostsFilter = {
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  userId?: Maybe<Scalars["ID"]>;
  body?: Maybe<Scalars["String"]>;
};

export type CreateActivityInput = {
  icon?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  verb?: Maybe<Scalars["String"]>;
};

export type CreateChannelInput = {
  userId?: Maybe<Scalars["ID"]>;
  activityId?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  slug?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["ID"]>;
};

export type CreateRoleInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
  access: AccessTargetsInput;
  parentId: Scalars["ID"];
};

export type CreateStreamKeyInput = {
  userId: Scalars["ID"];
  channelId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type CreateUserInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
};

export type File = {
  __typename?: "File";
  filename: Scalars["String"];
  mimetype: Scalars["String"];
  encoding: Scalars["String"];
  id?: Maybe<Scalars["ID"]>;
};

export type InfoResponse = {
  __typename?: "InfoResponse";
  name: Scalars["String"];
  version: Scalars["String"];
  packageName: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createActivity: Activity;
  updateActivity: Activity;
  createChannel: Channel;
  updateChannel: Channel;
  deleteChannel: Scalars["Boolean"];
  createCommunityPosts: CommunityPost;
  deleteCommunityPost?: Maybe<Scalars["Boolean"]>;
  uploadFile: File;
  createRole: Role;
  updateRole: Role;
  deleteRole: Scalars["Boolean"];
  ping: Scalars["String"];
  createStreamKey: StreamKey;
  revokeStreamKeys: Scalars["Boolean"];
  revokeAllStreamKeys: Scalars["Boolean"];
  revokeStreamKey: Scalars["Boolean"];
  subscribe: Subscription;
  unsubscribe: Scalars["Boolean"];
  signUp: User;
  signIn?: Maybe<SessionResponse>;
  updateUser?: Maybe<User>;
  updateSelf?: Maybe<User>;
  revokeSelfSessions?: Maybe<Scalars["Boolean"]>;
  updateSelfAccount?: Maybe<UserAccountDetails>;
  changeSelfPassword?: Maybe<Scalars["Boolean"]>;
  updateUserSettings?: Maybe<UserSettings>;
};

export type MutationCreateActivityArgs = {
  input?: Maybe<CreateActivityInput>;
};

export type MutationUpdateActivityArgs = {
  input?: Maybe<UpdateActivityInput>;
};

export type MutationCreateChannelArgs = {
  input?: Maybe<CreateChannelInput>;
};

export type MutationUpdateChannelArgs = {
  input?: Maybe<UpdateChannelInput>;
};

export type MutationDeleteChannelArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCommunityPostsArgs = {
  input: CommunityPostInput;
};

export type MutationDeleteCommunityPostArgs = {
  id: Scalars["ID"];
};

export type MutationUploadFileArgs = {
  file: Scalars["Upload"];
};

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};

export type MutationDeleteRoleArgs = {
  id: Scalars["ID"];
};

export type MutationCreateStreamKeyArgs = {
  input: CreateStreamKeyInput;
};

export type MutationRevokeStreamKeysArgs = {
  input: RevokeStreamKeysInput;
};

export type MutationRevokeAllStreamKeysArgs = {
  input: RevokeAllStreamKeysInput;
};

export type MutationRevokeStreamKeyArgs = {
  key: Scalars["ID"];
};

export type MutationSubscribeArgs = {
  input: SubscriptionInput;
};

export type MutationUnsubscribeArgs = {
  input: SubscriptionInput;
};

export type MutationSignUpArgs = {
  input: CreateUserInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpdateSelfArgs = {
  input: UpdateSelfInput;
};

export type MutationRevokeSelfSessionsArgs = {
  input: Array<Maybe<Scalars["String"]>>;
};

export type MutationUpdateSelfAccountArgs = {
  input?: Maybe<UpdateUserAccountInput>;
};

export type MutationChangeSelfPasswordArgs = {
  input?: Maybe<ChangePasswordInput>;
};

export type MutationUpdateUserSettingsArgs = {
  input: UpdateUserSettingsInput;
};

export type Query = {
  __typename?: "Query";
  activity?: Maybe<Activity>;
  activities: Array<Maybe<Activity>>;
  channel?: Maybe<Channel>;
  channels: Array<Maybe<Channel>>;
  selfChannels: Array<Maybe<Channel>>;
  channelSubscriptions: Array<Maybe<Channel>>;
  channelStatus?: Maybe<ChannelStatus>;
  communityPosts: Array<Maybe<CommunityPost>>;
  fileInfo?: Maybe<File>;
  role?: Maybe<Role>;
  roles: Array<Maybe<Role>>;
  info: InfoResponse;
  test: TestResponse;
  streamKeys: Array<Maybe<StreamKey>>;
  selfStreamKeys: Array<Maybe<StreamKey>>;
  streamKeysByChannelId: Array<Maybe<StreamKey>>;
  subscription?: Maybe<Subscription>;
  selfSubscriptions: Array<Maybe<Subscription>>;
  selfSubscribedChannels: Array<Maybe<Channel>>;
  selfSubscribedUsers: Array<Maybe<User>>;
  users: Array<Maybe<User>>;
  userDirectory: Array<Maybe<User>>;
  self: User;
  selfAccount: UserAccountDetails;
  selfSessions?: Maybe<Array<Maybe<Session>>>;
  user?: Maybe<User>;
  userSettings: UserSettings;
};

export type QueryActivityArgs = {
  id: Scalars["ID"];
};

export type QueryActivitiesArgs = {
  filter?: Maybe<ActivityFilter>;
  limit?: Maybe<ActivityLimit>;
};

export type QueryChannelArgs = {
  id: Scalars["ID"];
};

export type QueryChannelsArgs = {
  filter?: Maybe<ChannelsQueryFilter>;
  limit?: Maybe<QueryLimit>;
};

export type QuerySelfChannelsArgs = {
  filter?: Maybe<ChannelsQueryFilter>;
};

export type QueryChannelSubscriptionsArgs = {
  filter?: Maybe<ChannelsQueryFilter>;
  limit?: Maybe<QueryLimit>;
};

export type QueryChannelStatusArgs = {
  id: Scalars["ID"];
};

export type QueryCommunityPostsArgs = {
  filter?: Maybe<CommunityPostsFilter>;
  limit?: Maybe<QueryLimit>;
};

export type QueryFileInfoArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
};

export type QueryRolesArgs = {
  filter?: Maybe<UpdateRoleInput>;
};

export type QueryStreamKeysByChannelIdArgs = {
  channelId: Scalars["ID"];
};

export type QuerySubscriptionArgs = {
  input?: Maybe<SubscriptionByTargetId>;
};

export type QueryUsersArgs = {
  filter?: Maybe<UsersFilter>;
  limit?: Maybe<QueryLimit>;
};

export type QueryUserDirectoryArgs = {
  limit?: Maybe<QueryLimit>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryLimit = {
  limit?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
};

export type RevokeAllStreamKeysInput = {
  userId: Scalars["ID"];
};

export type RevokeStreamKeysInput = {
  userId: Scalars["ID"];
  channelId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
};

export type Role = {
  __typename?: "Role";
  id: Scalars["ID"];
  name: Scalars["String"];
  access: AccessTargets;
  parentId?: Maybe<Scalars["ID"]>;
};

export type Session = {
  __typename?: "Session";
  id: Scalars["ID"];
  user: Scalars["ID"];
  expiresAt: Scalars["DateTime"];
  lastUsedAt: Scalars["DateTime"];
  userAgent: Scalars["String"];
  ip: Scalars["String"];
  isCurrentSession: Scalars["Boolean"];
};

export type SessionResponse = {
  __typename?: "SessionResponse";
  token: Scalars["ID"];
  expiresAt: Scalars["DateTime"];
};

export type SignInInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type StreamKey = {
  __typename?: "StreamKey";
  id: Scalars["ID"];
  user: User;
  channel: Channel;
  name?: Maybe<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  id: Scalars["ID"];
  target: SubscriptionTarget;
  targetId: Scalars["ID"];
  sourceId: Scalars["ID"];
};

export type SubscriptionByTargetId = {
  targetId: Scalars["ID"];
  target: SubscriptionTarget;
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
  sourceId?: Maybe<Scalars["ID"]>;
  targetId?: Maybe<Scalars["ID"]>;
  target?: Maybe<SubscriptionTarget>;
};

export type TestResponse = {
  __typename?: "TestResponse";
  secret: Scalars["String"];
};

export type UpdateActivityInput = {
  id: Scalars["ID"];
  icon?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  verb?: Maybe<Scalars["String"]>;
};

export type UpdateChannelInput = {
  id: Scalars["ID"];
  activityId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["ID"]>;
};

export type UpdateRoleInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  access?: Maybe<AccessTargetsInput>;
  parentId?: Maybe<Scalars["ID"]>;
};

export type UpdateSelfInput = {
  displayName?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  singleUserMode?: Maybe<Scalars["Boolean"]>;
  avatar?: Maybe<Scalars["ID"]>;
  header?: Maybe<Scalars["ID"]>;
  streamThumbnail?: Maybe<Scalars["ID"]>;
};

export type UpdateUserAccountInput = {
  email: Scalars["String"];
};

export type UpdateUserInput = {
  id?: Maybe<Scalars["ID"]>;
  displayName?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  singleUserMode?: Maybe<Scalars["Boolean"]>;
  avatar?: Maybe<Scalars["ID"]>;
  header?: Maybe<Scalars["ID"]>;
  streamThumbnail?: Maybe<Scalars["ID"]>;
};

export type UpdateUserSettingsInput = {
  singleUserMode?: Maybe<Scalars["Boolean"]>;
  useGravatar?: Maybe<Scalars["Boolean"]>;
  singleUserChannel?: Maybe<Scalars["ID"]>;
  featureInDirectory?: Maybe<Scalars["Boolean"]>;
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["ID"]>;
  username: Scalars["String"];
  displayName?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  emailHash?: Maybe<Scalars["String"]>;
  roles: Array<Maybe<Role>>;
  channels: Array<Maybe<Channel>>;
  avatar?: Maybe<File>;
  header?: Maybe<File>;
  streamThumbnail?: Maybe<File>;
  settings?: Maybe<UserSettings>;
  meta?: Maybe<UserMeta>;
};

export type UserAccountDetails = {
  __typename?: "UserAccountDetails";
  id?: Maybe<Scalars["ID"]>;
  username: Scalars["String"];
  email: Scalars["String"];
};

export type UserActions = {
  __typename?: "UserActions";
  silence?: Maybe<Scalars["Boolean"]>;
  ban?: Maybe<Scalars["Boolean"]>;
  warn?: Maybe<Scalars["Boolean"]>;
};

export type UserActionsInput = {
  silence?: Maybe<Scalars["Boolean"]>;
  ban?: Maybe<Scalars["Boolean"]>;
  warn?: Maybe<Scalars["Boolean"]>;
};

export type UserMeta = {
  __typename?: "UserMeta";
  followerCount: Scalars["Int"];
};

export type UserSettings = {
  __typename?: "UserSettings";
  id?: Maybe<Scalars["ID"]>;
  useGravatar?: Maybe<Scalars["Boolean"]>;
  singleUserMode?: Maybe<Scalars["Boolean"]>;
  singleUserChannel?: Maybe<Channel>;
  featureInDirectory?: Maybe<Scalars["Boolean"]>;
};

export type UsersFilter = {
  ids?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  username?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
  AccessTargets: ResolverTypeWrapper<AccessTargets>;
  AccessTargetsInput: AccessTargetsInput;
  AccessUnit: AccessUnit;
  Actions: ResolverTypeWrapper<Actions>;
  ActionsInput: ActionsInput;
  Activity: ResolverTypeWrapper<Activity>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ActivityFilter: ActivityFilter;
  ActivityLimit: ActivityLimit;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  AuthRightConfig: AuthRightConfig;
  ChangePasswordInput: ChangePasswordInput;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelMeta: ResolverTypeWrapper<ChannelMeta>;
  ChannelStatus: ResolverTypeWrapper<ChannelStatus>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  ChannelsQueryFilter: ChannelsQueryFilter;
  CommunityPost: ResolverTypeWrapper<CommunityPost>;
  CommunityPostInput: CommunityPostInput;
  CommunityPostsFilter: CommunityPostsFilter;
  CreateActivityInput: CreateActivityInput;
  CreateChannelInput: CreateChannelInput;
  CreateRoleInput: CreateRoleInput;
  CreateStreamKeyInput: CreateStreamKeyInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  File: ResolverTypeWrapper<File>;
  InfoResponse: ResolverTypeWrapper<InfoResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  QueryLimit: QueryLimit;
  RevokeAllStreamKeysInput: RevokeAllStreamKeysInput;
  RevokeStreamKeysInput: RevokeStreamKeysInput;
  Role: ResolverTypeWrapper<Role>;
  Session: ResolverTypeWrapper<Session>;
  SessionResponse: ResolverTypeWrapper<SessionResponse>;
  SignInInput: SignInInput;
  StreamKey: ResolverTypeWrapper<StreamKey>;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionByTargetId: SubscriptionByTargetId;
  SubscriptionInput: SubscriptionInput;
  SubscriptionTarget: SubscriptionTarget;
  SubscriptionsFilter: SubscriptionsFilter;
  TestResponse: ResolverTypeWrapper<TestResponse>;
  UpdateActivityInput: UpdateActivityInput;
  UpdateChannelInput: UpdateChannelInput;
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
  UsersFilter: UsersFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessRights: AccessRights;
  AccessTargets: AccessTargets;
  AccessTargetsInput: AccessTargetsInput;
  Actions: Actions;
  ActionsInput: ActionsInput;
  Activity: Activity;
  ID: Scalars["ID"];
  String: Scalars["String"];
  ActivityFilter: ActivityFilter;
  ActivityLimit: ActivityLimit;
  Int: Scalars["Int"];
  AuthRightConfig: AuthRightConfig;
  ChangePasswordInput: ChangePasswordInput;
  Channel: Channel;
  ChannelMeta: ChannelMeta;
  ChannelStatus: ChannelStatus;
  Boolean: Scalars["Boolean"];
  ChannelsQueryFilter: ChannelsQueryFilter;
  CommunityPost: CommunityPost;
  CommunityPostInput: CommunityPostInput;
  CommunityPostsFilter: CommunityPostsFilter;
  CreateActivityInput: CreateActivityInput;
  CreateChannelInput: CreateChannelInput;
  CreateRoleInput: CreateRoleInput;
  CreateStreamKeyInput: CreateStreamKeyInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars["DateTime"];
  File: File;
  InfoResponse: InfoResponse;
  Mutation: {};
  Query: {};
  QueryLimit: QueryLimit;
  RevokeAllStreamKeysInput: RevokeAllStreamKeysInput;
  RevokeStreamKeysInput: RevokeStreamKeysInput;
  Role: Role;
  Session: Session;
  SessionResponse: SessionResponse;
  SignInInput: SignInInput;
  StreamKey: StreamKey;
  Subscription: {};
  SubscriptionByTargetId: SubscriptionByTargetId;
  SubscriptionInput: SubscriptionInput;
  SubscriptionsFilter: SubscriptionsFilter;
  TestResponse: TestResponse;
  UpdateActivityInput: UpdateActivityInput;
  UpdateChannelInput: UpdateChannelInput;
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
  UsersFilter: UsersFilter;
};

export type AuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  rights?: Maybe<Array<Maybe<AuthRightConfig>>>;
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
  channels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  streamKeys?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  roles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  activities?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["AccessUnit"]>>>,
    ParentType,
    ContextType
  >;
  userSettings?: Resolver<
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
  rights?: Resolver<ResolversTypes["AccessRights"], ParentType, ContextType>;
  actions?: Resolver<ResolversTypes["Actions"], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  verb?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Channel"] = ResolversParentTypes["Channel"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  activity?: Resolver<
    Maybe<ResolversTypes["Activity"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  thumbnail?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  status?: Resolver<
    Maybe<ResolversTypes["ChannelStatus"]>,
    ParentType,
    ContextType
  >;
  meta?: Resolver<
    Maybe<ResolversTypes["ChannelMeta"]>,
    ParentType,
    ContextType
  >;
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
  viewers?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommunityPostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommunityPost"] = ResolversParentTypes["CommunityPost"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  filename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InfoResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InfoResponse"] = ResolversParentTypes["InfoResponse"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  version?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  packageName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateActivityArgs, never>
  >;
  updateActivity?: Resolver<
    ResolversTypes["Activity"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateActivityArgs, never>
  >;
  createChannel?: Resolver<
    ResolversTypes["Channel"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChannelArgs, never>
  >;
  updateChannel?: Resolver<
    ResolversTypes["Channel"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChannelArgs, never>
  >;
  deleteChannel?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteChannelArgs, "id">
  >;
  createCommunityPosts?: Resolver<
    ResolversTypes["CommunityPost"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommunityPostsArgs, "input">
  >;
  deleteCommunityPost?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommunityPostArgs, "id">
  >;
  uploadFile?: Resolver<
    ResolversTypes["File"],
    ParentType,
    ContextType,
    RequireFields<MutationUploadFileArgs, "file">
  >;
  createRole?: Resolver<
    ResolversTypes["Role"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateRoleArgs, never>
  >;
  updateRole?: Resolver<
    ResolversTypes["Role"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateRoleArgs, never>
  >;
  deleteRole?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRoleArgs, "id">
  >;
  ping?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createStreamKey?: Resolver<
    ResolversTypes["StreamKey"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateStreamKeyArgs, "input">
  >;
  revokeStreamKeys?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeStreamKeysArgs, "input">
  >;
  revokeAllStreamKeys?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeAllStreamKeysArgs, "input">
  >;
  revokeStreamKey?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRevokeStreamKeyArgs, "key">
  >;
  subscribe?: Resolver<
    ResolversTypes["Subscription"],
    ParentType,
    ContextType,
    RequireFields<MutationSubscribeArgs, "input">
  >;
  unsubscribe?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationUnsubscribeArgs, "input">
  >;
  signUp?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "input">
  >;
  signIn?: Resolver<
    Maybe<ResolversTypes["SessionResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignInArgs, "input">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
  updateSelf?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSelfArgs, "input">
  >;
  revokeSelfSessions?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRevokeSelfSessionsArgs, "input">
  >;
  updateSelfAccount?: Resolver<
    Maybe<ResolversTypes["UserAccountDetails"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSelfAccountArgs, never>
  >;
  changeSelfPassword?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeSelfPasswordArgs, never>
  >;
  updateUserSettings?: Resolver<
    Maybe<ResolversTypes["UserSettings"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserSettingsArgs, "input">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  activity?: Resolver<
    Maybe<ResolversTypes["Activity"]>,
    ParentType,
    ContextType,
    RequireFields<QueryActivityArgs, "id">
  >;
  activities?: Resolver<
    Array<Maybe<ResolversTypes["Activity"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryActivitiesArgs, never>
  >;
  channel?: Resolver<
    Maybe<ResolversTypes["Channel"]>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelArgs, "id">
  >;
  channels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelsArgs, never>
  >;
  selfChannels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QuerySelfChannelsArgs, never>
  >;
  channelSubscriptions?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelSubscriptionsArgs, never>
  >;
  channelStatus?: Resolver<
    Maybe<ResolversTypes["ChannelStatus"]>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelStatusArgs, "id">
  >;
  communityPosts?: Resolver<
    Array<Maybe<ResolversTypes["CommunityPost"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryCommunityPostsArgs, never>
  >;
  fileInfo?: Resolver<
    Maybe<ResolversTypes["File"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFileInfoArgs, never>
  >;
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
  info?: Resolver<ResolversTypes["InfoResponse"], ParentType, ContextType>;
  test?: Resolver<ResolversTypes["TestResponse"], ParentType, ContextType>;
  streamKeys?: Resolver<
    Array<Maybe<ResolversTypes["StreamKey"]>>,
    ParentType,
    ContextType
  >;
  selfStreamKeys?: Resolver<
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
  selfSubscriptions?: Resolver<
    Array<Maybe<ResolversTypes["Subscription"]>>,
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
  users?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersArgs, never>
  >;
  userDirectory?: Resolver<
    Array<Maybe<ResolversTypes["User"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryUserDirectoryArgs, never>
  >;
  self?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  selfAccount?: Resolver<
    ResolversTypes["UserAccountDetails"],
    ParentType,
    ContextType
  >;
  selfSessions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Session"]>>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  userSettings?: Resolver<
    ResolversTypes["UserSettings"],
    ParentType,
    ContextType
  >;
};

export type RoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Role"] = ResolversParentTypes["Role"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  access?: Resolver<ResolversTypes["AccessTargets"], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Session"] = ResolversParentTypes["Session"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  lastUsedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  userAgent?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  ip?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isCurrentSession?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SessionResponse"] = ResolversParentTypes["SessionResponse"]
> = {
  token?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StreamKeyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["StreamKey"] = ResolversParentTypes["StreamKey"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes["Channel"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  sourceId?: SubscriptionResolver<
    ResolversTypes["ID"],
    "sourceId",
    ParentType,
    ContextType
  >;
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
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  displayName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  emailHash?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  roles?: Resolver<
    Array<Maybe<ResolversTypes["Role"]>>,
    ParentType,
    ContextType
  >;
  channels?: Resolver<
    Array<Maybe<ResolversTypes["Channel"]>>,
    ParentType,
    ContextType
  >;
  avatar?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  header?: Resolver<Maybe<ResolversTypes["File"]>, ParentType, ContextType>;
  streamThumbnail?: Resolver<
    Maybe<ResolversTypes["File"]>,
    ParentType,
    ContextType
  >;
  settings?: Resolver<
    Maybe<ResolversTypes["UserSettings"]>,
    ParentType,
    ContextType
  >;
  meta?: Resolver<Maybe<ResolversTypes["UserMeta"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserAccountDetailsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserAccountDetails"] = ResolversParentTypes["UserAccountDetails"]
> = {
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserActionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserActions"] = ResolversParentTypes["UserActions"]
> = {
  silence?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  ban?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
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
  id?: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  useGravatar?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  singleUserMode?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  singleUserChannel?: Resolver<
    Maybe<ResolversTypes["Channel"]>,
    ParentType,
    ContextType
  >;
  featureInDirectory?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
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
  CommunityPost?: CommunityPostResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  InfoResponse?: InfoResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionResponse?: SessionResponseResolvers<ContextType>;
  StreamKey?: StreamKeyResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TestResponse?: TestResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserAccountDetails?: UserAccountDetailsResolvers<ContextType>;
  UserActions?: UserActionsResolvers<ContextType>;
  UserMeta?: UserMetaResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};

export type ChannelViewFragment = {
  __typename?: "Channel";
  id: string;
  name: string;
  description?: Maybe<string>;
  slug?: Maybe<string>;
  thumbnail?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
  }>;
  activity?: Maybe<{
    __typename?: "Activity";
    id: string;
    name: string;
    verb?: Maybe<string>;
  }>;
  user?: Maybe<{
    __typename?: "User";
    id?: Maybe<string>;
    username: string;
    displayName?: Maybe<string>;
    avatar?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    settings?: Maybe<{
      __typename?: "UserSettings";
      singleUserMode?: Maybe<boolean>;
    }>;
  }>;
  meta?: Maybe<{ __typename?: "ChannelMeta"; subscriberCount: number }>;
};

export type ChannelViewStatusFragment = {
  __typename?: "ChannelStatus";
  id?: Maybe<string>;
  isLive?: Maybe<boolean>;
};

export type DashboardChannelsQueryVariables = Exact<{ [key: string]: never }>;

export type DashboardChannelsQuery = {
  __typename?: "Query";
  channels: Array<
    Maybe<{
      __typename?: "Channel";
      id: string;
      name: string;
      slug?: Maybe<string>;
      description?: Maybe<string>;
      thumbnail?: Maybe<{
        __typename?: "File";
        filename: string;
        id?: Maybe<string>;
      }>;
      status?: Maybe<{
        __typename?: "ChannelStatus";
        id?: Maybe<string>;
        isLive?: Maybe<boolean>;
        viewers?: Maybe<number>;
      }>;
      activity?: Maybe<{
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: Maybe<string>;
      }>;
      user?: Maybe<{
        __typename?: "User";
        id?: Maybe<string>;
        username: string;
        displayName?: Maybe<string>;
        avatar?: Maybe<{
          __typename?: "File";
          id?: Maybe<string>;
          filename: string;
        }>;
        settings?: Maybe<{
          __typename?: "UserSettings";
          singleUserMode?: Maybe<boolean>;
        }>;
      }>;
    }>
  >;
};

export type DashboardFollowedChannelsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type DashboardFollowedChannelsQuery = {
  __typename?: "Query";
  selfSubscribedChannels: Array<
    Maybe<{
      __typename?: "Channel";
      id: string;
      name: string;
      slug?: Maybe<string>;
      description?: Maybe<string>;
      thumbnail?: Maybe<{
        __typename?: "File";
        filename: string;
        id?: Maybe<string>;
      }>;
      status?: Maybe<{
        __typename?: "ChannelStatus";
        id?: Maybe<string>;
        isLive?: Maybe<boolean>;
        viewers?: Maybe<number>;
      }>;
      activity?: Maybe<{
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: Maybe<string>;
      }>;
      user?: Maybe<{
        __typename?: "User";
        id?: Maybe<string>;
        username: string;
        displayName?: Maybe<string>;
        avatar?: Maybe<{
          __typename?: "File";
          id?: Maybe<string>;
          filename: string;
        }>;
        settings?: Maybe<{
          __typename?: "UserSettings";
          singleUserMode?: Maybe<boolean>;
        }>;
      }>;
    }>
  >;
};

export type UserDirectoryProfileFragment = {
  __typename?: "User";
  id?: Maybe<string>;
  username: string;
  displayName?: Maybe<string>;
  bio?: Maybe<string>;
  emailHash?: Maybe<string>;
  avatar?: Maybe<{ __typename?: "File"; id?: Maybe<string>; filename: string }>;
  header?: Maybe<{ __typename?: "File"; id?: Maybe<string>; filename: string }>;
  meta?: Maybe<{ __typename?: "UserMeta"; followerCount: number }>;
  settings?: Maybe<{
    __typename?: "UserSettings";
    useGravatar?: Maybe<boolean>;
  }>;
};

export type UsersDirectoryQueryVariables = Exact<{ [key: string]: never }>;

export type UsersDirectoryQuery = {
  __typename?: "Query";
  userDirectory: Array<
    Maybe<{
      __typename?: "User";
      id?: Maybe<string>;
      username: string;
      displayName?: Maybe<string>;
      bio?: Maybe<string>;
      emailHash?: Maybe<string>;
      avatar?: Maybe<{
        __typename?: "File";
        id?: Maybe<string>;
        filename: string;
      }>;
      header?: Maybe<{
        __typename?: "File";
        id?: Maybe<string>;
        filename: string;
      }>;
      meta?: Maybe<{ __typename?: "UserMeta"; followerCount: number }>;
      settings?: Maybe<{
        __typename?: "UserSettings";
        useGravatar?: Maybe<boolean>;
      }>;
    }>
  >;
};

export type UserProfileFragment = {
  __typename?: "User";
  id?: Maybe<string>;
  username: string;
  displayName?: Maybe<string>;
  bio?: Maybe<string>;
  emailHash?: Maybe<string>;
  channels: Array<
    Maybe<{
      __typename?: "Channel";
      id: string;
      name: string;
      slug?: Maybe<string>;
      description?: Maybe<string>;
      thumbnail?: Maybe<{
        __typename?: "File";
        filename: string;
        id?: Maybe<string>;
      }>;
      status?: Maybe<{
        __typename?: "ChannelStatus";
        id?: Maybe<string>;
        isLive?: Maybe<boolean>;
        viewers?: Maybe<number>;
      }>;
      activity?: Maybe<{
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: Maybe<string>;
      }>;
      user?: Maybe<{
        __typename?: "User";
        id?: Maybe<string>;
        username: string;
        displayName?: Maybe<string>;
        avatar?: Maybe<{
          __typename?: "File";
          id?: Maybe<string>;
          filename: string;
        }>;
        settings?: Maybe<{
          __typename?: "UserSettings";
          singleUserMode?: Maybe<boolean>;
        }>;
      }>;
    }>
  >;
  avatar?: Maybe<{ __typename?: "File"; id?: Maybe<string>; filename: string }>;
  header?: Maybe<{ __typename?: "File"; id?: Maybe<string>; filename: string }>;
  streamThumbnail?: Maybe<{ __typename?: "File"; filename: string }>;
  meta?: Maybe<{ __typename?: "UserMeta"; followerCount: number }>;
  settings?: Maybe<{
    __typename?: "UserSettings";
    useGravatar?: Maybe<boolean>;
    singleUserMode?: Maybe<boolean>;
    singleUserChannel?: Maybe<{
      __typename?: "Channel";
      id: string;
      name: string;
      description?: Maybe<string>;
      slug?: Maybe<string>;
      thumbnail?: Maybe<{
        __typename?: "File";
        id?: Maybe<string>;
        filename: string;
      }>;
      activity?: Maybe<{
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: Maybe<string>;
      }>;
      user?: Maybe<{
        __typename?: "User";
        id?: Maybe<string>;
        username: string;
        displayName?: Maybe<string>;
        avatar?: Maybe<{
          __typename?: "File";
          id?: Maybe<string>;
          filename: string;
        }>;
        settings?: Maybe<{
          __typename?: "UserSettings";
          singleUserMode?: Maybe<boolean>;
        }>;
      }>;
      meta?: Maybe<{ __typename?: "ChannelMeta"; subscriberCount: number }>;
    }>;
  }>;
};

export type SelfSessionsQueryVariables = Exact<{ [key: string]: never }>;

export type SelfSessionsQuery = {
  __typename?: "Query";
  selfSessions?: Maybe<
    Array<
      Maybe<{
        __typename?: "Session";
        id: string;
        expiresAt: any;
        lastUsedAt: any;
        userAgent: string;
        user: string;
        ip: string;
        isCurrentSession: boolean;
      }>
    >
  >;
};

export type RevokeSelfSessionsMutationVariables = Exact<{
  input: Array<Maybe<Scalars["String"]>> | Maybe<Scalars["String"]>;
}>;

export type RevokeSelfSessionsMutation = {
  __typename?: "Mutation";
  revokeSelfSessions?: Maybe<boolean>;
};

export type AccountDetailsQueryVariables = Exact<{ [key: string]: never }>;

export type AccountDetailsQuery = {
  __typename?: "Query";
  selfAccount: {
    __typename?: "UserAccountDetails";
    id?: Maybe<string>;
    username: string;
    email: string;
  };
};

export type ChangeAccountPasswordMutationVariables = Exact<{
  input?: Maybe<ChangePasswordInput>;
}>;

export type ChangeAccountPasswordMutation = {
  __typename?: "Mutation";
  changeSelfPassword?: Maybe<boolean>;
};

export type SettingsUpdateAccountMutationVariables = Exact<{
  input?: Maybe<UpdateUserAccountInput>;
}>;

export type SettingsUpdateAccountMutation = {
  __typename?: "Mutation";
  updateSelfAccount?: Maybe<{
    __typename?: "UserAccountDetails";
    id?: Maybe<string>;
    username: string;
    email: string;
  }>;
};

export type SettingsChangePasswordMutationVariables = Exact<{
  input?: Maybe<ChangePasswordInput>;
}>;

export type SettingsChangePasswordMutation = {
  __typename?: "Mutation";
  changeSelfPassword?: Maybe<boolean>;
};

export type SelfStreamKeysQueryVariables = Exact<{ [key: string]: never }>;

export type SelfStreamKeysQuery = {
  __typename?: "Query";
  selfStreamKeys: Array<
    Maybe<{
      __typename?: "StreamKey";
      id: string;
      name?: Maybe<string>;
      channel: { __typename?: "Channel"; id: string; name: string };
    }>
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
  channel?: Maybe<{
    __typename?: "Channel";
    id: string;
    name: string;
    description?: Maybe<string>;
    slug?: Maybe<string>;
    thumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    activity?: Maybe<{
      __typename?: "Activity";
      id: string;
      name: string;
      verb?: Maybe<string>;
      icon?: Maybe<string>;
    }>;
  }>;
  selfStreamKeys: Array<
    Maybe<{
      __typename?: "StreamKey";
      id: string;
      channel: { __typename?: "Channel"; id: string };
    }>
  >;
};

export type EditChannelMutationVariables = Exact<{
  input?: Maybe<UpdateChannelInput>;
}>;

export type EditChannelMutation = {
  __typename?: "Mutation";
  updateChannel: {
    __typename?: "Channel";
    id: string;
    name: string;
    description?: Maybe<string>;
    slug?: Maybe<string>;
    thumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    activity?: Maybe<{
      __typename?: "Activity";
      id: string;
      name: string;
      verb?: Maybe<string>;
      icon?: Maybe<string>;
    }>;
  };
};

export type UserSettingsChannelKeysQueryVariables = Exact<{
  channelId: Scalars["ID"];
}>;

export type UserSettingsChannelKeysQuery = {
  __typename?: "Query";
  streamKeysByChannelId: Array<
    Maybe<{
      __typename?: "StreamKey";
      id: string;
      name?: Maybe<string>;
      channel: { __typename?: "Channel"; id: string; name: string };
    }>
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
  filter?: Maybe<ChannelsQueryFilter>;
}>;

export type UserSettingsChannelsQuery = {
  __typename?: "Query";
  channels: Array<
    Maybe<{
      __typename?: "Channel";
      id: string;
      name: string;
      description?: Maybe<string>;
      slug?: Maybe<string>;
      thumbnail?: Maybe<{
        __typename?: "File";
        id?: Maybe<string>;
        filename: string;
      }>;
      activity?: Maybe<{
        __typename?: "Activity";
        id: string;
        name: string;
        verb?: Maybe<string>;
        icon?: Maybe<string>;
      }>;
    }>
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
  input?: Maybe<CreateChannelInput>;
}>;

export type UserSettingsCreateChannelMutation = {
  __typename?: "Mutation";
  createChannel: {
    __typename?: "Channel";
    id: string;
    name: string;
    description?: Maybe<string>;
    slug?: Maybe<string>;
    thumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    activity?: Maybe<{
      __typename?: "Activity";
      id: string;
      name: string;
      verb?: Maybe<string>;
      icon?: Maybe<string>;
    }>;
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
    name?: Maybe<string>;
  };
};

export type UserSettingsProfileFragmentFragment = {
  __typename?: "User";
  id?: Maybe<string>;
  username: string;
  displayName?: Maybe<string>;
  emailHash?: Maybe<string>;
  bio?: Maybe<string>;
  avatar?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
    encoding: string;
    mimetype: string;
  }>;
  streamThumbnail?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
    encoding: string;
    mimetype: string;
  }>;
  header?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
    encoding: string;
    mimetype: string;
  }>;
};

export type UserSettingsProfileQueryVariables = Exact<{ [key: string]: never }>;

export type UserSettingsProfileQuery = {
  __typename?: "Query";
  self: {
    __typename?: "User";
    id?: Maybe<string>;
    username: string;
    displayName?: Maybe<string>;
    emailHash?: Maybe<string>;
    bio?: Maybe<string>;
    avatar?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
      encoding: string;
      mimetype: string;
    }>;
    streamThumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
      encoding: string;
      mimetype: string;
    }>;
    header?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
      encoding: string;
      mimetype: string;
    }>;
  };
};

export type UpdateUserSettingsProfileMutationVariables = Exact<{
  input: UpdateSelfInput;
}>;

export type UpdateUserSettingsProfileMutation = {
  __typename?: "Mutation";
  updateSelf?: Maybe<{
    __typename?: "User";
    id?: Maybe<string>;
    username: string;
    displayName?: Maybe<string>;
    emailHash?: Maybe<string>;
    bio?: Maybe<string>;
    avatar?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
      encoding: string;
      mimetype: string;
    }>;
    streamThumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
      encoding: string;
      mimetype: string;
    }>;
    header?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
      encoding: string;
      mimetype: string;
    }>;
  }>;
};

export type UserSettingsPreferencesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type UserSettingsPreferencesQuery = {
  __typename?: "Query";
  userSettings: {
    __typename?: "UserSettings";
    id?: Maybe<string>;
    useGravatar?: Maybe<boolean>;
    singleUserMode?: Maybe<boolean>;
    featureInDirectory?: Maybe<boolean>;
    singleUserChannel?: Maybe<{ __typename?: "Channel"; id: string }>;
  };
};

export type UpdateUserSettingsPreferencesMutationVariables = Exact<{
  input: UpdateUserSettingsInput;
}>;

export type UpdateUserSettingsPreferencesMutation = {
  __typename?: "Mutation";
  updateUserSettings?: Maybe<{
    __typename?: "UserSettings";
    id?: Maybe<string>;
    useGravatar?: Maybe<boolean>;
    singleUserMode?: Maybe<boolean>;
    featureInDirectory?: Maybe<boolean>;
    singleUserChannel?: Maybe<{ __typename?: "Channel"; id: string }>;
  }>;
};

export type GetFileForUploaderQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetFileForUploaderQuery = {
  __typename?: "Query";
  fileInfo?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
    mimetype: string;
    encoding: string;
  }>;
};

export type UploadFileWithUploaderMutationVariables = Exact<{
  input: Scalars["Upload"];
}>;

export type UploadFileWithUploaderMutation = {
  __typename?: "Mutation";
  uploadFile: {
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
    mimetype: string;
    encoding: string;
  };
};

export type ActivitesSelectQueryVariables = Exact<{
  filter?: Maybe<ActivityFilter>;
  limit?: Maybe<ActivityLimit>;
}>;

export type ActivitesSelectQuery = {
  __typename?: "Query";
  activities: Array<
    Maybe<{ __typename?: "Activity"; id: string; name: string }>
  >;
};

export type ActivitiesSelectInitialQueryVariables = Exact<{
  filter?: Maybe<ActivityFilter>;
}>;

export type ActivitiesSelectInitialQuery = {
  __typename?: "Query";
  activities: Array<
    Maybe<{ __typename?: "Activity"; id: string; name: string }>
  >;
};

export type SelfChannelsSelectQueryVariables = Exact<{
  filter?: Maybe<ChannelsQueryFilter>;
}>;

export type SelfChannelsSelectQuery = {
  __typename?: "Query";
  selfChannels: Array<
    Maybe<{ __typename?: "Channel"; id: string; name: string }>
  >;
};

export type UserInfoQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserInfoQuery = {
  __typename?: "Query";
  user?: Maybe<{
    __typename?: "User";
    username: string;
    displayName?: Maybe<string>;
    avatar?: Maybe<{ __typename?: "File"; filename: string }>;
  }>;
};

export type ChannelCommonFragment = {
  __typename?: "Channel";
  id: string;
  name: string;
  slug?: Maybe<string>;
  description?: Maybe<string>;
  thumbnail?: Maybe<{
    __typename?: "File";
    filename: string;
    id?: Maybe<string>;
  }>;
  status?: Maybe<{
    __typename?: "ChannelStatus";
    id?: Maybe<string>;
    isLive?: Maybe<boolean>;
    viewers?: Maybe<number>;
  }>;
  activity?: Maybe<{
    __typename?: "Activity";
    id: string;
    name: string;
    verb?: Maybe<string>;
  }>;
  user?: Maybe<{
    __typename?: "User";
    id?: Maybe<string>;
    username: string;
    displayName?: Maybe<string>;
    avatar?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    settings?: Maybe<{
      __typename?: "UserSettings";
      singleUserMode?: Maybe<boolean>;
    }>;
  }>;
};

export type ChannelFullFragment = {
  __typename?: "Channel";
  id: string;
  name: string;
  description?: Maybe<string>;
  slug?: Maybe<string>;
  thumbnail?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
  }>;
  activity?: Maybe<{
    __typename?: "Activity";
    id: string;
    name: string;
    verb?: Maybe<string>;
    icon?: Maybe<string>;
  }>;
};

export type CurrentUserFragment = {
  __typename?: "User";
  id?: Maybe<string>;
  username: string;
  displayName?: Maybe<string>;
  emailHash?: Maybe<string>;
  bio?: Maybe<string>;
  avatar?: Maybe<{ __typename?: "File"; id?: Maybe<string>; filename: string }>;
  header?: Maybe<{ __typename?: "File"; id?: Maybe<string>; filename: string }>;
  streamThumbnail?: Maybe<{
    __typename?: "File";
    id?: Maybe<string>;
    filename: string;
  }>;
  roles: Array<
    Maybe<{
      __typename?: "Role";
      id: string;
      parentId?: Maybe<string>;
      name: string;
      access: {
        __typename?: "AccessTargets";
        rights: {
          __typename?: "AccessRights";
          channels?: Maybe<Array<Maybe<AccessUnit>>>;
          streamKeys?: Maybe<Array<Maybe<AccessUnit>>>;
          users?: Maybe<Array<Maybe<AccessUnit>>>;
          activities?: Maybe<Array<Maybe<AccessUnit>>>;
        };
        actions: {
          __typename?: "Actions";
          user?: Maybe<{
            __typename?: "UserActions";
            silence?: Maybe<boolean>;
            ban?: Maybe<boolean>;
            warn?: Maybe<boolean>;
          }>;
        };
      };
    }>
  >;
  channels: Array<
    Maybe<{
      __typename?: "Channel";
      id: string;
      name: string;
      slug?: Maybe<string>;
      description?: Maybe<string>;
      activity?: Maybe<{
        __typename?: "Activity";
        id: string;
        icon?: Maybe<string>;
        image?: Maybe<string>;
        name: string;
        verb?: Maybe<string>;
      }>;
    }>
  >;
};

export type CurrentUserFullQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserFullQuery = {
  __typename?: "Query";
  self: {
    __typename?: "User";
    id?: Maybe<string>;
    username: string;
    displayName?: Maybe<string>;
    emailHash?: Maybe<string>;
    bio?: Maybe<string>;
    avatar?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    header?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    streamThumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    roles: Array<
      Maybe<{
        __typename?: "Role";
        id: string;
        parentId?: Maybe<string>;
        name: string;
        access: {
          __typename?: "AccessTargets";
          rights: {
            __typename?: "AccessRights";
            channels?: Maybe<Array<Maybe<AccessUnit>>>;
            streamKeys?: Maybe<Array<Maybe<AccessUnit>>>;
            users?: Maybe<Array<Maybe<AccessUnit>>>;
            activities?: Maybe<Array<Maybe<AccessUnit>>>;
          };
          actions: {
            __typename?: "Actions";
            user?: Maybe<{
              __typename?: "UserActions";
              silence?: Maybe<boolean>;
              ban?: Maybe<boolean>;
              warn?: Maybe<boolean>;
            }>;
          };
        };
      }>
    >;
    channels: Array<
      Maybe<{
        __typename?: "Channel";
        id: string;
        name: string;
        slug?: Maybe<string>;
        description?: Maybe<string>;
        activity?: Maybe<{
          __typename?: "Activity";
          id: string;
          icon?: Maybe<string>;
          image?: Maybe<string>;
          name: string;
          verb?: Maybe<string>;
        }>;
      }>
    >;
  };
};

export type CurrentUserSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserSettingsQuery = {
  __typename?: "Query";
  userSettings: {
    __typename?: "UserSettings";
    id?: Maybe<string>;
    useGravatar?: Maybe<boolean>;
    singleUserMode?: Maybe<boolean>;
    singleUserChannel?: Maybe<{ __typename?: "Channel"; id: string }>;
  };
};

export type SignInMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn?: Maybe<{
    __typename?: "SessionResponse";
    token: string;
    expiresAt: any;
  }>;
};

export type SignUpMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: { __typename?: "User"; id?: Maybe<string>; username: string };
};

export type ChannelPageQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ChannelPageQuery = {
  __typename?: "Query";
  channel?: Maybe<{
    __typename?: "Channel";
    id: string;
    name: string;
    description?: Maybe<string>;
    slug?: Maybe<string>;
    thumbnail?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    activity?: Maybe<{
      __typename?: "Activity";
      id: string;
      name: string;
      verb?: Maybe<string>;
    }>;
    user?: Maybe<{
      __typename?: "User";
      id?: Maybe<string>;
      username: string;
      displayName?: Maybe<string>;
      avatar?: Maybe<{
        __typename?: "File";
        id?: Maybe<string>;
        filename: string;
      }>;
      settings?: Maybe<{
        __typename?: "UserSettings";
        singleUserMode?: Maybe<boolean>;
      }>;
    }>;
    meta?: Maybe<{ __typename?: "ChannelMeta"; subscriberCount: number }>;
  }>;
};

export type ChannelPageStatusQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type ChannelPageStatusQuery = {
  __typename?: "Query";
  channel?: Maybe<{
    __typename?: "Channel";
    status?: Maybe<{
      __typename?: "ChannelStatus";
      id?: Maybe<string>;
      isLive?: Maybe<boolean>;
    }>;
  }>;
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
  subscription?: Maybe<{ __typename?: "Subscription"; id: string }>;
};

export type UserPageQueryVariables = Exact<{
  username: Scalars["ID"];
}>;

export type UserPageQuery = {
  __typename?: "Query";
  user?: Maybe<{
    __typename?: "User";
    id?: Maybe<string>;
    username: string;
    displayName?: Maybe<string>;
    bio?: Maybe<string>;
    emailHash?: Maybe<string>;
    channels: Array<
      Maybe<{
        __typename?: "Channel";
        id: string;
        name: string;
        slug?: Maybe<string>;
        description?: Maybe<string>;
        thumbnail?: Maybe<{
          __typename?: "File";
          filename: string;
          id?: Maybe<string>;
        }>;
        status?: Maybe<{
          __typename?: "ChannelStatus";
          id?: Maybe<string>;
          isLive?: Maybe<boolean>;
          viewers?: Maybe<number>;
        }>;
        activity?: Maybe<{
          __typename?: "Activity";
          id: string;
          name: string;
          verb?: Maybe<string>;
        }>;
        user?: Maybe<{
          __typename?: "User";
          id?: Maybe<string>;
          username: string;
          displayName?: Maybe<string>;
          avatar?: Maybe<{
            __typename?: "File";
            id?: Maybe<string>;
            filename: string;
          }>;
          settings?: Maybe<{
            __typename?: "UserSettings";
            singleUserMode?: Maybe<boolean>;
          }>;
        }>;
      }>
    >;
    avatar?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    header?: Maybe<{
      __typename?: "File";
      id?: Maybe<string>;
      filename: string;
    }>;
    streamThumbnail?: Maybe<{ __typename?: "File"; filename: string }>;
    meta?: Maybe<{ __typename?: "UserMeta"; followerCount: number }>;
    settings?: Maybe<{
      __typename?: "UserSettings";
      useGravatar?: Maybe<boolean>;
      singleUserMode?: Maybe<boolean>;
      singleUserChannel?: Maybe<{
        __typename?: "Channel";
        id: string;
        name: string;
        description?: Maybe<string>;
        slug?: Maybe<string>;
        thumbnail?: Maybe<{
          __typename?: "File";
          id?: Maybe<string>;
          filename: string;
        }>;
        activity?: Maybe<{
          __typename?: "Activity";
          id: string;
          name: string;
          verb?: Maybe<string>;
        }>;
        user?: Maybe<{
          __typename?: "User";
          id?: Maybe<string>;
          username: string;
          displayName?: Maybe<string>;
          avatar?: Maybe<{
            __typename?: "File";
            id?: Maybe<string>;
            filename: string;
          }>;
          settings?: Maybe<{
            __typename?: "UserSettings";
            singleUserMode?: Maybe<boolean>;
          }>;
        }>;
        meta?: Maybe<{ __typename?: "ChannelMeta"; subscriberCount: number }>;
      }>;
    }>;
  }>;
};

export type UserPageChannelStatusQueryVariables = Exact<{
  username: Scalars["ID"];
}>;

export type UserPageChannelStatusQuery = {
  __typename?: "Query";
  user?: Maybe<{
    __typename?: "User";
    id?: Maybe<string>;
    channels: Array<
      Maybe<{
        __typename?: "Channel";
        id: string;
        status?: Maybe<{
          __typename?: "ChannelStatus";
          id?: Maybe<string>;
          isLive?: Maybe<boolean>;
        }>;
      }>
    >;
  }>;
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
  subscription?: Maybe<{ __typename?: "Subscription"; id: string }>;
};
