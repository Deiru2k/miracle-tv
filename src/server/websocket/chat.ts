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
    let channel: string | null = null;
    let username: string | null = null;

    socket.on("chat:join", async (data: ChatJoinData) => {
      const user = await getWebsocketUser(data.token, socket);
      username = user.displayName || user.username;
      channel = data.channel;
      const joinResponseSender: ChatResponseType = {
        type: "message",
        data: `You have joined the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      const joinResponse: ChatResponseType = {
        type: "message",
        data: `${user.displayName || user.username} joined the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      socket.join(`chat:${data.channel}`);
      socket.emit("chat:message", joinResponseSender);
      socket.to(`chat:${data.channel}`).emit("chat:message", joinResponse);
    });
    socket.on("chat:send", async (msgData: ChatMessageData) => {
      const user = await getWebsocketUser(msgData.token, socket);
      const newUsername = user.displayName || user.username;
      if (newUsername !== username) {
        const msgResponse: ChatResponseType = {
          type: "message",
          data: `[${username}] has changed their name to [${newUsername}]!`,
          timestamp: DateTime.now().toMillis(),
        };
        socket.to(`chat:${msgData.channel}`).emit("chat:message", msgResponse);
        username = newUsername;
      }
      if (!user.silenced) {
        const msgResponse: ChatResponseType = {
          type: "message",
          data: msgData.message,
          username: `${user.displayName || user.username}`,
          timestamp: DateTime.now().toMillis(),
        };
        socket.emit("chat:message", msgResponse);
        socket.to(`chat:${msgData.channel}`).emit("chat:message", msgResponse);
      } else {
        const msgResponse: ChatResponseType = {
          type: "message",
          data: "You cannot send messages because your account has been silenced",
          timestamp: DateTime.now().toMillis(),
        };
        socket.emit("chat:message", msgResponse);
      }
    });
    socket.on("chat:leave", async (msgData: ChatLeaveData) => {
      const user = await getWebsocketUser(msgData.token, socket);
      const leaveResponse: ChatResponseType = {
        type: "message",
        data: `${user.displayName || user.username} left the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      socket.to(`chat:${msgData.channel}`).emit("chat:message", leaveResponse);
    });
    socket.on("disconnect", async () => {
      const leaveResponse: ChatResponseType = {
        type: "message",
        data: `${username} left the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      socket.to(`chat:${channel}`).emit("chat:message", leaveResponse);
    });
  });
};
