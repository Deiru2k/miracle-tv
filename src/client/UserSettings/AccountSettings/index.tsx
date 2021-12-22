import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { AccountDetails } from "./AccountDetails";
import { ChangePassword } from "./ChangePassword";

export const AccountSettings = () => {
  return (
    <Flex>
      <Box flex={1} mr={4}>
        <AccountDetails />
      </Box>
      <Box flex={1}>
        <ChangePassword />
      </Box>
    </Flex>
  );
};
