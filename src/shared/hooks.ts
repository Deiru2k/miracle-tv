import * as Types from "miracle-tv-shared/graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export const ChannelViewStatusFragmentDoc = gql`
  fragment ChannelViewStatus on ChannelStatus {
    id
    isLive
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
    thumbnail {
      id
      filename
    }
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
  }
`;
export const ChannelFullFragmentDoc = gql`
  fragment ChannelFull on Channel {
    id
    name
    description
    slug
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon
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
          users
          activities
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
        icon
        image
        name
        verb
      }
    }
  }
`;
export const DashboardChannelsDocument = gql`
  query DashboardChannels {
    channels(limit: { limit: 25 }) {
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
export const UserSettingsChannelDocument = gql`
  query UserSettingsChannel($id: ID!) {
    channel(id: $id) {
      ...ChannelFull
    }
    selfStreamKeys {
      id
      channel {
        id
      }
    }
  }
  ${ChannelFullFragmentDoc}
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
export const UserSettingsChannelsDocument = gql`
  query UserSettingsChannels($filter: ChannelsQueryFilter) {
    channels(filter: $filter) {
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
