import { gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import {
  useCheckChannelAccessMutation,
  useGetAccessKeyMutation,
} from "miracle-tv-shared/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

gql`
  mutation CheckChannelAccess($token: ID!) {
    checkAccessKey(id: $token)
  }
  mutation GetAccessKey($channelId: ID!, $password: String!) {
    authorizeChannelAccess(
      input: { channelId: $channelId, password: $password }
    ) {
      id
      channel
      expiresAt
    }
  }
`;

type UseChannelAccessReturn = [key: string, getKey: (password: string) => void];

export const useChannelAccess = (channelId: string): UseChannelAccessReturn => {
  const toast = useToast();
  let savedChannels: Record<string, string> = {};
  try {
    savedChannels = JSON.parse(localStorage.getItem("channelAccess")) || {};
  } finally {
  }

  const [acessKeys, setAccessKeys] =
    useState<Record<string, string>>(savedChannels);

  const accessKey = useMemo(() => savedChannels[channelId], [savedChannels]);

  const setKey = useCallback(
    (v: string | undefined) => {
      const newGates = { ...acessKeys, [channelId]: v };
      localStorage.setItem("channelAccess", JSON.stringify(newGates));
      setAccessKeys(newGates);
    },
    [acessKeys, setAccessKeys, channelId]
  );

  const [getAccessKeyMutation] = useGetAccessKeyMutation({
    onCompleted({ authorizeChannelAccess: access }) {
      setKey(access.id);
      toast({ status: "success", title: "Authorized to view this channel." });
    },
    onError() {
      toast({
        status: "error",
        title: "Wrong password provided for this channel.",
      });
    },
  });
  const [checkAccessKeyMutation] = useCheckChannelAccessMutation({
    onError() {
      setKey(undefined);
      toast({
        status: "warning",
        title:
          "Your access to this channel is invalid or expired. Please, re-enter channel password",
      });
    },
  });

  useEffect(() => {
    if (accessKey) {
      checkAccessKeyMutation({ variables: { token: accessKey } });
    }
  }, [accessKey]);

  const getKey = useCallback(
    (password: string) => {
      getAccessKeyMutation({ variables: { channelId, password } });
    },
    [acessKeys, setAccessKeys, channelId]
  );

  return [accessKey, getKey];
};
