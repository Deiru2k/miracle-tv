import { gql } from "@apollo/client";
import { Button, IconButton } from "@chakra-ui/button";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
import { Pagination, usePagination } from "miracle-tv-client/hooks/pagination";
import {
  ChannelFullFragment,
  ChannelsQueryFilter,
} from "miracle-tv-shared/graphql";
import {
  useAdminChannelsQuery,
  useAdminChannelsCountQuery,
  useAdminDeleteChannelMutation,
} from "miracle-tv-shared/hooks";
import React, { useCallback, useState } from "react";

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
  const [filter, setFilter] = useState<ChannelsQueryFilter>({});
  const [channelToDelete, setChannelToDelete] = useState<string | null>(null);
  const deleteChannelDisclosure = useDisclosure();

  const { data: { fullChannelsCount = 0 } = {} } = useAdminChannelsCountQuery({
    variables: { filter },
    fetchPolicy: "no-cache",
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
        toast({ status: "success", title: "Deleted channel!" });
        setChannelToDelete(null);
        deleteChannelDisclosure.onClose();
      },
      onError() {
        toast({
          status: "error",
          title: "There was an error deleting channel.",
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
          aria-label="Delete"
          onClick={() => deleteChannel(ch.id)}
        />
        <Link
          as={(props: any) => (
            <IconButton {...props} aria-label="edit" icon={<EditIcon />} />
          )}
          href={`/admin/channels/${ch.id}/details`}
        />
      </>
    ),
    []
  );

  return (
    <>
      <Heading mb={2}>Channels</Heading>
      <Divider mb={4} />
      <ConfirmDialog
        {...deleteChannelDisclosure}
        onConfirm={onChannelDelete}
        confirmColorScheme="red"
        isLoading={isDeleting}
      >
        {"Are you sure you want to delete this channel?"}
      </ConfirmDialog>
      <Filter<ChannelsQueryFilter> onFilter={setFilter}>
        <HStack mb={2}>
          <FormInput name="name" label="Channel Name" />
          <FormInput name="slug" label="Channel slug" />
        </HStack>
        <HStack>
          <FormUsersSelect
            name="userIds"
            label="Users"
            inputProps={{ multi: true, placeholder: "Select users..." }}
          />
          <FormActivitesSelect
            name="activityIds"
            label="Activities"
            inputProps={{ multi: true, placeholder: "Select activities..." }}
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
