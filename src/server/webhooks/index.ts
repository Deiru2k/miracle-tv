import { Router } from "express";
import nginxRtmp from "./nginx-rtmp";
import ossrs from "./ossrs";
import ome from "./ome";
import healthcheck from "./healthcheck";

const webhooks = Router();

webhooks.use("/", healthcheck);
webhooks.use("/nginx-rtmp", nginxRtmp);
webhooks.use("/ossrs", ossrs);
webhooks.use("/ome", ome);

export default webhooks;
