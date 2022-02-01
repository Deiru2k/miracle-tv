import React, { useMemo } from "react";
import { gql } from "@apollo/client";

import {
  useEditChannelMutation,
  useUserSettingsChannelQuery,
} from "miracle-tv-shared/hooks";
import { useCallback } from "react";
import { Form } from "react-final-form";
import {
  channelFragment,
  selfChannelFragment,
} from "miracle-tv-client/components/ui/channels/const";
import { ChannelBasicForm } from "./ChannelBasicForm";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { AccessUnit, UpdateChannelInput } from "miracle-tv-shared/graphql";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { ChannelSecurityForm } from "./ChannelSecurity";

gql`
  query UserSettingsChannel($id: ID!) {
    selfChannel(id: $id) {
      ...SelfChannelFull
    }
  }
  ${selfChannelFragment}
`;

gql`
mutation EditChannel($input: UpdateChannelInput) {
  updateChannel(input: $input) {
      ...ChannelFull
  }
  ${channelFragment}
}
`;

type Props = { id: string; canViewChannel: boolean };

export const ChannelEdit = ({ id, canViewChannel }: Props) => {
  const toast = useToast();

  const { checkRights, currentUser } = useCurrentUser();

  const { data: { selfChannel } = {} } = useUserSettingsChannelQuery({
    variables: { id },
    skip: !canViewChannel,
  });

  const canEditChannel = useMemo(
    () =>
      checkRights(AccessUnit.Write, "channels") ||
      (checkRights(AccessUnit.Self, "channels") &&
        selfChannel?.user.id === currentUser.id),
    [checkRights, selfChannel, currentUser]
  );

  const [updateChannelMutation, { loading: isUpdating }] =
    useEditChannelMutation({
      onCompleted: () =>
        toast({ status: "success", title: "Updated channel info!" }),
      onError: ({ message }) =>
        toast({
          status: "error",
          title: `Error updating channel info: ${message}`,
        }),
      refetchQueries: ["UserSettingsChannel"],
    });

  const formData = selfChannel
    ? {
        name: selfChannel.name,
        description: selfChannel.description,
        slug: selfChannel.slug,
        activityId: selfChannel.activity?.id || null,
        thumbnail: selfChannel?.thumbnail?.id,
        mature: selfChannel?.mature,
        matureDescription: selfChannel?.matureDescription,
        passwordProtected: selfChannel?.passwordProtected,
        password: selfChannel?.password,
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
      {({ handleSubmit, dirty, values }) => (
        <form onSubmit={handleSubmit}>
          <Heading size="md" mb={2}>
            Details
          </Heading>
          <Panel>
            <ChannelBasicForm isDisabled={!canEditChannel} />
          </Panel>
          <Heading size="md" mb={2} mt={6}>
            Security
          </Heading>
          <Panel>
            <ChannelSecurityForm isDisabled={!canEditChannel} values={values} />
          </Panel>
          {canEditChannel && (
            <Box position="sticky" float="right" bottom="0" right="0" pt={2}>
              <Button type="submit" disabled={!dirty} isLoading={isUpdating}>
                Update channel
              </Button>
            </Box>
          )}
        </form>
      )}
    </Form>
  );
};
