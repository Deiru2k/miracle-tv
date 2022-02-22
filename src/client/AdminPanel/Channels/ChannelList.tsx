import { gql } from "@apollo/client";
import { Button, IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";
import { Divider, Heading, useDisclosure, useToast } from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { FormActivitesSelect } from "miracle-tv-client/components/form/selects/FormActivitiesSelect";
import { FormUsersSelect } from "miracle-tv-client/components/form/selects/FormUserSelect";
import { channelFragment } from "miracle-tv-client/components/ui/channels/const";
import { SimpleChannelList } from "miracle-tv-client/components/ui/channels/SimpleChannelList";
import { ConfirmDialog } from "miracle-tv-client/components/ui/ConfirmDialog";
import { Filter } from "miracle-tv-client/components/ui/Filter";
import { Link } from "miracle-tv-client/components/ui/Link";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { Pagination, usePagination } from "miracle-tv-client/hooks/pagination";
import {
  AccessUnit,
  ChannelFullFragment,
  ChannelsQueryFilter,
} from "miracle-tv-shared/graphql";
import {
  useAdminChannelsQuery,
  useAdminChannelsCountQuery,
  useAdminDeleteChannelMutation,
} from "miracle-tv-shared/hooks";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

gql`
  query AdminChannelsCount($filter: ChannelsQueryFilter) {
    fullChannelsCount(filter: $filter)
  }
  query AdminChannels($filter: ChannelsQueryFilter, $limit: QueryLimit) {
    fullChannels(filter: $filter, limit: $limit) {
      ...ChannelFull
    }
  }
  ${channelFragment}
`;

gql`
  mutation AdminDeleteChannel($id: ID!) {
    deleteChannel(id: $id)
  }
`;

const perPage = 6;

export const AdminChannelList = () => {
  const toast = useToast();
  const { checkRights } = useCurrentUser();
  const [filter, setFilter] = useState<ChannelsQueryFilter>({});
  const [channelToDelete, setChannelToDelete] = useState<string | null>(null);
  const deleteChannelDisclosure = useDisclosure();

  const { t: tChannel } = useTranslation("channel");
  const { t: tCommon } = useTranslation("common");

  const canEditChannels = useMemo(() => {
    return checkRights(AccessUnit.Write, "channels");
  }, [checkRights]);

  const canViewChannels = useMemo(() => {
    return checkRights(AccessUnit.Read, "channels");
  }, [checkRights]);

  const { data: { fullChannelsCount = 0 } = {} } = useAdminChannelsCountQuery({
    variables: { filter },
    fetchPolicy: "no-cache",
    skip: !canViewChannels,
  });

  const pagination = usePagination(fullChannelsCount, perPage);

  const { data: { fullChannels: channels = [] } = {}, loading: isLoading } =
    useAdminChannelsQuery({
      variables: {
        filter,
        limit: { limit: perPage, skip: pagination.targetSkip },
      },
      skip: !fullChannelsCount || !pagination,
      fetchPolicy: "no-cache",
    });

  const [deleteChannelMutation, { loading: isDeleting }] =
    useAdminDeleteChannelMutation({
      onCompleted() {
        toast({
          status: "success",
          title: tChannel("action-delete-channel-success"),
        });
        setChannelToDelete(null);
        deleteChannelDisclosure.onClose();
      },
      onError() {
        toast({
          status: "error",
          title: tChannel("action-delete-channel-error"),
        });
        setChannelToDelete(null);
      },
      refetchQueries: ["AdminChannels"],
    });

  const deleteChannel = useCallback(
    (id: string) => {
      setChannelToDelete(id);
      deleteChannelDisclosure.onOpen();
    },
    [setChannelToDelete]
  );

  const onChannelDelete = useCallback(() => {
    deleteChannelMutation({ variables: { id: channelToDelete } });
  }, [channelToDelete, deleteChannelMutation]);

  const controlsRenderer = useCallback(
    (ch: ChannelFullFragment) => (
      <>
        <IconButton
          colorScheme="red"
          icon={<DeleteIcon />}
          aria-label={tChannel("delete-channel")}
          title={tChannel("delete-channel")}
          isDisabled={!canEditChannels}
          onClick={() => deleteChannel(ch.id)}
        />
        <Link
          as={(props: any) => (
            <IconButton
              {...props}
              aria-label={
                canEditChannels
                  ? tChannel("edit-channel")
                  : tChannel("view-channel")
              }
              title={
                canEditChannels
                  ? tChannel("edit-channel")
                  : tChannel("view-channel")
              }
              icon={canEditChannels ? <EditIcon /> : <InfoIcon />}
            />
          )}
          href={`/admin/channels/${ch.id}/details`}
        />
      </>
    ),
    []
  );

  return (
    <>
      <Heading mb={2}>{tChannel("channels")}</Heading>
      <Divider mb={4} />
      <ConfirmDialog
        {...deleteChannelDisclosure}
        onConfirm={onChannelDelete}
        confirmColorScheme="red"
        isLoading={isDeleting}
      >
        {tChannel("delete-confirm")}
      </ConfirmDialog>
      <Filter<ChannelsQueryFilter> onFilter={setFilter}>
        <HStack mb={2}>
          <FormInput name="name" label={tChannel("name")} />
          <FormInput name="slug" label={tChannel("slug")} />
        </HStack>
        <HStack align="flex-start">
          <FormUsersSelect
            w="50%"
            flex={1}
            name="userIds"
            label={tChannel("users")}
            inputProps={{ multi: true, placeholder: tCommon("select-users") }}
          />
          <FormActivitesSelect
            w="50%"
            flex={1}
            name="activityIds"
            label={tChannel("activities")}
            inputProps={{
              multi: true,
              placeholder: tCommon("select-activities"),
            }}
          />
        </HStack>
      </Filter>
      <SimpleChannelList
        showUser
        controls={controlsRenderer}
        channels={channels}
      />
      <Pagination {...pagination} />
    </>
  );
};
