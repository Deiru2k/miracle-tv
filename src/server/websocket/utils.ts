import { DateTime } from "luxon";
import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { connection } from "miracle-tv-server/db/setup-db";
import { ChatResponseType } from "miracle-tv-shared/websocket/types";
import { Socket } from "socket.io";

export const getWebsocketUser = async (token: string, socket: Socket) => {
  const conn = await connection;
  const users = new UsersModel(conn);
  const sessions = new SessionsModel(conn);
  const session = await sessions.getSessionById(token);
  if (!session) {
    const response: ChatResponseType = {
      type: "error",
      data: "Chat authentication failed",
      timestamp: DateTime.now().toMillis(),
    };
    socket.send(response);
    return;
  }
  const user = await users.getUserByIdSafe(session.user);
  return user;
};
