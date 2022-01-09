import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useRouter } from "next/dist/client/router";
import { head } from "ramda";
import React, { useEffect } from "react";
import { useUserSettingsChannelQuery } from "miracle-tv-shared/hooks";
import { ChannelEdit } from "./ChannelEdit";
import { ChannelKeysSettings } from "./ChannelKeys";
import Head from "next/head";

type Props = {
  tab?: string;
  baseUrl?: string;
  channelId: string;
};

const tabs = {
  details: "Details",
  keys: "Keys",
};

export const ChannelSettingsPage = ({
  channelId,
  baseUrl = "/settings/user/channels",
  tab,
}: Props) => {
  const { push } = useRouter();
  const { data: { channel } = {} } = useUserSettingsChannelQuery({
    variables: { id: channelId },
  });

  const tabList = Object.keys(tabs);
  const tabIndex = tabList.indexOf(tab);

  useEffect(() => {
    if (tabIndex === -1) {
      const initialTab = head(tabList);
      push(`${baseUrl}/${channelId}/${initialTab}`);
    }
  }, [push, tab]);

  return (
    <>
      <Head>
        <title>Channel settings for {channel?.name} - Miracle TV</title>
      </Head>
      <Heading size="lg" mb={5}>
        Channel settings for "{channel?.name}"
      </Heading>
      <Tabs index={tabIndex} onChange={() => {}}>
        <TabList>
          {tabList.map((tab) => (
            <Tab key={tab} p={0}>
              <Link
                w="100%"
                href={`${baseUrl}/${channelId}/${tab}`}
                py={2}
                px={3}
              >
                {tabs[tab as keyof typeof tabs]}
              </Link>
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <ChannelEdit id={channelId} />
          </TabPanel>
          <TabPanel px={0}>
            <ChannelKeysSettings id={channelId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
