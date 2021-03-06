import React, { useCallback } from "react";
import { gql } from "@apollo/client";
import { channelFragment } from "miracle-tv-client/components/ui/channels/const";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  UseDisclosureReturn,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-final-form";
import { ChannelBasicForm } from "./ChannelBasicForm";
import {
  useUpdateUserSettingsPreferencesMutation,
  useUserSettingsCreateChannelMutation,
} from "miracle-tv-shared/hooks";
import { CreateChannelInput } from "miracle-tv-shared/graphql";
import { useRouter } from "next/dist/client/router";
import { useCurrentUserSettings } from "miracle-tv-client/hooks/auth";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";

gql`
  mutation UserSettingsCreateChannel($input: CreateChannelInput) {
    createChannel(input: $input) {
      ...ChannelFull
    }
  }
  ${channelFragment}
`;

type Props = {
  redirectUrlBase?: string | ((id: string) => string);
  onCreate?: () => {};
} & UseDisclosureReturn;

export const CreateChannelModal = ({
  redirectUrlBase,
  onCreate,
  ...props
}: Props) => {
  const toast = useToast();
  const { push } = useRouter();
  const { currentSettings } = useCurrentUserSettings();
  const isMobile = useMediaQuery(MediaQuery.mobile);

  const [updateSettings] = useUpdateUserSettingsPreferencesMutation();
  const [createChannelMutation, { loading: isCreating }] =
    useUserSettingsCreateChannelMutation({
      onCompleted: ({ createChannel }) => {
        const redirectUrl =
          typeof redirectUrlBase === "function"
            ? redirectUrlBase(createChannel.id)
            : `${redirectUrlBase}/${createChannel.id}`;
        onCreate?.();
        toast({ status: "success", title: "Created channel!" });
        push(redirectUrl);
      },
      onError: ({ message }) => {
        toast({ status: "error", title: `Error creating channel: ${message}` });
      },
    });
  const createChannel = useCallback(
    (values: CreateChannelInput) => {
      createChannelMutation({ variables: { input: values } }).then(
        ({ data = {} }) => {
          if (
            currentSettings?.singleUserMode &&
            !currentSettings.singleUserChannel
          ) {
            updateSettings({
              variables: {
                input: { singleUserChannel: data?.createChannel?.id },
              },
            });
          }
        }
      );
    },
    [createChannelMutation, currentSettings]
  );

  return (
    <Form<CreateChannelInput> onSubmit={createChannel}>
      {({ handleSubmit, values, form, dirty }) => (
        <Modal
          {...props}
          size={isMobile ? "full" : undefined}
          onClose={() => {
            form.reset();
            props.onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent maxW={isMobile ? undefined : "55vw"}>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalHeader>Create Channel</ModalHeader>
              <ModalBody>
                <ChannelBasicForm values={values} />
              </ModalBody>
              <ModalFooter>
                <Button
                  float="right"
                  type="submit"
                  disabled={!dirty}
                  isLoading={isCreating}
                >
                  Create
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Form>
  );
};
