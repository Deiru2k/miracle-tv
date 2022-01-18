import { SessionsModel } from "miracle-tv-server/db/models/Sessions";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { connection } from "miracle-tv-server/db/setup-db";
import { Socket } from "socket.io";

export const getWebsocketUser = async (token: string, socket: Socket) => {
  const conn = await connection();
  const users = new UsersModel(conn);
  const sessions = new SessionsModel(conn);
  if (!token) {
    return null;
  }
  const session = await sessions.getSessionById(token);
  if (!session) {
    return null;
  }
  const user = await users.getUserByIdSafe(session.user);
  return user;
};
