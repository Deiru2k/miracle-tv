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
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { ChatOverlaySettings } from "./ChannelOverlay";
import { ChannelDashboard } from "./ChannelDashboard";
import {
  channelFragment,
  selfChannelFragment,
} from "miracle-tv-client/components/ui/channels/const";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { useTranslation } from "react-i18next";
import { TranslationFn } from "miracle-tv-client/types";

type Props = {
  tab?: string;
  baseUrl?: string;
  channelId: string;
};

const tabs = (tFn?: TranslationFn) => ({
  details: tFn("ui-tabs-details") ?? "Details",
  keys: tFn("ui-tabs-keys") ?? "Keys",
  overlay: tFn("ui-tabs-overlay") ?? "Overlay",
  dashboard: tFn("ui-tabs-dashboard") ?? "Dashboard",
});

gql`
  query UserSettingsChannel($id: ID!) {
    selfChannel(id: $id) {
      ...SelfChannelFull
    }
  }
  mutation DisableChannel($id: ID!) {
    disableChannel(id: $id)
  }
  mutation EnableChannel($id: ID!) {
    enableChannel(id: $id)
  }
  ${channelFragment}
  ${selfChannelFragment}
`;

export const ChannelSettingsPage = ({
  channelId,
  baseUrl = "/settings/user/channels",
  tab,
}: Props) => {
  const toast = useToast();
  const { currentUser, checkRights } = useCurrentUser();
  const { push } = useRouter();

  const { t: tChannel } = useTranslation("channel");
  const { t: tCommon } = useTranslation("common");

  const localizedTabs = useMemo(() => tabs(tChannel), [tChannel]);

  const { data: { selfChannel: channel } = {}, loading: isLoading } =
    useUserSettingsChannelQuery({
      variables: { id: channelId },
    });

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

  const tabList = useMemo(() => Object.keys(localizedTabs), [localizedTabs]);
  const tabIndex = useMemo(() => tabList.indexOf(tab), [tabList, tab]);

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

  if (isLoading) {
    return <Loading />;
  }

  const title = tChannel("channel-settings-for", { name: channel?.name });
  const tabTitle = `${title} -  Miracle TV`;

  return (
    <>
      <Head>
        <title>{tabTitle}</title>
      </Head>
      <Flex align="center" justify="space-between" mb={5}>
        <Heading size="lg">
          {title}{" "}
          <Link
            href={`/channel/${channel?.slug || channel?.id}`}
            target="_blank"
            aria-label={tChannel("open-in-new-tab")}
            title={tChannel("open-in-new-tab")}
          >
            <ExternalLinkIcon />
          </Link>
        </Heading>
        <Flex align="center">
          {canEditChannel && (
            <Menu>
              <MenuButton size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
                {tCommon("actions")}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={toggleChannel}>
                  {channel?.disabled ? tCommon("enable") : tCommon("disable")}
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
                title={
                  !canViewKeys ? tChannel("stream-keys-forbidden") : undefined
                }
                py={2}
                px={3}
              >
                {localizedTabs[tab as keyof typeof localizedTabs]}
              </Link>
            </Tab>
          ))}
        </TabList>
        <Fade in={channel?.disabled || channel?.shelved}>
          <HStack mt={4}>
            {channel?.disabled && (
              <Tag colorScheme="red" textTransform="uppercase" size="lg">
                {tChannel("disabled")}
              </Tag>
            )}
            {channel?.shelved && (
              <Tag colorScheme="yellow" textTransform="uppercase" size="lg">
                {tChannel("shelved")}
              </Tag>
            )}
          </HStack>
        </Fade>

        <TabPanels>
          <TabPanel px={0}>
            <ChannelEdit id={channelId} selfChannel={channel} />
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
