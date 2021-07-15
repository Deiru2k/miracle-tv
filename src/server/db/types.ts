import { Session, User } from "miracle-tv-server/types/graphql";

export type DbUser = Omit<User, "emailHash"> & {
  email: string;
  password: string;
};

export type DbSession = Session;
