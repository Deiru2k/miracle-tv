import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";

import {
  FormSelect,
  FormSelectProps,
} from "miracle-tv-client/components/form/FormSelect";
import {
  useActivitesSelectQuery,
  useActivitiesSelectInitialQuery,
  useChannelsSelectInitialLazyQuery,
  useChannelsSelectInitialQuery,
  useChannelsSelectQuery,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { uniq } from "ramda";
import { useDebounceCallback } from "@react-hook/debounce";

gql`
  query ChannelsSelect($filter: ChannelsQueryFilter, $limit: QueryLimit) {
    channels(filter: $filter, limit: $limit) {
      id
      name
    }
  }
  query ChannelsSelectInitial($filter: ChannelsQueryFilter) {
    channels(filter: $filter) {
      id
      name
    }
  }
`;

export const FormChannelsSelect = (props: Omit<FormSelectProps, "options">) => {
  const {
    input: { value },
  } = useField(props.name);
  const { data: { channels: initialActivities = [] } = {} } =
    useChannelsSelectInitialQuery({
      variables: { filter: { ids: value } },
    });
  const {
    data: { channels = [] } = {},
    loading: isLoading,
    refetch: getActivities,
  } = useChannelsSelectQuery({ variables: { limit: { limit: 20 } } });

  const initialOptions = useMemo(
    () => initialActivities.map((ac) => ({ label: ac.name, value: ac.id })),
    [initialActivities]
  );

  const options = useMemo(() => {
    const activityOptions = channels.map((ac) => ({
      label: ac.name,
      value: ac.id,
    }));
    return uniq([...initialOptions, ...activityOptions]);
  }, [channels, initialOptions]);

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
