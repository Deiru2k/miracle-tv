import { gql } from "@apollo/client";
import { UseDisclosureReturn } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { Button, Divider, Flex, useToast } from "@chakra-ui/react";
import { ADMIN_ROLE_FRAGMENT } from "miracle-tv-client/AdminPanel/Roles/const";
import { FormInput } from "miracle-tv-client/components/form/FormInput";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  AccessUnit,
  AdminRoleFragment,
  CreateRoleInput,
} from "miracle-tv-shared/graphql";
import { useAdminCreateRoleMutation } from "miracle-tv-shared/hooks";
import React, { useCallback } from "react";
import { Form } from "react-final-form";
import { RoleForm } from "./RoleForm";

gql`
  mutation AdminCreateRole($input: CreateRoleInput) {
    createRole(input: $input) {
      ...AdminRole
    }
  }
  ${ADMIN_ROLE_FRAGMENT}
`;

const defaultRole: Partial<CreateRoleInput> = {
  parentId: null,
  access: {
    rights: {
      channels: [AccessUnit.Inherit],
      streamKeys: [AccessUnit.Inherit],
      users: [AccessUnit.Inherit],
      activities: [AccessUnit.Inherit],
      roles: [AccessUnit.Inherit],
      userSettings: [AccessUnit.Inherit],
    },
    actions: {
      user: {
        silence: false,
        ban: false,
        warn: false,
      },
    },
  },
};

type Props = UseDisclosureReturn;

export const CreateRoleModal = ({ ...disclosure }: Props) => {
  const toast = useToast();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const [createRoleMutation, { loading: isCreating }] =
    useAdminCreateRoleMutation({
      onCompleted() {
        toast({ status: "success", title: "Created role!" });
        disclosure.onClose();
      },
      onError() {
        toast({ status: "error", title: "There was an error creating role." });
      },
      refetchQueries: ["AdminRoles"],
    });

  const onRoleCreate = useCallback(
    (input: CreateRoleInput) => {
      return createRoleMutation({
        variables: { input: { ...input } },
      });
    },
    [createRoleMutation]
  );

  return (
    <Form<CreateRoleInput> onSubmit={onRoleCreate} initialValues={defaultRole}>
      {({ handleSubmit, form, dirty }) => (
        <Modal
          size={isMobile ? "full" : "xl"}
          {...disclosure}
          onClose={() => {
            form.reset();
            disclosure.onClose();
          }}
        >
          <ModalContent>
            <form
              onSubmit={(e) => {
                handleSubmit(e).then(() => {
                  form.reset();
                });
              }}
            >
              <ModalCloseButton />
              <ModalHeader>Create Role</ModalHeader>
              <ModalBody>
                <FormInput name="id" label="ID" isRequired mb={2} />
                <FormInput name="name" label="Name" isRequired />
                <Divider mt={2} mb={2} />
                <RoleForm />
              </ModalBody>
              <ModalFooter>
                <Flex w="100%" justify="flex-end">
                  <Button
                    isDisabled={!dirty || isCreating}
                    type="submit"
                    isLoading={isCreating}
                  >
                    Create role
                  </Button>
                </Flex>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Form>
  );
};
