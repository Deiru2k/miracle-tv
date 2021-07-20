import React from "react";
import { BoxProps } from "@chakra-ui/layout";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";
import { useTheme } from "@emotion/react";

type Props = {
  colorScheme?: "primary" | "secondary";
} & BoxProps;

type Colors = Record<
  Props["colorScheme"],
  {
    bgColor: string;
    color: string;
  }
>;

export const Panel = ({ ...boxProps }: Props) => {
  const bgColor = useColorModeValue("secondary.200", "secondary.400");
  const color = useColorModeValue("secondaryText.light", "secondaryText.dark");
  const boxShadow = useColorModeValue(
    "1px 0px 63px -23px rgba(0,0,0,0.3)",
    "0px 0px 15px 10px rgba(0,0,0,0.3)"
  );
  const theme = useTheme();
  const borderColor = transparentize(
    useColorModeValue("primary.400", "primary.600"),
    0.5
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
      boxShadow={boxShadow}
      borderColor={borderColor}
      {...boxProps}
    />
  );
};
