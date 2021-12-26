import { Router } from "express";
import { getNginxKey, getStreamKey, updateChannelStatus } from "./common";

const webhooks = Router();

webhooks.post("/on_publish", async (req, res) => {
  const key = getNginxKey(req, res);
  const streamKey = await getStreamKey(key);
  // If there's no stream key, deny the stream.
  if (!streamKey) {
    res.status(403).send();
    return undefined;
  }

  // const user = getUser(streamKey.userId)
  //const channel = await getChannel(streamKey.channelId)
  setTimeout(async () => {
    await updateChannelStatus(streamKey.channelId, { isLive: true });
  }, 5000);

  // We need to redirect the stream to a location that doesn't include the stream
  // key. This may not be the right way to do it; TODO: ensure the stream still works
  res.header("Location", streamKey.channelId).status(300).send();
});

webhooks.post("/on_publish_done", async (req, res) => {
  const key = getNginxKey(req, res);
  const streamKey = await getStreamKey(key);
  await updateChannelStatus(streamKey.channelId, { isLive: false });
  res.status(200).send();
});

export default webhooks;
