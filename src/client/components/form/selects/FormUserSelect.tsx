import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";

import {
  FormSelect,
  FormSelectProps,
} from "miracle-tv-client/components/form/FormSelect";
import {
  useActivitesSelectQuery,
  useActivitiesSelectInitialQuery,
  useUsersSelectInitialQuery,
  useUsersSelectQuery,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { uniq } from "ramda";
import { useDebounceCallback } from "@react-hook/debounce";

gql`
  query UsersSelect($filter: FullUsersFilter, $limit: QueryLimit) {
    fullUsers(filter: $filter, limit: $limit) {
      id
      displayName
      username
    }
  }
  query UsersSelectInitial($filter: FullUsersFilter) {
    fullUsers(filter: $filter) {
      id
      displayName
      username
    }
  }
`;

export const FormUsersSelect = (props: Omit<FormSelectProps, "options">) => {
  const {
    input: { value },
  } = useField(props.name);
  const { data: { fullUsers: initialActivities = [] } = {} } =
    useUsersSelectInitialQuery({
      variables: { filter: { ids: value } },
    });
  const {
    data: { fullUsers: activities = [] } = {},
    loading: isLoading,
    refetch: getActivities,
  } = useUsersSelectQuery({ variables: { limit: { limit: 20 } } });

  const initialOptions = useMemo(
    () =>
      initialActivities.map((ac) => ({
        label: ac.username,
        value: ac.id,
      })),
    [initialActivities]
  );

  const options = useMemo(() => {
    const activityOptions = activities.map((ac) => ({
      label: ac.username,
      value: ac.id,
    }));
    return uniq([...initialOptions, ...activityOptions]);
  }, [activities, initialOptions]);

  const onSearch = useCallback(
    (query: string) => {
      const filter = query ? { username: query } : {};
      getActivities({ filter, limit: { limit: 20 } });
    },
    [getActivities]
  );

  const onSearchDebounced = useDebounceCallback(onSearch, 50, true);
  return (
    <FormSelect
      {...props}
      onSearch={onSearchDebounced}
      isLoading={isLoading}
      options={options}
    />
  );
};
