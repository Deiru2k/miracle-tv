import * as Types from "miracle-tv-shared/graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export const AdminActivityFragmentFragmentDoc = gql`
  fragment AdminActivityFragment on Activity {
    id
    name
    verb
    icon {
      id
      filename
    }
    image {
      id
      filename
    }
  }
`;
export const AdminRoleFragmentDoc = gql`
  fragment AdminRole on Role {
    id
    parentId
    name
    access {
      rights {
        channels
        streamKeys
        roles
        users
        activities
        userSettings
        system
        sessions
      }
      actions {
        user {
          silence
          ban
          warn
        }
      }
    }
  }
`;
export const AdminSessionFragmentDoc = gql`
  fragment AdminSession on Session {
    id
    user
    userAgent
    lastUsedAt
    expiresAt
    ip
    isCurrentSession
  }
`;
export const AdminStreamKeyFragmentDoc = gql`
  fragment AdminStreamKey on StreamKey {
    id
    name
    channel {
      id
      name
    }
    user {
      id
      displayName
      username
      avatar {
        id
        filename
      }
    }
  }
`;
export const AdminFullUserFragmentDoc = gql`
  fragment AdminFullUser on FullUser {
    id
    username
    displayName
    bio
    email
    roles {
      id
      name
      access {
        rights {
          channels
          streamKeys
          roles
          users
          activities
          userSettings
        }
        actions {
          user {
            silence
            ban
            warn
          }
        }
      }
      parentId
    }
    channels {
      id
      name
    }
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    streamThumbnail {
      id
      filename
    }
    silenced
    suspended
    deleted
    loginDisabled
    settings {
      id
      useGravatar
      singleUserMode
      singleUserChannel {
        id
        name
      }
      featureInDirectory
    }
    meta {
      followerCount
    }
  }
`;
export const ChannelViewStatusFragmentDoc = gql`
  fragment ChannelViewStatus on ChannelStatus {
    id
    isLive
    viewers
    createdAt
  }
`;
export const UserDirectoryProfileFragmentDoc = gql`
  fragment UserDirectoryProfile on User {
    id
    username
    displayName
    bio
    emailHash
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    roles {
      id
      name
    }
    meta {
      followerCount
    }
    settings {
      useGravatar
    }
  }
`;
export const ChannelCommonFragmentDoc = gql`
  fragment ChannelCommon on Channel {
    id
    name
    slug
    thumbnail {
      filename
      id
    }
    status {
      id
      isLive
      viewers
    }
    description
    activity {
      id
      name
      verb
    }
    user {
      id
      username
      displayName
      avatar {
        id
        filename
      }
      settings {
        singleUserMode
      }
    }
  }
`;
export const ChannelViewFragmentDoc = gql`
  fragment ChannelView on Channel {
    id
    name
    description
    slug
    mature
    matureDescription
    passwordProtected
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon {
        id
        filename
      }
    }
    user {
      id
      username
      displayName
      emailHash
      avatar {
        id
        filename
      }
      settings {
        singleUserMode
      }
    }
    meta {
      subscriberCount
    }
  }
`;
export const UserProfileFragmentDoc = gql`
  fragment UserProfile on User {
    id
    username
    displayName
    bio
    emailHash
    channels {
      ...ChannelCommon
    }
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    streamThumbnail {
      filename
    }
    roles {
      id
      name
    }
    meta {
      followerCount
    }
    settings {
      useGravatar
      singleUserMode
      singleUserChannel {
        ...ChannelView
      }
    }
  }
  ${ChannelCommonFragmentDoc}
  ${ChannelViewFragmentDoc}
`;
export const UserSettingsProfileFragmentFragmentDoc = gql`
  fragment UserSettingsProfileFragment on User {
    id
    username
    displayName
    emailHash
    bio
    avatar {
      id
      filename
      encoding
      mimetype
    }
    streamThumbnail {
      id
      filename
      encoding
      mimetype
    }
    header {
      id
      filename
      encoding
      mimetype
    }
    roles {
      id
      name
    }
  }
`;
export const SelfChannelFullFragmentDoc = gql`
  fragment SelfChannelFull on SelfChannel {
    id
    name
    description
    slug
    disabled
    shelved
    mature
    matureDescription
    passwordProtected
    password
    user {
      id
      username
      displayName
    }
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon {
        id
        filename
      }
    }
  }
`;
export const ChannelFullFragmentDoc = gql`
  fragment ChannelFull on Channel {
    id
    name
    description
    slug
    disabled
    shelved
    mature
    passwordProtected
    matureDescription
    user {
      id
      username
      displayName
    }
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon {
        id
        filename
      }
    }
  }
`;
export const CurrentUserFragmentDoc = gql`
  fragment CurrentUser on User {
    id
    username
    displayName
    emailHash
    bio
    emailHash
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    streamThumbnail {
      id
      filename
    }
    roles {
      id
      parentId
      name
      access {
        rights {
          channels
          streamKeys
          roles
          users
          activities
          userSettings
          system
          sessions
        }
        actions {
          user {
            silence
            ban
            warn
          }
        }
      }
    }
    channels {
      id
      name
      slug
      description
      activity {
        id
        icon {
          id
          filename
        }
        image {
          id
          filename
        }
        name
        verb
      }
    }
  }
`;
export const AdminActivityCountDocument = gql`
  query AdminActivityCount($filter: ActivityFilter) {
    activitiesCount(filter: $filter)
  }
`;

/**
 * __useAdminActivityCountQuery__
 *
 * To run a query within a React component, call `useAdminActivityCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminActivityCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminActivityCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminActivityCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminActivityCountQuery,
    Types.AdminActivityCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminActivityCountQuery,
    Types.AdminActivityCountQueryVariables
  >(AdminActivityCountDocument, options);
}
export function useAdminActivityCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminActivityCountQuery,
    Types.AdminActivityCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminActivityCountQuery,
    Types.AdminActivityCountQueryVariables
  >(AdminActivityCountDocument, options);
}
export type AdminActivityCountQueryHookResult = ReturnType<
  typeof useAdminActivityCountQuery
>;
export type AdminActivityCountLazyQueryHookResult = ReturnType<
  typeof useAdminActivityCountLazyQuery
>;
export type AdminActivityCountQueryResult = Apollo.QueryResult<
  Types.AdminActivityCountQuery,
  Types.AdminActivityCountQueryVariables
>;
export const AdminActivityListDocument = gql`
  query AdminActivityList($filter: ActivityFilter, $limit: ActivityLimit) {
    activities(filter: $filter, limit: $limit) {
      ...AdminActivityFragment
    }
  }
  ${AdminActivityFragmentFragmentDoc}
`;

