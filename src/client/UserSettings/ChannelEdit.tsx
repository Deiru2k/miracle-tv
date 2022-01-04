import React from "react";
import { gql } from "@apollo/client";

import {
  useEditChannelMutation,
  useUserSettingsChannelQuery,
} from "miracle-tv-shared/hooks";
import { useCallback } from "react";
import { Form } from "react-final-form";
import { channelFragment } from "miracle-tv-client/components/ui/channels/const";
import { ChannelBasicForm } from "./ChannelBasicForm";
import { Box, Button, useToast } from "@chakra-ui/react";
import { UpdateChannelInput } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";

gql`
  query UserSettingsChannel($id: ID!) {
    channel(id: $id) {
      ...ChannelFull
    }
  }
  ${channelFragment}
`;

gql`
mutation EditChannel($input: UpdateChannelInput) {
  updateChannel(input: $input) {
      ...ChannelFull
  }
  ${channelFragment}
}
`;

type Props = { id: string };

export const ChannelEdit = ({ id }: Props) => {
  const toast = useToast();
  const { data: { channel } = {} } = useUserSettingsChannelQuery({
    variables: { id },
  });

  const [updateChannelMutation, { loading: isUpdating }] =
    useEditChannelMutation({
      onCompleted: () =>
        toast({ status: "success", title: "Updated channel info!" }),
      onError: ({ message }) =>
        toast({
          status: "error",
          title: `Error updating channel info: ${message}`,
        }),
    });

  const formData = channel
    ? {
        name: channel.name,
        description: channel.description,
        slug: channel.slug,
        activityId: channel.activity?.id || null,
        thumbnail: channel?.thumbnail?.id,
      }
    : {};

  const updateChannel = useCallback(
    (values: UpdateChannelInput) => {
      updateChannelMutation({ variables: { input: { id, ...values } } });
    },
    [updateChannelMutation]
  );

  return (
    <Form<UpdateChannelInput> onSubmit={updateChannel} initialValues={formData}>
      {({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit}>
          <Panel>
            <ChannelBasicForm />
          </Panel>
          <Box position="sticky" float="right" bottom="0" right="0" pt={2}>
            <Button type="submit" disabled={!dirty} isLoading={isUpdating}>
              Update channel
            </Button>
          </Box>
        </form>
      )}
    </Form>
  );
};
