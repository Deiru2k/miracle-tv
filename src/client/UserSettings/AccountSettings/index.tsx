import { Box, Flex } from "@chakra-ui/react";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import React from "react";
import { AccountDetails } from "./AccountDetails";
import { ChangePassword } from "./ChangePassword";

export const AccountSettings = () => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { t: tSettings } = useTranslation("settings");
  return (
    <>
      <Head>
        <title>{tSettings("ui-account")} - Miracle TV</title>
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
