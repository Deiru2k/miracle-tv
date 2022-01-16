import { Box, Heading, Text } from "@chakra-ui/layout";
import Chat from "miracle-tv-client/components/chat/Chat";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { useRouter } from "next/router";

type PopupChatParams = {
  channelId?: string;
};

const PopupChat = () => {
  const { query } = useRouter();
  const channelId = (query as PopupChatParams).channelId;
  return channelId ? (
    <Box w="100%" h="100%" p={4}>
      <Chat channelId={channelId} isPopup />
    </Box>
  ) : (
    <Attract>
      <Heading size="md" mt={4}>
        Please, specify a channel ID to use popup chat
      </Heading>
    </Attract>
  );
};

export default PopupChat;
