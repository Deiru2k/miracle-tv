import React from "react";
import { BoxProps } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

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

const colors: Colors = {
  primary: {
    bgColor: "primary.500",
    color: "white",
  },
  secondary: {
    bgColor: "secondary.400",
    color: "white",
  },
};

export const Panel = ({ colorScheme = "secondary", ...boxProps }: Props) => {
  const styles = colors[colorScheme];
  return (
    <Box
      p={4}
      borderRadius="2px"
      boxShadow="0px 0px 15px 10px rgba(0,0,0,0.3)"
      {...styles}
      {...boxProps}
    />
  );
};
