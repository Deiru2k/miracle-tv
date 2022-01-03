import { gql } from "@apollo/client";
import {
  AspectRatio,
  Text,
  Box,
  Flex,
  Heading,
  VStack,
  Badge,
  Image,
} from "@chakra-ui/react";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { ChannelCommonFragment } from "miracle-tv-shared/graphql";
import { getMediaURL } from "miracle-tv-shared/media";
import React from "react";
import { Panel } from "../Panel";

export const ChannelDisplayFragment = gql`
  fragment ChannelCommon on Channel {
    id
    name
    slug
    thumbnail {
      filename
      id
    }
    status {
      id
      isLive
      viewers
    }
    description
    activity {
      id
      name
      verb
    }
    user {
      id
      username
      settings {
        singleUserMode
      }
    }
  }
`;

type Props = {
  channels: ChannelCommonFragment[];
  defaultThumbnail: string;
};

export const ChannelDisplay = ({ channels, defaultThumbnail }: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  return (
    <VStack w="100%">
      {channels?.map((channel) => (
        <Panel
          key={channel.id}
          width="100%"
          p={0}
          href={`/channels/${channel.slug || channel.id}`}
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
              px={4}
              py={1}
              position="absolute"
              bottom={0}
              backgroundColor="rgba(0, 0, 0, 0.8)"
            >
              <Flex width="100%" justify="space-between" align="center" mb={2}>
                <Heading size={isMobile ? "sm" : "md"} color="white">
                  <Text fontSize="1.6rem" color="red" display="inline" mr={2}>
                    ●
                  </Text>
                  {channel.name}
                </Heading>
              </Flex>
              <Text textTransform="capitalize" color="white">
                {channel.activity && (
                  <>
                    {!isMobile && channel.activity.verb}
                    <Badge colorScheme="primary" ml={1}>
                      {channel.activity.name}
                    </Badge>
                  </>
                )}
              </Text>
              {channel?.description && (
                <Text whiteSpace="pre-wrap" maxH="6vw" color="white">
                  {channel.description}
                </Text>
              )}
            </Box>
          </Flex>
        </Panel>
      ))}
    </VStack>
  );
};
