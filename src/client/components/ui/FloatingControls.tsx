import { Box, Heading } from "@chakra-ui/react";
import React from "react";

type Props = {
  heading?: string;
  children?: React.ReactNode;
  m?: number | string;
  margin?: number | string;
};

export const FloatingControls = ({ heading, children, m, margin }: Props) => {
  return (
    <>
      <Heading
        as="h3"
        size="md"
        mb="-1px"
        display="inline-block"
        float="left"
        lineHeight={10}
      >
        {heading}
      </Heading>
      <Box position="sticky" top="0" right="0" zIndex={2}>
        {children}
      </Box>
      {(m || margin) && <Box float="right" w="100%" height={m || margin} />}
    </>
  );
};
