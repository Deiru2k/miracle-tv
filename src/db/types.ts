import { Session, User } from "miracle-tv/types/graphql";

export type DbUser = Omit<User, 'emailHash'> & {
  email: string
  password: string
}

export type DbSession = Session
