import { Box, Text, Flex, Input, Button, VStack } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useState } from "react";

type ChatMessageProps = {
  username: string;
  message: string;
};

const ChatMessage = ({ username, message }: ChatMessageProps) => {
  return (
    <Box display="block" w="100%">
      <Text as="span" fontWeight="bold">
        {username}:&nbsp;
      </Text>
      <Text as="span">{message}</Text>
    </Box>
  );
};

const ChatControls = () => {
  const [value, setValue] = useState<string>("");
  const onChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [setValue]
  );
  return (
    <Flex mt={2}>
      <Input borderRadius={0} p={1} mr={2} value={value} onChange={onChange} />
      <Button size="sm" h="100%">
        CHAT
      </Button>
    </Flex>
  );
};

export const Chat = () => {
  return (
    <Flex w="100%" direction="column" height="100%">
      <VStack
        w="100%"
        overflowY="auto"
        direction="column"
        flexGrow={1}
        height={0}
      >
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage
          username="Deiru"
          message="Chat message but like really long so it's like takes a lot of space and hopefully gets to wrap to the next line since this is an inline element"
        />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
        <ChatMessage username="Deiru" message="Chat message" />
      </VStack>
      <ChatControls />
    </Flex>
  );
};
