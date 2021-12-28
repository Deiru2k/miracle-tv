import { io } from "socket.io-client";

export type IOClientConfig = {
  namespace?: string;
};

export const getIOClient = (config?: IOClientConfig) => {
  const socket = io(config.namespace ? `${config.namespace}` : undefined, {
    transports: ["websocket"],
  });
  return socket;
};
