import React from "react";
import { BoxProps } from "@chakra-ui/layout";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import { useTheme } from "@emotion/react";

type Props = {
  colorScheme?: "primary" | "secondary";
} & BoxProps;

export const Panel = ({ ...boxProps }: Props) => {
  const bgColor = useColorModeValue("white", "secondary.400");
  const color = useColorModeValue("secondary.500", "white");
  const theme = useTheme();
  const borderColor = transparentize(
    "primary.500",
    useColorModeValue(0.3, 0.5)
  )(theme);

  return (
    <Box
      p={4}
      bgColor={bgColor}
      color={color}
      borderRadius="4px"
      borderWidth="1px"
      borderStyle="solid"
      transition="all 0.2s ease"
      borderColor={borderColor}
      {...boxProps}
    />
  );
};
