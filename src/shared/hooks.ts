import * as Types from "miracle-tv-shared/graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
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
export const UserSettingsChannelFragmentFragmentDoc = gql`
  fragment UserSettingsChannelFragment on Channel {
    id
    name
    description
    slug
    activity {
      id
      name
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
export const UserSettingsChannelDocument = gql`
  query UserSettingsChannel($id: ID!) {
    channel(id: $id) {
      ...UserSettingsChannelFragment
    }
    selfStreamKeys {
      id
      channel {
        id
      }
    }
  }
  ${UserSettingsChannelFragmentFragmentDoc}
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
      ...UserSettingsChannelFragment
    }
  }
  ${UserSettingsChannelFragmentFragmentDoc}
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
export const UserSettingsChannelsDocument = gql`
  query UserSettingsChannels($filter: ChannelsQueryFilter) {
    channels(filter: $filter) {
      ...UserSettingsChannelFragment
    }
  }
  ${UserSettingsChannelFragmentFragmentDoc}
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
export const UserSettingsCreateChannelDocument = gql`
  mutation UserSettingsCreateChannel($input: CreateChannelInput) {
    createChannel(input: $input) {
      ...UserSettingsChannelFragment
    }
  }
  ${UserSettingsChannelFragmentFragmentDoc}
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
