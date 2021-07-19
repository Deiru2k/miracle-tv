import { Box, Flex, FormLabel } from "@chakra-ui/react";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import React from "react";

export const UserCustomization = () => {
  return (
    <>
      <Flex mb={4} direction={["column", "column", "column", "row"]}>
        <Box>
          <FormLabel size="sm" mb={4}>
            ProfilePicture
          </FormLabel>
          <ImageUploader
            mr={4}
            name="avatar"
            aspectMaxH="100px"
            aspectMaxW="100px"
          />
        </Box>
        <Flex flex={4} direction="column" align={["center", "unset"]}>
          <FormLabel size="sm" mb={4}>
            Stream Thumbnail
          </FormLabel>
          <ImageUploader
            name="streamThumbnail"
            aspectMaxW="100%"
            ratio={16 / 9}
          />
        </Flex>
      </Flex>
      <FormLabel size="sm" mb={4}>
        Header
      </FormLabel>
      <ImageUploader name="header" aspectMaxW="100%" ratio={16 / 6} />
    </>
  );
};
