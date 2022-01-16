import { Server as SocketIO, Socket } from "socket.io";

import {
  ChatJoinData,
  ChatJoinRespose,
  ChatLeaveData,
  ChatMessageData,
  ChatResponseType,
} from "miracle-tv-shared/websocket/types";
import { getWebsocketUser } from "miracle-tv-server/websocket/utils";
import { DateTime } from "luxon";
import RosterManager, { Roster } from "./roster";
import { v4 as uuid4 } from "uuid";

export const setupChat = async (io: SocketIO) => {
  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", async (socket: Socket) => {
    socket.send("Connection OK!");
    let channel: string | null = null;
    let username: string | null = null;
    let userId: string | null = null;
    let connectionId: string | null = null;
    let room: Roster | null;

    socket.on("chat:join", async (data: ChatJoinData) => {
      const user = await getWebsocketUser(data.token, socket);
      userId = user.id;
      username = user.displayName || user.username;
      channel = data.channel;
      RosterManager.addRoom(data.channel);
      room = RosterManager.addRoom(data.channel);
      connectionId = uuid4();
      room.addUser({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        connectionId,
      });
      const userSession = room.getUser(user.id);
      const joinResponseSender: ChatResponseType = {
        type: "message",
        data: `You have joined the chat!`,
        timestamp: DateTime.now().toMillis(),
      };
      if (userSession.connections.length === 1) {
        const joinResponse: ChatResponseType = {
          type: "message",
          data: `${user.displayName || user.username} joined the chat!`,
          timestamp: DateTime.now().toMillis(),
        };
        socket.to(`chat:${data.channel}`).emit("chat:message", joinResponse);
        socket.emit("chat:roster", room.roster);
      }
      socket.join(`chat:${data.channel}`);
      socket.emit("chat:message", joinResponseSender);
    });
    socket.on("chat:send", async (msgData: ChatMessageData) => {
      const user = await getWebsocketUser(msgData.token, socket);
      const newUsername = user.displayName || user.username;
      if (msgData.message === "") {
        return;
      }
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
      room?.removeUser(user.id, connectionId);
      const userSession = room?.getUser(user.id);
      if (!userSession) {
        const leaveResponse: ChatResponseType = {
          type: "message",
          data: `${user.displayName || user.username} left the chat!`,
          timestamp: DateTime.now().toMillis(),
        };
        socket
          .to(`chat:${msgData.channel}`)
          .emit("chat:message", leaveResponse);
        socket.emit("chat:roster", room.roster);
      }
    });
    socket.on("chat:get-roster", () => {
      socket.emit("chat:roster", room?.roster);
    });
    socket.on("disconnect", async () => {
      room?.removeUser(userId, connectionId);
      const userSession = room?.getUser(userId);
      if (!userSession) {
        const leaveResponse: ChatResponseType = {
          type: "message",
          data: `${username} left the chat!`,
          timestamp: DateTime.now().toMillis(),
        };
        socket.to(`chat:${channel}`).emit("chat:message", leaveResponse);
        socket.emit("chat:roster", room?.roster);
      }
    });
  });
};
