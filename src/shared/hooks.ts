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
    mutation SignIn($username: String!, $password: String!) {
  signIn(input: {username: $username, password: $password}) {
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
 *      username: // value for 'username'
 *      password: // value for 'password'
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
export const SignUpDocument = gql`
    mutation SignUp($username: String!, $password: String!, $email: String!) {
  signUp(input: {username: $username, password: $password, email: $email}) {
    id
    username
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<Types.SignUpMutation, Types.SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<Types.SignUpMutation, Types.SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SignUpMutation, Types.SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<Types.SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<Types.SignUpMutation, Types.SignUpMutationVariables>;