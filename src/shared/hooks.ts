import * as Types from 'miracle-tv-shared/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on User {
  id
  username
  displayName
  emailHash
  bio
  singleUserMode
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
export function useGetFileForUploaderQuery(baseOptions: Apollo.QueryHookOptions<Types.GetFileForUploaderQuery, Types.GetFileForUploaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetFileForUploaderQuery, Types.GetFileForUploaderQueryVariables>(GetFileForUploaderDocument, options);
      }
export function useGetFileForUploaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetFileForUploaderQuery, Types.GetFileForUploaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetFileForUploaderQuery, Types.GetFileForUploaderQueryVariables>(GetFileForUploaderDocument, options);
        }
export type GetFileForUploaderQueryHookResult = ReturnType<typeof useGetFileForUploaderQuery>;
export type GetFileForUploaderLazyQueryHookResult = ReturnType<typeof useGetFileForUploaderLazyQuery>;
export type GetFileForUploaderQueryResult = Apollo.QueryResult<Types.GetFileForUploaderQuery, Types.GetFileForUploaderQueryVariables>;
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
export type UploadFileWithUploaderMutationFn = Apollo.MutationFunction<Types.UploadFileWithUploaderMutation, Types.UploadFileWithUploaderMutationVariables>;

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
export function useUploadFileWithUploaderMutation(baseOptions?: Apollo.MutationHookOptions<Types.UploadFileWithUploaderMutation, Types.UploadFileWithUploaderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UploadFileWithUploaderMutation, Types.UploadFileWithUploaderMutationVariables>(UploadFileWithUploaderDocument, options);
      }
export type UploadFileWithUploaderMutationHookResult = ReturnType<typeof useUploadFileWithUploaderMutation>;
export type UploadFileWithUploaderMutationResult = Apollo.MutationResult<Types.UploadFileWithUploaderMutation>;
export type UploadFileWithUploaderMutationOptions = Apollo.BaseMutationOptions<Types.UploadFileWithUploaderMutation, Types.UploadFileWithUploaderMutationVariables>;
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
export function useUserInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.UserInfoQuery, Types.UserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserInfoQuery, Types.UserInfoQueryVariables>(UserInfoDocument, options);
      }
export function useUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserInfoQuery, Types.UserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserInfoQuery, Types.UserInfoQueryVariables>(UserInfoDocument, options);
        }
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>;
export type UserInfoLazyQueryHookResult = ReturnType<typeof useUserInfoLazyQuery>;
export type UserInfoQueryResult = Apollo.QueryResult<Types.UserInfoQuery, Types.UserInfoQueryVariables>;
export const CurrentUserFullDocument = gql`
    query CurrentUserFull {
  self {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

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
export function useCurrentUserFullQuery(baseOptions?: Apollo.QueryHookOptions<Types.CurrentUserFullQuery, Types.CurrentUserFullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CurrentUserFullQuery, Types.CurrentUserFullQueryVariables>(CurrentUserFullDocument, options);
      }
export function useCurrentUserFullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CurrentUserFullQuery, Types.CurrentUserFullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CurrentUserFullQuery, Types.CurrentUserFullQueryVariables>(CurrentUserFullDocument, options);
        }
export type CurrentUserFullQueryHookResult = ReturnType<typeof useCurrentUserFullQuery>;
export type CurrentUserFullLazyQueryHookResult = ReturnType<typeof useCurrentUserFullLazyQuery>;
export type CurrentUserFullQueryResult = Apollo.QueryResult<Types.CurrentUserFullQuery, Types.CurrentUserFullQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    token
    expiresAt
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<Types.SignInMutation, Types.SignInMutationVariables>;

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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<Types.SignInMutation, Types.SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SignInMutation, Types.SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<Types.SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<Types.SignInMutation, Types.SignInMutationVariables>;
export const LoginSelfInfoDocument = gql`
    query LoginSelfInfo {
  self {
    username
    displayName
    emailHash
    singleUserMode
    roles {
      name
    }
    channels {
      id
      activity {
        name
      }
      slug
      name
    }
  }
}
    `;

/**
 * __useLoginSelfInfoQuery__
 *
 * To run a query within a React component, call `useLoginSelfInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginSelfInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginSelfInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginSelfInfoQuery(baseOptions?: Apollo.QueryHookOptions<Types.LoginSelfInfoQuery, Types.LoginSelfInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LoginSelfInfoQuery, Types.LoginSelfInfoQueryVariables>(LoginSelfInfoDocument, options);
      }
export function useLoginSelfInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LoginSelfInfoQuery, Types.LoginSelfInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LoginSelfInfoQuery, Types.LoginSelfInfoQueryVariables>(LoginSelfInfoDocument, options);
        }
