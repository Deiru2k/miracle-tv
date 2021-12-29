import { Router } from "express";

const webhooks = Router();

webhooks.get("/ping", async (_, res) => {
  res.status(200).send("pong");
});

export default webhooks;
