import { ChatIcon } from "@chakra-ui/icons";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { Box, Text, Flex, Input, VStack, IconButton } from "@chakra-ui/react";
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

type ChatMessageProps = {
  username: string;
  message: string;
};

const ChatMessage = ({ username, message }: ChatMessageProps) => {
  return (
    <Box display="block" w="100%">
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
  isDisabled?: boolean;
};

const ChatControls = ({ onSend, isDisabled }: ChatControlsProps) => {
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
  return (
    <form onSubmit={sendMessage}>
      <Flex mt={2}>
        <Input
          borderRadius={0}
          p={1}
          mr={2}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          placeholder="Remember to be nice to eachother"
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
      </Flex>
    </form>
  );
};

type Props = {
  channelId: string;
};

type ChatLog = {
  username?: string;
  message: string;
  timestamp: number;
};

export const Chat = ({ channelId }: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const chatLogRef = useRef<HTMLDivElement>();
  const { currentUser } = useCurrentUser();
  const [chatLog, setChatLog] = useState<ChatLog[]>([]);
  const appendToChat = useCallback(
    (msg: ChatResponseType) => {
      const chatMessages = takeLast(99, chatLog);
      setChatLog([
        ...chatMessages,
        { username: msg.username, message: msg.data, timestamp: msg.timestamp },
      ]);
      chatLogRef.current?.scrollTo({
        top: chatLogRef.current?.getBoundingClientRect().bottom,
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
    <Flex w="100%" direction="column" height="100%">
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
      <ChatControls isDisabled={!currentUser} onSend={sendChatMessage} />
    </Flex>
  );
};

export default Chat;
