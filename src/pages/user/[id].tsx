import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Circle,
  HStack,
  VStack,
  Stack,
  Divider,
} from "@chakra-ui/react";
import {
  CHANNEL_VIEW_FRAGMENT,
  CHANNEL_VIEW_STATUS_FRAGMENT,
} from "miracle-tv-client/ChannelPage/Channel";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import {
  USER_PROFILE_FRAGMENT,
  UserProfile,
} from "miracle-tv-client/UserProfile/Profile";
import { ChannelViewStatusFragment } from "miracle-tv-shared/graphql";
import {
  UserPageChannelStatusQueryResult,
  useUserPageChannelStatusQuery,
  useUserPageQuery,
} from "miracle-tv-shared/hooks";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useMemo } from "react";

gql`
  query UserPage($username: ID!) {
    user(id: $username) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

gql`
query UserPageChannelStatus($username: ID!) {
  user(id: $username) {
    id,
    channels {
      id,
      status {
        ...ChannelViewStatus
      }
    }
  }
  ${CHANNEL_VIEW_STATUS_FRAGMENT}
}
`;

const UserPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { isLiveUpdate } = useContext(LiveUpdateContext);
  const { data: { user } = {}, loading: isLoading } = useUserPageQuery({
    variables: { username: id as string },
  });

  const { data: { user: { channels } } = { user: { channels: [] } } } =
    useUserPageChannelStatusQuery({
      variables: { username: id as string },
      pollInterval: isLiveUpdate ? 5000 : 0,
    });

  const statuses = useMemo(
    () => channels.map<ChannelViewStatusFragment>((channel) => channel.status),
    [channels]
  );

  if (!user && isLoading) {
    return <Loading />;
  }

  return user ? (
    <>
      <Head>
        <title>
          {user.displayName || user.username} - Profile - Miracle TV
        </title>
      </Head>
      <UserProfile user={user} statuses={statuses} />
    </>
  ) : (
    <NotFound heading="User not found!" />
  );
};

export default UserPage;
