import { gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { CHANNEL_VIEW_STATUS_FRAGMENT } from "miracle-tv-client/ChannelPage/Channel";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { LiveUpdateContext } from "miracle-tv-client/context/liveUpdate";
import {
  USER_PROFILE_FRAGMENT,
  UserProfile,
} from "miracle-tv-client/UserProfile/Profile";
import { ChannelViewStatusFragment } from "miracle-tv-shared/graphql";
import {
  useUserSubscriptionQuery,
  useUserPageChannelStatusQuery,
  useUserPageQuery,
  useSubscribeToUserMutation,
  useUnsubscribeFromUserMutation,
} from "miracle-tv-shared/hooks";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

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

gql`
  mutation SubscribeToUser($id: ID!) {
    subscribe(input: { target: USER, targetId: $id }) {
      id
    }
  }
  mutation UnsubscribeFromUser($id: ID!) {
    unsubscribe(input: { target: USER, targetId: $id })
  }
`;

gql`
  query UserSubscription($id: ID!) {
    subscription(input: { target: USER, targetId: $id }) {
      id
    }
  }
`;

const UserPage = () => {
  const toast = useToast();

  const { t: tUser } = useTranslation("user");
  const { t: tCommon } = useTranslation("common");

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

  const { data: { subscription } = {} } = useUserSubscriptionQuery({
    variables: { id: user?.id },
    skip: !user?.id,
  });

  const [subscribeMutation] = useSubscribeToUserMutation({
    onCompleted: () => {
      toast({
        status: "success",
        title: tCommon("subscribed-to", {
          name: user?.displayName || user?.username,
        }),
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: tCommon("subscribed-to-error", {
          name: user?.displayName || user?.username,
        }),
      });
    },
  });

  const [unusbscribeMutation] = useUnsubscribeFromUserMutation({
    onCompleted: () => {
      toast({
        status: "success",
        title: tCommon("unsubscribed-from", {
          name: user?.displayName || user?.username,
        }),
      });
    },
    onError: () => {
      toast({
        status: "error",
        title: tCommon("unsubscribed-from-error", {
          name: user?.displayName || user?.username,
        }),
      });
    },
  });

  const onSubscribe = useCallback(() => {
    subscribeMutation({
      variables: {
        id: user?.id,
      },
      refetchQueries: ["UserSubscription", "UserPage"],
    });
  }, [user]);

  const onUnsubscribe = useCallback(() => {
    unusbscribeMutation({
      variables: { id: user?.id },
      refetchQueries: ["UserSubscription", "UserPage"],
    });
  }, [user]);

  if (!user && isLoading) {
    return <Loading />;
  }

  return user ? (
    <>
      <Head>
        <title>
          {user.displayName || user.username} - {tUser("profile")} - Miracle TV
        </title>
      </Head>
      <UserProfile
        user={user}
        statuses={statuses}
        isSubscribed={!!subscription}
        onSubscribe={onSubscribe}
        onUnsubscribe={onUnsubscribe}
      />
    </>
  ) : (
    <NotFound heading={tUser("user-not-found")} />
  );
};

export default UserPage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "channel", "user"])),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [] as string[],
    fallback: "blocking",
  };
}
