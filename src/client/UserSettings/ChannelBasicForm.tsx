import { Grid } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import React from "react";

export const ChannelBasicForm = () => {
  return (
    <>
      <FormInput label="Channel name" name="name" mb={5} />
      <FormTextarea label="Channel Description" name="description" mb={5} />
      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
        <FormInput label="URL Slug" name="slug" mb={5} />
        <FormInput label="Activity" name="activity" mb={5} />
      </Grid>
    </>
  );
};
