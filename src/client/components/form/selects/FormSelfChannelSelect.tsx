import React, { useMemo } from "react";

import { gql } from "@apollo/client";

import {
  FormSelect,
  FormSelectProps,
} from "miracle-tv-client/components/form/FormSelect";
import { useSelfChannelsSelectQuery } from "miracle-tv-shared/hooks";

gql`
  query SelfChannelsSelect($filter: ChannelsQueryFilter) {
    selfChannels(filter: $filter) {
      id
      name
    }
  }
`;

export const FormSelfChannelSelect = (
  props: Omit<FormSelectProps, "options">
) => {
  const { data: { selfChannels: channels = [] } = {}, loading: isLoading } =
    useSelfChannelsSelectQuery();

  const options = useMemo(
    () => channels.map((c) => ({ label: c.name, value: c.id })),
    [channels]
  );

  return <FormSelect {...props} isLoading={isLoading} options={options} />;
};
