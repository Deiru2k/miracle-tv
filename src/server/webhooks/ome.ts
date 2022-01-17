import { Router } from "express";
import {
  checkChannel,
  getNginxKey,
  getOMEKey,
  getStreamKey,
  getUser,
  updateChannelStatus,
} from "./common";

const webhooks = Router();

type OMERequest = {
  client: {
    address: string;
    port: number;
  };
  request: {
    direction: "incoming | outgoing";
    protocol: "webrtc" | "rtmp" | "srt" | "hls" | "dash" | "lldash";
    url: string;
    time: string;
  };
};

type OMEResponse = {
  allowed: boolean;
  new_url?: string;
  lifetime?: number;
  reason: string;
};

const unathorizedResponse: OMEResponse = {
  allowed: false,
  reason: "Unauthorized",
};
const allowedResponse: OMEResponse = {
  allowed: true,
  reason: "Allowed",
};

webhooks.post("/hook", async (req, res) => {
  const key = getOMEKey((req.body as OMERequest).request.url);
  const streamKey = await getStreamKey(key);
  // If there's no stream key, deny the stream.
  if (!streamKey) {
    res.status(200).send(unathorizedResponse);
    return undefined;
  }

  // If user is suspended or not found, deny the stream
  const user = await getUser(streamKey.userId);
  if (!user || user?.suspended) {
    res.status(200).send(unathorizedResponse);
    return undefined;
  }

  // If channel is disabled, deny the stream
  const isChannelEnabled = await checkChannel(streamKey.channelId);
  if (!isChannelEnabled) {
    res.status(200).send(unathorizedResponse);
    return undefined;
  }

  res.status(200).send(allowedResponse);
});

export default webhooks;
