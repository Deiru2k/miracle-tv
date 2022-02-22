import { gql } from "@apollo/client";
import { Divider, Heading, Text } from "@chakra-ui/layout";
import { Box, Button, useToast } from "@chakra-ui/react";
import { RoleForm } from "miracle-tv-client/components/roles/RolePermissions/RoleForm";
import { NotFound } from "miracle-tv-client/components/system/NotFound";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { AccessUnit, UpdateRoleInput } from "miracle-tv-shared/graphql";
import {
  useAdminRolePageQuery,
  useAdminUpdateRoleMutation,
} from "miracle-tv-shared/hooks";
import React, { useCallback, useMemo } from "react";
import { Form } from "react-final-form";
import { ADMIN_ROLE_FRAGMENT } from "./const";

import { omitDeep } from "miracle-tv-shared/utils/object/omit";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useTranslation } from "next-i18next";

gql`
  query AdminRolePage($id: ID!) {
    roleRaw(id: $id) {
      ...AdminRole
    }
  }
  ${ADMIN_ROLE_FRAGMENT}
`;

gql`
  mutation AdminUpdateRole($input: UpdateRoleInput) {
    updateRoleRaw(input: $input) {
      ...AdminRole
    }
  }
  ${ADMIN_ROLE_FRAGMENT}
`;

type Props = {
  id: string;
};

export const AdminRolePage = ({ id }: Props) => {
  const toast = useToast();
  const { checkRights } = useCurrentUser();

  const { t: tRole } = useTranslation("role");

  const canViewRole = useMemo(
    () => checkRights(AccessUnit.Read, "roles"),
    [checkRights]
  );
  const canEditRole = useMemo(
    () => checkRights(AccessUnit.Write, "roles"),
    [checkRights]
  );

  const { data: { roleRaw: role } = {}, loading: isLoading } =
    useAdminRolePageQuery({
      variables: { id },
      skip: !id || !canViewRole,
    });

  const [updateRoleMutation, { loading: isUpdating }] =
    useAdminUpdateRoleMutation({
      onCompleted() {
        toast({
          status: "success",
          title: `Role "${role?.name}" successfully updated.`,
        });
      },
      onError() {
        toast({
          status: "error",
          title: `There was an error updating "${role?.name}".`,
        });
      },
    });

  const updateRole = useCallback(
    (input: UpdateRoleInput) => {
      updateRoleMutation({ variables: { input } });
    },
    [updateRoleMutation]
  );

  if (isLoading) {
    return <Loading />;
  }

  const formData: UpdateRoleInput = omitDeep(role, ["__typename"]);

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
      <Form<UpdateRoleInput> onSubmit={updateRole} initialValues={formData}>
        {({ handleSubmit, dirty }) => (
          <>
            <form onSubmit={handleSubmit}>
              <RoleForm isDisabled={!canEditRole} />
              {canEditRole && (
                <Box
                  display="inline-block"
                  position="sticky"
                  float="right"
                  bottom={0}
                >
                  <Button
                    type="submit"
                    mt={6}
                    isDisabled={!dirty || isUpdating}
                    isLoading={isUpdating}
                  >
                    {tRole("form-update-role")}
                  </Button>
                </Box>
              )}
            </form>
          </>
        )}
      </Form>
    </>
  ) : (
    <NotFound />
  );
};
