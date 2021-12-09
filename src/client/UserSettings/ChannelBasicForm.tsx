import React from "react";

import { SimpleGrid } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import { FormActivitesSelect } from "miracle-tv-client/components/form/selects/FormActivitiesSelect";

export const ChannelBasicForm = () => {
  return (
    <>
      <FormInput label="Channel name" name="name" mb={5} />
      <FormTextarea label="Channel Description" name="description" mb={5} />
      <SimpleGrid columns={2} gap={5}>
        <FormInput label="URL Slug" name="slug" mb={5} />
        <FormActivitesSelect label="Activity" name="activityId" mb={5} />
      </SimpleGrid>
    </>
  );
};
