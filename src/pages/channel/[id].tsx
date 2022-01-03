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
import { NotFoundError } from "miracle-tv-server/graphql/errors/general";
import {
  useChannelPageQuery,
  useChannelPageStatusQuery,
  useChannelSubscriptionQuery,
  useSubscribeToChannelMutation,
  useUnsubscribeFromChannelMutation,
} from "miracle-tv-shared/hooks";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useCallback, useContext } from "react";

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

const CHANNEL_SUBSCRIPTION_QUERY = gql`
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
      toast({ status: "success", title: `Subscribe to ${channel?.name}` });
    },
    onError: () => {
      toast({
        status: "error",
        title: `Error subscribing to ${channel?.name}`,
      });
    },
  });

  const [unusbscribeMutation] = useUnsubscribeFromChannelMutation({
    onCompleted: () => {
      toast({ status: "success", title: `Unsubscribed from ${channel?.name}` });
    },
    onError: () => {
      toast({
        status: "error",
        title: `Error unsubscribing from ${channel?.name}`,
      });
    },
  });

  const onSubscribe = useCallback(() => {
    subscribeMutation({
      variables: {
        id: channel?.id,
      },
      refetchQueries: ["ChannelSubscription"],
    });
  }, [channel]);

  const onUnsubscribe = useCallback(() => {
    unusbscribeMutation({
      variables: { id: channel?.id },
      refetchQueries: ["ChannelSubscription"],
    });
  }, [channel]);

  if (!channel && isLoading) {
    return <Loading />;
  }
  return channel ? (
    <>
      <Head>
        <title>{channel.name} - Channel - Miracle TV</title>
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
    <NotFound heading="Channel not found!" />
  );
};

export default ChannelPage;
