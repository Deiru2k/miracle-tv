import { Box, Button, Divider, Heading } from "@chakra-ui/react";
import { AccessUnit, AdminRoleFragment } from "miracle-tv-shared/graphql";
import React from "react";
import { RolePermissions } from "./RolePermissions";
import { ActionPermissions } from "./ActionPermissions";

export const RoleForm = () => {
  return (
    <>
      <RolePermissions />
      <Divider mb={4} mt={6} />
      <Heading size="lg" mb={2}>
        Rights
      </Heading>
      <ActionPermissions />
    </>
  );
};
