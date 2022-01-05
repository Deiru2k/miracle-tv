import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";

import {
  FormSelect,
  FormSelectProps,
} from "miracle-tv-client/components/form/FormSelect";
import {
  useRolesSelectQuery,
  useRolesSelectInitialQuery,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { uniq } from "ramda";
import { useDebounceCallback } from "@react-hook/debounce";

gql`
  query RolesSelect($filter: RolesFilter, $limit: QueryLimit) {
    roles(filter: $filter, limit: $limit) {
      id
      name
    }
  }
  query RolesSelectInitial($filter: RolesFilter) {
    roles(filter: $filter) {
      id
      name
    }
  }
`;

export const FormRolesSelect = (props: Omit<FormSelectProps, "options">) => {
  const {
    input: { value },
  } = useField(props.name);
  const { data: { roles: initialRoles = [] } = {} } =
    useRolesSelectInitialQuery({
      variables: { filter: { ids: value } },
    });
  const {
    data: { roles = [] } = {},
    loading: isLoading,
    refetch: getRoles,
  } = useRolesSelectQuery({ variables: { limit: { limit: 20 } } });

  const initialOptions = useMemo(
    () => initialRoles.map((ac) => ({ label: ac.name, value: ac.id })),
    [initialRoles]
  );

  const options = useMemo(() => {
    const activityOptions = roles.map((ac) => ({
      label: ac.name,
      value: ac.id,
    }));
    return uniq([...initialOptions, ...activityOptions]);
  }, [roles, initialOptions]);

  const onSearch = useCallback(
    (query: string) => {
      const filter = query ? { name: query } : {};
      getRoles({ filter, limit: { limit: 20 } });
    },
    [getRoles]
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
