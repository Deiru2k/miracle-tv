import { gql } from "@apollo/client";
import { useToast } from "@chakra-ui/toast";
import {
  ChannelView,
  CHANNEL_VIEW_FRAGMENT,
  CHANNEL_VIEW_STATUS_FRAGMENT,
} from "miracle-tv-client/ChannelPage/Channel";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import {
  useChannelPageQuery,
  useChannelPageStatusQuery,
  useChannelSubscriptionQuery,
  useSubscribeToChannelMutation,
  useUnsubscribeFromChannelMutation,
} from "miracle-tv-shared/hooks";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

gql`
  query ChannelPage($id: ID!) {
    channel(id: $id) {
      ...ChannelView
    }
  }
  query ChannelPageStatus($id: ID!) {
    channel(id: $id) {
      status {
        ...ChannelViewStatus
      }
    }
  }
  ${CHANNEL_VIEW_FRAGMENT}
  ${CHANNEL_VIEW_STATUS_FRAGMENT}
`;

gql`
  mutation SubscribeToChannel($id: ID!) {
    subscribe(input: { target: CHANNEL, targetId: $id }) {
      id
    }
  }
  mutation UnsubscribeFromChannel($id: ID!) {
    unsubscribe(input: { target: CHANNEL, targetId: $id })
  }
`;

gql`
  query ChannelSubscription($id: ID!) {
    subscription(input: { target: CHANNEL, targetId: $id }) {
      id
    }
  }
`;

const ChannelPage = () => {
  const toast = useToast();
  const {
    query: { id },
  } = useRouter();

  const { t: tCommon } = useTranslation("common");
  const { t: tChannel } = useTranslation("channel");

  const { isLiveUpdate } = useContext(LiveUpdateContext);
  const { data: { channel } = {}, loading: isLoading } = useChannelPageQuery({
    variables: { id: id as string },
  });
  const { data: { channel: { status } = {} } = {} } = useChannelPageStatusQuery(
    {
      variables: { id: id as string },
      pollInterval: isLiveUpdate ? 5000 : 0,
    }
  );
  const { data: { subscription } = {} } = useChannelSubscriptionQuery({
    variables: { id: channel?.id },
    skip: !channel?.id,
  });

  const [subscribeMutation] = useSubscribeToChannelMutation({
    onCompleted: () => {
      toast({
        status: "success",
        title: tCommon("subscribed-to", { name: channel?.name }),
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: tCommon("subscribed-to-error", { name: channel?.name }),
      });
    },
  });

  const [unusbscribeMutation] = useUnsubscribeFromChannelMutation({
    onCompleted: () => {
      toast({
        status: "success",
        title: tCommon("unsubscribed-from", { name: channel?.name }),
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: tCommon("unsubscribed-from-error", { name: channel?.name }),
      });
    },
  });

  const onSubscribe = useCallback(() => {
    subscribeMutation({
      variables: {
        id: channel?.id,
      },
      refetchQueries: ["ChannelSubscription", "ChannelPage"],
    });
  }, [channel]);

  const onUnsubscribe = useCallback(() => {
    unusbscribeMutation({
      variables: { id: channel?.id },
      refetchQueries: ["ChannelSubscription", "ChannelPage"],
    });
  }, [channel]);

  if (!channel && isLoading) {
    return <Loading />;
  }
  return channel ? (
    <>
      <Head>
        <title>
          {channel.name} - {tChannel("channel")} - Miracle TV
        </title>
      </Head>
      <ChannelView
        channel={channel}
        status={status}
        isSubscribed={!!subscription}
        onSubscribe={onSubscribe}
        onUnsubscribe={onUnsubscribe}
      />
    </>
  ) : (
    <NotFound heading={tChannel("channel-not-found")} />
  );
};

export default ChannelPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "channel"])),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [] as string[],
    fallback: "blocking",
  };
}
