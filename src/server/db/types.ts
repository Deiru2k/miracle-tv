import { Session, User } from "miracle-tv-shared/graphql";

export type DbUser = Omit<User, "emailHash"> & {
  email: string;
  password: string;
};

export type DbSession = Session;
