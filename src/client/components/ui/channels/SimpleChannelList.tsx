import React from "react";

import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ChannelFullFragment } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { getMediaURL } from "miracle-tv-shared/media";

type Props = {
  channels: ChannelFullFragment[];
  link?: (channel: ChannelFullFragment) => string;
  controls?: (channel: ChannelFullFragment) => React.ReactNode;
};

export const SimpleChannelList = ({ channels, controls }: Props) => {
  return (
    <VStack spacing={4} zIndex={1}>
      {channels?.map((channel) => (
        <Panel key={channel.id} width="100%" p={0}>
          <Flex>
            <Box
              flex={2}
              backgroundImage={`url(${
                channel.thumbnail
                  ? getMediaURL(channel.thumbnail.filename)
                  : "/images/sanae_gyate.png"
              })`}
              backgroundSize={channel.thumbnail ? "cover" : "contain"}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              content="''"
            />
            <Box w="100%" p={4} flex={10}>
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
