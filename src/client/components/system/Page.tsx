import {
  Box,
  BoxProps,
  Flex,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type Props = BoxProps;

export const PageWrapper = (props: Props) => {
  const bgColor = useColorModeValue("white", "secondary.500");
  const color = useColorModeValue("text.light", "text.dark");
  return (
    <Box
      width="100%"
      height="100%"
      position="relative"
      overflowY="auto"
      color={color}
      bgColor={bgColor}
      paddingBottom="50px"
      {...props}
    />
  );
};

type PageProps = {
  isLoading?: boolean;
} & BoxProps;

export const Page = ({ children, isLoading, ...props }: PageProps) => {
  return (
    <Box px={15} py={5} {...props} position="relative">
      {isLoading && (
        <Flex
          position="absolute"
          justify="center"
          align="center"
          w="100%"
          h="100%"
        >
          <Spinner size="lg" />
        </Flex>
      )}
      {children}
    </Box>
  );
};
