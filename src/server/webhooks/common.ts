import { Request, Response } from "express";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { connection } from "miracle-tv-server/db/setup-db";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import { ChannelStatusModel } from "miracle-tv-server/db/models/ChannelStatus";
import { DbChannelStatus } from "miracle-tv-server/db/models/types";
import Url from "url-parse";

export const getOSSRSKey = (queryParam: string) => {
  // Needed for url-parse to parse our query params
  const url = `http://example.com/${queryParam}`;
  const urlParsed = new Url(url, true);
  return (urlParsed.query as any).key as string;
};

export const getNginxKey = (req: Request, res: Response) => {
  const { body } = req;
  if (!body || !body.name || !(typeof body.name === "string")) {
    res.status(400).send();
    return undefined;
  }
  // This is the ID of the stream key.
  const { key } = body;

  return key;
};

export const getStreamKey = async (key: string) => {
  // database setup
  const con = await connection;
  const streamKeys = new StreamKeysModel(con);

  const result = await streamKeys.getStreamKeyById(key);

  // The result comes in a `StreamKey`, which is generated from the GraphQL
  // schema. The GraphQL schema doesn't match what comes from the database,
  // so this cast should be safe.
  return result as unknown as ReturnedKey | undefined;
};

export const getUser = async (id: string) => {
  const con = await connection;
  const users = new UsersModel(con);
  return await users.getUserById(id);
};

export const getChannel = async (id: string) => {
  const con = await connection;
  const channels = new ChanelsModel(con);
  return await channels.getChannelById(id);
};

export const updateChannelStatus = async (
  id: string,
  status: Omit<DbChannelStatus, "id">
) => {
  const con = await connection;
  const statusModel = new ChannelStatusModel(con);
  return await statusModel.upsertStatus({ id, ...status });
};

export interface ReturnedKey {
  id: string;
  channelId: string;
  userId: string;
}
