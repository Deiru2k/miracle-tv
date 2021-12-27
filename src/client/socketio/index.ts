import { io } from "socket.io-client";

export type IOClientConfig = {
  namespace?: string;
};

export const getIOClient = (config?: IOClientConfig) => {
  const socket = io(
    config.namespace
      ? `ws://localhost:4000/${config.namespace}`
      : "ws://localhost:4000",
    {
      transports: ["websocket"],
    }
  );
  return socket;
};
