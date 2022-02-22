import { gql } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Attract } from "miracle-tv-client/components/ui/Attract";
import { FloatingControls } from "miracle-tv-client/components/ui/FloatingControls";
import { Panel } from "miracle-tv-client/components/ui/Panel";
import { StreamKeyDisplay } from "miracle-tv-client/components/ui/StreamKeyDisplay";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import {
  useRevokeSelfStreamKeysMutation,
  useSelfStreamKeysQuery,
  useUserSettingsRevokeStreamKeyMutation,
} from "miracle-tv-shared/hooks";
import Head from "next/head";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

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
  const isMobile = useMediaQuery(MediaQuery.mobile);

  const { t: tStreamkey } = useTranslation("streamkey");
  const { t: tCommon } = useTranslation("common");
  const { t: tSettings } = useTranslation("settings");

  const { currentUser } = useCurrentUser();
  const { data: { selfStreamKeys: keys = [] } = {}, refetch } =
    useSelfStreamKeysQuery();

  const [revokeStreamKey] = useUserSettingsRevokeStreamKeyMutation({
    onCompleted: () => {
      refetch();
      toast({ status: "success", title: tStreamkey("key-revoke-success") });
    },
    onError: () =>
      toast({ status: "error", title: tStreamkey("key-revoke-success") }),
  });

  const [revokeAllKeys, { loading: isAllRevoking }] =
    useRevokeSelfStreamKeysMutation({
      onCompleted: () => {
        refetch();
        toast({ status: "success", title: tStreamkey("keys-revoke-success") });
      },
      onError: () =>
        toast({ status: "error", title: tStreamkey("keys-revoke-success") }),
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
        <title>{tSettings("ui-streamkeys")} - Miracle TV</title>
      </Head>
      <FloatingControls heading={tStreamkey("all-account-keys")} m={6}>
        {!!keys?.length && (
          <>
            <Button
              float="right"
              onClick={onAllRevoke}
              colorScheme="red"
              isLoading={isAllRevoking}
            >
              {tStreamkey("revoke-all")}
            </Button>
          </>
        )}
      </FloatingControls>
      {!keys?.length && (
        <Attract>
          <Heading mt={2} mb={2} size="lg" w="60%">
            {tSettings("streamkeys-no-keys-heading")}
          </Heading>
          {tSettings("streamkeys-no-keys-content")}
        </Attract>
      )}
      <VStack w="100%">
        {keys.map((sKey) => (
          <Panel w="100%" key={sKey.id}>
            <Flex
              justify="space-between"
              direction={isMobile ? "column" : "row"}
            >
              {sKey.name && <Text mb={2}>{sKey.name}</Text>}
              {sKey.channel.name && (
                <Text mb={2}>
                  {tSettings("ui-channel")}: {sKey.channel.name}
                </Text>
              )}
            </Flex>
            <Stack w="100%" direction={isMobile ? "column" : "row"}>
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
            </Stack>
          </Panel>
        ))}
      </VStack>
    </>
  );
};
