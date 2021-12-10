import React from "react";

import { Box, SimpleGrid } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import { FormActivitesSelect } from "miracle-tv-client/components/form/selects/FormActivitiesSelect";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";

export const ChannelBasicForm = () => {
  return (
    <>
      <FormInput label="Channel name" name="name" mb={5} />
      <FormTextarea label="Channel Description" name="description" mb={5} />
      <SimpleGrid columns={2} gap={5}>
        <FormInput label="URL Slug" name="slug" mb={5} />
        <FormActivitesSelect label="Activity" name="activityId" mb={5} />
      </SimpleGrid>
      <Box w="50%">
        <FormGroup
          name="thumbnail"
          label="Channel Thumbnail"
          mr={4}
          w="auto"
          help="Used as player cover when stream is offline as well as in various channel lists"
        >
          <ImageUploader name="thumbnail" ratio={16 / 9} />
        </FormGroup>
      </Box>
    </>
  );
};
