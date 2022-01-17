import {
  AspectRatio,
  Text,
  Box,
  Flex,
  Heading,
  Badge,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  ChannelCommonFragment,
  ChannelViewStatusFragment,
} from "miracle-tv-shared/graphql";
import { getMediaURL } from "miracle-tv-shared/media";
import React, { useCallback } from "react";
import { Panel } from "../Panel";

type Props = {
  channels: ChannelCommonFragment[];
  channelStatuses?: Record<string, ChannelViewStatusFragment>;
  columns?: number;
  defaultThumbnail?: string;
};

const getChannelUrl = (channel: ChannelCommonFragment): string => {
  if (channel.user.settings?.singleUserMode) {
    return `/user/${channel.user.username}`;
  }
  return `/channel/${channel.slug || channel.id}`;
};

export const ChannelDisplayGrid = ({
  channels,
  channelStatuses,
  columns = 3,
  defaultThumbnail,
}: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const getChannelLive = useCallback(
    (channel: ChannelCommonFragment) => {
      return channel.status?.isLive || channelStatuses?.[channel.id]?.isLive;
    },
    [channelStatuses]
  );
  return (
    <SimpleGrid w="100%" columns={columns} spacing={2}>
      {channels?.map((channel) => (
        <Panel
          key={channel.id}
          width="100%"
          p={0}
          href={getChannelUrl(channel)}
        >
          <Flex direction="column" position="relative">
            <AspectRatio ratio={16 / 9} h="100%" w="100%">
              <Image
                borderLeftRadius="4px"
                objectFit="cover"
                src={`${
                  channel.thumbnail || defaultThumbnail
                    ? getMediaURL(
                        channel.thumbnail?.filename || defaultThumbnail
                      )
                    : "/images/sanae_gyate.png"
                }`}
              />
            </AspectRatio>
            <Box
              w="100%"
              px={2}
              position="absolute"
              bottom={0}
              backgroundColor="rgba(0, 0, 0, 0.8)"
            >
              <Flex width="100%" justify="space-between" align="center">
                <Heading
                  size="sm"
                  color="white"
                  w="100%"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  py={1}
                  title={channel.name}
                >
                  {getChannelLive(channel) && (
                    <Text fontSize="1.6rem" color="red" display="inline" mr={2}>
                      ●
                    </Text>
                  )}
                  {channel.name}
                </Heading>
              </Flex>
              <Box textTransform="capitalize" color="white" mb={1}>
                {!channel.activity && <Text>&nbsp;</Text>}
                {channel.activity && (
                  <Badge
                    colorScheme="primary"
                    maxW="100%"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    title={channel.activity.name}
                  >
                    {channel.activity.name}
                  </Badge>
                )}
              </Box>
            </Box>
          </Flex>
        </Panel>
      ))}
    </SimpleGrid>
  );
};
