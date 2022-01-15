import React, { useCallback, useMemo, useState } from "react";

import { gql } from "@apollo/client";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ADMIN_STREAM_KEY_FRAGMENT } from "./const";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { AccessUnit, StreamKeyFilter } from "miracle-tv-shared/graphql";
import {
  useAdminBulkDeleteStreamKeysMutation,
  useAdminDeleteStreamKeyMutation,
  useAdminStreamKeyListQuery,
  useAdminStreamKeysCountQuery,
} from "miracle-tv-shared/hooks";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { StreamKeyDisplay } from "miracle-tv-client/components/ui/StreamKeyDisplay";
import { DeleteIcon } from "@chakra-ui/icons";
import { useTableSelect } from "miracle-tv-client/hooks/tableSelect";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { Pagination, usePagination } from "miracle-tv-client/hooks/pagination";
import { Link } from "miracle-tv-client/components/ui/Link";
import { Filter } from "miracle-tv-client/components/ui/Filter";
import { FormUsersSelect } from "miracle-tv-client/components/form/selects/FormUserSelect";
import { FormChannelsSelect } from "miracle-tv-client/components/form/selects/FormChannelsSelect";

gql`
  query AdminStreamKeyList($filter: StreamKeyFilter, $limit: QueryLimit) {
    streamKeys(filter: $filter, limit: $limit) {
      ...AdminStreamKey
    }
  }
  query AdminStreamKeysCount($filter: StreamKeyFilter) {
    streamKeysCount(filter: $filter)
  }
  mutation AdminDeleteStreamKey($id: ID!) {
    revokeStreamKey(key: $id)
  }
  mutation AdminBulkDeleteStreamKeys($ids: [ID]!) {
    bulkRevokeStreamKeys(keys: $ids)
  }
  ${ADMIN_STREAM_KEY_FRAGMENT}
`;

const perPage = 10;

export const AdminStreamKeyList = () => {
  const toast = useToast();
  const [filter, setFilter] = useState<StreamKeyFilter>({});

  const { checkRights } = useCurrentUser();
  const isMobile = useMediaQuery(MediaQuery.mobile);

  const canViewKeys = useMemo(
    () => checkRights(AccessUnit.Read, "streamKeys"),
    [checkRights]
  );
  const canEditKeys = useMemo(
    () => checkRights(AccessUnit.Write, "streamKeys"),
    [checkRights]
  );

  const { data: { streamKeysCount = 0 } = {} } = useAdminStreamKeysCountQuery({
    variables: { filter },
  });

  const pagination = usePagination(streamKeysCount, perPage);

  const { data: { streamKeys = [] } = {} } = useAdminStreamKeyListQuery({
    variables: {
      filter,
      limit: { limit: perPage, skip: pagination.targetSkip },
    },
    skip: !canViewKeys || !pagination,
  });
  const {
    selectedIds,
    toggleId,
    toggleAllIds,
    isChecked,
    isAllChecked,
    isIntermediate,
  } = useTableSelect(streamKeys);

  const [revokeKeyMutation] = useAdminDeleteStreamKeyMutation({
    refetchQueries: ["AdminStreamKeyList", "AdminStreamKeysCount"],
    onCompleted() {
      toast({ status: "success", title: "Deleted stream key." });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error deleting stream key.",
      });
    },
  });

  const onKeyRevoke = useCallback((id: string) => {
    revokeKeyMutation({ variables: { id } });
  }, []);

  const [bulkRevokeKeyMutation] = useAdminBulkDeleteStreamKeysMutation({
    refetchQueries: ["AdminStreamKeyList", "AdminStreamKeysCount"],
    onCompleted() {
      toast({ status: "success", title: "Deleted stream keys." });
    },
    onError() {
      toast({
        status: "error",
        title: "There was an error deleting stream keys.",
      });
    },
  });

  const onKeysRevoke = useCallback(() => {
    bulkRevokeKeyMutation({ variables: { ids: selectedIds } });
  }, [selectedIds]);

  return (
    <>
      <Flex mb={2} justify="space-between" align="center">
        <Heading>Stream Keys</Heading>
      </Flex>
      <Divider mb={4} />
      <HStack spacing={2} mb={2}>
        <Checkbox
          aria-label="Select all keys"
          onChange={toggleAllIds}
          isChecked={isAllChecked}
          isIndeterminate={isIntermediate}
        />
        <Button
          colorScheme="red"
          isDisabled={!canEditKeys || !isAllChecked}
          onClick={onKeysRevoke}
        >
          Revoke all keys
        </Button>
      </HStack>
      <Filter<StreamKeyFilter> onFilter={setFilter}>
        <Stack direction={isMobile ? "column" : "row"} spacing={2}>
          <FormUsersSelect
            name="userId"
            label="User"
            w={isMobile ? undefined : "50%"}
          />
          <FormChannelsSelect
            name="channelId"
            label="Channel"
            w={isMobile ? undefined : "50%"}
          />
        </Stack>
      </Filter>
      <VStack spacing={4} mb={4}>
        {streamKeys.map((sKey) => (
          <Panel w="100%" key={sKey.id}>
            <Checkbox
              aria-label="Select all keys"
              onChange={() => toggleId(sKey.id)}
              isChecked={isChecked(sKey.id)}
            />
            <HStack spacing={2} mb={2}>
              {sKey.name && <Text as="span">{sKey.name}</Text>}
              {sKey.channel?.name && (
                <Link href={`/admin/channels/${sKey.channel?.id}/details`}>
                  <Badge as="span">Channel: {sKey.channel.name}</Badge>
                </Link>
              )}
              {sKey.user && (
                <Badge>
                  User: {sKey.user.displayName || sKey.user.username}
                </Badge>
              )}
            </HStack>
            <Stack w="100%" direction={isMobile ? "column" : "row"}>
              <StreamKeyDisplay
                streamKey={sKey.id}
                channelId={sKey.channel.id}
                w="100%"
              />
              <IconButton
                colorScheme="red"
                aria-label="Delete stream key"
                icon={<DeleteIcon />}
                onClick={() => onKeyRevoke(sKey.id)}
              />
            </Stack>
          </Panel>
        ))}
      </VStack>
      <Pagination {...pagination} />
    </>
  );
};
