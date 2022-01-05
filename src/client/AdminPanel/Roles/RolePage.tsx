import { gql } from "@apollo/client";
import { Divider, Heading, Text } from "@chakra-ui/layout";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { RolePermissions } from "miracle-tv-client/components/roles/RolePermissions/RolePermissions";
import { ActionPermissions } from "miracle-tv-client/components/roles/RolePermissions/ActionPermissions";
import { RoleForm } from "miracle-tv-client/components/roles/RolePermissions/RoleForm";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { AdminRoleFragment } from "miracle-tv-shared/graphql";
import { useAdminRolePageQuery } from "miracle-tv-shared/hooks";
import React, { useCallback } from "react";
import { Form } from "react-final-form";
import { ADMIN_ROLE_FRAGMENT } from "./const";
import { CreateRoleModal } from "miracle-tv-client/components/roles/RolePermissions/CreateRoleModal";

gql`
  query AdminRolePage($id: ID!) {
    role(id: $id) {
      ...AdminRole
    }
  }
  ${ADMIN_ROLE_FRAGMENT}
`;

type Props = {
  id: string;
};

export const AdminRolePage = ({ id }: Props) => {
  const { data: { role } = {}, loading: isLoading } = useAdminRolePageQuery({
    variables: { id },
    skip: !id,
  });
  const createDisclosure = useDisclosure();
  const onCreateDisclosureOpen = useCallback(() => {
    createDisclosure.onOpen();
  }, [createDisclosure]);

  if (isLoading) {
    return <Loading />;
  }
  return role ? (
    <>
      <Heading size="lg" mb={2}>
        Role: {role.name}
      </Heading>
      <Heading size="md">
        <Text as="span" fontWeight="bold" mr={1}>
          ID:
        </Text>
        {role.id}
      </Heading>
      <Divider mb={4} mt={4} />
      <Form<AdminRoleFragment> onSubmit={() => {}} initialValues={role}>
        {({ handleSubmit, dirty }) => (
          <>
            <form onSubmit={handleSubmit}>
              <RoleForm />
              <Box
                display="inline-block"
                position="sticky"
                float="right"
                bottom={0}
              >
                <Button type="submit" mt={6} isDisabled={!dirty}>
                  Update role
                </Button>
              </Box>
            </form>
          </>
        )}
      </Form>
    </>
  ) : (
    <NotFound />
  );
};
