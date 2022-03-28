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
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { StreamKeyDisplay } from "miracle-tv-client/components/ui/StreamKeyDisplay";
import { CreateStreamKeyModal } from "miracle-tv-client/UserSettings/CreateStreamKeyModal";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useServerConfig } from "miracle-tv-client/hooks/serverConfig";
import { CopyField } from "miracle-tv-client/components/ui/CopyField";
import { useTranslation } from "react-i18next";

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
  canViewKeys: boolean;
  canEditKeys: boolean;
};

export const ChannelKeysSettings = ({
  id,
  canViewKeys,
  canEditKeys,
}: Props) => {
  const toast = useToast();
  const generateModalDisclosure = useDisclosure();
  const { currentUser } = useCurrentUser();
  const { publishURL } = useServerConfig();

  const { t: tChannel } = useTranslation("channel");
  const { t: tCommon } = useTranslation("common");

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
        toast({
          status: "success",
          title: tChannel("keys-all-revoke-success"),
        });
      },
      onError: () =>
        toast({ status: "error", title: tChannel("keys-all-revoke-error") }),
    });

  const [revokeStreamKey, { loading: isRevoking }] =
    useUserSettingsRevokeStreamKeyMutation({
      onCompleted: () => {
        refetch();
        toast({ status: "success", title: tChannel("key-revoke-success") });
      },
      onError: () =>
        toast({ status: "error", title: tChannel("key-revoke-error") }),
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
            {tChannel("keys-revoke-all")}
          </Button>
          <Button
            onClick={generateModalDisclosure.onOpen}
            isDisabled={!canEditKeys}
          >
            {tChannel("keys-generate")}
          </Button>
        </Stack>
      </Box>
      <Box mb={2}>
        <Text>{tCommon("server-url")}</Text>
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
                aria-label={tChannel("key-revoke")}
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
