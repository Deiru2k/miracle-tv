import React, { useMemo } from "react";

import { gql } from "@apollo/client";
import { Grid, SimpleGrid } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormSelect } from "miracle-tv-client/components/form/FormSelect";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import { useChannelFormSelectActivitiesQuery } from "miracle-tv-shared/hooks";

gql`
  query ChannelFormSelectActivities {
    activities {
      id
      name
    }
  }
`;

export const ChannelBasicForm = () => {
  const { data: { activities } = {} } = useChannelFormSelectActivitiesQuery();

  const activitiesOptions = useMemo(() => {
    return (activities || []).map((activity) => ({
      label: activity.name,
      value: activity.id,
    }));
  }, [activities]);

  return (
    <>
      <FormInput label="Channel name" name="name" mb={5} />
      <FormTextarea label="Channel Description" name="description" mb={5} />
      <SimpleGrid columns={2} gap={5}>
        <FormInput label="URL Slug" name="slug" mb={5} />
        <FormSelect
          label="Activity"
          name="activityId"
          mb={5}
          options={activitiesOptions}
        />
      </SimpleGrid>
    </>
  );
};
