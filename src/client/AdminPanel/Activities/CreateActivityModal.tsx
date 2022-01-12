import { gql } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { Flex } from "@chakra-ui/layout";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { ModalCloseButton } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { CreateActivityInput } from "miracle-tv-shared/graphql";
import { useAdminCreateActivityMutation } from "miracle-tv-shared/hooks";
import React, { useCallback } from "react";
import { Form } from "react-final-form";
import { ActivityForm } from "./ActivityForm";
import { ADMIN_ACTIVITY_FRAGMENT } from "./const";

gql`
  mutation AdminCreateActivity($input: CreateActivityInput) {
    createActivity(input: $input) {
      ...AdminActivityFragment
    }
  }
  ${ADMIN_ACTIVITY_FRAGMENT}
`;

type Props = UseDisclosureReturn;

export const CreateActivityModal = (props: Props) => {
  const toast = useToast();
  const [createActivityMutation, { loading: isCreating }] =
    useAdminCreateActivityMutation({
      onCompleted() {
        toast({ status: "success", title: "Created activity" });
      },
      onError() {
        toast({
          status: "error",
          title: "There was an error creating activity",
        });
      },
      refetchQueries: ["AdminActivityList", "AdminActivityCount"],
    });

  const createActivity = useCallback(
    (input: CreateActivityInput) => {
      return createActivityMutation({ variables: { input } });
    },
    [createActivityMutation]
  );

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <Form<CreateActivityInput> onSubmit={createActivity}>
          {({ handleSubmit, pristine, form }) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e).then(() => {
                  form.reset();
                  props.onClose();
                });
              }}
            >
              <ModalCloseButton />
              <ModalHeader>Create Activity</ModalHeader>
              <ModalBody>
                <ActivityForm />
              </ModalBody>
              <ModalFooter>
                <Flex w="100%" justify="flex-end">
                  <Button
                    type="submit"
                    isDisabled={pristine}
                    isLoading={isCreating}
                  >
                    Create
                  </Button>
                </Flex>
              </ModalFooter>
            </form>
          )}
        </Form>
      </ModalContent>
    </Modal>
  );
};
