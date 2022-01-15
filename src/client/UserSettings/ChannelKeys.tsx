import React, { useCallback, useMemo } from "react";

import { gql } from "@apollo/client";
import {
  useUserSettingsChannelKeysQuery,
  useUserSettingsRevokeAllStreamKeysMutation,
  useUserSettingsRevokeStreamKeyMutation,
} from "miracle-tv-shared/hooks";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { StreamKeyDisplay } from "miracle-tv-client/components/ui/StreamKeyDisplay";
import { CreateStreamKeyModal } from "./CreateStreamKeyModal";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { AccessUnit } from "miracle-tv-shared/graphql";
import { useServerConfig } from "miracle-tv-client/hooks/serverConfig";
import { CopyField } from "miracle-tv-client/components/ui/CopyField";

gql`
  query UserSettingsChannelKeys($channelId: ID!) {
    streamKeysByChannelId(channelId: $channelId) {
      id
      name
      channel {
        id
        name
      }
    }
  }
  mutation UserSettingsRevokeAllStreamKeys($channelId: ID!, $userId: ID!) {
    revokeStreamKeys(input: { channelId: $channelId, userId: $userId })
  }
  mutation UserSettingsRevokeStreamKey($streamKey: ID!) {
    revokeStreamKey(key: $streamKey)
  }
`;

type Props = {
  id: string;
};

export const ChannelKeysSettings = ({ id }: Props) => {
  const toast = useToast();
  const generateModalDisclosure = useDisclosure();
  const { currentUser, checkRights } = useCurrentUser();
  const { publishURL } = useServerConfig();

  const canViewKeys = useMemo(
    () => checkRights(AccessUnit.Read, "streamKeys"),
    [checkRights]
  );
  const canEditKeys = useMemo(
    () => checkRights(AccessUnit.Write, "streamKeys"),
    [checkRights]
  );

  const { data: { streamKeysByChannelId: streamKeys = [] } = {}, refetch } =
    useUserSettingsChannelKeysQuery({
      variables: { channelId: id },
      skip: !canViewKeys,
    });
  const isMobile = useMediaQuery(MediaQuery.mobile);

  const isRevokeAllDisabled = streamKeys.length === 0 || !canEditKeys;

  const [revokeAllStreamKeys, { loading: isAllRevoking }] =
    useUserSettingsRevokeAllStreamKeysMutation({
      onCompleted: () => {
        refetch();
        toast({ status: "success", title: "Revoked all keys!" });
      },
      onError: () =>
        toast({ status: "error", title: "Error revoking all keys!" }),
    });

  const [revokeStreamKey, { loading: isRevoking }] =
    useUserSettingsRevokeStreamKeyMutation({
      onCompleted: () => {
        refetch();
        toast({ status: "success", title: "Key revoked!" });
      },
      onError: () => toast({ status: "error", title: "Error revoking key!" }),
    });

  const onCreate = useCallback(() => {
    refetch();
    generateModalDisclosure.onClose();
  }, [generateModalDisclosure, toast]);

  const onKeyRevoke = useCallback(
    (streamKey: string) => {
      revokeStreamKey({ variables: { streamKey } });
    },
    [revokeStreamKey]
  );

  const onAllKeysRevoke = useCallback(() => {
    revokeAllStreamKeys({
      variables: { channelId: id, userId: currentUser?.id },
    });
  }, [revokeStreamKey, id, currentUser]);

  return (
    <>
      <CreateStreamKeyModal
        channelId={id}
        onCreated={onCreate}
        {...generateModalDisclosure}
      />
      <Box position="sticky" top="0" right="0" pb={14}>
        <Stack
          float={isMobile ? undefined : "right"}
          direction={isMobile ? "column" : "row"}
        >
          <Button
            colorScheme="red"
            onClick={onAllKeysRevoke}
            isLoading={isAllRevoking}
            isDisabled={isRevokeAllDisabled}
          >
            Revoke all keys
          </Button>
          <Button
            onClick={generateModalDisclosure.onOpen}
            isDisabled={!canEditKeys}
          >
            Generate
          </Button>
        </Stack>
      </Box>
      <Box mb={2}>
        <Text>Server URL</Text>
        <CopyField value={publishURL} />
      </Box>
      <VStack>
        {streamKeys.map((sKey) => (
          <Panel w="100%" key={sKey.id}>
            {sKey.name && <Text mb={2}>{sKey.name}</Text>}
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
    </>
  );
};
