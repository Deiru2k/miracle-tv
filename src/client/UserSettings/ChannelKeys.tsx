import React, { useCallback } from "react";

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

gql`
  query UserSettingsChannelKeys($channelId: ID!) {
    streamKeysByChannelId(channelId: $channelId) {
      id
      name
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
  const { currentUser } = useCurrentUser();
  const { data: { streamKeysByChannelId: streamKeys = [] } = {}, refetch } =
    useUserSettingsChannelKeysQuery({ variables: { channelId: id } });

  const isRevokeAllDisabled = streamKeys.length === 0;

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
      <Box position="sticky" top="0" right="0" pb={12}>
        <HStack float="right">
          <Button
            colorScheme="red"
            onClick={onAllKeysRevoke}
            isLoading={isAllRevoking}
            isDisabled={isRevokeAllDisabled}
          >
            Revoke all keys
          </Button>
          <Button onClick={generateModalDisclosure.onOpen}>Generate</Button>
        </HStack>
      </Box>
      <VStack>
        {streamKeys.map((sKey) => (
          <Panel w="100%" key={sKey.id}>
            {sKey.name && <Text mb={2}>{sKey.name}</Text>}
            <HStack w="100%">
              <StreamKeyDisplay streamKey={sKey.id} w="100%" />
              <IconButton
                colorScheme="red"
                aria-label="Delete stream key"
                icon={<DeleteIcon />}
                onClick={() => onKeyRevoke(sKey.id)}
              />
            </HStack>
          </Panel>
        ))}
      </VStack>
    </>
  );
};
