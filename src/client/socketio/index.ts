import { io } from "socket.io-client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export type IOClientConfig = {
  namespace?: string;
};

export const getIOClient = (config?: IOClientConfig) => {
  const socket = io(config.namespace ? config.namespace : undefined, {
    transports: ["websocket"],
    path: `${publicRuntimeConfig.socketPrefix}/socket.io/`,
  });
  return socket;
};
