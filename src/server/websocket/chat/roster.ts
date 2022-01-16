import { uniq } from "ramda";

export type UserInfo = {
  id: string;
  connections: string[];
  username: string;
  displayName?: string;
};

type UserConnection = Omit<UserInfo, "connections"> & {
  connectionId: string;
};

export class Roster {
  roster!: UserInfo[];
  room!: string;
  constructor(room: string) {
    this.roster = [];
    this.room = room;
  }

  getUser(userId: string): UserInfo | null {
    return this.roster.find((u) => u.id === userId) ?? null;
  }

  addUser(user: UserConnection) {
    const existingUser = this.roster.find((u) => u.id === user.id);
    if (existingUser) {
      this.roster = this.roster.map((u) => {
        if (u.id === user.id) {
          const newUser = {
            ...u,
            ...user,
            connections: uniq([...u.connections, user.connectionId]),
          };
          delete newUser["connectionId"];
          return newUser;
        }
        return u;
      });
    } else {
      const newUser = {
        ...user,
        connections: [user.connectionId],
      };
      delete newUser["connectionId"];
      this.roster = uniq([...this.roster, newUser]);
    }
  }

  removeUser(userId: string, connection: string) {
    const existingUser = this.roster.find(
      (u) => u.id === userId && u.connections.includes(connection)
    );
    if (existingUser && existingUser.connections.length > 1) {
      this.roster = this.roster.map((u) => {
        if (u.id === existingUser.id) {
          return {
            ...u,
            connections: u.connections.filter((c) => c !== connection),
          };
        }
        return u;
      });
    } else if (existingUser && existingUser.connections.length === 1) {
      this.roster = this.roster.filter((u) => u.id !== existingUser.id);
    }
  }
}

export class RosterManager {
  rooms: Record<string, Roster> = {};

  addRoom(roomId: string): Roster {
    const room = this.getRoom(roomId);
    if (!room) {
      this.rooms[roomId] = new Roster(roomId);
      return this.rooms[roomId];
    }
    return room;
  }

  deleteRoom(roomId: string) {
    delete this.rooms[roomId];
  }

  getRoom(roomId: string): Roster | null {
    return this.rooms[roomId] ?? null;
  }
}

export default new RosterManager();
