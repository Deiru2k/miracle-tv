import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";

import {
  FormSelect,
  FormSelectProps,
} from "miracle-tv-client/components/form/FormSelect";
import {
  useActivitesSelectQuery,
  useActivitiesSelectInitialQuery,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { uniq } from "ramda";
import { useDebounceCallback } from "@react-hook/debounce";

gql`
  query ActivitesSelect($filter: ActivityFilter, $limit: ActivityLimit) {
    activities(filter: $filter, limit: $limit) {
      id
      name
    }
  }
  query ActivitiesSelectInitial($filter: ActivityFilter) {
    activities(filter: $filter) {
      id
      name
    }
  }
`;

export const FormActivitesSelect = (
  props: Omit<FormSelectProps, "options">
) => {
  const {
    input: { value },
  } = useField(props.name);
  const { data: { activities: initialActivities = [] } = {} } =
    useActivitiesSelectInitialQuery({
      variables: { filter: { ids: value } },
    });
  const {
    data: { activities = [] } = {},
    loading: isLoading,
    refetch: getActivities,
  } = useActivitesSelectQuery({ variables: { limit: { limit: 20 } } });

  const initialOptions = useMemo(
    () => initialActivities.map((ac) => ({ label: ac.name, value: ac.id })),
    [initialActivities]
  );

  const options = useMemo(() => {
    const activityOptions = activities.map((ac) => ({
      label: ac.name,
      value: ac.id,
    }));
    return uniq([...initialOptions, ...activityOptions]);
  }, [activities, initialOptions]);

  const onSearch = useCallback(
    (query: string) => {
      const filter = query ? { name: query } : {};
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
