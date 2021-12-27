import { gql } from "@apollo/client";
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
} from "miracle-tv-shared/hooks";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext } from "react";

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

const ChannelPage = () => {
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

  if (!channel && isLoading) {
    return <Loading />;
  }
  return channel ? (
    <>
      <Head>
        <title>{channel.name} - Channel - Miracle TV</title>
      </Head>
      <ChannelView channel={channel} status={status} />
    </>
  ) : (
    <NotFound heading="Channel not found!" />
  );
};

export default ChannelPage;
