import { gql } from "@apollo/client";
import { ServerConfig } from "miracle-tv-shared/graphql";
import { useServerConfigInfoQuery } from "miracle-tv-shared/hooks";
import { useMemo } from "react";

gql`
  query ServerConfigInfo {
    serverConfig {
      omeEnabled
      publishURL
    }
  }
`;

const defaultConfig: ServerConfig = {
  omeEnabled: false,
  publishURL: "",
};

type UseServerConfigReturn = {
  isLoading: boolean;
} & ServerConfig;

export const useServerConfig = (): UseServerConfigReturn => {
  const { data: { serverConfig } = {}, loading: isLoading } =
    useServerConfigInfoQuery();

  const conf = useMemo(() => {
    return serverConfig ?? defaultConfig;
  }, [serverConfig]);

  return {
    isLoading,
    ...conf,
  };
};
