import React from "react";

import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChannelFullFragment } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { getMediaURL } from "miracle-tv-shared/media";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";

type Props = {
  channels: ChannelFullFragment[];
  link?: (channel: ChannelFullFragment) => string;
  controls?: (channel: ChannelFullFragment) => React.ReactNode;
  showUser?: boolean;
  defaultThumbnail?: string;
};

export const SimpleChannelList = ({
  channels,
  controls,
  defaultThumbnail,
  showUser = false,
}: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  return (
    <VStack spacing={4} zIndex={1} w="100%">
      {channels?.map((channel) => (
        <Panel key={channel.id} width="100%" p={0}>
          <Flex direction={isMobile ? "column" : "row"}>
            <AspectRatio
              ratio={16 / 9}
              w={isMobile ? "100%" : "200px"}
              maxH="100%"
            >
              <Box
                borderLeftRadius="4px"
                backgroundImage={`url(${
                  channel.thumbnail || defaultThumbnail
                    ? getMediaURL(
                        channel.thumbnail?.filename || defaultThumbnail
                      )
                    : "/images/sanae_gyate.png"
                })`}
                backgroundSize={
                  channel.thumbnail || defaultThumbnail ? "cover" : "contain"
                }
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                content="''"
              />
            </AspectRatio>
            <Box w="100%" p={4}>
              <Flex width="100%" justify="space-between" align="center" mb={2}>
                <HStack alignItems="center" mb={2}>
                  <Heading size="lg">{channel.name}</Heading>
                  {showUser && (
                    <Badge ml={4} fontSize="1.1rem" textTransform="none">
                      By:{" "}
                      {channel?.user?.displayName || channel?.user?.username}
                    </Badge>
                  )}
                </HStack>
                {controls && <HStack>{controls(channel)}</HStack>}
              </Flex>
              <Text textTransform="capitalize">
                {channel.activity &&
                  `${channel.activity.verb} ${channel.activity.name}`}
              </Text>
            </Box>
          </Flex>
        </Panel>
      ))}
    </VStack>
  );
};
