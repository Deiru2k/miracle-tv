import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Divider,
} from "@chakra-ui/react";
import {
  ChannelPlayerView,
  CHANNEL_VIEW_FRAGMENT,
} from "miracle-tv-client/ChannelPage/Channel";
import { CircleIcon } from "miracle-tv-client/components/icons/CircleIcon";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { ChannelDisplayFragment } from "miracle-tv-client/components/ui/channels/ChannelDisplay";
import { ChannelDisplayGrid } from "miracle-tv-client/components/ui/channels/ChannelDisplayGrid";
import { VodList } from "miracle-tv-client/components/ui/vods/VodList";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  ChannelViewStatusFragment,
  UserProfileFragment,
} from "miracle-tv-shared/graphql";
import { getMediaURL } from "miracle-tv-shared/media";
import React, { useMemo } from "react";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

type Props = {
  user: UserProfileFragment;
  statuses: ChannelViewStatusFragment[];
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
  ${ChannelDisplayFragment}
  ${CHANNEL_VIEW_FRAGMENT}
`;

export const UserProfile = ({ user, statuses }: Props) => {
  const displayName = user?.displayName || user?.username;
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
        <Box
          w="100%"
          px={2}
          py={6}
          flex={3}
          position={!isMobile ? "sticky" : undefined}
          top="0"
          height="0%"
          order={isMobile ? 2 : 1}
        >
          <Flex position="relative">
            <AspectRatio w="100%" ratio={16 / 6} zIndex={1}>
              <Image
                src={getMediaURL(user?.header?.filename)}
                borderTopRadius="5px"
                objectPosition="center"
              />
            </AspectRatio>
            <Flex
              zIndex={2}
              w="100%"
              px={2}
              py={1}
              align="center"
              bottom="-2rem"
              position="absolute"
            >
              <Avatar
                borderRadius="50%"
                username={user?.username}
                emailHash={user?.emailHash}
                useGravatar={user?.settings?.useGravatar}
                aspectMaxH="70px"
                aspectMaxW="70px"
                imageId={user?.avatar?.filename}
                bgColor="white"
                useAspectRatio={false}
                borderLeftWidth="1px"
                borderRightWidth="1px"
                borderTopWidth="1px"
                borderStyle="solid"
                borderColor="primary.200"
              />
            </Flex>
          </Flex>
          <Box
            px={4}
            py={4}
            borderLeftWidth="1px"
            borderRightWidth="1px"
            borderBottomWidth="1px"
            borderStyle="solid"
            borderColor="primary.500"
            borderBottomRadius="5px"
          >
            <Heading
              size="md"
              display="flex"
              align="center"
              mb={2}
              mt="2rem"
              py={1}
            >
              {isUserLive && <CircleIcon color="red" mr={2} />}
              {displayName}
            </Heading>
            <Divider mb={2} />
            <Text whiteSpace="pre-wrap">{user?.bio}</Text>
          </Box>
        </Box>
        <Box flex={9} px={4} mt={6} pb={6}>
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
          {user?.settings?.singleUserMode && (
            <Heading size="lg" mb={2}>
              {user?.settings?.singleUserChannel?.name}
            </Heading>
          )}
          {user?.settings?.singleUserMode &&
            user?.settings?.singleUserChannel?.description && (
              <Box order={isMobile ? 1 : 2}>
                <Divider />
                <Text mt={1} mb={6}>
                  {user?.settings?.singleUserChannel?.description}
                </Text>
              </Box>
            )}
        </Box>
        {publicRuntimeConfig.isDev && (
          <Box
            flex={!isMobile ? 3 : undefined}
            w="100%"
            order={isMobile ? 3 : undefined}
            px={2}
            py={6}
          >
            <Heading size="md" mb={2}>
              Latest Clips
            </Heading>
            <VodList columns={isMobile ? 2 : 4} />
          </Box>
        )}
      </Flex>
    </>
  );
};
