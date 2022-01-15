import { HStack } from "@chakra-ui/layout";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import React from "react";

type Props = {
  isDisabled?: boolean;
};

export const ActionPermissions = ({ isDisabled }: Props) => {
  return (
    <Panel>
      <HStack>
        <FormToggle
          name="access.actions.user.ban"
          label="Suspend user"
          isDisabled={isDisabled}
        />
        <FormToggle
          name="access.actions.user.silence"
          label="Silence user"
          isDisabled={isDisabled}
        />
        <FormToggle
          name="access.actions.user.warn"
          label="Warn user"
          isDisabled={isDisabled}
        />
      </HStack>
    </Panel>
  );
};
