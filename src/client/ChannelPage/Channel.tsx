import { gql } from "@apollo/client";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Flex,
  Image,
  Heading,
  IconButton,
  Divider,
  Button,
} from "@chakra-ui/react";
import { CircleIcon } from "miracle-tv-client/components/icons/CircleIcon";
import {
  ChannelViewFragment,
  ChannelViewStatusFragment,
} from "miracle-tv-shared/graphql";
import React, { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { getMediaURL } from "miracle-tv-shared/media";
import {
  DummyChatComponent,
  DummyPlayerComponent,
} from "miracle-tv-client/components/player/DummyPlayer";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { Link } from "miracle-tv-client/components/ui/Link";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { PersonIcon } from "miracle-tv-client/components/icons/PersonIcon";
import { capitalizeFirstLetter } from "miracle-tv-client/utils/text";
import { Markdown } from "miracle-tv-client/components/ui/Markdown";
import { AgeGate } from "miracle-tv-client/components/ui/AgeGate";
import { useAgeGate } from "miracle-tv-client/hooks/ageGate";
import { useChannelAccess } from "miracle-tv-client/hooks/channelAccess";
import { ChannelPassword } from "miracle-tv-client/components/ui/ChannelPassword";
import { DateTime } from "luxon";
import { ChannelLiveTimer } from "miracle-tv-client/components/ui/channels/ChannelLiveTimer";

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
    mature
    matureDescription
    passwordProtected
    thumbnail {
      id
      filename
    }
    activity {
      id
      name
      verb
      icon {
        id
        filename
      }
    }
    user {
      id
      username
      displayName
      avatar {
        id
        filename
      }
      settings {
        singleUserMode
      }
    }
    meta {
      subscriberCount
    }
  }
`;

export const CHANNEL_VIEW_STATUS_FRAGMENT = gql`
  fragment ChannelViewStatus on ChannelStatus {
    id
    isLive
    viewers
    createdAt
  }
`;

type Props = {
  channel: ChannelViewFragment;
  status?: ChannelViewStatusFragment;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
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
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const [isChatOpen, setChatOpen] = useState<boolean>(true);
  const onChatOpenClick = useCallback(
    () => setChatOpen(!isChatOpen),
    [setChatOpen, isChatOpen]
  );
  return (
    <Flex m={2} direction={isMobile ? "column" : "row"}>
      <Box role="group" w="100%" h="100%" flex={9} mr={2} position="relative">
        <Player
          channelId={channel.id}
          isLive={status?.isLive}
          viewers={status?.viewers}
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

export const ChannelView = ({
  channel,
  status,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
}: Props) => {
  const [checkMature, setCheckMature] = useAgeGate(channel.id);
  const [accessKey, setAccessKey] = useChannelAccess(channel.id);
  const onAgeSet = useCallback(() => {
    setCheckMature(true);
  }, [setCheckMature]);
  const onPasswordCheck = useCallback(
    (password: string) => {
      setAccessKey(password);
    },
    [setAccessKey]
  );

  const createdAt = useMemo(() => {
    if (status?.createdAt) {
      return DateTime.fromISO(status?.createdAt);
    }
    return null;
  }, [status]);

  if (channel.mature && !checkMature) {
    return (
      <AgeGate description={channel.matureDescription} onAgeSet={onAgeSet} />
    );
  }

  if (channel.passwordProtected && !accessKey) {
    return <ChannelPassword onPasswordCheck={onPasswordCheck} />;
  }

  return (
    <>
      <ChannelPlayerView channel={channel} status={status} />
      <Box mx={2} my={2}>
        <Flex direction="row" justify="space-between">
          <Flex justify="center" direction="column" mb={2}>
            <Heading
              as={Flex}
              alignItems="center"
              size="md"
              textTransform="uppercase"
              mr={2}
            >
              {status?.isLive && <CircleIcon color="red" mr={2} />}
              {channel.name}
            </Heading>
            {channel.activity && (
              <>
                <Flex align="center" mr={2}>
                  {channel?.activity?.icon && (
                    <Image
                      w="1.7rem"
                      h="1.7rem"
                      mr={2}
                      src={getMediaURL(channel.activity.icon.filename)}
                    />
                  )}
                  <Flex align="center">
                    <Text as="span">
                      {capitalizeFirstLetter(channel.activity?.verb)}&nbsp;
                      {channel.activity?.name}
                    </Text>
                  </Flex>
                </Flex>
              </>
            )}
            {status?.isLive && createdAt && (
              <Flex align="center">
                <ChannelLiveTimer createdAt={createdAt} />
              </Flex>
            )}
          </Flex>
          <Flex align="center">
            <Flex title="Subscribers:" align="center" mr={2}>
              <PersonIcon aria-label="Subscribers:" mr={1} />
              {channel.meta.subscriberCount}
            </Flex>
            {!isSubscribed && <Button onClick={onSubscribe}>Subscribe</Button>}
            {isSubscribed && (
              <Button colorScheme="red" onClick={onUnsubscribe}>
                Unsubscribe
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex mb={2} align="center">
          Run by
          {channel.user.avatar && (
            <Avatar
              username={channel.user.username}
              imageId={channel.user.avatar.filename}
              maxH="1rem"
              maxW="1rem"
              useAspectRatio={false}
              display="inline-block"
              borderRadius="50%"
              mr={1}
              ml={1}
            />
          )}
          <Link href={`/user/${channel.user.username}`}>
            {channel.user.displayName || channel.user.username}
          </Link>
        </Flex>
        <Divider mb={4} />
        <Markdown>{channel.description}</Markdown>
      </Box>
    </>
  );
};