/**
 * __useAdminActivityListQuery__
 *
 * To run a query within a React component, call `useAdminActivityListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminActivityListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminActivityListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminActivityListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminActivityListQuery,
    Types.AdminActivityListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminActivityListQuery,
    Types.AdminActivityListQueryVariables
  >(AdminActivityListDocument, options);
}
export function useAdminActivityListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminActivityListQuery,
    Types.AdminActivityListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminActivityListQuery,
    Types.AdminActivityListQueryVariables
  >(AdminActivityListDocument, options);
}
export type AdminActivityListQueryHookResult = ReturnType<
  typeof useAdminActivityListQuery
>;
export type AdminActivityListLazyQueryHookResult = ReturnType<
  typeof useAdminActivityListLazyQuery
>;
export type AdminActivityListQueryResult = Apollo.QueryResult<
  Types.AdminActivityListQuery,
  Types.AdminActivityListQueryVariables
>;
export const AdminDeleteActivityDocument = gql`
  mutation AdminDeleteActivity($id: ID!) {
    deleteActivity(id: $id)
  }
`;
export type AdminDeleteActivityMutationFn = Apollo.MutationFunction<
  Types.AdminDeleteActivityMutation,
  Types.AdminDeleteActivityMutationVariables
>;

/**
 * __useAdminDeleteActivityMutation__
 *
 * To run a mutation, you first call `useAdminDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteActivityMutation, { data, loading, error }] = useAdminDeleteActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminDeleteActivityMutation,
    Types.AdminDeleteActivityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminDeleteActivityMutation,
    Types.AdminDeleteActivityMutationVariables
  >(AdminDeleteActivityDocument, options);
}
export type AdminDeleteActivityMutationHookResult = ReturnType<
  typeof useAdminDeleteActivityMutation
>;
export type AdminDeleteActivityMutationResult =
  Apollo.MutationResult<Types.AdminDeleteActivityMutation>;
export type AdminDeleteActivityMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminDeleteActivityMutation,
  Types.AdminDeleteActivityMutationVariables
>;
export const AdminActivityPageDocument = gql`
  query AdminActivityPage($id: ID!) {
    activity(id: $id) {
      ...AdminActivityFragment
    }
  }
  ${AdminActivityFragmentFragmentDoc}
`;

/**
 * __useAdminActivityPageQuery__
 *
 * To run a query within a React component, call `useAdminActivityPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminActivityPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminActivityPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminActivityPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.AdminActivityPageQuery,
    Types.AdminActivityPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminActivityPageQuery,
    Types.AdminActivityPageQueryVariables
  >(AdminActivityPageDocument, options);
}
export function useAdminActivityPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminActivityPageQuery,
    Types.AdminActivityPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminActivityPageQuery,
    Types.AdminActivityPageQueryVariables
  >(AdminActivityPageDocument, options);
}
export type AdminActivityPageQueryHookResult = ReturnType<
  typeof useAdminActivityPageQuery
>;
export type AdminActivityPageLazyQueryHookResult = ReturnType<
  typeof useAdminActivityPageLazyQuery
>;
export type AdminActivityPageQueryResult = Apollo.QueryResult<
  Types.AdminActivityPageQuery,
  Types.AdminActivityPageQueryVariables
>;
export const AdminUpdateActivityDocument = gql`
  mutation AdminUpdateActivity($input: UpdateActivityInput!) {
    updateActivity(input: $input) {
      ...AdminActivityFragment
    }
  }
  ${AdminActivityFragmentFragmentDoc}
`;
export type AdminUpdateActivityMutationFn = Apollo.MutationFunction<
  Types.AdminUpdateActivityMutation,
  Types.AdminUpdateActivityMutationVariables
>;

/**
 * __useAdminUpdateActivityMutation__
 *
 * To run a mutation, you first call `useAdminUpdateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateActivityMutation, { data, loading, error }] = useAdminUpdateActivityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminUpdateActivityMutation,
    Types.AdminUpdateActivityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminUpdateActivityMutation,
    Types.AdminUpdateActivityMutationVariables
  >(AdminUpdateActivityDocument, options);
}
export type AdminUpdateActivityMutationHookResult = ReturnType<
  typeof useAdminUpdateActivityMutation
>;
export type AdminUpdateActivityMutationResult =
  Apollo.MutationResult<Types.AdminUpdateActivityMutation>;
export type AdminUpdateActivityMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminUpdateActivityMutation,
  Types.AdminUpdateActivityMutationVariables
>;
export const AdminCreateActivityDocument = gql`
  mutation AdminCreateActivity($input: CreateActivityInput) {
    createActivity(input: $input) {
      ...AdminActivityFragment
    }
  }
  ${AdminActivityFragmentFragmentDoc}
`;
export type AdminCreateActivityMutationFn = Apollo.MutationFunction<
  Types.AdminCreateActivityMutation,
  Types.AdminCreateActivityMutationVariables
>;

/**
 * __useAdminCreateActivityMutation__
 *
 * To run a mutation, you first call `useAdminCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateActivityMutation, { data, loading, error }] = useAdminCreateActivityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminCreateActivityMutation,
    Types.AdminCreateActivityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminCreateActivityMutation,
    Types.AdminCreateActivityMutationVariables
  >(AdminCreateActivityDocument, options);
}
export type AdminCreateActivityMutationHookResult = ReturnType<
  typeof useAdminCreateActivityMutation
>;
export type AdminCreateActivityMutationResult =
  Apollo.MutationResult<Types.AdminCreateActivityMutation>;
export type AdminCreateActivityMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminCreateActivityMutation,
  Types.AdminCreateActivityMutationVariables
>;
export const AdminDashboardUserStatsDocument = gql`
  query AdminDashboardUserStats {
    userStats {
      userCount
      channelCount
      streamKeyCount
      sessionCount
    }
  }
`;

/**
 * __useAdminDashboardUserStatsQuery__
 *
 * To run a query within a React component, call `useAdminDashboardUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminDashboardUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminDashboardUserStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminDashboardUserStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminDashboardUserStatsQuery,
    Types.AdminDashboardUserStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminDashboardUserStatsQuery,
    Types.AdminDashboardUserStatsQueryVariables
  >(AdminDashboardUserStatsDocument, options);
}
export function useAdminDashboardUserStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminDashboardUserStatsQuery,
    Types.AdminDashboardUserStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminDashboardUserStatsQuery,
    Types.AdminDashboardUserStatsQueryVariables
  >(AdminDashboardUserStatsDocument, options);
}
export type AdminDashboardUserStatsQueryHookResult = ReturnType<
  typeof useAdminDashboardUserStatsQuery
>;
export type AdminDashboardUserStatsLazyQueryHookResult = ReturnType<
  typeof useAdminDashboardUserStatsLazyQuery
>;
export type AdminDashboardUserStatsQueryResult = Apollo.QueryResult<
  Types.AdminDashboardUserStatsQuery,
  Types.AdminDashboardUserStatsQueryVariables
>;
export const AdminDashboardSystemLoadDocument = gql`
  query AdminDashboardSystemLoad {
    systemLoad {
      cpuPercentage
      totalMem
      usedMem
      memPercentage
      totalDrive
      usedDrive
      drivePercentage
      mediaDirSize
      dbSize
      networkUp
      networkDown
    }
  }
`;

/**
 * __useAdminDashboardSystemLoadQuery__
 *
 * To run a query within a React component, call `useAdminDashboardSystemLoadQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminDashboardSystemLoadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminDashboardSystemLoadQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminDashboardSystemLoadQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminDashboardSystemLoadQuery,
    Types.AdminDashboardSystemLoadQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminDashboardSystemLoadQuery,
    Types.AdminDashboardSystemLoadQueryVariables
  >(AdminDashboardSystemLoadDocument, options);
}
export function useAdminDashboardSystemLoadLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminDashboardSystemLoadQuery,
    Types.AdminDashboardSystemLoadQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminDashboardSystemLoadQuery,
    Types.AdminDashboardSystemLoadQueryVariables
  >(AdminDashboardSystemLoadDocument, options);
}
export type AdminDashboardSystemLoadQueryHookResult = ReturnType<
  typeof useAdminDashboardSystemLoadQuery
>;
export type AdminDashboardSystemLoadLazyQueryHookResult = ReturnType<
  typeof useAdminDashboardSystemLoadLazyQuery
>;
export type AdminDashboardSystemLoadQueryResult = Apollo.QueryResult<
  Types.AdminDashboardSystemLoadQuery,
  Types.AdminDashboardSystemLoadQueryVariables
>;
export const AdminChannelsCountDocument = gql`
  query AdminChannelsCount($filter: ChannelsQueryFilter) {
    fullChannelsCount(filter: $filter)
  }
`;

/**
 * __useAdminChannelsCountQuery__
 *
 * To run a query within a React component, call `useAdminChannelsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminChannelsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminChannelsCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminChannelsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminChannelsCountQuery,
    Types.AdminChannelsCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminChannelsCountQuery,
    Types.AdminChannelsCountQueryVariables
  >(AdminChannelsCountDocument, options);
}
export function useAdminChannelsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminChannelsCountQuery,
    Types.AdminChannelsCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminChannelsCountQuery,
    Types.AdminChannelsCountQueryVariables
  >(AdminChannelsCountDocument, options);
}
export type AdminChannelsCountQueryHookResult = ReturnType<
  typeof useAdminChannelsCountQuery
>;
export type AdminChannelsCountLazyQueryHookResult = ReturnType<
  typeof useAdminChannelsCountLazyQuery
>;
export type AdminChannelsCountQueryResult = Apollo.QueryResult<
  Types.AdminChannelsCountQuery,
  Types.AdminChannelsCountQueryVariables
>;
export const AdminChannelsDocument = gql`
  query AdminChannels($filter: ChannelsQueryFilter, $limit: QueryLimit) {
    fullChannels(filter: $filter, limit: $limit) {
      ...ChannelFull
    }
  }
  ${ChannelFullFragmentDoc}
`;

/**
 * __useAdminChannelsQuery__
 *
 * To run a query within a React component, call `useAdminChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminChannelsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminChannelsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminChannelsQuery,
    Types.AdminChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminChannelsQuery,
    Types.AdminChannelsQueryVariables
  >(AdminChannelsDocument, options);
}
export function useAdminChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminChannelsQuery,
    Types.AdminChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminChannelsQuery,
    Types.AdminChannelsQueryVariables
  >(AdminChannelsDocument, options);
}
export type AdminChannelsQueryHookResult = ReturnType<
  typeof useAdminChannelsQuery
>;
export type AdminChannelsLazyQueryHookResult = ReturnType<
  typeof useAdminChannelsLazyQuery
>;
export type AdminChannelsQueryResult = Apollo.QueryResult<
  Types.AdminChannelsQuery,
  Types.AdminChannelsQueryVariables
>;
export const AdminDeleteChannelDocument = gql`
  mutation AdminDeleteChannel($id: ID!) {
    deleteChannel(id: $id)
  }
`;
export type AdminDeleteChannelMutationFn = Apollo.MutationFunction<
  Types.AdminDeleteChannelMutation,
  Types.AdminDeleteChannelMutationVariables
>;

/**
 * __useAdminDeleteChannelMutation__
 *
 * To run a mutation, you first call `useAdminDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteChannelMutation, { data, loading, error }] = useAdminDeleteChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminDeleteChannelMutation,
    Types.AdminDeleteChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminDeleteChannelMutation,
    Types.AdminDeleteChannelMutationVariables
  >(AdminDeleteChannelDocument, options);
}
export type AdminDeleteChannelMutationHookResult = ReturnType<
  typeof useAdminDeleteChannelMutation
>;
export type AdminDeleteChannelMutationResult =
  Apollo.MutationResult<Types.AdminDeleteChannelMutation>;
export type AdminDeleteChannelMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminDeleteChannelMutation,
  Types.AdminDeleteChannelMutationVariables
>;
export const AdminRolesDocument = gql`
  query AdminRoles($filter: RolesFilter, $limit: QueryLimit) {
    roles(filter: $filter, limit: $limit) {
      ...AdminRole
    }
  }
  ${AdminRoleFragmentDoc}
`;

/**
 * __useAdminRolesQuery__
 *
 * To run a query within a React component, call `useAdminRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminRolesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminRolesQuery,
    Types.AdminRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.AdminRolesQuery, Types.AdminRolesQueryVariables>(
    AdminRolesDocument,
    options
  );
}
export function useAdminRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminRolesQuery,
    Types.AdminRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminRolesQuery,
    Types.AdminRolesQueryVariables
  >(AdminRolesDocument, options);
}
export type AdminRolesQueryHookResult = ReturnType<typeof useAdminRolesQuery>;
export type AdminRolesLazyQueryHookResult = ReturnType<
  typeof useAdminRolesLazyQuery
>;
export type AdminRolesQueryResult = Apollo.QueryResult<
  Types.AdminRolesQuery,
  Types.AdminRolesQueryVariables
>;
export const BulkDeleteRolesDocument = gql`
  mutation BulkDeleteRoles($ids: [ID]!) {
    bulkDeleteRoles(ids: $ids)
  }
`;
export type BulkDeleteRolesMutationFn = Apollo.MutationFunction<
  Types.BulkDeleteRolesMutation,
  Types.BulkDeleteRolesMutationVariables
>;

/**
 * __useBulkDeleteRolesMutation__
 *
 * To run a mutation, you first call `useBulkDeleteRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkDeleteRolesMutation, { data, loading, error }] = useBulkDeleteRolesMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteRolesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkDeleteRolesMutation,
    Types.BulkDeleteRolesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkDeleteRolesMutation,
    Types.BulkDeleteRolesMutationVariables
  >(BulkDeleteRolesDocument, options);
}
export type BulkDeleteRolesMutationHookResult = ReturnType<
  typeof useBulkDeleteRolesMutation
>;
export type BulkDeleteRolesMutationResult =
  Apollo.MutationResult<Types.BulkDeleteRolesMutation>;
export type BulkDeleteRolesMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkDeleteRolesMutation,
  Types.BulkDeleteRolesMutationVariables
>;
export const AdminRolePageDocument = gql`
  query AdminRolePage($id: ID!) {
    role(id: $id) {
      ...AdminRole
    }
  }
  ${AdminRoleFragmentDoc}
`;

/**
 * __useAdminRolePageQuery__
 *
 * To run a query within a React component, call `useAdminRolePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminRolePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminRolePageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminRolePageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.AdminRolePageQuery,
    Types.AdminRolePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminRolePageQuery,
    Types.AdminRolePageQueryVariables
  >(AdminRolePageDocument, options);
}
export function useAdminRolePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminRolePageQuery,
    Types.AdminRolePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminRolePageQuery,
    Types.AdminRolePageQueryVariables
  >(AdminRolePageDocument, options);
}
export type AdminRolePageQueryHookResult = ReturnType<
  typeof useAdminRolePageQuery
>;
export type AdminRolePageLazyQueryHookResult = ReturnType<
  typeof useAdminRolePageLazyQuery
>;
export type AdminRolePageQueryResult = Apollo.QueryResult<
  Types.AdminRolePageQuery,
  Types.AdminRolePageQueryVariables
>;
export const AdminUpdateRoleDocument = gql`
  mutation AdminUpdateRole($input: UpdateRoleInput) {
    updateRole(input: $input) {
      ...AdminRole
    }
  }
  ${AdminRoleFragmentDoc}
`;
export type AdminUpdateRoleMutationFn = Apollo.MutationFunction<
  Types.AdminUpdateRoleMutation,
  Types.AdminUpdateRoleMutationVariables
>;

/**
 * __useAdminUpdateRoleMutation__
 *
 * To run a mutation, you first call `useAdminUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateRoleMutation, { data, loading, error }] = useAdminUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminUpdateRoleMutation,
    Types.AdminUpdateRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminUpdateRoleMutation,
    Types.AdminUpdateRoleMutationVariables
  >(AdminUpdateRoleDocument, options);
}
export type AdminUpdateRoleMutationHookResult = ReturnType<
  typeof useAdminUpdateRoleMutation
>;
export type AdminUpdateRoleMutationResult =
  Apollo.MutationResult<Types.AdminUpdateRoleMutation>;
export type AdminUpdateRoleMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminUpdateRoleMutation,
  Types.AdminUpdateRoleMutationVariables
>;
export const AdminSessionsListDocument = gql`
  query AdminSessionsList($filter: SessionsFilter, $limit: QueryLimit) {
    sessions(filter: $filter, limit: $limit) {
      ...AdminSession
    }
  }
  ${AdminSessionFragmentDoc}
`;

/**
 * __useAdminSessionsListQuery__
 *
 * To run a query within a React component, call `useAdminSessionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSessionsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSessionsListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminSessionsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminSessionsListQuery,
    Types.AdminSessionsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminSessionsListQuery,
    Types.AdminSessionsListQueryVariables
  >(AdminSessionsListDocument, options);
}
export function useAdminSessionsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminSessionsListQuery,
    Types.AdminSessionsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminSessionsListQuery,
    Types.AdminSessionsListQueryVariables
  >(AdminSessionsListDocument, options);
}
export type AdminSessionsListQueryHookResult = ReturnType<
  typeof useAdminSessionsListQuery
>;
export type AdminSessionsListLazyQueryHookResult = ReturnType<
  typeof useAdminSessionsListLazyQuery
>;
export type AdminSessionsListQueryResult = Apollo.QueryResult<
  Types.AdminSessionsListQuery,
  Types.AdminSessionsListQueryVariables
>;
export const AdminSessionsCountDocument = gql`
  query AdminSessionsCount($filter: SessionsFilter) {
    sessionsCount(filter: $filter)
  }
`;

/**
 * __useAdminSessionsCountQuery__
 *
 * To run a query within a React component, call `useAdminSessionsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSessionsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSessionsCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminSessionsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminSessionsCountQuery,
    Types.AdminSessionsCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminSessionsCountQuery,
    Types.AdminSessionsCountQueryVariables
  >(AdminSessionsCountDocument, options);
}
export function useAdminSessionsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminSessionsCountQuery,
    Types.AdminSessionsCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminSessionsCountQuery,
    Types.AdminSessionsCountQueryVariables
  >(AdminSessionsCountDocument, options);
}
export type AdminSessionsCountQueryHookResult = ReturnType<
  typeof useAdminSessionsCountQuery
>;
export type AdminSessionsCountLazyQueryHookResult = ReturnType<
  typeof useAdminSessionsCountLazyQuery
>;
export type AdminSessionsCountQueryResult = Apollo.QueryResult<
  Types.AdminSessionsCountQuery,
  Types.AdminSessionsCountQueryVariables
>;
export const AdminRevokeSessionsDocument = gql`
  mutation AdminRevokeSessions($ids: [ID]!) {
    revokeSessions(ids: $ids)
  }
`;
export type AdminRevokeSessionsMutationFn = Apollo.MutationFunction<
  Types.AdminRevokeSessionsMutation,
  Types.AdminRevokeSessionsMutationVariables
>;

/**
 * __useAdminRevokeSessionsMutation__
 *
 * To run a mutation, you first call `useAdminRevokeSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRevokeSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRevokeSessionsMutation, { data, loading, error }] = useAdminRevokeSessionsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAdminRevokeSessionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminRevokeSessionsMutation,
    Types.AdminRevokeSessionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminRevokeSessionsMutation,
    Types.AdminRevokeSessionsMutationVariables
  >(AdminRevokeSessionsDocument, options);
}
export type AdminRevokeSessionsMutationHookResult = ReturnType<
  typeof useAdminRevokeSessionsMutation
>;
export type AdminRevokeSessionsMutationResult =
  Apollo.MutationResult<Types.AdminRevokeSessionsMutation>;
export type AdminRevokeSessionsMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminRevokeSessionsMutation,
  Types.AdminRevokeSessionsMutationVariables
>;
export const AdminStreamKeyListDocument = gql`
  query AdminStreamKeyList($filter: StreamKeyFilter, $limit: QueryLimit) {
    streamKeys(filter: $filter, limit: $limit) {
      ...AdminStreamKey
    }
  }
  ${AdminStreamKeyFragmentDoc}
`;

/**
 * __useAdminStreamKeyListQuery__
 *
 * To run a query within a React component, call `useAdminStreamKeyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminStreamKeyListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminStreamKeyListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminStreamKeyListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminStreamKeyListQuery,
    Types.AdminStreamKeyListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminStreamKeyListQuery,
    Types.AdminStreamKeyListQueryVariables
  >(AdminStreamKeyListDocument, options);
}
export function useAdminStreamKeyListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminStreamKeyListQuery,
    Types.AdminStreamKeyListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminStreamKeyListQuery,
    Types.AdminStreamKeyListQueryVariables
  >(AdminStreamKeyListDocument, options);
}
export type AdminStreamKeyListQueryHookResult = ReturnType<
  typeof useAdminStreamKeyListQuery
>;
export type AdminStreamKeyListLazyQueryHookResult = ReturnType<
  typeof useAdminStreamKeyListLazyQuery
>;
export type AdminStreamKeyListQueryResult = Apollo.QueryResult<
  Types.AdminStreamKeyListQuery,
  Types.AdminStreamKeyListQueryVariables
>;
export const AdminStreamKeysCountDocument = gql`
  query AdminStreamKeysCount($filter: StreamKeyFilter) {
    streamKeysCount(filter: $filter)
  }
`;

/**
 * __useAdminStreamKeysCountQuery__
 *
 * To run a query within a React component, call `useAdminStreamKeysCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminStreamKeysCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminStreamKeysCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminStreamKeysCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AdminStreamKeysCountQuery,
    Types.AdminStreamKeysCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AdminStreamKeysCountQuery,
    Types.AdminStreamKeysCountQueryVariables
  >(AdminStreamKeysCountDocument, options);
}
export function useAdminStreamKeysCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AdminStreamKeysCountQuery,
    Types.AdminStreamKeysCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AdminStreamKeysCountQuery,
    Types.AdminStreamKeysCountQueryVariables
  >(AdminStreamKeysCountDocument, options);
}
export type AdminStreamKeysCountQueryHookResult = ReturnType<
  typeof useAdminStreamKeysCountQuery
>;
export type AdminStreamKeysCountLazyQueryHookResult = ReturnType<
  typeof useAdminStreamKeysCountLazyQuery
>;
export type AdminStreamKeysCountQueryResult = Apollo.QueryResult<
  Types.AdminStreamKeysCountQuery,
  Types.AdminStreamKeysCountQueryVariables
>;
export const AdminDeleteStreamKeyDocument = gql`
  mutation AdminDeleteStreamKey($id: ID!) {
    revokeStreamKey(key: $id)
  }
`;
export type AdminDeleteStreamKeyMutationFn = Apollo.MutationFunction<
  Types.AdminDeleteStreamKeyMutation,
  Types.AdminDeleteStreamKeyMutationVariables
>;

/**
 * __useAdminDeleteStreamKeyMutation__
 *
 * To run a mutation, you first call `useAdminDeleteStreamKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteStreamKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteStreamKeyMutation, { data, loading, error }] = useAdminDeleteStreamKeyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteStreamKeyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminDeleteStreamKeyMutation,
    Types.AdminDeleteStreamKeyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminDeleteStreamKeyMutation,
    Types.AdminDeleteStreamKeyMutationVariables
  >(AdminDeleteStreamKeyDocument, options);
}
export type AdminDeleteStreamKeyMutationHookResult = ReturnType<
  typeof useAdminDeleteStreamKeyMutation
>;
export type AdminDeleteStreamKeyMutationResult =
  Apollo.MutationResult<Types.AdminDeleteStreamKeyMutation>;
export type AdminDeleteStreamKeyMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminDeleteStreamKeyMutation,
  Types.AdminDeleteStreamKeyMutationVariables
>;
export const AdminBulkDeleteStreamKeysDocument = gql`
  mutation AdminBulkDeleteStreamKeys($ids: [ID]!) {
    bulkRevokeStreamKeys(keys: $ids)
  }
`;
export type AdminBulkDeleteStreamKeysMutationFn = Apollo.MutationFunction<
  Types.AdminBulkDeleteStreamKeysMutation,
  Types.AdminBulkDeleteStreamKeysMutationVariables
>;

/**
 * __useAdminBulkDeleteStreamKeysMutation__
 *
 * To run a mutation, you first call `useAdminBulkDeleteStreamKeysMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminBulkDeleteStreamKeysMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminBulkDeleteStreamKeysMutation, { data, loading, error }] = useAdminBulkDeleteStreamKeysMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAdminBulkDeleteStreamKeysMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminBulkDeleteStreamKeysMutation,
    Types.AdminBulkDeleteStreamKeysMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminBulkDeleteStreamKeysMutation,
    Types.AdminBulkDeleteStreamKeysMutationVariables
  >(AdminBulkDeleteStreamKeysDocument, options);
}
export type AdminBulkDeleteStreamKeysMutationHookResult = ReturnType<
  typeof useAdminBulkDeleteStreamKeysMutation
>;
export type AdminBulkDeleteStreamKeysMutationResult =
  Apollo.MutationResult<Types.AdminBulkDeleteStreamKeysMutation>;
export type AdminBulkDeleteStreamKeysMutationOptions =
  Apollo.BaseMutationOptions<
    Types.AdminBulkDeleteStreamKeysMutation,
    Types.AdminBulkDeleteStreamKeysMutationVariables
  >;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($id: ID!, $input: ResetUserPasswordInput!) {
    resetUserPassword(id: $id, input: $input) {
      status
      data
    }
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  Types.ResetPasswordMutation,
  Types.ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ResetPasswordMutation,
    Types.ResetPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ResetPasswordMutation,
    Types.ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<Types.ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ResetPasswordMutation,
  Types.ResetPasswordMutationVariables
>;
export const UpdateFullUserDocument = gql`
  mutation UpdateFullUser($input: UpdateFullUserInput!) {
    updateFullUser(input: $input) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type UpdateFullUserMutationFn = Apollo.MutationFunction<
  Types.UpdateFullUserMutation,
  Types.UpdateFullUserMutationVariables
>;

/**
 * __useUpdateFullUserMutation__
 *
 * To run a mutation, you first call `useUpdateFullUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFullUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFullUserMutation, { data, loading, error }] = useUpdateFullUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFullUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateFullUserMutation,
    Types.UpdateFullUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateFullUserMutation,
    Types.UpdateFullUserMutationVariables
  >(UpdateFullUserDocument, options);
}
export type UpdateFullUserMutationHookResult = ReturnType<
  typeof useUpdateFullUserMutation
>;
export type UpdateFullUserMutationResult =
  Apollo.MutationResult<Types.UpdateFullUserMutation>;
export type UpdateFullUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UpdateFullUserMutation,
  Types.UpdateFullUserMutationVariables
>;
export const FullUserAdminDocument = gql`
  query FullUserAdmin($filter: FullUsersFilter, $limit: QueryLimit) {
    fullUsers(filter: $filter, limit: $limit) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;

/**
 * __useFullUserAdminQuery__
 *
 * To run a query within a React component, call `useFullUserAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullUserAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullUserAdminQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFullUserAdminQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.FullUserAdminQuery,
    Types.FullUserAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.FullUserAdminQuery,
    Types.FullUserAdminQueryVariables
  >(FullUserAdminDocument, options);
}
export function useFullUserAdminLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.FullUserAdminQuery,
    Types.FullUserAdminQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.FullUserAdminQuery,
    Types.FullUserAdminQueryVariables
  >(FullUserAdminDocument, options);
}
export type FullUserAdminQueryHookResult = ReturnType<
  typeof useFullUserAdminQuery
>;
export type FullUserAdminLazyQueryHookResult = ReturnType<
  typeof useFullUserAdminLazyQuery
>;
export type FullUserAdminQueryResult = Apollo.QueryResult<
  Types.FullUserAdminQuery,
  Types.FullUserAdminQueryVariables
>;
export const FullUserAdminCountDocument = gql`
  query FullUserAdminCount($filter: FullUsersFilter) {
    fullUserCount(filter: $filter)
  }
`;

/**
 * __useFullUserAdminCountQuery__
 *
 * To run a query within a React component, call `useFullUserAdminCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullUserAdminCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullUserAdminCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFullUserAdminCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.FullUserAdminCountQuery,
    Types.FullUserAdminCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.FullUserAdminCountQuery,
    Types.FullUserAdminCountQueryVariables
  >(FullUserAdminCountDocument, options);
}
export function useFullUserAdminCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.FullUserAdminCountQuery,
    Types.FullUserAdminCountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.FullUserAdminCountQuery,
    Types.FullUserAdminCountQueryVariables
  >(FullUserAdminCountDocument, options);
}
export type FullUserAdminCountQueryHookResult = ReturnType<
  typeof useFullUserAdminCountQuery
>;
export type FullUserAdminCountLazyQueryHookResult = ReturnType<
  typeof useFullUserAdminCountLazyQuery
>;
export type FullUserAdminCountQueryResult = Apollo.QueryResult<
  Types.FullUserAdminCountQuery,
  Types.FullUserAdminCountQueryVariables
>;
export const BulkDeleteUsersDocument = gql`
  mutation BulkDeleteUsers($ids: [ID]!) {
    deleteFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkDeleteUsersMutationFn = Apollo.MutationFunction<
  Types.BulkDeleteUsersMutation,
  Types.BulkDeleteUsersMutationVariables
>;

/**
 * __useBulkDeleteUsersMutation__
 *
 * To run a mutation, you first call `useBulkDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkDeleteUsersMutation, { data, loading, error }] = useBulkDeleteUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDeleteUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkDeleteUsersMutation,
    Types.BulkDeleteUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkDeleteUsersMutation,
    Types.BulkDeleteUsersMutationVariables
  >(BulkDeleteUsersDocument, options);
}
export type BulkDeleteUsersMutationHookResult = ReturnType<
  typeof useBulkDeleteUsersMutation
>;
export type BulkDeleteUsersMutationResult =
  Apollo.MutationResult<Types.BulkDeleteUsersMutation>;
export type BulkDeleteUsersMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkDeleteUsersMutation,
  Types.BulkDeleteUsersMutationVariables
>;
export const BulkRestoreUsersDocument = gql`
  mutation BulkRestoreUsers($ids: [ID]!) {
    restoreFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkRestoreUsersMutationFn = Apollo.MutationFunction<
  Types.BulkRestoreUsersMutation,
  Types.BulkRestoreUsersMutationVariables
>;

/**
 * __useBulkRestoreUsersMutation__
 *
 * To run a mutation, you first call `useBulkRestoreUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreUsersMutation, { data, loading, error }] = useBulkRestoreUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkRestoreUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkRestoreUsersMutation,
    Types.BulkRestoreUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkRestoreUsersMutation,
    Types.BulkRestoreUsersMutationVariables
  >(BulkRestoreUsersDocument, options);
}
export type BulkRestoreUsersMutationHookResult = ReturnType<
  typeof useBulkRestoreUsersMutation
>;
export type BulkRestoreUsersMutationResult =
  Apollo.MutationResult<Types.BulkRestoreUsersMutation>;
export type BulkRestoreUsersMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkRestoreUsersMutation,
  Types.BulkRestoreUsersMutationVariables
>;
export const BulkSuspendUsersDocument = gql`
  mutation BulkSuspendUsers($ids: [ID]!) {
    suspendFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkSuspendUsersMutationFn = Apollo.MutationFunction<
  Types.BulkSuspendUsersMutation,
  Types.BulkSuspendUsersMutationVariables
>;

/**
 * __useBulkSuspendUsersMutation__
 *
 * To run a mutation, you first call `useBulkSuspendUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSuspendUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSuspendUsersMutation, { data, loading, error }] = useBulkSuspendUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkSuspendUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkSuspendUsersMutation,
    Types.BulkSuspendUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkSuspendUsersMutation,
    Types.BulkSuspendUsersMutationVariables
  >(BulkSuspendUsersDocument, options);
}
export type BulkSuspendUsersMutationHookResult = ReturnType<
  typeof useBulkSuspendUsersMutation
>;
export type BulkSuspendUsersMutationResult =
  Apollo.MutationResult<Types.BulkSuspendUsersMutation>;
export type BulkSuspendUsersMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkSuspendUsersMutation,
  Types.BulkSuspendUsersMutationVariables
>;
export const BulkUnsuspendUsersDocument = gql`
  mutation BulkUnsuspendUsers($ids: [ID]!) {
    unsuspendFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkUnsuspendUsersMutationFn = Apollo.MutationFunction<
  Types.BulkUnsuspendUsersMutation,
  Types.BulkUnsuspendUsersMutationVariables
>;

/**
 * __useBulkUnsuspendUsersMutation__
 *
 * To run a mutation, you first call `useBulkUnsuspendUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkUnsuspendUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkUnsuspendUsersMutation, { data, loading, error }] = useBulkUnsuspendUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkUnsuspendUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkUnsuspendUsersMutation,
    Types.BulkUnsuspendUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkUnsuspendUsersMutation,
    Types.BulkUnsuspendUsersMutationVariables
  >(BulkUnsuspendUsersDocument, options);
}
export type BulkUnsuspendUsersMutationHookResult = ReturnType<
  typeof useBulkUnsuspendUsersMutation
>;
export type BulkUnsuspendUsersMutationResult =
  Apollo.MutationResult<Types.BulkUnsuspendUsersMutation>;
export type BulkUnsuspendUsersMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkUnsuspendUsersMutation,
  Types.BulkUnsuspendUsersMutationVariables
>;
export const BulkDisableLoginsDocument = gql`
  mutation BulkDisableLogins($ids: [ID]!) {
    disableFullUsersLogin(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkDisableLoginsMutationFn = Apollo.MutationFunction<
  Types.BulkDisableLoginsMutation,
  Types.BulkDisableLoginsMutationVariables
>;

/**
 * __useBulkDisableLoginsMutation__
 *
 * To run a mutation, you first call `useBulkDisableLoginsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkDisableLoginsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkDisableLoginsMutation, { data, loading, error }] = useBulkDisableLoginsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkDisableLoginsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkDisableLoginsMutation,
    Types.BulkDisableLoginsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkDisableLoginsMutation,
    Types.BulkDisableLoginsMutationVariables
  >(BulkDisableLoginsDocument, options);
}
export type BulkDisableLoginsMutationHookResult = ReturnType<
  typeof useBulkDisableLoginsMutation
>;
export type BulkDisableLoginsMutationResult =
  Apollo.MutationResult<Types.BulkDisableLoginsMutation>;
export type BulkDisableLoginsMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkDisableLoginsMutation,
  Types.BulkDisableLoginsMutationVariables
>;
export const BulkEnableLoginsDocument = gql`
  mutation BulkEnableLogins($ids: [ID]!) {
    enableFullUsersLogin(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkEnableLoginsMutationFn = Apollo.MutationFunction<
  Types.BulkEnableLoginsMutation,
  Types.BulkEnableLoginsMutationVariables
>;

/**
 * __useBulkEnableLoginsMutation__
 *
 * To run a mutation, you first call `useBulkEnableLoginsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkEnableLoginsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkEnableLoginsMutation, { data, loading, error }] = useBulkEnableLoginsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkEnableLoginsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkEnableLoginsMutation,
    Types.BulkEnableLoginsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkEnableLoginsMutation,
    Types.BulkEnableLoginsMutationVariables
  >(BulkEnableLoginsDocument, options);
}
export type BulkEnableLoginsMutationHookResult = ReturnType<
  typeof useBulkEnableLoginsMutation
>;
export type BulkEnableLoginsMutationResult =
  Apollo.MutationResult<Types.BulkEnableLoginsMutation>;
export type BulkEnableLoginsMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkEnableLoginsMutation,
  Types.BulkEnableLoginsMutationVariables
>;
export const BulkSilenceUsersDocument = gql`
  mutation BulkSilenceUsers($ids: [ID]!) {
    silenceFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkSilenceUsersMutationFn = Apollo.MutationFunction<
  Types.BulkSilenceUsersMutation,
  Types.BulkSilenceUsersMutationVariables
>;

/**
 * __useBulkSilenceUsersMutation__
 *
 * To run a mutation, you first call `useBulkSilenceUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSilenceUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSilenceUsersMutation, { data, loading, error }] = useBulkSilenceUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkSilenceUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkSilenceUsersMutation,
    Types.BulkSilenceUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkSilenceUsersMutation,
    Types.BulkSilenceUsersMutationVariables
  >(BulkSilenceUsersDocument, options);
}
export type BulkSilenceUsersMutationHookResult = ReturnType<
  typeof useBulkSilenceUsersMutation
>;
export type BulkSilenceUsersMutationResult =
  Apollo.MutationResult<Types.BulkSilenceUsersMutation>;
export type BulkSilenceUsersMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkSilenceUsersMutation,
  Types.BulkSilenceUsersMutationVariables
>;
export const BulkUnsilenceUsersDocument = gql`
  mutation BulkUnsilenceUsers($ids: [ID]!) {
    unsilenceFullUsers(ids: $ids) {
      ...AdminFullUser
    }
  }
  ${AdminFullUserFragmentDoc}
`;
export type BulkUnsilenceUsersMutationFn = Apollo.MutationFunction<
  Types.BulkUnsilenceUsersMutation,
  Types.BulkUnsilenceUsersMutationVariables
>;

/**
 * __useBulkUnsilenceUsersMutation__
 *
 * To run a mutation, you first call `useBulkUnsilenceUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkUnsilenceUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkUnsilenceUsersMutation, { data, loading, error }] = useBulkUnsilenceUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkUnsilenceUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.BulkUnsilenceUsersMutation,
    Types.BulkUnsilenceUsersMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.BulkUnsilenceUsersMutation,
    Types.BulkUnsilenceUsersMutationVariables
  >(BulkUnsilenceUsersDocument, options);
}
export type BulkUnsilenceUsersMutationHookResult = ReturnType<
  typeof useBulkUnsilenceUsersMutation
>;
export type BulkUnsilenceUsersMutationResult =
  Apollo.MutationResult<Types.BulkUnsilenceUsersMutation>;
export type BulkUnsilenceUsersMutationOptions = Apollo.BaseMutationOptions<
  Types.BulkUnsilenceUsersMutation,
  Types.BulkUnsilenceUsersMutationVariables
>;
export const DashboardChannelsDocument = gql`
  query DashboardChannels {
    channels(filter: { mature: false }, limit: { limit: 25 }) {
      ...ChannelCommon
    }
  }
  ${ChannelCommonFragmentDoc}
`;

/**
 * __useDashboardChannelsQuery__
 *
 * To run a query within a React component, call `useDashboardChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardChannelsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.DashboardChannelsQuery,
    Types.DashboardChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.DashboardChannelsQuery,
    Types.DashboardChannelsQueryVariables
  >(DashboardChannelsDocument, options);
}
export function useDashboardChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.DashboardChannelsQuery,
    Types.DashboardChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.DashboardChannelsQuery,
    Types.DashboardChannelsQueryVariables
  >(DashboardChannelsDocument, options);
}
export type DashboardChannelsQueryHookResult = ReturnType<
  typeof useDashboardChannelsQuery
>;
export type DashboardChannelsLazyQueryHookResult = ReturnType<
  typeof useDashboardChannelsLazyQuery
>;
export type DashboardChannelsQueryResult = Apollo.QueryResult<
  Types.DashboardChannelsQuery,
  Types.DashboardChannelsQueryVariables
>;
export const DashboardFollowedChannelsDocument = gql`
  query DashboardFollowedChannels {
    selfSubscribedChannels {
      ...ChannelCommon
    }
  }
  ${ChannelCommonFragmentDoc}
`;

/**
 * __useDashboardFollowedChannelsQuery__
 *
 * To run a query within a React component, call `useDashboardFollowedChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardFollowedChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardFollowedChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardFollowedChannelsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.DashboardFollowedChannelsQuery,
    Types.DashboardFollowedChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.DashboardFollowedChannelsQuery,
    Types.DashboardFollowedChannelsQueryVariables
  >(DashboardFollowedChannelsDocument, options);
}
export function useDashboardFollowedChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.DashboardFollowedChannelsQuery,
    Types.DashboardFollowedChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.DashboardFollowedChannelsQuery,
    Types.DashboardFollowedChannelsQueryVariables
  >(DashboardFollowedChannelsDocument, options);
}
export type DashboardFollowedChannelsQueryHookResult = ReturnType<
  typeof useDashboardFollowedChannelsQuery
>;
export type DashboardFollowedChannelsLazyQueryHookResult = ReturnType<
  typeof useDashboardFollowedChannelsLazyQuery
>;
export type DashboardFollowedChannelsQueryResult = Apollo.QueryResult<
  Types.DashboardFollowedChannelsQuery,
  Types.DashboardFollowedChannelsQueryVariables
>;
export const UsersDirectoryDocument = gql`
  query UsersDirectory {
    userDirectory {
      ...UserDirectoryProfile
    }
  }
  ${UserDirectoryProfileFragmentDoc}
`;

/**
 * __useUsersDirectoryQuery__
 *
 * To run a query within a React component, call `useUsersDirectoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersDirectoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersDirectoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersDirectoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UsersDirectoryQuery,
    Types.UsersDirectoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UsersDirectoryQuery,
    Types.UsersDirectoryQueryVariables
  >(UsersDirectoryDocument, options);
}
export function useUsersDirectoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UsersDirectoryQuery,
    Types.UsersDirectoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UsersDirectoryQuery,
    Types.UsersDirectoryQueryVariables
  >(UsersDirectoryDocument, options);
}
export type UsersDirectoryQueryHookResult = ReturnType<
  typeof useUsersDirectoryQuery
>;
export type UsersDirectoryLazyQueryHookResult = ReturnType<
  typeof useUsersDirectoryLazyQuery
>;
export type UsersDirectoryQueryResult = Apollo.QueryResult<
  Types.UsersDirectoryQuery,
  Types.UsersDirectoryQueryVariables
>;
export const SelfSessionsDocument = gql`
  query SelfSessions {
    selfSessions {
      id
      expiresAt
      lastUsedAt
      userAgent
      user
      ip
      isCurrentSession
    }
  }
`;

/**
 * __useSelfSessionsQuery__
 *
 * To run a query within a React component, call `useSelfSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfSessionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.SelfSessionsQuery,
    Types.SelfSessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.SelfSessionsQuery,
    Types.SelfSessionsQueryVariables
  >(SelfSessionsDocument, options);
}
export function useSelfSessionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.SelfSessionsQuery,
    Types.SelfSessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.SelfSessionsQuery,
    Types.SelfSessionsQueryVariables
  >(SelfSessionsDocument, options);
}
export type SelfSessionsQueryHookResult = ReturnType<
  typeof useSelfSessionsQuery
>;
export type SelfSessionsLazyQueryHookResult = ReturnType<
  typeof useSelfSessionsLazyQuery
>;
export type SelfSessionsQueryResult = Apollo.QueryResult<
  Types.SelfSessionsQuery,
  Types.SelfSessionsQueryVariables
>;
export const RevokeSelfSessionsDocument = gql`
  mutation RevokeSelfSessions($input: [String]!) {
    revokeSelfSessions(input: $input)
  }
`;
export type RevokeSelfSessionsMutationFn = Apollo.MutationFunction<
  Types.RevokeSelfSessionsMutation,
  Types.RevokeSelfSessionsMutationVariables
>;

/**
 * __useRevokeSelfSessionsMutation__
 *
 * To run a mutation, you first call `useRevokeSelfSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeSelfSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeSelfSessionsMutation, { data, loading, error }] = useRevokeSelfSessionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRevokeSelfSessionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RevokeSelfSessionsMutation,
    Types.RevokeSelfSessionsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RevokeSelfSessionsMutation,
    Types.RevokeSelfSessionsMutationVariables
  >(RevokeSelfSessionsDocument, options);
}
export type RevokeSelfSessionsMutationHookResult = ReturnType<
  typeof useRevokeSelfSessionsMutation
>;
export type RevokeSelfSessionsMutationResult =
  Apollo.MutationResult<Types.RevokeSelfSessionsMutation>;
export type RevokeSelfSessionsMutationOptions = Apollo.BaseMutationOptions<
  Types.RevokeSelfSessionsMutation,
  Types.RevokeSelfSessionsMutationVariables
>;
export const AccountDetailsDocument = gql`
  query AccountDetails {
    selfAccount {
      id
      username
      email
    }
  }
`;

/**
 * __useAccountDetailsQuery__
 *
 * To run a query within a React component, call `useAccountDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.AccountDetailsQuery,
    Types.AccountDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.AccountDetailsQuery,
    Types.AccountDetailsQueryVariables
  >(AccountDetailsDocument, options);
}
export function useAccountDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.AccountDetailsQuery,
    Types.AccountDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.AccountDetailsQuery,
    Types.AccountDetailsQueryVariables
  >(AccountDetailsDocument, options);
}
export type AccountDetailsQueryHookResult = ReturnType<
  typeof useAccountDetailsQuery
>;
export type AccountDetailsLazyQueryHookResult = ReturnType<
  typeof useAccountDetailsLazyQuery
>;
export type AccountDetailsQueryResult = Apollo.QueryResult<
  Types.AccountDetailsQuery,
  Types.AccountDetailsQueryVariables
>;
export const ChangeAccountPasswordDocument = gql`
  mutation ChangeAccountPassword($input: ChangePasswordInput) {
    changeSelfPassword(input: $input)
  }
`;
export type ChangeAccountPasswordMutationFn = Apollo.MutationFunction<
  Types.ChangeAccountPasswordMutation,
  Types.ChangeAccountPasswordMutationVariables
>;

/**
 * __useChangeAccountPasswordMutation__
 *
 * To run a mutation, you first call `useChangeAccountPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAccountPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAccountPasswordMutation, { data, loading, error }] = useChangeAccountPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeAccountPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ChangeAccountPasswordMutation,
    Types.ChangeAccountPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.ChangeAccountPasswordMutation,
    Types.ChangeAccountPasswordMutationVariables
  >(ChangeAccountPasswordDocument, options);
}
export type ChangeAccountPasswordMutationHookResult = ReturnType<
  typeof useChangeAccountPasswordMutation
>;
export type ChangeAccountPasswordMutationResult =
  Apollo.MutationResult<Types.ChangeAccountPasswordMutation>;
export type ChangeAccountPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ChangeAccountPasswordMutation,
  Types.ChangeAccountPasswordMutationVariables
>;
export const SettingsUpdateAccountDocument = gql`
  mutation SettingsUpdateAccount($input: UpdateUserAccountInput) {
    updateSelfAccount(input: $input) {
      id
      username
      email
    }
  }
`;
export type SettingsUpdateAccountMutationFn = Apollo.MutationFunction<
  Types.SettingsUpdateAccountMutation,
  Types.SettingsUpdateAccountMutationVariables
>;

/**
 * __useSettingsUpdateAccountMutation__
 *
 * To run a mutation, you first call `useSettingsUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingsUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingsUpdateAccountMutation, { data, loading, error }] = useSettingsUpdateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSettingsUpdateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SettingsUpdateAccountMutation,
    Types.SettingsUpdateAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SettingsUpdateAccountMutation,
    Types.SettingsUpdateAccountMutationVariables
  >(SettingsUpdateAccountDocument, options);
}
export type SettingsUpdateAccountMutationHookResult = ReturnType<
  typeof useSettingsUpdateAccountMutation
>;
export type SettingsUpdateAccountMutationResult =
  Apollo.MutationResult<Types.SettingsUpdateAccountMutation>;
export type SettingsUpdateAccountMutationOptions = Apollo.BaseMutationOptions<
  Types.SettingsUpdateAccountMutation,
  Types.SettingsUpdateAccountMutationVariables
>;
export const SettingsChangePasswordDocument = gql`
  mutation SettingsChangePassword($input: ChangePasswordInput) {
    changeSelfPassword(input: $input)
  }
`;
export type SettingsChangePasswordMutationFn = Apollo.MutationFunction<
  Types.SettingsChangePasswordMutation,
  Types.SettingsChangePasswordMutationVariables
>;

/**
 * __useSettingsChangePasswordMutation__
 *
 * To run a mutation, you first call `useSettingsChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingsChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingsChangePasswordMutation, { data, loading, error }] = useSettingsChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSettingsChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SettingsChangePasswordMutation,
    Types.SettingsChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SettingsChangePasswordMutation,
    Types.SettingsChangePasswordMutationVariables
  >(SettingsChangePasswordDocument, options);
}
export type SettingsChangePasswordMutationHookResult = ReturnType<
  typeof useSettingsChangePasswordMutation
>;
export type SettingsChangePasswordMutationResult =
  Apollo.MutationResult<Types.SettingsChangePasswordMutation>;
export type SettingsChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.SettingsChangePasswordMutation,
  Types.SettingsChangePasswordMutationVariables
>;
export const SelfStreamKeysDocument = gql`
  query SelfStreamKeys {
    selfStreamKeys {
      id
      name
      channel {
        id
        name
      }
    }
  }
`;

/**
 * __useSelfStreamKeysQuery__
 *
 * To run a query within a React component, call `useSelfStreamKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfStreamKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfStreamKeysQuery({
 *   variables: {
 *   },
 * });
 */