export type LoginSelfInfoQueryHookResult = ReturnType<typeof useLoginSelfInfoQuery>;
export type LoginSelfInfoLazyQueryHookResult = ReturnType<typeof useLoginSelfInfoLazyQuery>;
export type LoginSelfInfoQueryResult = Apollo.QueryResult<Types.LoginSelfInfoQuery, Types.LoginSelfInfoQueryVariables>;
export const DashboardDocument = gql`
    query Dashboard {
  self {
    channels {
      id
      name
      slug
      description
      activity {
        id
        name
        icon
        image
        verb
      }
    }
  }
}
    `;

/**
 * __useDashboardQuery__
 *
 * To run a query within a React component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardQuery(baseOptions?: Apollo.QueryHookOptions<Types.DashboardQuery, Types.DashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DashboardQuery, Types.DashboardQueryVariables>(DashboardDocument, options);
      }
export function useDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DashboardQuery, Types.DashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DashboardQuery, Types.DashboardQueryVariables>(DashboardDocument, options);
        }
export type DashboardQueryHookResult = ReturnType<typeof useDashboardQuery>;
export type DashboardLazyQueryHookResult = ReturnType<typeof useDashboardLazyQuery>;
export type DashboardQueryResult = Apollo.QueryResult<Types.DashboardQuery, Types.DashboardQueryVariables>;
export const HomeChannelsDocument = gql`
    query HomeChannels {
  channels {
    name
    activity {
      name
    }
    description
  }
}
    `;

/**
 * __useHomeChannelsQuery__
 *
 * To run a query within a React component, call `useHomeChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeChannelsQuery(baseOptions?: Apollo.QueryHookOptions<Types.HomeChannelsQuery, Types.HomeChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.HomeChannelsQuery, Types.HomeChannelsQueryVariables>(HomeChannelsDocument, options);
      }
export function useHomeChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.HomeChannelsQuery, Types.HomeChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.HomeChannelsQuery, Types.HomeChannelsQueryVariables>(HomeChannelsDocument, options);
        }
export type HomeChannelsQueryHookResult = ReturnType<typeof useHomeChannelsQuery>;
export type HomeChannelsLazyQueryHookResult = ReturnType<typeof useHomeChannelsLazyQuery>;
export type HomeChannelsQueryResult = Apollo.QueryResult<Types.HomeChannelsQuery, Types.HomeChannelsQueryVariables>;
export const UserSettingsFormDataDocument = gql`
    query UserSettingsFormData {
  self {
    displayName
    bio
    singleUserMode
    avatar {
      id
    }
    header {
      id
    }
    streamThumbnail {
      id
    }
  }
}
    `;

/**
 * __useUserSettingsFormDataQuery__
 *
 * To run a query within a React component, call `useUserSettingsFormDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSettingsFormDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSettingsFormDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserSettingsFormDataQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserSettingsFormDataQuery, Types.UserSettingsFormDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserSettingsFormDataQuery, Types.UserSettingsFormDataQueryVariables>(UserSettingsFormDataDocument, options);
      }
export function useUserSettingsFormDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserSettingsFormDataQuery, Types.UserSettingsFormDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserSettingsFormDataQuery, Types.UserSettingsFormDataQueryVariables>(UserSettingsFormDataDocument, options);
        }
export type UserSettingsFormDataQueryHookResult = ReturnType<typeof useUserSettingsFormDataQuery>;
export type UserSettingsFormDataLazyQueryHookResult = ReturnType<typeof useUserSettingsFormDataLazyQuery>;
export type UserSettingsFormDataQueryResult = Apollo.QueryResult<Types.UserSettingsFormDataQuery, Types.UserSettingsFormDataQueryVariables>;
export const SettingsUpdateUserDocument = gql`
    mutation SettingsUpdateUser($input: UpdateSelfInput!) {
  updateSelf(input: $input) {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;
export type SettingsUpdateUserMutationFn = Apollo.MutationFunction<Types.SettingsUpdateUserMutation, Types.SettingsUpdateUserMutationVariables>;

/**
 * __useSettingsUpdateUserMutation__
 *
 * To run a mutation, you first call `useSettingsUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingsUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingsUpdateUserMutation, { data, loading, error }] = useSettingsUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSettingsUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<Types.SettingsUpdateUserMutation, Types.SettingsUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SettingsUpdateUserMutation, Types.SettingsUpdateUserMutationVariables>(SettingsUpdateUserDocument, options);
      }
export type SettingsUpdateUserMutationHookResult = ReturnType<typeof useSettingsUpdateUserMutation>;
export type SettingsUpdateUserMutationResult = Apollo.MutationResult<Types.SettingsUpdateUserMutation>;
export type SettingsUpdateUserMutationOptions = Apollo.BaseMutationOptions<Types.SettingsUpdateUserMutation, Types.SettingsUpdateUserMutationVariables>;