import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
  useToast,
} from "@chakra-ui/react";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { CreateStreamKeyInput } from "miracle-tv-shared/graphql";
import React, { useCallback } from "react";
import { Form } from "react-final-form";
import { gql } from "@apollo/client";
import { useUserSettingsCreateChannelKeyMutation } from "miracle-tv-shared/hooks";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useTranslation } from "react-i18next";

type Props = {
  channelId: string;
  onCreated: () => void;
} & UseDisclosureReturn;

gql`
  mutation UserSettingsCreateChannelKey($input: CreateStreamKeyInput!) {
    createStreamKey(input: $input) {
      id
      name
    }
  }
`;

export const CreateStreamKeyModal = ({
  channelId,
  onCreated,
  ...props
}: Props) => {
  const toast = useToast();
  const { currentUser } = useCurrentUser();

  const { t: tChannel } = useTranslation("channel");

  const [createStreamKeyMutation] = useUserSettingsCreateChannelKeyMutation({
    onCompleted: () => {
      onCreated();
      toast({ status: "success", title: tChannel("key-form-success") });
    },
    onError: () =>
      toast({ status: "error", title: tChannel("key-form-error") }),
  });

  const generateKey = useCallback(
    (values: CreateStreamKeyInput) =>
      createStreamKeyMutation({
        variables: {
          input: { userId: currentUser?.id, channelId, ...values },
        },
      }),
    [currentUser]
  );

  return (
    <Form<CreateStreamKeyInput> onSubmit={generateKey}>
      {({ handleSubmit, form }) => (
        <Modal
          {...props}
          onClose={() => {
            form.reset();
            props.onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={(e) => handleSubmit(e).then(() => form.reset())}>
              {" "}
              <ModalHeader>{tChannel("key-generate-new")}</ModalHeader>
              <ModalBody>
                <FormInput
                  label={tChannel("key-form-name")}
                  help={tChannel("key-form-name-help")}
                  name="name"
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit">{tChannel("keys-generate")}</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Form>
  );
};
