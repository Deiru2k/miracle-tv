import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { gql } from "@apollo/client";
import React, { useMemo } from "react";
import {
  useDashboardChannelsQuery,
  useDashboardFollowedChannelsQuery,
} from "miracle-tv-shared/hooks";
import { useLiveUpdate } from "miracle-tv-client/context/liveUpdate";
import { ChannelDisplayGrid } from "miracle-tv-client/components/ui/channels/ChannelDisplayGrid";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";

const DASHBOARD_CHANNELS_FRAGMENT = gql`
  fragment DashboardChannel on Channel {
    id
    name
    slug
    description
    thumbnail {
      id
      filename
    }
    status {
      id
      isLive
      viewers
    }
    user {
      id
      username
      displayName
      avatar {
        id
        filename
      }
      settings {
        singleUserMode
      }
    }
  }
`;

gql`
  query DashboardChannels {
    channels(limit: { limit: 25 }) {
      ...DashboardChannel
    }
  }
  query DashboardFollowedChannels {
    selfSubscribedChannels {
      ...DashboardChannel
    }
  }
  ${DASHBOARD_CHANNELS_FRAGMENT}
`;

export const Streams = () => {
  const isLiveUpdate = useLiveUpdate();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { data: { channels = [] } = {} } = useDashboardChannelsQuery({
    pollInterval: isLiveUpdate ? 5000 : 0,
  });
  const { data: { selfSubscribedChannels: subscriptions = [] } = {} } =
    useDashboardFollowedChannelsQuery({
      pollInterval: isLiveUpdate ? 5000 : 0,
    });

  const liveChannels = useMemo(
    () => channels.filter((ch) => ch.status.isLive),
    [channels]
  );
  const nonLiveChannels = useMemo(
    () => channels.filter((ch) => !ch.status.isLive),
    [channels]
  );

  return (
    <Box>
      <Heading size="lg">Your subscriptions</Heading>
      <Divider mb={2} />
      {!!subscriptions?.length && (
        <>
          <ChannelDisplayGrid
            columns={isMobile ? 2 : 4}
            channels={subscriptions}
          />
        </>
      )}
      {!subscriptions?.length && (
        <Text>Channels you've subscribed to will appear here.</Text>
      )}
      <Heading size="lg" mt={4}>
        Live Right now!
      </Heading>
      <Divider mb={2} />
      {!!liveChannels?.length && (
        <>
          <ChannelDisplayGrid
            columns={isMobile ? 2 : undefined}
            channels={liveChannels}
          />
        </>
      )}
      {!liveChannels?.length && (
        <Text>No channels are live right now. Come back later?</Text>
      )}
      <Heading size="lg" mt={4}>
        Discover other channels!
      </Heading>
      <Divider mb={2} />
      <ChannelDisplayGrid
        columns={isMobile ? 2 : 4}
        channels={nonLiveChannels}
      />
    </Box>
  );
};
