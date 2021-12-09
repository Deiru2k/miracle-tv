import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";

import {
  FormSelect,
  FormSelectProps,
} from "miracle-tv-client/components/form/FormSelect";
import {
  useActivitesSelectLazyQuery,
  useActivitiesSelectInitialQuery,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { uniq } from "ramda";
import { useDebounceCallback } from "@react-hook/debounce";

gql`
  query ActivitesSelect($filter: ActivityFilter) {
    activities(filter: $filter) {
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
  const [
    getActivities,
    { data: { activities = [] } = {}, loading: isLoading },
  ] = useActivitesSelectLazyQuery();

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
      getActivities({ variables: { filter: { name: query } } });
    },
    [getActivities]
  );

  const onSearchDebounced = useDebounceCallback(onSearch, 500, true);
  return (
    <FormSelect
      {...props}
      onSearch={onSearchDebounced}
      isLoading={isLoading}
      options={options}
    />
  );
};
