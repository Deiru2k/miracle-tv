import { Flex, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { FormGroup } from "miracle-tv-client/components/form/FormGroup";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { ImageUploader } from "miracle-tv-client/components/ImageUploader";
import { useTranslation } from "react-i18next";

type Props = {
  isDisabled?: boolean;
};

export const ActivityForm = ({ isDisabled }: Props) => {
  const { t: tCommon } = useTranslation("common");
  const { t: tActivity } = useTranslation("activity");

  return (
    <>
      <HStack width="100%" mb={4}>
        <FormInput
          name="name"
          label={tActivity("name")}
          isDisabled={isDisabled}
        />
        <FormInput
          name="verb"
          label={tActivity("verb")}
          isDisabled={isDisabled}
        />
      </HStack>
      <Flex w="100%" justify="flex-start">
        <FormGroup
          name="icon"
          label={tActivity("form-icon")}
          help={
            <>
              <Text mt={12}>{tCommon("aspect-ratio", { ratio: "1:1" })}</Text>
              <Text>{tActivity("form-icon-help")}</Text>
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
          label={tActivity("form-image")}
          help={
            <>
              <Text>{tCommon("aspect-ratio", { ratio: "8:12" })}</Text>
              <Text>{tActivity("form-image-help")}</Text>
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
