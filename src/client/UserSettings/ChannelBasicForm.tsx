import React from "react";

import { Box, SimpleGrid } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormTextarea } from "miracle-tv-client/components/form/FormTextarea";
import { FormActivitesSelect } from "miracle-tv-client/components/form/selects/FormActivitiesSelect";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { FormMarkdown } from "miracle-tv-client/components/form/FormMarkdown";

type Props = {
  isDisabled?: boolean;
};

export const ChannelBasicForm = ({ isDisabled }: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  return (
    <>
      <FormInput
        label="Channel name"
        name="name"
        mb={5}
        isDisabled={isDisabled}
      />
      {/* <FormTextarea
        label="Channel Description"
        name="description"
        mb={5}
        isDisabled={isDisabled}
      /> */}
      <FormMarkdown
        label="Channel Description"
        name="description"
        rows={12}
        height="auto"
      />

      <SimpleGrid columns={2} gap={5}>
        <FormInput
          label="URL Slug"
          name="slug"
          mb={5}
          help="Used for custom channel URL"
          isDisabled={isDisabled}
        />
        <FormActivitesSelect
          label="Activity"
          name="activityId"
          mb={5}
          isDisabled={isDisabled}
        />
      </SimpleGrid>
      <Box w={isMobile ? "100%" : "50%"}>
        <FormGroup
          name="thumbnail"
          label="Channel Thumbnail"
          mr={4}
          w="auto"
          help="Used as player cover when stream is offline as well as in various channel lists"
        >
          <ImageUploader
            name="thumbnail"
            ratio={16 / 9}
            isDisabled={isDisabled}
          />
        </FormGroup>
      </Box>
    </>
  );
};
