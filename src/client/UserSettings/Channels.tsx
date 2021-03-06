import React, { useCallback, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import {
  useUserSettingsChannelsQuery,
  useUserSettingsDeleteChannelMutation,
} from "miracle-tv-shared/hooks";
import { channelFragment } from "miracle-tv-client/components/ui/channels/const";
import {
  Box,
  Button,
  useDisclosure,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CreateChannelModal } from "./CreateChannelModal";
import { useRouter } from "next/dist/client/router";
import NotFound from "src/pages/404";
import { ChannelSettingsPage } from "miracle-tv-client/UserSettings/ChannelSettingsPage";
import { Link } from "miracle-tv-client/components/ui/Link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  useCurrentUser,
  useCurrentUserSettings,
} from "miracle-tv-client/hooks/auth";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { ConfirmDialog } from "miracle-tv-client/components/ui/ConfirmDialog";
import { ChannelFullFragment } from "miracle-tv-shared/graphql";
import { SimpleChannelList } from "miracle-tv-client/components/ui/channels/SimpleChannelList";
import { FloatingControls } from "miracle-tv-client/components/ui/FloatingControls";
import Head from "next/head";
import { useTranslation } from "react-i18next";

gql`
  query UserSettingsChannels($filter: ChannelsQueryFilter) {
    selfChannels(filter: $filter) {
      ...ChannelFull
    }
  }
  mutation UserSettingsDeleteChannel($id: ID!) {
    deleteChannel(id: $id)
  }
  ${channelFragment}
`;

export const SettingsChannelsList = () => {
  const toast = useToast();

  const { t: tChannel } = useTranslation("channel");
  const { t: tSettings } = useTranslation("settings");
  const { t: tCommon } = useTranslation("common");

  const { currentUser } = useCurrentUser();
  const { currentSettings } = useCurrentUserSettings();
  const createChannelDisclosure = useDisclosure();
  const deleteChannelDisclosure = useDisclosure();
  const [channelToDelete, setChannelToDelete] = useState<string | null>();

  const { data: { selfChannels: channels = [] } = {}, refetch } =
    useUserSettingsChannelsQuery({
      variables: {
        filter: {
          userId: currentUser?.id,
        },
      },
      skip: !currentUser,
    });

  const [deleteChannelMutation, { loading: isDeleting }] =
    useUserSettingsDeleteChannelMutation({
      onCompleted: () => {
        toast({
          status: "success",
          title: tChannel("action-delete-channel-success"),
        });
        deleteChannelDisclosure.onClose();
        refetch();
        setChannelToDelete(null);
      },
      onError: () =>
        toast({
          status: "error",
          title: tChannel("action-delete-channel-error"),
        }),
    });

  const onChannelDeleteOpen = useCallback(
    (id: string) => {
      setChannelToDelete(id);
      deleteChannelDisclosure.onOpen();
    },
    [setChannelToDelete, deleteChannelDisclosure]
  );

  const onChannelDelete = useCallback(() => {
    deleteChannelMutation({ variables: { id: channelToDelete } });
  }, [channelToDelete]);

  const controlsRenderer = useCallback(
    (ch: ChannelFullFragment) => (
      <>
        <IconButton
          colorScheme="red"
          icon={<DeleteIcon />}
          aria-label={tCommon("delete")}
          title={tCommon("delete")}
          onClick={() => onChannelDeleteOpen(ch.id)}
        />
        <Link
          as={(props: any) => (
            <IconButton {...props} aria-label="edit" icon={<EditIcon />} />
          )}
          href={`/settings/user/channels/${ch.id}/details`}
        />
      </>
    ),
    [onChannelDeleteOpen]
  );

  return (
    <>
      <Head>
        <title>{tSettings("channels-page-title")} - Miracle TV</title>
      </Head>
      <Box>
        <ConfirmDialog
          {...deleteChannelDisclosure}
          onConfirm={onChannelDelete}
          confirmColorScheme="red"
          isLoading={isDeleting}
        >
          {tSettings("confirm")}
        </ConfirmDialog>
        <CreateChannelModal
          redirectUrlBase={(id) => `/settings/user/channels/${id}/details`}
          onCreate={refetch}
          {...createChannelDisclosure}
        />
        <FloatingControls heading={tChannel("channels")} m={6}>
          {!!channels?.length && (
            <>
              <Button float="right" onClick={createChannelDisclosure.onOpen}>
                {tChannel("create-channel")}
              </Button>
            </>
          )}
        </FloatingControls>
        {!channels?.length && !currentSettings?.singleUserMode && (
          <Attract>
            <Heading mt={2} mb={2}>
              {tChannel("no-channels")}
            </Heading>
            <Button variant="ghost" onClick={createChannelDisclosure.onOpen}>
              {tChannel("create-new")}
            </Button>
          </Attract>
        )}
        {currentSettings?.singleUserMode && !currentSettings.singleUserChannel && (
          <Attract>
            <Heading mt={2} mb={2} size="lg">
              {tChannel("single-user-warning")}
            </Heading>
            {channels?.length > 0 && (
              <>
                <Text>
                  {tChannel("single-user-goto")}{" "}
                  <Link href="/settings/user/preferences">[Preferences]</Link>{" "}
                  {tChannel("single-user-pick")}
                </Text>
              </>
            )}{" "}
            {channels?.length === 0 && (
              <Button variant="ghost" onClick={createChannelDisclosure.onOpen}>
                {tChannel("create-new")}
              </Button>
            )}
          </Attract>
        )}
        {!currentSettings?.singleUserMode && (
          <SimpleChannelList
            channels={channels}
            controls={controlsRenderer}
            defaultThumbnail={currentUser?.streamThumbnail?.filename}
          />
        )}
      </Box>
    </>
  );
};

export const Channels = () => {
  const { query: { path = [] } = {} } = useRouter();

  switch (path.length) {
    case 2:
      return <SettingsChannelsList />;
    case 3:
      return <ChannelSettingsPage channelId={path[2]} />;
    case 4:
      return <ChannelSettingsPage channelId={path[2]} tab={path[3]} />;
    default:
      return <NotFound />;
  }
};
