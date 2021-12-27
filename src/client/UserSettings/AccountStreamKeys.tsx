import { gql } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { FloatingControls } from "miracle-tv-client/components/ui/FloatingControls";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { StreamKeyDisplay } from "miracle-tv-client/components/ui/StreamKeyDisplay";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import {
  useRevokeSelfStreamKeysMutation,
  useSelfStreamKeysQuery,
  useUserSettingsRevokeStreamKeyMutation,
} from "miracle-tv-shared/hooks";
import Head from "next/head";
import React, { useCallback } from "react";

gql`
  query SelfStreamKeys {
    selfStreamKeys {
      id
      name
      channel {
        id
        name
      }
    }
  }
  mutation RevokeSelfStreamKeys($userId: ID!) {
    revokeAllStreamKeys(input: { userId: $userId })
  }
`;

export const AccountStreamKeys = () => {
  const toast = useToast();
  const { currentUser } = useCurrentUser();
  const { data: { selfStreamKeys: keys = [] } = {}, refetch } =
    useSelfStreamKeysQuery();

  const [revokeStreamKey] = useUserSettingsRevokeStreamKeyMutation({
    onCompleted: () => {
      refetch();
      toast({ status: "success", title: "Key revoked!" });
    },
    onError: () => toast({ status: "error", title: "Error revoking key!" }),
  });

  const [revokeAllKeys, { loading: isAllRevoking }] =
    useRevokeSelfStreamKeysMutation({
      onCompleted: () => {
        refetch();
        toast({ status: "success", title: "Key revoked!" });
      },
      onError: () => toast({ status: "error", title: "Error revoking key!" }),
    });

  const onKeyRevoke = useCallback(
    (streamKey: string) => {
      revokeStreamKey({ variables: { streamKey } });
    },
    [revokeStreamKey]
  );
  const onAllRevoke = useCallback(() => {
    revokeAllKeys({ variables: { userId: currentUser?.id } });
  }, [revokeStreamKey, currentUser?.id]);

  return (
    <>
      <Head>
        <title>Stream keys - Miracle TV</title>
      </Head>
      <FloatingControls heading="All Account Keys" m={6}>
        {!!keys?.length && (
          <>
            <Button
              float="right"
              onClick={onAllRevoke}
              colorScheme="red"
              isLoading={isAllRevoking}
            >
              Revoke all keys
            </Button>
          </>
        )}
      </FloatingControls>
      {!keys?.length && (
        <Attract>
          <Heading mt={2} mb={2} size="lg" w="60%">
            {
              "You don't seem to have any keys yet. Go to your channel settings to create one"
            }
          </Heading>
          {"All keys from all channels will be displayed here for convenience"}
        </Attract>
      )}
      <VStack w="100%">
        {keys.map((sKey) => (
          <Panel w="100%" key={sKey.id}>
            <Flex justify="space-between">
              {sKey.name && <Text mb={2}>{sKey.name}</Text>}
              {sKey.channel.name && (
                <Text mb={2}>Channel: {sKey.channel.name}</Text>
              )}
            </Flex>
            <HStack w="100%">
              <StreamKeyDisplay
                channelId={sKey.channel.id}
                streamKey={sKey.id}
                w="100%"
              />
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
