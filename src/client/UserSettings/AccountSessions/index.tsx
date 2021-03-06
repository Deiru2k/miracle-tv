import React, { useCallback, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { Box, Button, useToast, VStack } from "@chakra-ui/react";
import {
  useRevokeSelfSessionsMutation,
  useSelfSessionsQuery,
} from "miracle-tv-shared/hooks";
import { SessionDisplay } from "./SessionDisplay";
import { FloatingControls } from "miracle-tv-client/components/ui/FloatingControls";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { sort } from "ramda";
import { Session } from "miracle-tv-shared/graphql";
import Head from "next/head";
import { useTranslation } from "next-i18next";

gql`
  query SelfSessions {
    selfSessions {
      id
      expiresAt
      lastUsedAt
      userAgent
      user
      ip
      isCurrentSession
    }
  }
  mutation RevokeSelfSessions($input: [String]!) {
    revokeSelfSessions(input: $input)
  }
`;

export const AccountSessions = () => {
  const toast = useToast();
  const { t: tSession } = useTranslation("session");
  const { logout } = useCurrentUser();
  const { data: { selfSessions = [] } = {}, refetch } = useSelfSessionsQuery();
  const sessionsSorted = useMemo(
    () =>
      sort<Session>(
        (session) => -Number(session.isCurrentSession),
        selfSessions
      ),
    [selfSessions]
  );
  const currentSessionId = useMemo(
    () => selfSessions.find((s) => s.isCurrentSession)?.id,
    [selfSessions]
  );
  const [revokeSessions] = useRevokeSelfSessionsMutation({
    onCompleted: () => {
      toast({ status: "success", title: "Session(s) revoked!" });
      refetch();
    },
    onError: () =>
      toast({ status: "error", title: "Could not revoke session(s)!" }),
  });

  const onSessionRevoke = useCallback(
    (id: string) => {
      revokeSessions({ variables: { input: [id] } }).then(() => {
        if (id === currentSessionId) logout();
      });
    },
    [revokeSessions, logout]
  );

  const onAllSessionRevoke = useCallback(() => {
    revokeSessions({
      variables: { input: selfSessions.map((session) => session.id) },
    }).then(() => logout());
  }, [revokeSessions, selfSessions, logout]);

  return (
    <>
      <Head>
        <title>{tSession("account-sessions")} - Miracle TV</title>
      </Head>
      <FloatingControls heading={tSession("sessions")}>
        {selfSessions.length > 0 && (
          <Button
            colorScheme="red"
            size="sm"
            onClick={onAllSessionRevoke}
            float="right"
          >
            {tSession("sessions-revoke")}
          </Button>
        )}
      </FloatingControls>
      <VStack w="100%" align="flex-start" pt={2}>
        {sessionsSorted.map((session) => (
          <SessionDisplay
            session={session}
            onRevoke={onSessionRevoke}
            key={session.id}
          />
        ))}
      </VStack>
    </>
  );
};
