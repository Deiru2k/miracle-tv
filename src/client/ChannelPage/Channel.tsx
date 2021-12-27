import { gql } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Flex,
  Heading,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { CircleIcon } from "miracle-tv-client/components/icons/CircleIcon";
import {
  ChannelViewFragment,
  ChannelViewStatusFragment,
} from "miracle-tv-shared/graphql";
import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { getMediaURL } from "miracle-tv-shared/media";
import {
  DummyChatComponent,
  DummyPlayerComponent,
} from "miracle-tv-client/components/player/DummyPlayer";

const Player = dynamic(
  () => import("miracle-tv-client/components/player/Player"),
  {
    ssr: false,
    loading: () => <DummyPlayerComponent />,
  }
);

const Chat = dynamic(() => import("miracle-tv-client/components/chat/Chat"), {
  ssr: false,
  loading: () => <DummyChatComponent />,
});

export const CHANNEL_VIEW_FRAGMENT = gql`
  fragment ChannelView on Channel {
    id
    name
    description
    slug
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
    }
    user {
      id
      username
      displayName
      avatar {
        id
        filename
      }
    }
  }
`;

export const CHANNEL_VIEW_STATUS_FRAGMENT = gql`
  fragment ChannelViewStatus on ChannelStatus {
    id
    isLive
  }
`;

type Props = {
  channel: ChannelViewFragment;
  status?: ChannelViewStatusFragment;
};

type ControlProps = {
  isChatOpen?: boolean;
  onChatOpenClick: () => void;
};

const ChatViewControls = ({ isChatOpen, onChatOpenClick }: ControlProps) => {
  const Icon = isChatOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />;
  const ariaLabel = isChatOpen ? "Hide chat" : "Show chat";
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      w="100%"
      h="100%"
      pointerEvents="none"
      _groupHover={{ opacity: 1 }}
      transition="opacity 0.2s linear"
      opacity={0}
      zIndex={2}
    >
      <Box position="absolute" top="40%" right={1} pointerEvents="auto">
        <IconButton
          icon={Icon}
          size="sm"
          aria-label={ariaLabel}
          title={ariaLabel}
          onClick={onChatOpenClick}
        />
      </Box>
    </Box>
  );
};

export const ChannelPlayerView = ({ channel, status }: Props) => {
  const [isChatOpen, setChatOpen] = useState<boolean>(true);
  const onChatOpenClick = useCallback(
    () => setChatOpen(!isChatOpen),
    [setChatOpen, isChatOpen]
  );
  return (
    <Flex m={2}>
      <Box role="group" w="100%" h="100%" flex={9} mr={2} position="relative">
        <Player
          channelId={channel.id}
          isLive={status?.isLive}
          thumbnail={`${
            channel.thumbnail
              ? getMediaURL(channel.thumbnail?.filename)
              : "/images/sanae_gyate.png"
          }`}
        />
        <ChatViewControls
          isChatOpen={isChatOpen}
          onChatOpenClick={onChatOpenClick}
        />
      </Box>
      <Flex w="100%" display={isChatOpen ? "initial" : "none"} flex={4}>
        <Chat channelId={channel.id} />
      </Flex>
    </Flex>
  );
};

export const ChannelView = ({ channel, status }: Props) => {
  return (
    <>
      <ChannelPlayerView channel={channel} status={status} />
      <Box mx={2} my={2}>
        <Heading as={Flex} align="center" mb={2}>
          {status?.isLive && <CircleIcon color="red" mr={2} />}
          {channel.name}
        </Heading>
        <Divider />
        <Text>{channel.description}</Text>
      </Box>
    </>
  );
};