export function useSelfStreamKeysQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.SelfStreamKeysQuery,
    Types.SelfStreamKeysQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.SelfStreamKeysQuery,
    Types.SelfStreamKeysQueryVariables
  >(SelfStreamKeysDocument, options);
}
export function useSelfStreamKeysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.SelfStreamKeysQuery,
    Types.SelfStreamKeysQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.SelfStreamKeysQuery,
    Types.SelfStreamKeysQueryVariables
  >(SelfStreamKeysDocument, options);
}
export type SelfStreamKeysQueryHookResult = ReturnType<
  typeof useSelfStreamKeysQuery
>;
export type SelfStreamKeysLazyQueryHookResult = ReturnType<
  typeof useSelfStreamKeysLazyQuery
>;
export type SelfStreamKeysQueryResult = Apollo.QueryResult<
  Types.SelfStreamKeysQuery,
  Types.SelfStreamKeysQueryVariables
>;
export const RevokeSelfStreamKeysDocument = gql`
  mutation RevokeSelfStreamKeys($userId: ID!) {
    revokeAllStreamKeys(input: { userId: $userId })
  }
`;
export type RevokeSelfStreamKeysMutationFn = Apollo.MutationFunction<
  Types.RevokeSelfStreamKeysMutation,
  Types.RevokeSelfStreamKeysMutationVariables
