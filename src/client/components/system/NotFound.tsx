import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

import { Link } from "miracle-tv-client/components/ui/Link";
import { useRouter } from "next/router";

type Props = {
  heading?: React.ReactNode;
  text?: React.ReactNode;
  isTextHidden?: boolean;
};

export const NotFound = ({
  isTextHidden,
  heading = "Ooops, this page doesn't seem to exist!",
  text = (
    <Text zIndex={2} px={4}>
      Try going back to <Link href="/">[main page]</Link>.
    </Text>
  ),
}: Props) => {
  const { locale } = useRouter();
  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      flexDirection="column"
    >
      <Box
        content="''"
        backgroundImage="url('/images/sanae_gyate_sad.png')"
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
      <Heading zIndex={2} mt={4} px={4}>
        {heading}
      </Heading>
      {!isTextHidden && text}
    </Flex>
  );
};
