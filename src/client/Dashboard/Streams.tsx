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
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useTranslation } from "react-i18next";

gql`
  query DashboardChannels {
    channels(filter: { mature: false }, limit: { limit: 25 }) {
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

type Props = {
  skipSubs?: boolean;
  discoverTitle?: string;
};

export const Streams = ({
  skipSubs = false,
  discoverTitle: discoverTitleProp,
}: Props) => {
  const isLiveUpdate = useLiveUpdate();

  const { t: tDashboard } = useTranslation("dashboard");

  const discoverTitle =
    discoverTitleProp ?? tDashboard("streams-live-discover");

  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { currentUser } = useCurrentUser();
  const { data: { channels = [] } = {}, loading: isLoading } =
    useDashboardChannelsQuery({
      pollInterval: isLiveUpdate ? 5000 : 0,
    });
  const { data: { selfSubscribedChannels: subscriptions = [] } = {} } =
    useDashboardFollowedChannelsQuery({
      pollInterval: isLiveUpdate ? 5000 : 0,
      skip: !currentUser || skipSubs,
    });

  const liveChannels = useMemo(
    () => channels.filter((ch) => ch.status.isLive),
    [channels]
  );

  return !isLoading ? (
    <>
      <Box w="100%">
        <Collapse in={liveChannels?.length > 0}>
          <Box mb={4} mt={2}>
            <Heading size="lg">{tDashboard("streams-live-now")}</Heading>
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
        {!!currentUser && !skipSubs && (
          <>
            <Heading size="lg">{tDashboard("streams-your-subs")}</Heading>
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
              <Text>{tDashboard("stream-subs-not-found")}</Text>
            )}
          </>
        )}
        <Heading size="lg" mt={4}>
          {discoverTitle}
        </Heading>
        <Divider mb={2} />
        {!!channels?.length && (
          <ChannelDisplayGrid columns={isMobile ? 3 : 5} channels={channels} />
        )}
        {!channels?.length && (
          <Text>
            {tDashboard("streams-not-found")}{" "}
            <Link
              as={(props) => (
                <Button py={0} px={1} variant="ghost" mr={1} {...props} />
              )}
              href="/settings/user/channels"
            >
              [tDashboard("streams-create-one")]
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
