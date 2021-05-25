import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  __typename?: 'AccessRights';
  channels?: Maybe<AccessUnit>;
  streamKeys?: Maybe<AccessUnit>;
  users?: Maybe<AccessUnit>;
  activities?: Maybe<AccessUnit>;
};

export type AccessTargets = {
  __typename?: 'AccessTargets';
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
  Deny = 'DENY',
  Read = 'READ',
  Write = 'WRITE',
  Self = 'SELF',
  Inherit = 'INHERIT'
}

export type Actions = {
  __typename?: 'Actions';
  user?: Maybe<UserActions>;
};

export type ActionsInput = {
  user?: Maybe<UserActionsInput>;
};

export type Activity = {
  __typename?: 'Activity';
  id: Scalars['ID'];
  icon?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  verb?: Maybe<Scalars['String']>;
};

export type ActivityFilter = {
  id?: Maybe<Scalars['ID']>;
  icon?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  verb?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID'];
  user?: Maybe<User>;
  activity?: Maybe<Activity>;
  slug?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type ChannelsQueryFilter = {
  id?: Maybe<Scalars['ID']>;
  user?: Maybe<Scalars['ID']>;
  activity?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateActivityInput = {
  icon?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  verb?: Maybe<Scalars['String']>;
};

export type CreateChannelInput = {
  userId?: Maybe<Scalars['ID']>;
  activityId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type CreateRoleInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  access: AccessTargetsInput;
  parentId: Scalars['ID'];
};

export type CreateStreamKeyInput = {
  userId: Scalars['ID'];
  channelId: Scalars['ID'];
};

export type CreateUserInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type InfoResponse = {
  __typename?: 'InfoResponse';
  name: Scalars['String'];
  version: Scalars['String'];
  packageName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ping: Scalars['String'];
  createActivity: Activity;
  updateActivity: Activity;
  createChannel: Channel;
  updateChannel: Channel;
  createRole: Role;
  updateRole: Role;
  deleteRole: Scalars['Boolean'];
  createStreamKey: StreamKey;
  signUp: User;
  signIn?: Maybe<SessionResponse>;
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


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationCreateStreamKeyArgs = {
  input?: Maybe<CreateStreamKeyInput>;
};


export type MutationSignUpArgs = {
  input: CreateUserInput;
};


export type MutationSignInArgs = {
  input?: Maybe<SignInInput>;
};

export type Query = {
  __typename?: 'Query';
  info: InfoResponse;
  test: TestResponse;
  activity?: Maybe<Activity>;
  activities: Array<Maybe<Activity>>;
  channel?: Maybe<Channel>;
  channels: Array<Maybe<Channel>>;
  role?: Maybe<Role>;
  roles: Array<Maybe<Role>>;
  streamKeys: Array<Maybe<StreamKey>>;
  selfStreamKeys: Array<Maybe<StreamKey>>;
  users: Array<Maybe<User>>;
  self: User;
  user?: Maybe<User>;
};


export type QueryActivityArgs = {
  id: Scalars['ID'];
};


export type QueryActivitiesArgs = {
  filter?: Maybe<ActivityFilter>;
};


export type QueryChannelArgs = {
  id: Scalars['ID'];
};


export type QueryChannelsArgs = {
  filter?: Maybe<ChannelsQueryFilter>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRolesArgs = {
  filter?: Maybe<UpdateRoleInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  access: AccessTargets;
  parentId?: Maybe<Scalars['ID']>;
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
  user: Scalars['ID'];
  expiresAt: Scalars['DateTime'];
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  token: Scalars['ID'];
  expiresAt: Scalars['DateTime'];
};

export type SignInInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type StreamKey = {
  __typename?: 'StreamKey';
  id: Scalars['ID'];
  user: User;
  channel: Channel;
};

export type TestResponse = {
  __typename?: 'TestResponse';
  secret: Scalars['String'];
};

export type UpdateActivityInput = {
  id: Scalars['ID'];
  icon?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  verb?: Maybe<Scalars['String']>;
};

export type UpdateChannelInput = {
  id: Scalars['ID'];
  activityId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  access?: Maybe<AccessTargetsInput>;
  parentId?: Maybe<Scalars['ID']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  singleUserMode: Scalars['Boolean'];
  emailHash?: Maybe<Scalars['String']>;
  roles: Array<Maybe<Role>>;
  channels: Array<Maybe<Channel>>;
};

export type UserActions = {
  __typename?: 'UserActions';
  silence?: Maybe<Scalars['Boolean']>;
  ban?: Maybe<Scalars['Boolean']>;
  warn?: Maybe<Scalars['Boolean']>;
};

export type UserActionsInput = {
  silence?: Maybe<Scalars['Boolean']>;
  ban?: Maybe<Scalars['Boolean']>;
  warn?: Maybe<Scalars['Boolean']>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  id?: Maybe<Scalars['ID']>;
  useGravatar?: Maybe<Scalars['Boolean']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
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
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ActivityFilter: ActivityFilter;
  CacheControlScope: CacheControlScope;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelsQueryFilter: ChannelsQueryFilter;
  CreateActivityInput: CreateActivityInput;
  CreateChannelInput: CreateChannelInput;
  CreateRoleInput: CreateRoleInput;
  CreateStreamKeyInput: CreateStreamKeyInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  InfoResponse: ResolverTypeWrapper<InfoResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  Session: ResolverTypeWrapper<Session>;
  SessionResponse: ResolverTypeWrapper<SessionResponse>;
  SignInInput: SignInInput;
  StreamKey: ResolverTypeWrapper<StreamKey>;
  TestResponse: ResolverTypeWrapper<TestResponse>;
  UpdateActivityInput: UpdateActivityInput;
  UpdateChannelInput: UpdateChannelInput;
  UpdateRoleInput: UpdateRoleInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserActions: ResolverTypeWrapper<UserActions>;
  UserActionsInput: UserActionsInput;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessRights: AccessRights;
  AccessTargets: AccessTargets;
  AccessTargetsInput: AccessTargetsInput;
  Actions: Actions;
  ActionsInput: ActionsInput;
  Activity: Activity;
  ID: Scalars['ID'];
  String: Scalars['String'];
  ActivityFilter: ActivityFilter;
  Channel: Channel;
  ChannelsQueryFilter: ChannelsQueryFilter;
  CreateActivityInput: CreateActivityInput;
  CreateChannelInput: CreateChannelInput;
  CreateRoleInput: CreateRoleInput;
  CreateStreamKeyInput: CreateStreamKeyInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  InfoResponse: InfoResponse;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
  Role: Role;
  Session: Session;
  SessionResponse: SessionResponse;
  SignInInput: SignInInput;
  StreamKey: StreamKey;
  TestResponse: TestResponse;
  UpdateActivityInput: UpdateActivityInput;
  UpdateChannelInput: UpdateChannelInput;
  UpdateRoleInput: UpdateRoleInput;
  Upload: Scalars['Upload'];
  User: User;
  UserActions: UserActions;
  UserActionsInput: UserActionsInput;
  UserSettings: UserSettings;
  Int: Scalars['Int'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccessRightsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessRights'] = ResolversParentTypes['AccessRights']> = {
  channels?: Resolver<Maybe<ResolversTypes['AccessUnit']>, ParentType, ContextType>;
  streamKeys?: Resolver<Maybe<ResolversTypes['AccessUnit']>, ParentType, ContextType>;
  users?: Resolver<Maybe<ResolversTypes['AccessUnit']>, ParentType, ContextType>;
  activities?: Resolver<Maybe<ResolversTypes['AccessUnit']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccessTargetsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessTargets'] = ResolversParentTypes['AccessTargets']> = {
  rights?: Resolver<ResolversTypes['AccessRights'], ParentType, ContextType>;
  actions?: Resolver<ResolversTypes['Actions'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Actions'] = ResolversParentTypes['Actions']> = {
  user?: Resolver<Maybe<ResolversTypes['UserActions']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  activity?: Resolver<Maybe<ResolversTypes['Activity']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type InfoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['InfoResponse'] = ResolversParentTypes['InfoResponse']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  packageName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationCreateActivityArgs, never>>;
  updateActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationUpdateActivityArgs, never>>;
  createChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, never>>;
  updateChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, never>>;
  createRole?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, never>>;
  updateRole?: Resolver<ResolversTypes['Role'], ParentType, ContextType, RequireFields<MutationUpdateRoleArgs, never>>;
  deleteRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, 'id'>>;
  createStreamKey?: Resolver<ResolversTypes['StreamKey'], ParentType, ContextType, RequireFields<MutationCreateStreamKeyArgs, never>>;
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SessionResponse']>, ParentType, ContextType, RequireFields<MutationSignInArgs, never>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  info?: Resolver<ResolversTypes['InfoResponse'], ParentType, ContextType>;
  test?: Resolver<ResolversTypes['TestResponse'], ParentType, ContextType>;
  activity?: Resolver<Maybe<ResolversTypes['Activity']>, ParentType, ContextType, RequireFields<QueryActivityArgs, 'id'>>;
  activities?: Resolver<Array<Maybe<ResolversTypes['Activity']>>, ParentType, ContextType, RequireFields<QueryActivitiesArgs, never>>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryChannelArgs, 'id'>>;
  channels?: Resolver<Array<Maybe<ResolversTypes['Channel']>>, ParentType, ContextType, RequireFields<QueryChannelsArgs, never>>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<QueryRoleArgs, 'id'>>;
  roles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType, RequireFields<QueryRolesArgs, never>>;
  streamKeys?: Resolver<Array<Maybe<ResolversTypes['StreamKey']>>, ParentType, ContextType>;
  selfStreamKeys?: Resolver<Array<Maybe<ResolversTypes['StreamKey']>>, ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  self?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  access?: Resolver<ResolversTypes['AccessTargets'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionResponse'] = ResolversParentTypes['SessionResponse']> = {
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StreamKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['StreamKey'] = ResolversParentTypes['StreamKey']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestResponse'] = ResolversParentTypes['TestResponse']> = {
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  singleUserMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  emailHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roles?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  channels?: Resolver<Array<Maybe<ResolversTypes['Channel']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserActionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserActions'] = ResolversParentTypes['UserActions']> = {
  silence?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  ban?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  warn?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  useGravatar?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccessRights?: AccessRightsResolvers<ContextType>;
  AccessTargets?: AccessTargetsResolvers<ContextType>;
  Actions?: ActionsResolvers<ContextType>;
  Activity?: ActivityResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  InfoResponse?: InfoResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionResponse?: SessionResponseResolvers<ContextType>;
  StreamKey?: StreamKeyResolvers<ContextType>;
  TestResponse?: TestResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserActions?: UserActionsResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;