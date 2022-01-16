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
import React, { useEffect, useMemo } from "react";
import { useUserSettingsChannelQuery } from "miracle-tv-shared/hooks";
import { ChannelEdit } from "./ChannelEdit";
import { ChannelKeysSettings } from "./ChannelKeys";
import Head from "next/head";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { AccessUnit } from "miracle-tv-shared/graphql";

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
  const { currentUser, checkRights } = useCurrentUser();
  const { push } = useRouter();

  const { data: { channel } = {} } = useUserSettingsChannelQuery({
    variables: { id: channelId },
  });

  const canViewChannel = useMemo(
    () =>
      checkRights(AccessUnit.Read, "channels") ||
      (checkRights(AccessUnit.Self, "channels") &&
        channel?.user.id === currentUser.id),
    [checkRights, channel, currentUser]
  );

  const canViewKeys = useMemo(
    () =>
      checkRights(AccessUnit.Read, "streamKeys") ||
      (checkRights(AccessUnit.Self, "streamKeys") &&
        channel?.user.id === currentUser.id),
    [checkRights, channel, currentUser]
  );

  const canEditKeys = useMemo(
    () =>
      checkRights(AccessUnit.Read, "streamKeys") ||
      (checkRights(AccessUnit.Self, "streamKeys") &&
        channel?.user.id === currentUser.id),
    [checkRights, channel, currentUser]
  );

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
            <Tab key={tab} p={0} isDisabled={!canViewKeys && tab === "keys"}>
              <Link
                w="100%"
                href={`${baseUrl}/${channelId}/${tab}`}
                isDisabled={!canViewKeys && tab === "keys"}
                title={!canViewKeys ? "Cannot view stream keys" : undefined}
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
            <ChannelEdit id={channelId} canViewChannel={canViewChannel} />
          </TabPanel>
          <TabPanel px={0}>
            <ChannelKeysSettings
              id={channelId}
              canViewKeys={canViewKeys}
              canEditKeys={canEditKeys}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
