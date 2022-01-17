import { AtSignIcon, ChatIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import {
  Box,
  Text,
  Flex,
  Input,
  VStack,
  IconButton,
  HStack,
  useDisclosure,
  Heading,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { getIOClient } from "miracle-tv-client/socketio";
import {
  ChatJoinData,
  ChatLeaveData,
  ChatMessageData,
  ChatResponseType,
} from "miracle-tv-shared/websocket/types";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { sort, takeLast } from "ramda";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { UserInfo } from "miracle-tv-server/websocket/chat/roster";
import { Link } from "../ui/Link";

type ChatMessageProps = {
  username: string;
  message: string;
};

const ChatMessage = ({ username, message }: ChatMessageProps) => {
  return (
    <Box display="block" w="100%" wordBreak="break-word">
      {username && (
        <Text as="span" fontWeight="bold">
          {username}:&nbsp;
        </Text>
      )}
      <Text as="span">{message}</Text>
    </Box>
  );
};

type ChatControlsProps = {
  onSend: (msg: string) => void;
  channelId: string;
  isPopup?: boolean;
  isDisabled?: boolean;
  rosterDisclosure: UseDisclosureReturn;
  getRoster: () => void;
};

const ChatControls = ({
  onSend,
  channelId,
  isDisabled = false,
  isPopup = false,
  getRoster,
  rosterDisclosure,
}: ChatControlsProps) => {
  const [value, setValue] = useState<string>("");
  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [setValue]
  );
  const sendMessage = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onSend(value);
      setValue("");
    },
    [value, setValue, onSend]
  );

  const onRosterOpen = useCallback(() => {
    if (!rosterDisclosure.isOpen) {
      getRoster();
      rosterDisclosure.onOpen();
    } else {
      rosterDisclosure.onClose();
    }
  }, [getRoster, rosterDisclosure]);

  const onOpenPopup = useCallback(() => {
    const port = location.port !== "" ? `:${location.port}` : "";
    window.open(
      `${location.protocol}//${location.hostname}${port}/chat/popup?channelId=${channelId}`,
      "miracle-popup-chat",
      "directories=no,titlebar=no,toolbar=no,location=no,menubar=0,resizable=1,width=320,height=600"
    );
  }, [channelId]);

  return (
    <form onSubmit={sendMessage} style={{ position: "relative" }}>
      <Flex mt={2} direction="column" position="relative">
        <Input
          borderRadius={0}
          p={1}
          mr={2}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          placeholder="Remember to be nice to eachother"
        />
        <HStack justify="flex-end" align="center" spacing={0}>
          {!isPopup && (
            <IconButton
              variant="ghost"
              aria-label="Open chat in Popup"
              icon={<ExternalLinkIcon color="primary.200" />}
              onClick={onOpenPopup}
              isDisabled={isDisabled}
            />
          )}
          <IconButton
            variant="ghost"
            aria-label="Open chat in Popup"
            icon={<AtSignIcon color="primary.200" />}
            onClick={onRosterOpen}
            isDisabled={isDisabled}
          />
          <IconButton
            variant="ghost"
            aria-label="Send message"
            icon={<ChatIcon color="primary.200" />}
            type="submit"
            isDisabled={isDisabled}
          >
            CHAT
          </IconButton>
        </HStack>
      </Flex>
    </form>
  );
};

type Props = {
  channelId: string;
  isPopup?: boolean;
};

type ChatLog = {
  username?: string;
  message: string;
  timestamp: number;
};

export const Chat = ({ channelId, isPopup = false }: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const chatLogRef = useRef<HTMLDivElement>();
  const rosterDisclosure = useDisclosure();
  const { currentUser } = useCurrentUser();
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);
  const [roster, setRoster] = useState<UserInfo[]>([]);
  const appendToChat = useCallback(
    (msg: ChatResponseType) => {
      const chatMessages = takeLast(99, chatLog);
      setChatLog([
        ...chatMessages,
        { username: msg.username, message: msg.data, timestamp: msg.timestamp },
      ]);
      chatLogRef.current?.scrollTo({
        top: chatLogRef.current?.scrollHeight,
        behavior: "smooth",
      });
    },
    [chatLog, setChatLog, chatLogRef]
  );

  const chatClient = useMemo(() => {
    const client = getIOClient({
      namespace: "chat",
    });
    return client;
  }, []);

  const getRoster = useCallback(() => {
    chatClient.emit("chat:get-roster");
  }, [chatClient]);

  const setRosterFromSocket = useCallback(
    (roster?: UserInfo[]) => {
      setRoster(roster ?? []);
    },
    [setRoster]
  );

  useEffect(() => {
    chatClient.off("chat:roster");
    chatClient.on("chat:roster", setRosterFromSocket);
  }, [chatClient, setRosterFromSocket]);

  useEffect(() => {
    chatClient.off("chat:message");
    chatClient.on("chat:message", appendToChat);
  }, [chatClient, appendToChat]);

  const sendChatMessage = useCallback(
    (message: string) => {
      const msgData: ChatMessageData = {
        token: localStorage.getItem("token"),
        message: message,
        channel: channelId,
      };
      chatClient.emit("chat:send", msgData);
    },
    [chatClient, channelId]
  );

  useEffect(() => {
    const joinData: ChatJoinData = {
      token: localStorage.getItem("token"),
      channel: channelId,
    };
    chatClient.emit("chat:join", joinData);

    return () => {
      const leaveData: ChatLeaveData = {
        token: localStorage.getItem("token"),
        channel: channelId,
      };
      chatClient.emit("chat:leave", leaveData);
      chatClient.disconnect();
    };
  }, []);

  useEffect(() => {
    chatClient.off("chat:message");
    chatClient.on("chat:message", appendToChat);
  }, [chatClient, appendToChat]);

  return (
    <Flex w="100%" direction="column" height="100%" position="relative">
      {currentUser && (
        <VStack
          w="100%"
          overflowY="auto"
          direction="column"
          flexGrow={1}
          flexBasis={isMobile ? "50vh" : undefined}
          height={0}
          ref={chatLogRef}
        >
          {chatLog.map((msg) => (
            <ChatMessage
              key={msg.timestamp}
              username={msg.username}
              message={msg.message}
            />
          ))}
        </VStack>
      )}
      {!currentUser && (
        <Flex
          w="100%"
          overflowY="auto"
          direction="column"
          flexGrow={1}
          height={0}
          justify="center"
          align="center"
        >
          Please login to use chat
        </Flex>
      )}
      <Flex
        direction="column"
        minHeight="40%"
        maxHeight="70%"
        opacity={rosterDisclosure.isOpen ? 1 : 0}
        pointerEvents={rosterDisclosure.isOpen ? "all" : "none"}
        position="absolute"
        left={0}
        bottom={20}
        transition="opacity 0.3s linear"
        w="100%"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="primary.500"
        zIndex={5}
        backgroundColor="secondary.500"
        justifyContent="flex-start"
        pt={1}
      >
        <Heading w="100%" px={2} mb={2} size="md">
          Roster:
        </Heading>
        <VStack overflow="auto" height="100%">
          {roster?.map((user) => (
            <Box w="100%" px={2} key={user.username}>
              <Link href={`/user/${user.username}`} target="_blank">
                {user.displayName || user.username}
              </Link>
            </Box>
          ))}
        </VStack>
      </Flex>
      <ChatControls
        isDisabled={!currentUser}
        onSend={sendChatMessage}
        channelId={channelId}
        isPopup={isPopup}
        getRoster={getRoster}
        rosterDisclosure={rosterDisclosure}
      />
    </Flex>
  );
};

export default Chat;
