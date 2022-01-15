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
import React, { useCallback } from "react";
import { useField } from "react-final-form";
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

const accessRightsLabels: Record<AccessKey, string> = {
  users: "Users",
  system: "System Info",
  channels: "Channels",
  roles: "Roles",
  activities: "Activities",
  streamKeys: "Stream keys",
  userSettings: "User Settings",
  sessions: "Sessions",
};

export const RolePermissions = ({ isDisabled }: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { input: rightsField } = useField<AccessRights>("access.rights");

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
      <Heading size="lg" mb={2}>
        Permissions
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
              {accessRightsLabels[right]}
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
