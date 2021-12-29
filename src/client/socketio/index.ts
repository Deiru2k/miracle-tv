import { io } from "socket.io-client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export type IOClientConfig = {
  namespace?: string;
};

const socketPath = publicRuntimeConfig.isDev ? "localhost:4000" : "";

export const getIOClient = (config?: IOClientConfig) => {
  const socket = io(
    config.namespace ? `${socketPath}/${config.namespace}` : undefined,
    {
      transports: ["websocket"],
    }
  );
  return socket;
};