>;

/**
 * __useRevokeSelfStreamKeysMutation__
 *
 * To run a mutation, you first call `useRevokeSelfStreamKeysMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeSelfStreamKeysMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeSelfStreamKeysMutation, { data, loading, error }] = useRevokeSelfStreamKeysMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRevokeSelfStreamKeysMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RevokeSelfStreamKeysMutation,
    Types.RevokeSelfStreamKeysMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.RevokeSelfStreamKeysMutation,
    Types.RevokeSelfStreamKeysMutationVariables
  >(RevokeSelfStreamKeysDocument, options);
}
export type RevokeSelfStreamKeysMutationHookResult = ReturnType<
  typeof useRevokeSelfStreamKeysMutation
>;
export type RevokeSelfStreamKeysMutationResult =
  Apollo.MutationResult<Types.RevokeSelfStreamKeysMutation>;
export type RevokeSelfStreamKeysMutationOptions = Apollo.BaseMutationOptions<
  Types.RevokeSelfStreamKeysMutation,
  Types.RevokeSelfStreamKeysMutationVariables
>;
export const ChannelDashboardStatusDocument = gql`
  query ChannelDashboardStatus($id: ID!) {
    channelStatus(id: $id) {
      id
      isLive
      viewers
      createdAt
      transferred
    }
  }
`;

/**
 * __useChannelDashboardStatusQuery__
 *
 * To run a query within a React component, call `useChannelDashboardStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelDashboardStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelDashboardStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelDashboardStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ChannelDashboardStatusQuery,
    Types.ChannelDashboardStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ChannelDashboardStatusQuery,
    Types.ChannelDashboardStatusQueryVariables
  >(ChannelDashboardStatusDocument, options);
}
export function useChannelDashboardStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ChannelDashboardStatusQuery,
    Types.ChannelDashboardStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ChannelDashboardStatusQuery,
    Types.ChannelDashboardStatusQueryVariables
  >(ChannelDashboardStatusDocument, options);
}
export type ChannelDashboardStatusQueryHookResult = ReturnType<
  typeof useChannelDashboardStatusQuery
>;
export type ChannelDashboardStatusLazyQueryHookResult = ReturnType<
  typeof useChannelDashboardStatusLazyQuery
>;
export type ChannelDashboardStatusQueryResult = Apollo.QueryResult<
  Types.ChannelDashboardStatusQuery,
  Types.ChannelDashboardStatusQueryVariables
>;
export const UserSettingsChannelDocument = gql`
  query UserSettingsChannel($id: ID!) {
    selfChannel(id: $id) {
      ...SelfChannelFull
    }
  }
  ${SelfChannelFullFragmentDoc}
`;

/**
 * __useUserSettingsChannelQuery__
 *
 * To run a query within a React component, call `useUserSettingsChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsChannelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserSettingsChannelQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserSettingsChannelQuery,
    Types.UserSettingsChannelQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserSettingsChannelQuery,
    Types.UserSettingsChannelQueryVariables
  >(UserSettingsChannelDocument, options);
}
export function useUserSettingsChannelLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserSettingsChannelQuery,
    Types.UserSettingsChannelQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserSettingsChannelQuery,
    Types.UserSettingsChannelQueryVariables
  >(UserSettingsChannelDocument, options);
}
export type UserSettingsChannelQueryHookResult = ReturnType<
  typeof useUserSettingsChannelQuery
>;
export type UserSettingsChannelLazyQueryHookResult = ReturnType<
  typeof useUserSettingsChannelLazyQuery
>;
export type UserSettingsChannelQueryResult = Apollo.QueryResult<
  Types.UserSettingsChannelQuery,
  Types.UserSettingsChannelQueryVariables
>;
export const EditChannelDocument = gql`
  mutation EditChannel($input: UpdateChannelInput) {
    updateChannel(input: $input) {
      ...ChannelFull
    }
  }
  ${ChannelFullFragmentDoc}
`;
export type EditChannelMutationFn = Apollo.MutationFunction<
  Types.EditChannelMutation,
  Types.EditChannelMutationVariables
>;

/**
 * __useEditChannelMutation__
 *
 * To run a mutation, you first call `useEditChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editChannelMutation, { data, loading, error }] = useEditChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.EditChannelMutation,
    Types.EditChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.EditChannelMutation,
    Types.EditChannelMutationVariables
  >(EditChannelDocument, options);
}
export type EditChannelMutationHookResult = ReturnType<
  typeof useEditChannelMutation
>;
export type EditChannelMutationResult =
  Apollo.MutationResult<Types.EditChannelMutation>;
export type EditChannelMutationOptions = Apollo.BaseMutationOptions<
  Types.EditChannelMutation,
  Types.EditChannelMutationVariables
>;
export const UserSettingsChannelKeysDocument = gql`
  query UserSettingsChannelKeys($channelId: ID!) {
    streamKeysByChannelId(channelId: $channelId) {
      id
      name
      channel {
        id
        name
      }
    }
  }
`;

/**
 * __useUserSettingsChannelKeysQuery__
 *
 * To run a query within a React component, call `useUserSettingsChannelKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsChannelKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsChannelKeysQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useUserSettingsChannelKeysQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserSettingsChannelKeysQuery,
    Types.UserSettingsChannelKeysQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserSettingsChannelKeysQuery,
    Types.UserSettingsChannelKeysQueryVariables
  >(UserSettingsChannelKeysDocument, options);
}
export function useUserSettingsChannelKeysLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserSettingsChannelKeysQuery,
    Types.UserSettingsChannelKeysQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserSettingsChannelKeysQuery,
    Types.UserSettingsChannelKeysQueryVariables
  >(UserSettingsChannelKeysDocument, options);
}
export type UserSettingsChannelKeysQueryHookResult = ReturnType<
  typeof useUserSettingsChannelKeysQuery
>;
export type UserSettingsChannelKeysLazyQueryHookResult = ReturnType<
  typeof useUserSettingsChannelKeysLazyQuery
>;
export type UserSettingsChannelKeysQueryResult = Apollo.QueryResult<
  Types.UserSettingsChannelKeysQuery,
  Types.UserSettingsChannelKeysQueryVariables
>;
export const UserSettingsRevokeAllStreamKeysDocument = gql`
  mutation UserSettingsRevokeAllStreamKeys($channelId: ID!, $userId: ID!) {
    revokeStreamKeys(input: { channelId: $channelId, userId: $userId })
  }
`;
export type UserSettingsRevokeAllStreamKeysMutationFn = Apollo.MutationFunction<
  Types.UserSettingsRevokeAllStreamKeysMutation,
  Types.UserSettingsRevokeAllStreamKeysMutationVariables
>;

/**
 * __useUserSettingsRevokeAllStreamKeysMutation__
 *
 * To run a mutation, you first call `useUserSettingsRevokeAllStreamKeysMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsRevokeAllStreamKeysMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSettingsRevokeAllStreamKeysMutation, { data, loading, error }] = useUserSettingsRevokeAllStreamKeysMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserSettingsRevokeAllStreamKeysMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserSettingsRevokeAllStreamKeysMutation,
    Types.UserSettingsRevokeAllStreamKeysMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UserSettingsRevokeAllStreamKeysMutation,
    Types.UserSettingsRevokeAllStreamKeysMutationVariables
  >(UserSettingsRevokeAllStreamKeysDocument, options);
}
export type UserSettingsRevokeAllStreamKeysMutationHookResult = ReturnType<
  typeof useUserSettingsRevokeAllStreamKeysMutation
>;
export type UserSettingsRevokeAllStreamKeysMutationResult =
  Apollo.MutationResult<Types.UserSettingsRevokeAllStreamKeysMutation>;
export type UserSettingsRevokeAllStreamKeysMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UserSettingsRevokeAllStreamKeysMutation,
    Types.UserSettingsRevokeAllStreamKeysMutationVariables
  >;
export const UserSettingsRevokeStreamKeyDocument = gql`
  mutation UserSettingsRevokeStreamKey($streamKey: ID!) {
    revokeStreamKey(key: $streamKey)
  }
`;
export type UserSettingsRevokeStreamKeyMutationFn = Apollo.MutationFunction<
  Types.UserSettingsRevokeStreamKeyMutation,
  Types.UserSettingsRevokeStreamKeyMutationVariables
>;

/**
 * __useUserSettingsRevokeStreamKeyMutation__
 *
 * To run a mutation, you first call `useUserSettingsRevokeStreamKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsRevokeStreamKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSettingsRevokeStreamKeyMutation, { data, loading, error }] = useUserSettingsRevokeStreamKeyMutation({
 *   variables: {
 *      streamKey: // value for 'streamKey'
 *   },
 * });
 */
export function useUserSettingsRevokeStreamKeyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserSettingsRevokeStreamKeyMutation,
    Types.UserSettingsRevokeStreamKeyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UserSettingsRevokeStreamKeyMutation,
    Types.UserSettingsRevokeStreamKeyMutationVariables
  >(UserSettingsRevokeStreamKeyDocument, options);
}
export type UserSettingsRevokeStreamKeyMutationHookResult = ReturnType<
  typeof useUserSettingsRevokeStreamKeyMutation
>;
export type UserSettingsRevokeStreamKeyMutationResult =
  Apollo.MutationResult<Types.UserSettingsRevokeStreamKeyMutation>;
export type UserSettingsRevokeStreamKeyMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UserSettingsRevokeStreamKeyMutation,
    Types.UserSettingsRevokeStreamKeyMutationVariables
  >;
export const DisableChannelDocument = gql`
  mutation DisableChannel($id: ID!) {
    disableChannel(id: $id)
  }
`;
export type DisableChannelMutationFn = Apollo.MutationFunction<
  Types.DisableChannelMutation,
  Types.DisableChannelMutationVariables
>;

/**
 * __useDisableChannelMutation__
 *
 * To run a mutation, you first call `useDisableChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableChannelMutation, { data, loading, error }] = useDisableChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDisableChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DisableChannelMutation,
    Types.DisableChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DisableChannelMutation,
    Types.DisableChannelMutationVariables
  >(DisableChannelDocument, options);
}
export type DisableChannelMutationHookResult = ReturnType<
  typeof useDisableChannelMutation
>;
export type DisableChannelMutationResult =
  Apollo.MutationResult<Types.DisableChannelMutation>;
export type DisableChannelMutationOptions = Apollo.BaseMutationOptions<
  Types.DisableChannelMutation,
  Types.DisableChannelMutationVariables
>;
export const EnableChannelDocument = gql`
  mutation EnableChannel($id: ID!) {
    enableChannel(id: $id)
  }
`;
export type EnableChannelMutationFn = Apollo.MutationFunction<
  Types.EnableChannelMutation,
  Types.EnableChannelMutationVariables
>;

/**
 * __useEnableChannelMutation__
 *
 * To run a mutation, you first call `useEnableChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableChannelMutation, { data, loading, error }] = useEnableChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEnableChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.EnableChannelMutation,
    Types.EnableChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.EnableChannelMutation,
    Types.EnableChannelMutationVariables
  >(EnableChannelDocument, options);
}
export type EnableChannelMutationHookResult = ReturnType<
  typeof useEnableChannelMutation
>;
export type EnableChannelMutationResult =
  Apollo.MutationResult<Types.EnableChannelMutation>;
export type EnableChannelMutationOptions = Apollo.BaseMutationOptions<
  Types.EnableChannelMutation,
  Types.EnableChannelMutationVariables
>;
export const UserSettingsChannelsDocument = gql`
  query UserSettingsChannels($filter: ChannelsQueryFilter) {
    selfChannels(filter: $filter) {
      ...ChannelFull
    }
  }
  ${ChannelFullFragmentDoc}
`;

/**
 * __useUserSettingsChannelsQuery__
 *
 * To run a query within a React component, call `useUserSettingsChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsChannelsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserSettingsChannelsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UserSettingsChannelsQuery,
    Types.UserSettingsChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserSettingsChannelsQuery,
    Types.UserSettingsChannelsQueryVariables
  >(UserSettingsChannelsDocument, options);
}
export function useUserSettingsChannelsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserSettingsChannelsQuery,
    Types.UserSettingsChannelsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserSettingsChannelsQuery,
    Types.UserSettingsChannelsQueryVariables
  >(UserSettingsChannelsDocument, options);
}
export type UserSettingsChannelsQueryHookResult = ReturnType<
  typeof useUserSettingsChannelsQuery
>;
export type UserSettingsChannelsLazyQueryHookResult = ReturnType<
  typeof useUserSettingsChannelsLazyQuery
>;
export type UserSettingsChannelsQueryResult = Apollo.QueryResult<
  Types.UserSettingsChannelsQuery,
  Types.UserSettingsChannelsQueryVariables
>;
export const UserSettingsDeleteChannelDocument = gql`
  mutation UserSettingsDeleteChannel($id: ID!) {
    deleteChannel(id: $id)
  }
`;
export type UserSettingsDeleteChannelMutationFn = Apollo.MutationFunction<
  Types.UserSettingsDeleteChannelMutation,
  Types.UserSettingsDeleteChannelMutationVariables
>;

/**
 * __useUserSettingsDeleteChannelMutation__
 *
 * To run a mutation, you first call `useUserSettingsDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSettingsDeleteChannelMutation, { data, loading, error }] = useUserSettingsDeleteChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserSettingsDeleteChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserSettingsDeleteChannelMutation,
    Types.UserSettingsDeleteChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UserSettingsDeleteChannelMutation,
    Types.UserSettingsDeleteChannelMutationVariables
  >(UserSettingsDeleteChannelDocument, options);
}
export type UserSettingsDeleteChannelMutationHookResult = ReturnType<
  typeof useUserSettingsDeleteChannelMutation
>;
export type UserSettingsDeleteChannelMutationResult =
  Apollo.MutationResult<Types.UserSettingsDeleteChannelMutation>;
export type UserSettingsDeleteChannelMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UserSettingsDeleteChannelMutation,
    Types.UserSettingsDeleteChannelMutationVariables
  >;
export const UserSettingsCreateChannelDocument = gql`
  mutation UserSettingsCreateChannel($input: CreateChannelInput) {
    createChannel(input: $input) {
      ...ChannelFull
    }
  }
  ${ChannelFullFragmentDoc}
`;
export type UserSettingsCreateChannelMutationFn = Apollo.MutationFunction<
  Types.UserSettingsCreateChannelMutation,
  Types.UserSettingsCreateChannelMutationVariables
>;

/**
 * __useUserSettingsCreateChannelMutation__
 *
 * To run a mutation, you first call `useUserSettingsCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSettingsCreateChannelMutation, { data, loading, error }] = useUserSettingsCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserSettingsCreateChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserSettingsCreateChannelMutation,
    Types.UserSettingsCreateChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UserSettingsCreateChannelMutation,
    Types.UserSettingsCreateChannelMutationVariables
  >(UserSettingsCreateChannelDocument, options);
}
export type UserSettingsCreateChannelMutationHookResult = ReturnType<
  typeof useUserSettingsCreateChannelMutation
>;
export type UserSettingsCreateChannelMutationResult =
  Apollo.MutationResult<Types.UserSettingsCreateChannelMutation>;
export type UserSettingsCreateChannelMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UserSettingsCreateChannelMutation,
    Types.UserSettingsCreateChannelMutationVariables
  >;
export const UserSettingsCreateChannelKeyDocument = gql`
  mutation UserSettingsCreateChannelKey($input: CreateStreamKeyInput!) {
    createStreamKey(input: $input) {
      id
      name
    }
  }
`;
export type UserSettingsCreateChannelKeyMutationFn = Apollo.MutationFunction<
  Types.UserSettingsCreateChannelKeyMutation,
  Types.UserSettingsCreateChannelKeyMutationVariables
>;

/**
 * __useUserSettingsCreateChannelKeyMutation__
 *
 * To run a mutation, you first call `useUserSettingsCreateChannelKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsCreateChannelKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSettingsCreateChannelKeyMutation, { data, loading, error }] = useUserSettingsCreateChannelKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserSettingsCreateChannelKeyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UserSettingsCreateChannelKeyMutation,
    Types.UserSettingsCreateChannelKeyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UserSettingsCreateChannelKeyMutation,
    Types.UserSettingsCreateChannelKeyMutationVariables
  >(UserSettingsCreateChannelKeyDocument, options);
}
export type UserSettingsCreateChannelKeyMutationHookResult = ReturnType<
  typeof useUserSettingsCreateChannelKeyMutation
>;
export type UserSettingsCreateChannelKeyMutationResult =
  Apollo.MutationResult<Types.UserSettingsCreateChannelKeyMutation>;
export type UserSettingsCreateChannelKeyMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UserSettingsCreateChannelKeyMutation,
    Types.UserSettingsCreateChannelKeyMutationVariables
  >;
export const UserSettingsProfileDocument = gql`
  query UserSettingsProfile {
    self {
      ...UserSettingsProfileFragment
    }
  }
  ${UserSettingsProfileFragmentFragmentDoc}
`;

/**
 * __useUserSettingsProfileQuery__
 *
 * To run a query within a React component, call `useUserSettingsProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserSettingsProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UserSettingsProfileQuery,
    Types.UserSettingsProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserSettingsProfileQuery,
    Types.UserSettingsProfileQueryVariables
  >(UserSettingsProfileDocument, options);
}
export function useUserSettingsProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserSettingsProfileQuery,
    Types.UserSettingsProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserSettingsProfileQuery,
    Types.UserSettingsProfileQueryVariables
  >(UserSettingsProfileDocument, options);
}
export type UserSettingsProfileQueryHookResult = ReturnType<
  typeof useUserSettingsProfileQuery
>;
export type UserSettingsProfileLazyQueryHookResult = ReturnType<
  typeof useUserSettingsProfileLazyQuery
>;
export type UserSettingsProfileQueryResult = Apollo.QueryResult<
  Types.UserSettingsProfileQuery,
  Types.UserSettingsProfileQueryVariables
>;
export const UpdateUserSettingsProfileDocument = gql`
  mutation UpdateUserSettingsProfile($input: UpdateSelfInput!) {
    updateSelf(input: $input) {
      ...UserSettingsProfileFragment
    }
  }
  ${UserSettingsProfileFragmentFragmentDoc}
`;
export type UpdateUserSettingsProfileMutationFn = Apollo.MutationFunction<
  Types.UpdateUserSettingsProfileMutation,
  Types.UpdateUserSettingsProfileMutationVariables
>;

/**
 * __useUpdateUserSettingsProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsProfileMutation, { data, loading, error }] = useUpdateUserSettingsProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserSettingsProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserSettingsProfileMutation,
    Types.UpdateUserSettingsProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateUserSettingsProfileMutation,
    Types.UpdateUserSettingsProfileMutationVariables
  >(UpdateUserSettingsProfileDocument, options);
}
export type UpdateUserSettingsProfileMutationHookResult = ReturnType<
  typeof useUpdateUserSettingsProfileMutation
>;
export type UpdateUserSettingsProfileMutationResult =
  Apollo.MutationResult<Types.UpdateUserSettingsProfileMutation>;
export type UpdateUserSettingsProfileMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UpdateUserSettingsProfileMutation,
    Types.UpdateUserSettingsProfileMutationVariables
  >;
export const UserSettingsPreferencesDocument = gql`
  query UserSettingsPreferences {
    userSettings {
      id
      useGravatar
      singleUserMode
      featureInDirectory
      singleUserChannel {
        id
      }
    }
  }
`;

/**
 * __useUserSettingsPreferencesQuery__
 *
 * To run a query within a React component, call `useUserSettingsPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserSettingsPreferencesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UserSettingsPreferencesQuery,
    Types.UserSettingsPreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserSettingsPreferencesQuery,
    Types.UserSettingsPreferencesQueryVariables
  >(UserSettingsPreferencesDocument, options);
}
export function useUserSettingsPreferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserSettingsPreferencesQuery,
    Types.UserSettingsPreferencesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserSettingsPreferencesQuery,
    Types.UserSettingsPreferencesQueryVariables
  >(UserSettingsPreferencesDocument, options);
}
export type UserSettingsPreferencesQueryHookResult = ReturnType<
  typeof useUserSettingsPreferencesQuery
>;
export type UserSettingsPreferencesLazyQueryHookResult = ReturnType<
  typeof useUserSettingsPreferencesLazyQuery
>;
export type UserSettingsPreferencesQueryResult = Apollo.QueryResult<
  Types.UserSettingsPreferencesQuery,
  Types.UserSettingsPreferencesQueryVariables
>;
export const UpdateUserSettingsPreferencesDocument = gql`
  mutation UpdateUserSettingsPreferences($input: UpdateUserSettingsInput!) {
    updateUserSettings(input: $input) {
      id
      useGravatar
      singleUserMode
      featureInDirectory
      singleUserChannel {
        id
      }
    }
  }
`;
export type UpdateUserSettingsPreferencesMutationFn = Apollo.MutationFunction<
  Types.UpdateUserSettingsPreferencesMutation,
  Types.UpdateUserSettingsPreferencesMutationVariables
>;

/**
 * __useUpdateUserSettingsPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsPreferencesMutation, { data, loading, error }] = useUpdateUserSettingsPreferencesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserSettingsPreferencesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UpdateUserSettingsPreferencesMutation,
    Types.UpdateUserSettingsPreferencesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UpdateUserSettingsPreferencesMutation,
    Types.UpdateUserSettingsPreferencesMutationVariables
  >(UpdateUserSettingsPreferencesDocument, options);
}
export type UpdateUserSettingsPreferencesMutationHookResult = ReturnType<
  typeof useUpdateUserSettingsPreferencesMutation
>;
export type UpdateUserSettingsPreferencesMutationResult =
  Apollo.MutationResult<Types.UpdateUserSettingsPreferencesMutation>;
export type UpdateUserSettingsPreferencesMutationOptions =
  Apollo.BaseMutationOptions<
    Types.UpdateUserSettingsPreferencesMutation,
    Types.UpdateUserSettingsPreferencesMutationVariables
  >;
export const GetFileForUploaderDocument = gql`
  query GetFileForUploader($id: ID!) {
    fileInfo(id: $id) {
      id
      filename
      mimetype
      encoding
    }
  }
`;

/**
 * __useGetFileForUploaderQuery__
 *
 * To run a query within a React component, call `useGetFileForUploaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileForUploaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileForUploaderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFileForUploaderQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetFileForUploaderQuery,
    Types.GetFileForUploaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetFileForUploaderQuery,
    Types.GetFileForUploaderQueryVariables
  >(GetFileForUploaderDocument, options);
}
export function useGetFileForUploaderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetFileForUploaderQuery,
    Types.GetFileForUploaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetFileForUploaderQuery,
    Types.GetFileForUploaderQueryVariables
  >(GetFileForUploaderDocument, options);
}
export type GetFileForUploaderQueryHookResult = ReturnType<
  typeof useGetFileForUploaderQuery
>;
export type GetFileForUploaderLazyQueryHookResult = ReturnType<
  typeof useGetFileForUploaderLazyQuery
>;
export type GetFileForUploaderQueryResult = Apollo.QueryResult<
  Types.GetFileForUploaderQuery,
  Types.GetFileForUploaderQueryVariables
>;
export const UploadFileWithUploaderDocument = gql`
  mutation UploadFileWithUploader($input: Upload!) {
    uploadFile(file: $input) {
      id
      filename
      mimetype
      encoding
    }
  }
`;
export type UploadFileWithUploaderMutationFn = Apollo.MutationFunction<
  Types.UploadFileWithUploaderMutation,
  Types.UploadFileWithUploaderMutationVariables
>;

/**
 * __useUploadFileWithUploaderMutation__
 *
 * To run a mutation, you first call `useUploadFileWithUploaderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileWithUploaderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileWithUploaderMutation, { data, loading, error }] = useUploadFileWithUploaderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadFileWithUploaderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UploadFileWithUploaderMutation,
    Types.UploadFileWithUploaderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UploadFileWithUploaderMutation,
    Types.UploadFileWithUploaderMutationVariables
  >(UploadFileWithUploaderDocument, options);
}
export type UploadFileWithUploaderMutationHookResult = ReturnType<
  typeof useUploadFileWithUploaderMutation
>;
export type UploadFileWithUploaderMutationResult =
  Apollo.MutationResult<Types.UploadFileWithUploaderMutation>;
export type UploadFileWithUploaderMutationOptions = Apollo.BaseMutationOptions<
  Types.UploadFileWithUploaderMutation,
  Types.UploadFileWithUploaderMutationVariables
>;
export const ActivitesSelectDocument = gql`
  query ActivitesSelect($filter: ActivityFilter, $limit: ActivityLimit) {
    activities(filter: $filter, limit: $limit) {
      id
      name
    }
  }
`;

/**
 * __useActivitesSelectQuery__
 *
 * To run a query within a React component, call `useActivitesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitesSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useActivitesSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ActivitesSelectQuery,
    Types.ActivitesSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ActivitesSelectQuery,
    Types.ActivitesSelectQueryVariables
  >(ActivitesSelectDocument, options);
}
export function useActivitesSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ActivitesSelectQuery,
    Types.ActivitesSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ActivitesSelectQuery,
    Types.ActivitesSelectQueryVariables
  >(ActivitesSelectDocument, options);
}
export type ActivitesSelectQueryHookResult = ReturnType<
  typeof useActivitesSelectQuery
>;
export type ActivitesSelectLazyQueryHookResult = ReturnType<
  typeof useActivitesSelectLazyQuery
>;
export type ActivitesSelectQueryResult = Apollo.QueryResult<
  Types.ActivitesSelectQuery,
  Types.ActivitesSelectQueryVariables
>;
export const ActivitiesSelectInitialDocument = gql`
  query ActivitiesSelectInitial($filter: ActivityFilter) {
    activities(filter: $filter) {
      id
      name
    }
  }
`;

/**
 * __useActivitiesSelectInitialQuery__
 *
 * To run a query within a React component, call `useActivitiesSelectInitialQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesSelectInitialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesSelectInitialQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useActivitiesSelectInitialQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ActivitiesSelectInitialQuery,
    Types.ActivitiesSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ActivitiesSelectInitialQuery,
    Types.ActivitiesSelectInitialQueryVariables
  >(ActivitiesSelectInitialDocument, options);
}
export function useActivitiesSelectInitialLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ActivitiesSelectInitialQuery,
    Types.ActivitiesSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ActivitiesSelectInitialQuery,
    Types.ActivitiesSelectInitialQueryVariables
  >(ActivitiesSelectInitialDocument, options);
}
export type ActivitiesSelectInitialQueryHookResult = ReturnType<
  typeof useActivitiesSelectInitialQuery
>;
export type ActivitiesSelectInitialLazyQueryHookResult = ReturnType<
  typeof useActivitiesSelectInitialLazyQuery
>;
export type ActivitiesSelectInitialQueryResult = Apollo.QueryResult<
  Types.ActivitiesSelectInitialQuery,
  Types.ActivitiesSelectInitialQueryVariables
>;
export const ChannelsSelectDocument = gql`
  query ChannelsSelect($filter: ChannelsQueryFilter, $limit: QueryLimit) {
    channels(filter: $filter, limit: $limit) {
      id
      name
    }
  }
`;

/**
 * __useChannelsSelectQuery__
 *
 * To run a query within a React component, call `useChannelsSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useChannelsSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ChannelsSelectQuery,
    Types.ChannelsSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ChannelsSelectQuery,
    Types.ChannelsSelectQueryVariables
  >(ChannelsSelectDocument, options);
}
export function useChannelsSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ChannelsSelectQuery,
    Types.ChannelsSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ChannelsSelectQuery,
    Types.ChannelsSelectQueryVariables
  >(ChannelsSelectDocument, options);
}
export type ChannelsSelectQueryHookResult = ReturnType<
  typeof useChannelsSelectQuery
>;
export type ChannelsSelectLazyQueryHookResult = ReturnType<
  typeof useChannelsSelectLazyQuery
>;
export type ChannelsSelectQueryResult = Apollo.QueryResult<
  Types.ChannelsSelectQuery,
  Types.ChannelsSelectQueryVariables
>;
export const ChannelsSelectInitialDocument = gql`
  query ChannelsSelectInitial($filter: ChannelsQueryFilter) {
    channels(filter: $filter) {
      id
      name
    }
  }
`;

/**
 * __useChannelsSelectInitialQuery__
 *
 * To run a query within a React component, call `useChannelsSelectInitialQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsSelectInitialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsSelectInitialQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useChannelsSelectInitialQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ChannelsSelectInitialQuery,
    Types.ChannelsSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ChannelsSelectInitialQuery,
    Types.ChannelsSelectInitialQueryVariables
  >(ChannelsSelectInitialDocument, options);
}
export function useChannelsSelectInitialLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ChannelsSelectInitialQuery,
    Types.ChannelsSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ChannelsSelectInitialQuery,
    Types.ChannelsSelectInitialQueryVariables
  >(ChannelsSelectInitialDocument, options);
}
export type ChannelsSelectInitialQueryHookResult = ReturnType<
  typeof useChannelsSelectInitialQuery
>;
export type ChannelsSelectInitialLazyQueryHookResult = ReturnType<
  typeof useChannelsSelectInitialLazyQuery
>;
export type ChannelsSelectInitialQueryResult = Apollo.QueryResult<
  Types.ChannelsSelectInitialQuery,
  Types.ChannelsSelectInitialQueryVariables
>;
export const RolesSelectDocument = gql`
  query RolesSelect($filter: RolesFilter, $limit: QueryLimit) {
    roles(filter: $filter, limit: $limit) {
      id
      name
    }
  }
`;

/**
 * __useRolesSelectQuery__
 *
 * To run a query within a React component, call `useRolesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRolesSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.RolesSelectQuery,
    Types.RolesSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.RolesSelectQuery,
    Types.RolesSelectQueryVariables
  >(RolesSelectDocument, options);
}
export function useRolesSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.RolesSelectQuery,
    Types.RolesSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.RolesSelectQuery,
    Types.RolesSelectQueryVariables
  >(RolesSelectDocument, options);
}
export type RolesSelectQueryHookResult = ReturnType<typeof useRolesSelectQuery>;
export type RolesSelectLazyQueryHookResult = ReturnType<
  typeof useRolesSelectLazyQuery
>;
export type RolesSelectQueryResult = Apollo.QueryResult<
  Types.RolesSelectQuery,
  Types.RolesSelectQueryVariables
>;
export const RolesSelectInitialDocument = gql`
  query RolesSelectInitial($filter: RolesFilter) {
    roles(filter: $filter) {
      id
      name
    }
  }
`;

/**
 * __useRolesSelectInitialQuery__
 *
 * To run a query within a React component, call `useRolesSelectInitialQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesSelectInitialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesSelectInitialQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useRolesSelectInitialQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.RolesSelectInitialQuery,
    Types.RolesSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.RolesSelectInitialQuery,
    Types.RolesSelectInitialQueryVariables
  >(RolesSelectInitialDocument, options);
}
export function useRolesSelectInitialLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.RolesSelectInitialQuery,
    Types.RolesSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.RolesSelectInitialQuery,
    Types.RolesSelectInitialQueryVariables
  >(RolesSelectInitialDocument, options);
}
export type RolesSelectInitialQueryHookResult = ReturnType<
  typeof useRolesSelectInitialQuery
>;
export type RolesSelectInitialLazyQueryHookResult = ReturnType<
  typeof useRolesSelectInitialLazyQuery
>;
export type RolesSelectInitialQueryResult = Apollo.QueryResult<
  Types.RolesSelectInitialQuery,
  Types.RolesSelectInitialQueryVariables
>;
export const SelfChannelsSelectDocument = gql`
  query SelfChannelsSelect($filter: ChannelsQueryFilter) {
    selfChannels(filter: $filter) {
      id
      name
    }
  }
`;

/**
 * __useSelfChannelsSelectQuery__
 *
 * To run a query within a React component, call `useSelfChannelsSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSelfChannelsSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSelfChannelsSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSelfChannelsSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.SelfChannelsSelectQuery,
    Types.SelfChannelsSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.SelfChannelsSelectQuery,
    Types.SelfChannelsSelectQueryVariables
  >(SelfChannelsSelectDocument, options);
}
export function useSelfChannelsSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.SelfChannelsSelectQuery,
    Types.SelfChannelsSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.SelfChannelsSelectQuery,
    Types.SelfChannelsSelectQueryVariables
  >(SelfChannelsSelectDocument, options);
}
export type SelfChannelsSelectQueryHookResult = ReturnType<
  typeof useSelfChannelsSelectQuery
>;
export type SelfChannelsSelectLazyQueryHookResult = ReturnType<
  typeof useSelfChannelsSelectLazyQuery
>;
export type SelfChannelsSelectQueryResult = Apollo.QueryResult<
  Types.SelfChannelsSelectQuery,
  Types.SelfChannelsSelectQueryVariables
>;
export const UsersSelectDocument = gql`
  query UsersSelect($filter: FullUsersFilter, $limit: QueryLimit) {
    fullUsers(filter: $filter, limit: $limit) {
      id
      displayName
      username
    }
  }
`;

/**
 * __useUsersSelectQuery__
 *
 * To run a query within a React component, call `useUsersSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSelectQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUsersSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UsersSelectQuery,
    Types.UsersSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UsersSelectQuery,
    Types.UsersSelectQueryVariables
  >(UsersSelectDocument, options);
}
export function useUsersSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UsersSelectQuery,
    Types.UsersSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UsersSelectQuery,
    Types.UsersSelectQueryVariables
  >(UsersSelectDocument, options);
}
export type UsersSelectQueryHookResult = ReturnType<typeof useUsersSelectQuery>;
export type UsersSelectLazyQueryHookResult = ReturnType<
  typeof useUsersSelectLazyQuery
>;
export type UsersSelectQueryResult = Apollo.QueryResult<
  Types.UsersSelectQuery,
  Types.UsersSelectQueryVariables
>;
export const UsersSelectInitialDocument = gql`
  query UsersSelectInitial($filter: FullUsersFilter) {
    fullUsers(filter: $filter) {
      id
      displayName
      username
    }
  }
`;

/**
 * __useUsersSelectInitialQuery__
 *
 * To run a query within a React component, call `useUsersSelectInitialQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSelectInitialQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersSelectInitialQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersSelectInitialQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.UsersSelectInitialQuery,
    Types.UsersSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UsersSelectInitialQuery,
    Types.UsersSelectInitialQueryVariables
  >(UsersSelectInitialDocument, options);
}
export function useUsersSelectInitialLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UsersSelectInitialQuery,
    Types.UsersSelectInitialQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UsersSelectInitialQuery,
    Types.UsersSelectInitialQueryVariables
  >(UsersSelectInitialDocument, options);
}
export type UsersSelectInitialQueryHookResult = ReturnType<
  typeof useUsersSelectInitialQuery
>;
export type UsersSelectInitialLazyQueryHookResult = ReturnType<
  typeof useUsersSelectInitialLazyQuery
>;
export type UsersSelectInitialQueryResult = Apollo.QueryResult<
  Types.UsersSelectInitialQuery,
  Types.UsersSelectInitialQueryVariables
>;
export const AdminCreateRoleDocument = gql`
  mutation AdminCreateRole($input: CreateRoleInput) {
    createRole(input: $input) {
      ...AdminRole
    }
  }
  ${AdminRoleFragmentDoc}
`;
export type AdminCreateRoleMutationFn = Apollo.MutationFunction<
  Types.AdminCreateRoleMutation,
  Types.AdminCreateRoleMutationVariables
>;

/**
 * __useAdminCreateRoleMutation__
 *
 * To run a mutation, you first call `useAdminCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateRoleMutation, { data, loading, error }] = useAdminCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.AdminCreateRoleMutation,
    Types.AdminCreateRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.AdminCreateRoleMutation,
    Types.AdminCreateRoleMutationVariables
  >(AdminCreateRoleDocument, options);
}
export type AdminCreateRoleMutationHookResult = ReturnType<
  typeof useAdminCreateRoleMutation
>;
export type AdminCreateRoleMutationResult =
  Apollo.MutationResult<Types.AdminCreateRoleMutation>;
export type AdminCreateRoleMutationOptions = Apollo.BaseMutationOptions<
  Types.AdminCreateRoleMutation,
  Types.AdminCreateRoleMutationVariables
>;
export const UserInfoDocument = gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      avatar {
        filename
      }
      username
      displayName
    }
  }
`;

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserInfoQuery,
    Types.UserInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.UserInfoQuery, Types.UserInfoQueryVariables>(
    UserInfoDocument,
    options
  );
}
export function useUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserInfoQuery,
    Types.UserInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.UserInfoQuery, Types.UserInfoQueryVariables>(
    UserInfoDocument,
    options
  );
}
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<
  typeof useUserInfoLazyQuery
>;
export type UserInfoQueryResult = Apollo.QueryResult<
  Types.UserInfoQuery,
  Types.UserInfoQueryVariables
>;
export const CurrentUserFullDocument = gql`
  query CurrentUserFull {
    self {
      ...CurrentUser
    }
  }
  ${CurrentUserFragmentDoc}
`;

/**
 * __useCurrentUserFullQuery__
 *
 * To run a query within a React component, call `useCurrentUserFullQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserFullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserFullQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserFullQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.CurrentUserFullQuery,
    Types.CurrentUserFullQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.CurrentUserFullQuery,
    Types.CurrentUserFullQueryVariables
  >(CurrentUserFullDocument, options);
}
export function useCurrentUserFullLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.CurrentUserFullQuery,
    Types.CurrentUserFullQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.CurrentUserFullQuery,
    Types.CurrentUserFullQueryVariables
  >(CurrentUserFullDocument, options);
}
export type CurrentUserFullQueryHookResult = ReturnType<
  typeof useCurrentUserFullQuery
>;
export type CurrentUserFullLazyQueryHookResult = ReturnType<
  typeof useCurrentUserFullLazyQuery
>;
export type CurrentUserFullQueryResult = Apollo.QueryResult<
  Types.CurrentUserFullQuery,
  Types.CurrentUserFullQueryVariables
>;
export const CurrentUserSettingsDocument = gql`
  query CurrentUserSettings {
    userSettings {
      id
      useGravatar
      featureInDirectory
      singleUserMode
      singleUserChannel {
        id
      }
    }
  }
`;

/**
 * __useCurrentUserSettingsQuery__
 *
 * To run a query within a React component, call `useCurrentUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserSettingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.CurrentUserSettingsQuery,
    Types.CurrentUserSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.CurrentUserSettingsQuery,
    Types.CurrentUserSettingsQueryVariables
  >(CurrentUserSettingsDocument, options);
}
export function useCurrentUserSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.CurrentUserSettingsQuery,
    Types.CurrentUserSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.CurrentUserSettingsQuery,
    Types.CurrentUserSettingsQueryVariables
  >(CurrentUserSettingsDocument, options);
}
export type CurrentUserSettingsQueryHookResult = ReturnType<
  typeof useCurrentUserSettingsQuery
>;
export type CurrentUserSettingsLazyQueryHookResult = ReturnType<
  typeof useCurrentUserSettingsLazyQuery
>;
export type CurrentUserSettingsQueryResult = Apollo.QueryResult<
  Types.CurrentUserSettingsQuery,
  Types.CurrentUserSettingsQueryVariables
>;
export const CheckChannelAccessDocument = gql`
  mutation CheckChannelAccess($token: ID!) {
    checkAccessKey(id: $token)
  }
`;
export type CheckChannelAccessMutationFn = Apollo.MutationFunction<
  Types.CheckChannelAccessMutation,
  Types.CheckChannelAccessMutationVariables
>;

/**
 * __useCheckChannelAccessMutation__
 *
 * To run a mutation, you first call `useCheckChannelAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckChannelAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkChannelAccessMutation, { data, loading, error }] = useCheckChannelAccessMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCheckChannelAccessMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.CheckChannelAccessMutation,
    Types.CheckChannelAccessMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.CheckChannelAccessMutation,
    Types.CheckChannelAccessMutationVariables
  >(CheckChannelAccessDocument, options);
}
export type CheckChannelAccessMutationHookResult = ReturnType<
  typeof useCheckChannelAccessMutation
>;
export type CheckChannelAccessMutationResult =
  Apollo.MutationResult<Types.CheckChannelAccessMutation>;
export type CheckChannelAccessMutationOptions = Apollo.BaseMutationOptions<
  Types.CheckChannelAccessMutation,
  Types.CheckChannelAccessMutationVariables
>;
export const GetAccessKeyDocument = gql`
  mutation GetAccessKey($channelId: ID!, $password: String!) {
    authorizeChannelAccess(
      input: { channelId: $channelId, password: $password }
    ) {
      id
      channel
      expiresAt
    }
  }
`;
export type GetAccessKeyMutationFn = Apollo.MutationFunction<
  Types.GetAccessKeyMutation,
  Types.GetAccessKeyMutationVariables
>;

/**
 * __useGetAccessKeyMutation__
 *
 * To run a mutation, you first call `useGetAccessKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAccessKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAccessKeyMutation, { data, loading, error }] = useGetAccessKeyMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetAccessKeyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.GetAccessKeyMutation,
    Types.GetAccessKeyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.GetAccessKeyMutation,
    Types.GetAccessKeyMutationVariables
  >(GetAccessKeyDocument, options);
}
export type GetAccessKeyMutationHookResult = ReturnType<
  typeof useGetAccessKeyMutation
>;
export type GetAccessKeyMutationResult =
  Apollo.MutationResult<Types.GetAccessKeyMutation>;
export type GetAccessKeyMutationOptions = Apollo.BaseMutationOptions<
  Types.GetAccessKeyMutation,
  Types.GetAccessKeyMutationVariables
>;
export const ServerConfigInfoDocument = gql`
  query ServerConfigInfo {
    serverConfig {
      omeEnabled
      publishURL
    }
  }
`;

/**
 * __useServerConfigInfoQuery__
 *
 * To run a query within a React component, call `useServerConfigInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerConfigInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerConfigInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerConfigInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.ServerConfigInfoQuery,
    Types.ServerConfigInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ServerConfigInfoQuery,
    Types.ServerConfigInfoQueryVariables
  >(ServerConfigInfoDocument, options);
}
export function useServerConfigInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ServerConfigInfoQuery,
    Types.ServerConfigInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ServerConfigInfoQuery,
    Types.ServerConfigInfoQueryVariables
  >(ServerConfigInfoDocument, options);
}
export type ServerConfigInfoQueryHookResult = ReturnType<
  typeof useServerConfigInfoQuery
>;
export type ServerConfigInfoLazyQueryHookResult = ReturnType<
  typeof useServerConfigInfoLazyQuery
>;
export type ServerConfigInfoQueryResult = Apollo.QueryResult<
  Types.ServerConfigInfoQuery,
  Types.ServerConfigInfoQueryVariables
>;
export const SignInDocument = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      token
      expiresAt
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignInMutation,
    Types.SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<Types.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Types.SignInMutation,
  Types.SignInMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($username: String!, $password: String!, $email: String!) {
    signUp(input: { username: $username, password: $password, email: $email }) {
      id
      username
    }
  }
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SignUpMutation,
    Types.SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<Types.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  Types.SignUpMutation,
  Types.SignUpMutationVariables
>;
export const ChannelPageDocument = gql`
  query ChannelPage($id: ID!) {
    channel(id: $id) {
      ...ChannelView
    }
  }
  ${ChannelViewFragmentDoc}
`;

/**
 * __useChannelPageQuery__
 *
 * To run a query within a React component, call `useChannelPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ChannelPageQuery,
    Types.ChannelPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ChannelPageQuery,
    Types.ChannelPageQueryVariables
  >(ChannelPageDocument, options);
}
export function useChannelPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ChannelPageQuery,
    Types.ChannelPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ChannelPageQuery,
    Types.ChannelPageQueryVariables
  >(ChannelPageDocument, options);
}
export type ChannelPageQueryHookResult = ReturnType<typeof useChannelPageQuery>;
export type ChannelPageLazyQueryHookResult = ReturnType<
  typeof useChannelPageLazyQuery
>;
export type ChannelPageQueryResult = Apollo.QueryResult<
  Types.ChannelPageQuery,
  Types.ChannelPageQueryVariables
>;
export const ChannelPageStatusDocument = gql`
  query ChannelPageStatus($id: ID!) {
    channel(id: $id) {
      status {
        ...ChannelViewStatus
      }
    }
  }
  ${ChannelViewStatusFragmentDoc}
`;

/**
 * __useChannelPageStatusQuery__
 *
 * To run a query within a React component, call `useChannelPageStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelPageStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelPageStatusQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelPageStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ChannelPageStatusQuery,
    Types.ChannelPageStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ChannelPageStatusQuery,
    Types.ChannelPageStatusQueryVariables
  >(ChannelPageStatusDocument, options);
}
export function useChannelPageStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ChannelPageStatusQuery,
    Types.ChannelPageStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ChannelPageStatusQuery,
    Types.ChannelPageStatusQueryVariables
  >(ChannelPageStatusDocument, options);
}
export type ChannelPageStatusQueryHookResult = ReturnType<
  typeof useChannelPageStatusQuery
>;
export type ChannelPageStatusLazyQueryHookResult = ReturnType<
  typeof useChannelPageStatusLazyQuery
>;
export type ChannelPageStatusQueryResult = Apollo.QueryResult<
  Types.ChannelPageStatusQuery,
  Types.ChannelPageStatusQueryVariables
>;
export const SubscribeToChannelDocument = gql`
  mutation SubscribeToChannel($id: ID!) {
    subscribe(input: { target: CHANNEL, targetId: $id }) {
      id
    }
  }
`;
export type SubscribeToChannelMutationFn = Apollo.MutationFunction<
  Types.SubscribeToChannelMutation,
  Types.SubscribeToChannelMutationVariables
>;

/**
 * __useSubscribeToChannelMutation__
 *
 * To run a mutation, you first call `useSubscribeToChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToChannelMutation, { data, loading, error }] = useSubscribeToChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeToChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SubscribeToChannelMutation,
    Types.SubscribeToChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SubscribeToChannelMutation,
    Types.SubscribeToChannelMutationVariables
  >(SubscribeToChannelDocument, options);
}
export type SubscribeToChannelMutationHookResult = ReturnType<
  typeof useSubscribeToChannelMutation
>;
export type SubscribeToChannelMutationResult =
  Apollo.MutationResult<Types.SubscribeToChannelMutation>;
export type SubscribeToChannelMutationOptions = Apollo.BaseMutationOptions<
  Types.SubscribeToChannelMutation,
  Types.SubscribeToChannelMutationVariables
>;
export const UnsubscribeFromChannelDocument = gql`
  mutation UnsubscribeFromChannel($id: ID!) {
    unsubscribe(input: { target: CHANNEL, targetId: $id })
  }
`;
export type UnsubscribeFromChannelMutationFn = Apollo.MutationFunction<
  Types.UnsubscribeFromChannelMutation,
  Types.UnsubscribeFromChannelMutationVariables
>;

/**
 * __useUnsubscribeFromChannelMutation__
 *
 * To run a mutation, you first call `useUnsubscribeFromChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeFromChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeFromChannelMutation, { data, loading, error }] = useUnsubscribeFromChannelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnsubscribeFromChannelMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UnsubscribeFromChannelMutation,
    Types.UnsubscribeFromChannelMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UnsubscribeFromChannelMutation,
    Types.UnsubscribeFromChannelMutationVariables
  >(UnsubscribeFromChannelDocument, options);
}
export type UnsubscribeFromChannelMutationHookResult = ReturnType<
  typeof useUnsubscribeFromChannelMutation
>;
export type UnsubscribeFromChannelMutationResult =
  Apollo.MutationResult<Types.UnsubscribeFromChannelMutation>;
export type UnsubscribeFromChannelMutationOptions = Apollo.BaseMutationOptions<
  Types.UnsubscribeFromChannelMutation,
  Types.UnsubscribeFromChannelMutationVariables
>;
export const ChannelSubscriptionDocument = gql`
  query ChannelSubscription($id: ID!) {
    subscription(input: { target: CHANNEL, targetId: $id }) {
      id
    }
  }
`;

/**
 * __useChannelSubscriptionQuery__
 *
 * To run a query within a React component, call `useChannelSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelSubscriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChannelSubscriptionQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.ChannelSubscriptionQuery,
    Types.ChannelSubscriptionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.ChannelSubscriptionQuery,
    Types.ChannelSubscriptionQueryVariables
  >(ChannelSubscriptionDocument, options);
}
export function useChannelSubscriptionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.ChannelSubscriptionQuery,
    Types.ChannelSubscriptionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.ChannelSubscriptionQuery,
    Types.ChannelSubscriptionQueryVariables
  >(ChannelSubscriptionDocument, options);
}
export type ChannelSubscriptionQueryHookResult = ReturnType<
  typeof useChannelSubscriptionQuery
>;
export type ChannelSubscriptionLazyQueryHookResult = ReturnType<
  typeof useChannelSubscriptionLazyQuery
>;
export type ChannelSubscriptionQueryResult = Apollo.QueryResult<
  Types.ChannelSubscriptionQuery,
  Types.ChannelSubscriptionQueryVariables
>;
export const UserPageDocument = gql`
  query UserPage($username: ID!) {
    user(id: $username) {
      ...UserProfile
    }
  }
  ${UserProfileFragmentDoc}
`;

/**
 * __useUserPageQuery__
 *
 * To run a query within a React component, call `useUserPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPageQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserPageQuery,
    Types.UserPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.UserPageQuery, Types.UserPageQueryVariables>(
    UserPageDocument,
    options
  );
}
export function useUserPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserPageQuery,
    Types.UserPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<Types.UserPageQuery, Types.UserPageQueryVariables>(
    UserPageDocument,
    options
  );
}
export type UserPageQueryHookResult = ReturnType<typeof useUserPageQuery>;
export type UserPageLazyQueryHookResult = ReturnType<
  typeof useUserPageLazyQuery
>;
export type UserPageQueryResult = Apollo.QueryResult<
  Types.UserPageQuery,
  Types.UserPageQueryVariables
>;
export const UserPageChannelStatusDocument = gql`
  query UserPageChannelStatus($username: ID!) {
    user(id: $username) {
      id
      channels {
        id
        status {
          ...ChannelViewStatus
        }
      }
    }
  }
  ${ChannelViewStatusFragmentDoc}
`;

/**
 * __useUserPageChannelStatusQuery__
 *
 * To run a query within a React component, call `useUserPageChannelStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPageChannelStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPageChannelStatusQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserPageChannelStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserPageChannelStatusQuery,
    Types.UserPageChannelStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserPageChannelStatusQuery,
    Types.UserPageChannelStatusQueryVariables
  >(UserPageChannelStatusDocument, options);
}
export function useUserPageChannelStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserPageChannelStatusQuery,
    Types.UserPageChannelStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserPageChannelStatusQuery,
    Types.UserPageChannelStatusQueryVariables
  >(UserPageChannelStatusDocument, options);
}
export type UserPageChannelStatusQueryHookResult = ReturnType<
  typeof useUserPageChannelStatusQuery
>;
export type UserPageChannelStatusLazyQueryHookResult = ReturnType<
  typeof useUserPageChannelStatusLazyQuery
>;
export type UserPageChannelStatusQueryResult = Apollo.QueryResult<
  Types.UserPageChannelStatusQuery,
  Types.UserPageChannelStatusQueryVariables
>;
export const SubscribeToUserDocument = gql`
  mutation SubscribeToUser($id: ID!) {
    subscribe(input: { target: USER, targetId: $id }) {
      id
    }
  }
`;
export type SubscribeToUserMutationFn = Apollo.MutationFunction<
  Types.SubscribeToUserMutation,
  Types.SubscribeToUserMutationVariables
>;

/**
 * __useSubscribeToUserMutation__
 *
 * To run a mutation, you first call `useSubscribeToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToUserMutation, { data, loading, error }] = useSubscribeToUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeToUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.SubscribeToUserMutation,
    Types.SubscribeToUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.SubscribeToUserMutation,
    Types.SubscribeToUserMutationVariables
  >(SubscribeToUserDocument, options);
}
export type SubscribeToUserMutationHookResult = ReturnType<
  typeof useSubscribeToUserMutation
>;
export type SubscribeToUserMutationResult =
  Apollo.MutationResult<Types.SubscribeToUserMutation>;
export type SubscribeToUserMutationOptions = Apollo.BaseMutationOptions<
  Types.SubscribeToUserMutation,
  Types.SubscribeToUserMutationVariables
>;
export const UnsubscribeFromUserDocument = gql`
  mutation UnsubscribeFromUser($id: ID!) {
    unsubscribe(input: { target: USER, targetId: $id })
  }
`;
export type UnsubscribeFromUserMutationFn = Apollo.MutationFunction<
  Types.UnsubscribeFromUserMutation,
  Types.UnsubscribeFromUserMutationVariables
>;

/**
 * __useUnsubscribeFromUserMutation__
 *
 * To run a mutation, you first call `useUnsubscribeFromUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeFromUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeFromUserMutation, { data, loading, error }] = useUnsubscribeFromUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnsubscribeFromUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.UnsubscribeFromUserMutation,
    Types.UnsubscribeFromUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.UnsubscribeFromUserMutation,
    Types.UnsubscribeFromUserMutationVariables
  >(UnsubscribeFromUserDocument, options);
}
export type UnsubscribeFromUserMutationHookResult = ReturnType<
  typeof useUnsubscribeFromUserMutation
>;
export type UnsubscribeFromUserMutationResult =
  Apollo.MutationResult<Types.UnsubscribeFromUserMutation>;
export type UnsubscribeFromUserMutationOptions = Apollo.BaseMutationOptions<
  Types.UnsubscribeFromUserMutation,
  Types.UnsubscribeFromUserMutationVariables
>;
export const UserSubscriptionDocument = gql`
  query UserSubscription($id: ID!) {
    subscription(input: { target: USER, targetId: $id }) {
      id
    }
  }
`;

/**
 * __useUserSubscriptionQuery__
 *
 * To run a query within a React component, call `useUserSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSubscriptionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserSubscriptionQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.UserSubscriptionQuery,
    Types.UserSubscriptionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.UserSubscriptionQuery,
    Types.UserSubscriptionQueryVariables
  >(UserSubscriptionDocument, options);
}
export function useUserSubscriptionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UserSubscriptionQuery,
    Types.UserSubscriptionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.UserSubscriptionQuery,
    Types.UserSubscriptionQueryVariables
  >(UserSubscriptionDocument, options);
}
export type UserSubscriptionQueryHookResult = ReturnType<
  typeof useUserSubscriptionQuery
>;
export type UserSubscriptionLazyQueryHookResult = ReturnType<
  typeof useUserSubscriptionLazyQuery
>;
export type UserSubscriptionQueryResult = Apollo.QueryResult<
  Types.UserSubscriptionQuery,
  Types.UserSubscriptionQueryVariables
>;
