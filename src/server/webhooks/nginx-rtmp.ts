import { Router } from "express";
import {
  checkChannel,
  getNginxKey,
  getStreamKey,
  getUser,
  updateChannelStatus,
} from "./common";

const webhooks = Router();

webhooks.post("/on_publish", async (req, res) => {
  const key = getNginxKey(req, res);
  const streamKey = await getStreamKey(key);
  // If there's no stream key, deny the stream.
  if (!streamKey) {
    res.status(403).send();
    return undefined;
  }

  // If user is suspended or not found, deny the stream
  const user = await getUser(streamKey.userId);
  if (!user || user?.suspended) {
    res.status(403).send();
    return undefined;
  }

  // If channel is disabled, deny the stream
  const isChannelEnabled = await checkChannel(streamKey.channelId);
  if (!isChannelEnabled) {
    res.status(403).send();
    return undefined;
  }

  setTimeout(async () => {
    await updateChannelStatus(streamKey.channelId, { isLive: true });
  }, 5000);

  res.status(200).send();
});

webhooks.post("/on_publish_done", async (req, res) => {
  const key = getNginxKey(req, res);
  const streamKey = await getStreamKey(key);
  await updateChannelStatus(streamKey.channelId, { isLive: false });
  res.status(200).send();
});

export default webhooks;
