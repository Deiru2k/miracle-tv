import { Router } from "express";
import {
  checkChannel,
  checkChannelAccess,
  getChannel,
  getOMEChannel,
  getOMEKey,
  getOMEToken,
  getStreamKey,
  getUser,
} from "./common";
import { Request, Response } from "express";

const webhooks = Router();

type OMERequest = {
  client: {
    address: string;
    port: number;
  };
  request: {
    direction: "incoming" | "outgoing";
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

const handleIncoming = async (
  req: Request,
  res: Response
): Promise<undefined> => {
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
};

const handleOutgoing = async (
  req: Request,
  res: Response
): Promise<undefined> => {
  console.log((req.body as OMERequest).request.url);
  const token = getOMEToken((req.body as OMERequest).request.url);
  const channelId = getOMEChannel((req.body as OMERequest).request.url);
  const channel = await getChannel(channelId);

  if (token && channel?.passwordProtected) {
    const hasAccess = checkChannelAccess(token);
    if (hasAccess) {
      res.status(200).send(allowedResponse);
      return;
    } else {
      res.status(200).send(unathorizedResponse);
    }
  }
  res.status(200).send(allowedResponse);
};

webhooks.post("/hook", async (req, res) => {
  const body = req.body as OMERequest;
  if (body.request.direction === "incoming") {
    await handleIncoming(req, res);
  } else if (body.request.direction === "outgoing") {
    await handleOutgoing(req, res);
  }
});

export default webhooks;
