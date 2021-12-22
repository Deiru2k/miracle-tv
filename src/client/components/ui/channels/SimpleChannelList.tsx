import React from "react";

import {
  AspectRatio,
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

type Props = {
  channels: ChannelFullFragment[];
  link?: (channel: ChannelFullFragment) => string;
  controls?: (channel: ChannelFullFragment) => React.ReactNode;
  defaultThumbnail?: string;
};

export const SimpleChannelList = ({
  channels,
  controls,
  defaultThumbnail,
}: Props) => {
  return (
    <VStack spacing={4} zIndex={1} w="100%">
      {channels?.map((channel) => (
        <Panel key={channel.id} width="100%" p={0}>
          <Flex>
            <AspectRatio ratio={16 / 9} w="200px" maxH="100%">
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
                <Heading size="lg" mb={2}>
                  {channel.name}
                </Heading>
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
