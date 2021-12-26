import { Router } from "express";
import nginxRtmp from "./nginx-rtmp";
import ossrs from "./ossrs";

const webhooks = Router();

webhooks.use("/nginx-rtmp", nginxRtmp);
webhooks.use("/ossrs", ossrs);

export default webhooks;
