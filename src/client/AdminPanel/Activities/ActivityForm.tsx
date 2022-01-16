import { Flex, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";

type Props = {
  isDisabled?: boolean;
};

export const ActivityForm = ({ isDisabled }: Props) => {
  return (
    <>
      <HStack width="100%" mb={4}>
        <FormInput name="name" label="Name" isDisabled={isDisabled} />
        <FormInput name="verb" label="Verb" isDisabled={isDisabled} />
      </HStack>
      <Flex w="100%" justify="flex-start">
        <FormGroup
          name="icon"
          label="Icon"
          help={
            <>
              <Text mt={12}>1:1 aspect ratio is preferred.</Text>
              <Text>{"Used for activity icon in various pages"}</Text>
            </>
          }
          w="unset"
          mr={4}
        >
          <ImageUploader
            flex={2}
            mb={8}
            name="icon"
            ratio={1 / 1}
            minH="50px"
            minW="50px"
            maxH="150px"
            maxW="150px"
            isDisabled={isDisabled}
          />
        </FormGroup>

        <FormGroup
          name="image"
          label="Cover Image"
          help={
            <>
              <Text>8:12 aspect ratio is preferred.</Text>
              <Text>{"Used for activity icon in various pages"}</Text>
            </>
          }
          w="unset"
        >
          <ImageUploader
            flex={10}
            name="image"
            ratio={8 / 12}
            isDisabled={isDisabled}
          />
        </FormGroup>
      </Flex>
    </>
  );
};
