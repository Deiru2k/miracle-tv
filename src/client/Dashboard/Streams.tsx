import {
  Box,
  Button,
  Collapse,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
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
import { CHANNEL_DISPLAY_FRAGMENT } from "miracle-tv-client/components/ui/channels/ChannelDisplay";
import { Link } from "miracle-tv-client/components/ui/Link";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import Head from "next/head";

gql`
  query DashboardChannels {
    channels(limit: { limit: 25 }) {
      ...ChannelCommon
    }
  }
  query DashboardFollowedChannels {
    selfSubscribedChannels {
      ...ChannelCommon
    }
  }
  ${CHANNEL_DISPLAY_FRAGMENT}
`;

export const Streams = () => {
  const isLiveUpdate = useLiveUpdate();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { data: { channels = [] } = {}, loading: isLoading } =
    useDashboardChannelsQuery({
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

  return !isLoading ? (
    <>
      <Head>
        <title>Streams - Dashboard - Miracle TV</title>
      </Head>
      <Box>
        <Collapse in={liveChannels?.length > 0}>
          <Box mb={4} mt={2}>
            <Heading size="lg">Live Right now!</Heading>
            <Divider mb={2} />
            {!!liveChannels?.length && (
              <>
                <ChannelDisplayGrid
                  columns={isMobile ? 2 : undefined}
                  channels={liveChannels}
                />
              </>
            )}
          </Box>
        </Collapse>
        <Heading size="lg">Your subscriptions</Heading>
        <Divider mb={2} />
        {!!subscriptions?.length && (
          <>
            <ChannelDisplayGrid
              columns={isMobile ? 3 : 5}
              channels={subscriptions}
            />
          </>
        )}
        {!subscriptions?.length && (
          <Text>Channels you've subscribed to will appear here.</Text>
        )}
        <Heading size="lg" mt={4}>
          Discover other channels!
        </Heading>
        <Divider mb={2} />
        {!!channels?.length && (
          <ChannelDisplayGrid columns={isMobile ? 3 : 5} channels={channels} />
        )}
        {!channels?.length && (
          <Text>
            No channels found. Perhaps you can be the first to{" "}
            <Link
              as={(props) => (
                <Button py={0} px={1} variant="ghost" mr={1} {...props} />
              )}
              href="/settings/user/channels"
            >
              [create one]
            </Link>
            ?
          </Text>
        )}
      </Box>
    </>
  ) : (
    <Loading />
  );
};
