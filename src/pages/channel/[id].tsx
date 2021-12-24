import { gql } from "@apollo/client";
import {
  ChannelView,
  CHANNEL_VIEW_FRAGMENT,
  CHANNEL_VIEW_STATUS_FRAGMENT,
} from "miracle-tv-client/ChannelPage/Channel";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import {
  useChannelPageQuery,
  useChannelPageStatusQuery,
} from "miracle-tv-shared/hooks";
import { useRouter } from "next/dist/client/router";

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
  const { data: { channel } = {} } = useChannelPageQuery({
    variables: { id: id as string },
  });
  const { data: { channel: { status } = {} } = {} } = useChannelPageStatusQuery(
    {
      variables: { id: id as string },
      pollInterval: 5000,
    }
  );

  return channel ? (
    <ChannelView channel={channel} status={status} />
  ) : (
    <Loading />
  );
};

export default ChannelPage;
