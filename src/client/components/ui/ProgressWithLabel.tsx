import { Progress, ProgressProps } from "@chakra-ui/progress";
import { Box, Flex, Text, TextProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  label: string;
  textProps?: TextProps;
} & ProgressProps;

export const ProgressWithLabel = ({ label, textProps, ...props }: Props) => {
  return (
    <Box w="100%" position="relative">
      <Flex w="100%" position="absolute" zIndex={2} justify="center">
        <Text {...textProps}>{label}</Text>
      </Flex>
      <Progress {...props} zIndex={1} />
    </Box>
  );
};
