import * as Types from 'shared/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}

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