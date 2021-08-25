import { Request, Response, Router } from "express";
import {StreamKeysModel} from "miracle-tv-server/db/models/StreamKeys";
import {UsersModel} from "miracle-tv-server/db/models/Users";
import { connection } from "miracle-tv-server/db/setup-db"
import { ChanelsModel } from "miracle-tv-server/db/models/Channels"

const webhooks = Router();

const getStreamKey = async (req: Request, res: Response) => {
  const { body } = req
  if(!body || !body.name || !(typeof body.name === 'string')) {
    res.status(400).send()
    return undefined
  }
  // This is the ID of the stream key.
  const { name } = body

  // database setup
  const con = await connection;
  const streamKeys = new StreamKeysModel(con);

  const result = await streamKeys.getStreamKeyById(name)

  // The result comes in a `StreamKey`, which is generated from the GraphQL
  // schema. The GraphQL schema doesn't match what comes from the database,
  // so this cast should be safe.
  return (result as unknown) as ReturnedKey | undefined
}

const getUser = async (id: string) => {
  const con = await connection;
  const users = new UsersModel(con)
  return await users.getUserById(id)
}

const getChannel = async (id: string) => {
  const con = await connection;
  const channels = new ChanelsModel(con);
  return await channels.getChannelById(id)
}

interface ReturnedKey {
  id: string
  channelId: string
  userId: string
}

webhooks.post('/on_publish', async (req, res) => {
  const streamKey = await getStreamKey(req, res)
  // If there's no stream key, deny the stream.
  if(!streamKey) {
    res.status(403).send()
    return undefined
  }

  // const user = getUser(streamKey.userId)
  //const channel = await getChannel(streamKey.channelId)

  // We need to redirect the stream to a location that doesn't include the stream
  // key. This may not be the right way to do it; TODO: ensure the stream still works
  res
    .header('Location', streamKey.channelId)
    .status(300)
    .send()
})

webhooks.post('/on_publish_done', async (req, res) => {
  const streamKey = await getStreamKey(req, res)
  res.status(200).send()
})

export default webhooks
