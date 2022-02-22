import { css, Global } from "@emotion/react";
import Chat from "miracle-tv-client/components/chat/Chat";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const ChatOverlay = () => {
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
      ...(await serverSideTranslations(locale, ["common", "navbar"])),
    },
  };
}
