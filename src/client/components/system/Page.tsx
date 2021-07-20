import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

export const PageWrapper = (props: Props) => {
  const bgColor = useColorModeValue("white", "secondary.600");
  const color = useColorModeValue("text.light", "text.dark");
  return (
    <Box
      width="100%"
      height="100%"
      position="relative"
      overflowY="auto"
      color={color}
      bgColor={bgColor}
      {...props}
    />
  );
};

export const Page = (props: Props) => {
  return <Box px={15} py={5} {...props} />;
};
