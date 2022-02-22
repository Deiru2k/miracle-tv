import { Badge, Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { gql } from "@apollo/client";
import { useChannelDashboardStatusQuery } from "miracle-tv-shared/hooks";
import React, { useContext, useMemo } from "react";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { ChannelLiveTimer } from "miracle-tv-client/components/ui/channels/ChannelLiveTimer";
import { DateTime } from "luxon";
import prettyBytes from "pretty-bytes";
import Chat from "miracle-tv-client/components/chat/Chat";
import dynamic from "next/dynamic";
import { DummyPlayerComponent } from "miracle-tv-client/components/player/DummyPlayer";
import { useTranslation } from "react-i18next";

const Player = dynamic(
  () => import("miracle-tv-client/components/player/Player"),
  {
    ssr: false,
    loading: () => <DummyPlayerComponent />,
  }
);

type Props = {
  channelId: string;
};

gql`
  query ChannelDashboardStatus($id: ID!) {
    channelStatus(id: $id) {
      id
      isLive
      viewers
      createdAt
      transferred
    }
  }
`;

export const ChannelDashboard = ({ channelId }: Props) => {
  const { isLiveUpdate } = useContext(LiveUpdateContext);

  const { t: tChannel } = useTranslation("channel");

  const { data: { channelStatus } = {} } = useChannelDashboardStatusQuery({
    variables: { id: channelId },
    skip: !channelId,
    fetchPolicy: "network-only",
    pollInterval: isLiveUpdate ? 5000 : 0,
  });

  const createdAt: DateTime | null = useMemo(() => {
    if (channelStatus?.createdAt) {
      return DateTime.fromISO(channelStatus.createdAt);
    }
    return null;
  }, [channelStatus]);

  const traffic: string = useMemo(() => {
    if (channelStatus?.transferred) {
      return prettyBytes(channelStatus.transferred);
    }
    return `0B`;
  }, [channelStatus]);

  return (
    <>
      <Flex>
        <Box flex={9}>
          <Heading size="md" mb={2}>
            {tChannel("dashboard-title")}
          </Heading>
          <Panel mr={4} h="100%">
            <Flex direction="column" justify="flex-start" align="flex-start">
              <Box mb={2}>
                <Text as="span" fontWeight="bold" mr={1}>
                  {tChannel("dashboard-status")}
                </Text>
                <Badge colorScheme={channelStatus?.isLive ? "red" : undefined}>
                  {channelStatus?.isLive
                    ? tChannel("dashboard-status-live")
                    : tChannel("dashboard-status-offline")}
                </Badge>
              </Box>
              <Box mb={2}>
                <Text as="span" fontWeight="bold" mr={1}>
                  {tChannel("dashboard-viewers")}
                </Text>
                {channelStatus?.viewers ?? 0}
              </Box>
              <Box mb={2}>
                <Text as="span" fontWeight="bold" mr={1}>
                  {tChannel("dashboard-duration")}
                </Text>
                {createdAt && <ChannelLiveTimer createdAt={createdAt} />}
                {!createdAt && "00:00:00:00"}
              </Box>
              <Box mb={2}>
                <Text as="span" fontWeight="bold" mr={1}>
                  {tChannel("dashboard-traffic")}
                </Text>
                {traffic}
              </Box>
              <Box w="100%" h="100%">
                <Heading size="sm" mb={2}>
                  {tChannel("dashboard-preview")}
                </Heading>
                <Player
                  isLive={channelStatus?.isLive}
                  sessionId={localStorage.getItem("token")}
                  channelId={channelId}
                  offlineMsg={tChannel("dashboard-preview-offline")}
                  muted
                  isPreview
                />
              </Box>
            </Flex>
          </Panel>
        </Box>
        <Box flex={4}>
          <Heading size="md" mb={2}>
            {tChannel("dashboard-chat")}
          </Heading>
          <Chat channelId={channelId} />
        </Box>
      </Flex>
    </>
  );
};
