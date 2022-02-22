import { Divider, Heading } from "@chakra-ui/react";
import React from "react";
import { RolePermissions } from "./RolePermissions";
import { ActionPermissions } from "./ActionPermissions";
import { FormRolesSelect } from "miracle-tv-client/components/form/selects/FormRoleSelect";
import { useTranslation } from "react-i18next";

type Props = { isDisabled?: boolean };

export const RoleForm = ({ isDisabled }: Props) => {
  const { t: tRole } = useTranslation("role");
  return (
    <>
      <FormRolesSelect
        label={tRole("form-parent-role")}
        name="parentId"
        mb={4}
        isDisabled={isDisabled}
      />
      <RolePermissions isDisabled={isDisabled} />
      <Divider mb={4} mt={6} />
      <Heading size="md" mb={2}>
        {tRole("rights")}
      </Heading>
      <ActionPermissions isDisabled={isDisabled} />
    </>
  );
};
