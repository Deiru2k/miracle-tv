import { Request, Response } from "express";
import { StreamKeysModel } from "miracle-tv-server/db/models/StreamKeys";
import { UsersModel } from "miracle-tv-server/db/models/Users";
import { connection } from "miracle-tv-server/db/setup-db";
import { ChanelsModel } from "miracle-tv-server/db/models/Channels";
import { ChannelAccessKeysModel } from "miracle-tv-server/db/models/ChannelAccesKeys";
import { ChannelStatusModel } from "miracle-tv-server/db/models/ChannelStatus";
import { DbChannelStatus } from "miracle-tv-server/db/models/types";
import Url from "url-parse";
import { head, last } from "ramda";

export const getOSSRSKey = (queryParam: string) => {
  // Needed for url-parse to parse our query params
  const url = `http://example.com/${queryParam}`;
  const urlParsed = new Url(url, true);
  return (urlParsed as any).key as string;
};

export const getOMEKey = (url: string) => {
  const urlParsed = new Url(url, true);
  return (urlParsed as any).query.key as string;
};

export const getOMEToken = (url: string) => {
  const urlParsed = new Url(url, true);
  return (urlParsed as any).query.token as string;
};

export const getOMEChannel = (url: string) => {
  const urlParsed = new Url(url, true);
  return head(
    last((urlParsed as any).query.pathname.split("/")).split("_")
  ) as string;
};

export const checkChannelAccess = async (key: string) => {
  const con = await connection();
  const accessKeys = new ChannelAccessKeysModel(con);

  const hasAccessToChannel = accessKeys.checkAccessKey(key);
  return hasAccessToChannel;
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
  const con = await connection();
  const streamKeys = new StreamKeysModel(con);

  const result = await streamKeys.getStreamKeyById(key);

  // The result comes in a `StreamKey`, which is generated from the GraphQL
  // schema. The GraphQL schema doesn't match what comes from the database,
  // so this cast should be safe.
  return result as unknown as ReturnedKey | undefined;
};

export const getUser = async (id: string) => {
  const con = await connection();
  const users = new UsersModel(con);
  return await users.getUserById(id);
};

export const getChannel = async (id: string) => {
  const con = await connection();
  const channels = new ChanelsModel(con);
  return await channels.getChannelById(id, true);
};

export const updateChannelStatus = async (
  id: string,
  status: Omit<DbChannelStatus, "id">
) => {
  const con = await connection();
  const statusModel = new ChannelStatusModel(con);
  return await statusModel.upsertStatus({ id, ...status });
};

export const checkChannel = async (channelId: string) => {
  const channel = await getChannel(channelId);
  if (!channel) {
    return false;
  }
  return !channel.disabled;
};

export interface ReturnedKey {
  id: string;
  channelId: string;
  userId: string;
}
