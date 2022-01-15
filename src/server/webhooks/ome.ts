import { Router } from "express";
import {
  getNginxKey,
  getOMEKey,
  getStreamKey,
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

webhooks.post("/hook", async (req, res) => {
  const key = getOMEKey((req.body as OMERequest).request.url);
  const streamKey = await getStreamKey(key);
  // If there's no stream key, deny the stream.
  if (!streamKey) {
    const response: OMEResponse = {
      allowed: false,
      reason: "Unauthorized",
    };
    res.status(200).send(response);
    return undefined;
  }

  const response: OMEResponse = {
    allowed: true,
    reason: "Allowed",
  };
  res.status(200).send(response);
});

export default webhooks;
