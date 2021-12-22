import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { Link } from "miracle-tv-client/components/ui/Link";

type Props = {
  children?: React.ReactNode;
};

export const Attract = ({ children }: Props) => {
  return (
    <Flex
      w="100%"
      h="90%"
      justify="center"
      align="center"
      flexDirection="column"
    >
      <Box
        content="''"
        backgroundImage="url('/images/sanae_gyate.png')"
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        maxWidth="400px"
        maxHeight="400px"
        minHeight="200px"
        width="100%"
        height="100%"
        zIndex={2}
      />
      <Box
        content="''"
        maxWidth="400px"
        w="100%"
        h="0px"
        boxShadow="0px 0px 29px 27px rgba(0, 0, 0, 0.5)"
        zIndex={1}
      />
      {children}
    </Flex>
  );
};
