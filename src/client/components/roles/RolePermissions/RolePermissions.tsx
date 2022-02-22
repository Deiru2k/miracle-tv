import { Heading, HStack, VStack } from "@chakra-ui/layout";
import { Box, Divider } from "@chakra-ui/react";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  AccessRights,
  AccessTargets,
  AccessUnit,
} from "miracle-tv-shared/graphql";
import { useTranslation } from "next-i18next";
import React, { useCallback, useMemo } from "react";
import { useField } from "react-final-form";
import { TranslationFn } from "src/types";
import { AccessUnitEdit } from "./AccessUnit";

type Props = {
  isDisabled?: boolean;
};

type AccessKey = keyof Omit<AccessRights, "__typename">;

const accessRightsOrder: AccessKey[] = [
  "users",
  "channels",
  "roles",
  "streamKeys",
  "activities",
  "userSettings",
  "sessions",
  "system",
];

type LabelsFn = (tFn?: TranslationFn) => Record<AccessKey, string>;

const accessRightsLabels: LabelsFn = (tFn) => ({
  users: tFn?.("entity-users") ?? "Users",
  system: tFn?.("entity-system-info") ?? "System Info",
  channels: tFn?.("entity-channels") ?? "Channels",
  roles: tFn?.("entity-roles") ?? "Roles",
  activities: tFn?.("entity-activities") ?? "Activities",
  streamKeys: tFn?.("entity-streamkeys") ?? "Stream keys",
  userSettings: tFn?.("entity-user-settings") ?? "User Settings",
  sessions: tFn?.("entity-sessions") ?? "Sessions",
});

export const RolePermissions = ({ isDisabled }: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { input: rightsField } = useField<AccessRights>("access.rights");
  const { t: tCommon } = useTranslation("common");
  const { t: tRole } = useTranslation("role");
  const rightLabels = useMemo(() => accessRightsLabels(tCommon), [tCommon]);

  const onRightsChange = useCallback(
    (unit: AccessKey, value: AccessUnit[]) => {
      rightsField.onChange({
        ...rightsField.value,
        [unit]: value,
      });
    },
    [rightsField]
  );

  return (
    <>
      <Heading size="md" mb={2}>
        {tRole("permissions")}
      </Heading>
      <VStack w="100%">
        {accessRightsOrder.map((right) => (
          <Panel
            key={right}
            w="100%"
            display="flex"
            alignItems="center"
            flexDirection={isMobile ? "column" : "row"}
            height="100%"
          >
            <Heading
              size="md"
              mr={2}
              flex={3}
              alignSelf={isMobile ? "flex-start" : undefined}
            >
              {rightLabels[right]}
            </Heading>
            {!isMobile && (
              <Box
                height={14}
                borderRightStyle="solid"
                borderRightWidth="1px"
                borderRightColor="primary.500"
                mr={6}
              />
            )}
            <Box
              flex={8}
              alignSelf={isMobile ? "flex-start" : undefined}
              w={isMobile ? "100%" : undefined}
            >
              <AccessUnitEdit
                unit={right}
                isDisabled={isDisabled}
                unitValue={rightsField.value[right] || []}
                onChange={onRightsChange}
              />
            </Box>
          </Panel>
        ))}
      </VStack>
    </>
  );
};
