import { Server as SocketIO, Socket } from "socket.io";
import http from "http";
import { setupChat } from "./chat";
import config from "miracle-tv-server/config";

const onConnection = (socket: Socket) => {};
const onMessage = (socket: Socket) => {};

export const websocketEntry = (httpServer: http.Server) => {
  const io = new SocketIO(httpServer, {
    serveClient: false,
    path: `${config.pathPrefix}/socket.io/`,
  });
  setupChat(io);
  io.on("connection", onConnection);
  io.on("message", onMessage);
};
