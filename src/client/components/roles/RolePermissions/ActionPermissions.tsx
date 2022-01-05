import { HStack } from "@chakra-ui/layout";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import React from "react";

export const ActionPermissions = () => {
  return (
    <Panel>
      <HStack>
        <FormToggle name="access.actions.user.ban" label="Suspend user" />
        <FormToggle name="access.actions.user.silence" label="Silence user" />
        <FormToggle name="access.actions.user.warn" label="Warn user" />
      </HStack>
    </Panel>
  );
};
