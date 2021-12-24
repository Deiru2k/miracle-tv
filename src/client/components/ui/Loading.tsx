import { Spinner, Flex } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Flex w="100%" h="100%" justify="center" align="center">
      <Spinner size="xl" />
    </Flex>
  );
};
