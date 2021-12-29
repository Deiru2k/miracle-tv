import { Router } from "express";
import nginxRtmp from "./nginx-rtmp";
import ossrs from "./ossrs";
import healthcheck from "./healthcheck";

const webhooks = Router();

webhooks.use("/", healthcheck);
webhooks.use("/nginx-rtmp", nginxRtmp);
webhooks.use("/ossrs", ossrs);

export default webhooks;
