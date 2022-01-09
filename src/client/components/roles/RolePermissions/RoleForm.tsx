import { Divider, Heading } from "@chakra-ui/react";
import React from "react";
import { RolePermissions } from "./RolePermissions";
import { ActionPermissions } from "./ActionPermissions";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";

export const RoleForm = () => {
  return (
    <>
      <Heading size="lg" mb={2}>
        Permissions
      </Heading>
      <FormRolesSelect label="Parent role" name="parentId" mb={4} />
      <RolePermissions />
      <Divider mb={4} mt={6} />
      <Heading size="lg" mb={2}>
        Rights
      </Heading>
      <ActionPermissions />
    </>
  );
};
