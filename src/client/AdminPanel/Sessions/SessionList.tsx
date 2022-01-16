import { gql } from "@apollo/client";
import { Divider, Heading, SimpleGrid, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { FormUsersSelect } from "miracle-tv-client/components/form/selects/FormUserSelect";
import { Filter } from "miracle-tv-client/components/ui/Filter";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { usePagination } from "miracle-tv-client/hooks/pagination";
import { SessionDisplay } from "miracle-tv-client/UserSettings/AccountSessions/SessionDisplay";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { AccessUnit, SessionsFilter } from "miracle-tv-shared/graphql";
import {
  useAdminRevokeSessionsMutation,
  useAdminSessionsCountQuery,
  useAdminSessionsListQuery,
} from "miracle-tv-shared/hooks";
import React, { useCallback, useMemo, useState } from "react";
import { ADMIN_SESSION_FRAGMENT } from "./const";

gql`
  query AdminSessionsList($filter: SessionsFilter, $limit: QueryLimit) {
    sessions(filter: $filter, limit: $limit) {
      ...AdminSession
    }
  }
  query AdminSessionsCount($filter: SessionsFilter) {
    sessionsCount(filter: $filter)
  }
  mutation AdminRevokeSessions($ids: [ID]!) {
    revokeSessions(ids: $ids)
  }
  ${ADMIN_SESSION_FRAGMENT}
`;

const perPage = 25;

export const AdminSessionsList = () => {
  const toast = useToast();
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const [filter, setFilter] = useState<SessionsFilter>({});
  const { checkRights } = useCurrentUser();

  const canViewSessions = useMemo(
    () => checkRights(AccessUnit.Read, "sessions"),
    [checkRights]
  );
  const canEditSessions = useMemo(
    () => checkRights(AccessUnit.Write, "sessions"),
    [checkRights]
  );

  const { data: { sessionsCount = 0 } = {} } = useAdminSessionsCountQuery({
    variables: { filter },
    skip: !canViewSessions,
  });

  const pagination = usePagination(sessionsCount, perPage);

  const { data: { sessions = [] } = {} } = useAdminSessionsListQuery({
    variables: { filter, limit: pagination.limit },
    skip: !canViewSessions,
  });

  const [revokeSessionsMutation] = useAdminRevokeSessionsMutation({
    onCompleted() {
      toast({ status: "success", title: "Revoked session(s)." });
    },
    onError() {
      toast({
        status: "success",
        title: "There was an error revoking session(s).",
      });
    },
    refetchQueries: ["AdminSessionsList", "AdminSessionsCount"],
  });

  const onSessionRevoke = useCallback(
    (id: string) => {
      revokeSessionsMutation({ variables: { ids: [id] } });
    },
    [revokeSessionsMutation]
  );

  return (
    <>
      <Heading mb={2}>Sessions</Heading>
      <Divider mb={4} />
      <Filter onFilter={setFilter}>
        <FormUsersSelect name="user" label="User" />
      </Filter>
      <SimpleGrid spacing={4} columns={isMobile ? 1 : 3}>
        {sessions.map((s) => (
          <SessionDisplay
            panelProps={{
              w: "100%",
            }}
            key={s.id}
            session={s}
            showUser
            onRevoke={canEditSessions ? () => onSessionRevoke(s.id) : undefined}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
