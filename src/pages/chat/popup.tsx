import { Box, Heading } from "@chakra-ui/layout";
import Chat from "miracle-tv-client/components/chat/Chat";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

type PopupChatParams = {
  channelId?: string;
};

const PopupChat = () => {
  const { t: tCommon } = useTranslation("common");
  const { query } = useRouter();
  const channelId = (query as PopupChatParams).channelId;
  return channelId ? (
    <>
      <Head>
        <title>{tCommon("chat-popup")} - Miracle TV</title>
      </Head>
      <Box w="100%" h="100%" p={4}>
        <Chat channelId={channelId} isPopup />
      </Box>
    </>
  ) : (
    <Attract>
      <Heading size="md" mt={4}>
        Please, specify a channel ID to use popup chat
      </Heading>
    </Attract>
  );
};

export default PopupChat;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
