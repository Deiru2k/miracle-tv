import {
  VStack,
  Text,
  Code,
  Box,
  Button,
  Badge,
  StackProps,
  BoxProps,
} from "@chakra-ui/react";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { Session } from "miracle-tv-shared/graphql";
import { DateTime } from "luxon";
import React from "react";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useTranslation } from "react-i18next";

type Props = {
  session: Session;
  showUser?: boolean;
  onRevoke?: (id: string) => void;
  panelProps?: BoxProps;
} & StackProps;

export const SessionDisplay = ({
  session,
  onRevoke,
  showUser = false,
  panelProps,
  ...stackProps
}: Props) => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { t: tSession } = useTranslation("session");
  return (
    <VStack w="100%" align="flex-start" {...stackProps}>
      <Panel w={isMobile ? "100%" : undefined} {...panelProps}>
        <VStack align="flex-start">
          <Box>
            <Text>
              IP: <Code>{session.ip}</Code>
              {session.isCurrentSession && (
                <Badge ml={2} colorScheme="green">
                  {tSession("current-session")}
                </Badge>
              )}
            </Text>
            <Text>
              {tSession("device")}: <Code>{session.userAgent}</Code>
            </Text>
            {showUser && (
              <Text>
                {tSession("user")}: <Code>{session.user}</Code>
              </Text>
            )}
            <Text>
              {tSession("last-used")}:{" "}
              <Code>
                {DateTime.fromISO(session.lastUsedAt).toLocaleString({
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Code>
            </Text>
          </Box>
          {onRevoke && (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => onRevoke?.(session.id)}
            >
              {tSession("form-revoke-session")}
            </Button>
          )}
        </VStack>
      </Panel>
    </VStack>
  );
};
