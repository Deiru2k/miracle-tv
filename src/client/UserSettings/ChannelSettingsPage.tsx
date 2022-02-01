import {
  Button,
  Fade,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useRouter } from "next/dist/client/router";
import { head } from "ramda";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  useDisableChannelMutation,
  useEnableChannelMutation,
  useUserSettingsChannelQuery,
} from "miracle-tv-shared/hooks";
import { ChannelEdit } from "./ChannelEdit";
import { ChannelKeysSettings } from "./ChannelKeys";
import Head from "next/head";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { AccessUnit } from "miracle-tv-shared/graphql";
import { gql } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ChatOverlaySettings } from "./ChannelOverlay";
import { ChannelDashboard } from "./ChannelDashboard";

type Props = {
  tab?: string;
  baseUrl?: string;
  channelId: string;
};

const tabs = {
  details: "Details",
  keys: "Keys",
  overlay: "Overlay",
  dashboard: "Dashboard",
};

gql`
  mutation DisableChannel($id: ID!) {
    disableChannel(id: $id)
  }
  mutation EnableChannel($id: ID!) {
    enableChannel(id: $id)
  }
`;

export const ChannelSettingsPage = ({
  channelId,
  baseUrl = "/settings/user/channels",
  tab,
}: Props) => {
  const toast = useToast();
  const { currentUser, checkRights } = useCurrentUser();
  const { push } = useRouter();

  const { data: { selfChannel: channel } = {} } = useUserSettingsChannelQuery({
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

  const canEditChannel = useMemo(
    () => checkRights(AccessUnit.Write, "channels"),
    [checkRights]
  );

  const [disableChannelMutation] = useDisableChannelMutation({
    onCompleted() {
      toast({ status: "success", title: "Disabled channel" });
    },
    onError(e) {
      toast({
        status: "error",
        title: `There was an error disabling channel: ${e.message}`,
      });
    },
    refetchQueries: ["UserSettingsChannel"],
  });
  const [enableChannelMutation] = useEnableChannelMutation({
    onCompleted() {
      toast({ status: "success", title: "Enabled channel" });
    },
    onError(e) {
      toast({
        status: "error",
        title: `There was an error enabling channel: ${e.message}`,
      });
    },
    refetchQueries: ["UserSettingsChannel"],
  });

  const tabList = Object.keys(tabs);
  const tabIndex = tabList.indexOf(tab);

  const toggleChannel = useCallback(() => {
    if (channel.disabled) {
      enableChannelMutation({ variables: { id: channel.id } });
    } else {
      disableChannelMutation({ variables: { id: channel.id } });
    }
  }, [channel, disableChannelMutation, enableChannelMutation]);

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
      <Flex align="center" justify="space-between" mb={5}>
        <Heading size="lg">Channel settings for "{channel?.name}"</Heading>
        <Flex align="center">
          {canEditChannel && (
            <Menu>
              <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem onClick={toggleChannel}>
                  {channel?.disabled ? "Enable" : "Disable"}
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
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
        <Fade in={channel?.disabled || channel?.shelved}>
          <HStack mt={4}>
            {channel?.disabled && (
              <Tag colorScheme="red" textTransform="uppercase" size="lg">
                Disabled
              </Tag>
            )}
            {channel?.shelved && (
              <Tag colorScheme="yellow" textTransform="uppercase" size="lg">
                Shelved
              </Tag>
            )}
          </HStack>
        </Fade>

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
          <TabPanel px={0}>
            <ChatOverlaySettings channelId={channelId} />
          </TabPanel>
          <TabPanel px={0}>
            <ChannelDashboard channelId={channelId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
