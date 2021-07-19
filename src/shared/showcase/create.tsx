import { Box, Flex } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

import {
  ShowcaseComponent,
  ShowcaseConfig,
} from "miracle-tv-shared/showcase/types";
import { Heading } from "@chakra-ui/react";

export const createShowcase = (
  element: ReactNode,
  config: ShowcaseConfig = {}
): ShowcaseComponent => {
  const Showcase = () => (
    <Flex
      w="100%"
      h="100%"
      bgColor="secondary.600"
      direction="column"
      justify="center"
      align="center"
    >
      {!!config.title && (
        <Heading flex={1} color="white" m={0} mt={2} p={0}>
          {config.title}
        </Heading>
      )}
      <Flex w="100%" h="100%" justify="center" align="center">
        {element}
      </Flex>
    </Flex>
  );
  Showcase.title = config.title;

  return Showcase;
};
