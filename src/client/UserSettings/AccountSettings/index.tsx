import { Box, Flex } from "@chakra-ui/react";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import Head from "next/head";
import React from "react";
import { AccountDetails } from "./AccountDetails";
import { ChangePassword } from "./ChangePassword";

export const AccountSettings = () => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  return (
    <>
      <Head>
        <title>User preferences - Miracle TV</title>
      </Head>
      <Flex direction={isMobile ? "column" : "row"}>
        <Box flex={1} mr={isMobile ? 0 : 4} mb={isMobile ? 4 : 0}>
          <AccountDetails />
        </Box>
        <Box flex={1}>
          <ChangePassword />
        </Box>
      </Flex>
    </>
  );
};
