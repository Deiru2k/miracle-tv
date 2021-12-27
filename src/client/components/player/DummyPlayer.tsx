import { AspectRatio, Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Loading } from "../ui/Loading";

export const DummyPlayerComponent = () => {
  return (
    <AspectRatio ratio={16 / 9} maxW="100%" maxH="100%" zIndex={1}>
      <Loading />
    </AspectRatio>
  );
};

export const DummyChatComponent = () => {
  return (
    <Flex w="100%" overflowY="auto" direction="column" flexGrow={1} height={0}>
      <Loading />
    </Flex>
  );
};
