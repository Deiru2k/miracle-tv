import React from "react";

import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormActivitesSelect } from "miracle-tv-client/components/form/selects/FormActivitiesSelect";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { FormMarkdown } from "miracle-tv-client/components/form/FormMarkdown";
import { Link } from "miracle-tv-client/components/ui/Link";
import {
  CreateChannelInput,
  UpdateChannelInput,
} from "miracle-tv-shared/graphql";
import { getInstanceUrl } from "miracle-tv-client/utils/instance";
import { useTranslation } from "react-i18next";

type Props = {
  isDisabled?: boolean;
  values: UpdateChannelInput | CreateChannelInput;
};

export const ChannelBasicForm = ({ isDisabled, values }: Props) => {
  const { t: tChannel } = useTranslation("channel");
  const { t: tCommon } = useTranslation("common");
  const isMobile = useMediaQuery(MediaQuery.mobile);
  return (
    <>
      <FormInput
        label={tChannel("name")}
        name="name"
        mb={5}
        isDisabled={isDisabled}
      />
      <FormMarkdown
        label={tChannel("description")}
        name="description"
        rows={12}
        height="auto"
        help={
          <>
            {tCommon("this-field-supports")}{" "}
            <Link
              target="_blank"
              textDecoration="underline"
              href="https://www.markdownguide.org/basic-syntax/"
            >
              markdown
            </Link>
          </>
        }
      />

      <SimpleGrid columns={2} gap={5}>
        <FormInput
          label={tChannel("slug")}
          name="slug"
          mb={5}
          help={
            <>
              {tChannel("slug-help")}
              {values.slug && (
                <Text mt={2}>
                  {tCommon("editor-preview")}: {getInstanceUrl()}/channels/
                  {values.slug}
                </Text>
              )}
            </>
          }
          isDisabled={isDisabled}
        />
        <FormActivitesSelect
          label={tChannel("activity")}
          name="activityId"
          mb={5}
          isDisabled={isDisabled}
        />
      </SimpleGrid>
      <Box w={isMobile ? "100%" : "50%"}>
        <FormGroup
          name="thumbnail"
          label={tChannel("thumbnail")}
          mr={4}
          w="auto"
          help={tChannel("thumbnail-help")}
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
