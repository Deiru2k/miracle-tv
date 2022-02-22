import { HStack } from "@chakra-ui/layout";
import { FormToggle } from "miracle-tv-client/components/form/FormToggle";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { useTranslation } from "next-i18next";
import React from "react";

type Props = {
  isDisabled?: boolean;
};

export const ActionPermissions = ({ isDisabled }: Props) => {
  const { t: tRole } = useTranslation("role");
  return (
    <Panel>
      <HStack>
        <FormToggle
          name="access.actions.user.ban"
          label={tRole("right-suspend")}
          isDisabled={isDisabled}
        />
        <FormToggle
          name="access.actions.user.silence"
          label={tRole("right-silence")}
          isDisabled={isDisabled}
        />
        <FormToggle
          name="access.actions.user.warn"
          label={tRole("right-warn")}
          isDisabled={isDisabled}
        />
      </HStack>
    </Panel>
  );
};
