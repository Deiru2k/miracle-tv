import { Spinner, Flex, FlexProps } from "@chakra-ui/react";

export const Loading = (props: FlexProps) => {
  return (
    <Flex w="100%" h="100%" justify="center" align="center" {...props}>
      <Spinner size="xl" />
    </Flex>
  );
};
