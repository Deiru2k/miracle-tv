import { Server as SocketIO, Socket } from "socket.io";

import {
  ChatJoinData,
  ChatLeaveData,
  ChatMessageData,
  ChatResponseType,
} from "miracle-tv-shared/websocket/types";
import { getWebsocketUser } from "./utils";
import { DateTime } from "luxon";

export const setupChat = async (io: SocketIO) => {
  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", async (socket: Socket) => {
    socket.send("Connection OK!");
    socket.on("chat:join", async (data: ChatJoinData) => {
      const user = await getWebsocketUser(data.token, socket);
      const joinResponse: ChatResponseType = {
        type: "message",
        data: `${user.displayName || user.username} joined the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      socket.join(`chat:${data.channel}`);
      socket.emit("chat:message", joinResponse);
      socket.to(`chat:${data.channel}`).emit("chat:message", joinResponse);
    });
    socket.on("chat:send", async (msgData: ChatMessageData) => {
      const user = await getWebsocketUser(msgData.token, socket);
      const msgResponse: ChatResponseType = {
        type: "message",
        data: msgData.message,
        username: `${user.displayName || user.username}`,
        timestamp: DateTime.now().toMillis(),
      };
      socket.emit("chat:message", msgResponse);
      socket.to(`chat:${msgData.channel}`).emit("chat:message", msgResponse);
    });
    socket.on("chat:leave", async (msgData: ChatLeaveData) => {
      const user = await getWebsocketUser(msgData.token, socket);
      const leaveResponse: ChatResponseType = {
        type: "message",
        data: `${user.displayName || user.username} left the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      socket.to(`chat:${msgData.channel}`).emit("chat", leaveResponse);
    });
  });
};
