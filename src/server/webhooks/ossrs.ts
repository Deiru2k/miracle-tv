import { Router } from "express";
import {
  checkChannel,
  getOSSRSKey,
  getStreamKey,
  getUser,
  updateChannelStatus,
} from "./common";

const webhooks = Router();

webhooks.post("/on_publish", async (req, res) => {
  const key = getOSSRSKey(req.body.param);
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

  // As per OSSRS spec, callbacks must return 200 and "0" as response body to succeed.
  res.status(200).send("0");
});

webhooks.post("/on_unpublish", async (req, res) => {
  const key = getOSSRSKey(req.body.param);
  const streamKey = await getStreamKey(key);
  if (streamKey) {
    await updateChannelStatus(streamKey.channelId, { isLive: false });
    res.status(200).send("0");
    return;
  }
  res.status(403).send("0");
});

export default webhooks;
