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

type Props = {
  tab?: string;
  channelId: string;
};

const tabs = {
  details: "Details",
  keys: "Keys",
};

export const ChannelSettingsPage = ({ channelId, tab }: Props) => {
  const { push } = useRouter();
  const { data: { channel } = {} } = useUserSettingsChannelQuery({
    variables: { id: channelId },
  });

  const tabList = Object.keys(tabs);
  const tabIndex = tabList.indexOf(tab);

  useEffect(() => {
    if (tabIndex === -1) {
      const initialTab = head(tabList);
      push(`/settings/user/channels/${channelId}/${initialTab}`);
    }
  }, [push, tab]);

  return (
    <>
      <Heading size="lg" mb={5}>
        Channel settings for "{channel?.name}"
      </Heading>
      <Tabs index={tabIndex} onChange={() => {}}>
        <TabList>
          {tabList.map((tab) => (
            <Tab key={tab} p={0}>
              <Link
                w="100%"
                href={`/settings/user/channels/${channelId}/${tab}`}
                py={2}
                px={3}
              >
                {tabs[tab as keyof typeof tabs]}
              </Link>
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <ChannelEdit id={channelId} />
          </TabPanel>
          <TabPanel>
            <ChannelKeysSettings id={channelId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
