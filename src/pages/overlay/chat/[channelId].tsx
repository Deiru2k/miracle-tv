import { css, Global } from "@emotion/react";
import Chat from "miracle-tv-client/components/chat/Chat";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const ChatOverlay = () => {
  const { t: tCommon } = useTranslation("common");
  const { query } = useRouter();
  return (
    <>
      <Global
        styles={css`
          body {
            background-color: transparent;
          }
        `}
      />
      <Head>
        <title>{tCommon("chat-overlay")} - Miracle TV</title>
      </Head>
      <Chat
        channelId={query.channelId as string}
        hideControls
        textStroke
        hideScrollbar
        fading
      />
    </>
  );
};

export default ChatOverlay;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "chat"])),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [] as string[],
    fallback: "blocking",
  };
}
