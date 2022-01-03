import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Divider,
  Button,
} from "@chakra-ui/react";
import {
  ChannelPlayerView,
  CHANNEL_VIEW_FRAGMENT,
} from "miracle-tv-client/ChannelPage/Channel";
import { CircleIcon } from "miracle-tv-client/components/icons/CircleIcon";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { CHANNEL_DISPLAY_FRAGMENT } from "miracle-tv-client/components/ui/channels/ChannelDisplay";
import { ChannelDisplayGrid } from "miracle-tv-client/components/ui/channels/ChannelDisplayGrid";
import { VodList } from "miracle-tv-client/components/ui/vods/VodList";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  ChannelViewStatusFragment,
  UserProfileFragment,
} from "miracle-tv-shared/graphql";
import { getMediaURL } from "miracle-tv-shared/media";
import React, { useMemo } from "react";

import getConfig from "next/config";
import { UserPanel } from "miracle-tv-client/components/ui/users/UserPanel";
const { publicRuntimeConfig } = getConfig();

type Props = {
  user: UserProfileFragment;
  statuses: ChannelViewStatusFragment[];
  isSubscribed?: boolean;
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
};

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    id
    username
    displayName
    bio
    emailHash
    channels {
      ...ChannelCommon
    }
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    streamThumbnail {
      filename
    }
    settings {
      useGravatar
      singleUserMode
      singleUserChannel {
        ...ChannelView
      }
    }
  }
  ${CHANNEL_DISPLAY_FRAGMENT}
  ${CHANNEL_VIEW_FRAGMENT}
`;

export const UserProfile = ({
  user,
  statuses,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
}: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const isUserLive = useMemo(
    () => statuses.findIndex((status) => status.isLive) > -1,
    [statuses]
  );
  const statusesMap = useMemo(
    () =>
      statuses.reduce(
        (acc, status) => ({ ...acc, [status.id]: status }),
        {}
      ) as Record<string, ChannelViewStatusFragment>,
    [statuses]
  );

  return (
    <>
      {user?.settings?.singleUserMode && user?.settings?.singleUserChannel && (
        <ChannelPlayerView
          channel={user?.settings?.singleUserChannel}
          status={statusesMap[user?.settings?.singleUserChannel?.id]}
        />
      )}
      <Flex direction={isMobile ? "column" : "row"}>
        <UserPanel
          user={user}
          isUserLive={isUserLive}
          isSubscribed={isSubscribed}
          onSubscribe={onSubscribe}
          onUnsubscribe={onUnsubscribe}
          w="100%"
          px={2}
          py={6}
          flex={3}
          position={!isMobile ? "sticky" : undefined}
          top="0"
          height="0%"
          order={isMobile ? 2 : undefined}
        />
        {user?.settings?.singleUserMode && (
          <Box flex={9} px={4} mt={6} pb={6}>
            <Heading size="lg" mb={2}>
              {user?.settings?.singleUserChannel?.name}
            </Heading>
            {user?.settings?.singleUserChannel?.description && (
              <Box order={isMobile ? 1 : 2}>
                <Divider />
                <Text mt={1} mb={6}>
                  {user?.settings?.singleUserChannel?.description}
                </Text>
              </Box>
            )}
            {!isMobile && (
              <Flex
                direction="column"
                flex={9}
                mt={6}
                order={isMobile ? 5 : undefined}
              >
                {!user?.settings?.singleUserMode && (
                  <Box flex={!isMobile ? 5 : undefined} w="100%" mb={6}>
                    <Heading size="md" mb={2}>
                      Their channels
                    </Heading>
                    <ChannelDisplayGrid
                      columns={isMobile ? 1 : undefined}
                      channels={user?.channels ?? []}
                      defaultThumbnail={user?.streamThumbnail?.filename}
                      channelStatuses={statusesMap}
                    />
                  </Box>
                )}
                {publicRuntimeConfig.isDev && (
                  <Box w="100%" order={isMobile ? 3 : undefined}>
                    <Heading size="md" mb={2}>
                      Latest Clips
                    </Heading>
                    <VodList columns={isMobile ? 2 : 4} />
                  </Box>
                )}
              </Flex>
            )}
          </Box>
        )}
        {(isMobile || !user?.settings?.singleUserMode) && (
          <Flex
            direction="column"
            flex={9}
            px={4}
            mt={6}
            pb={6}
            order={isMobile ? 5 : undefined}
          >
            {!user?.settings?.singleUserMode && (
              <Box flex={!isMobile ? 5 : undefined} w="100%" mb={6}>
                <Heading size="md" mb={2}>
                  Their channels
                </Heading>
                <ChannelDisplayGrid
                  columns={isMobile ? 1 : undefined}
                  channels={user?.channels ?? []}
                  defaultThumbnail={user?.streamThumbnail?.filename}
                  channelStatuses={statusesMap}
                />
              </Box>
            )}
            {publicRuntimeConfig.isDev && (
              <Box w="100%" order={isMobile ? 3 : undefined}>
                <Heading size="md" mb={2}>
                  Latest Clips
                </Heading>
                <VodList columns={isMobile ? 2 : 4} />
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};
