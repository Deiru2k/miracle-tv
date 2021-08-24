import { Router } from "express";

export const webhooks = Router();

webhooks.all('on_publish', (req, res) => {
  console.log('on_publish')
  res.status(200).send()
})

webhooks.all('on_publish_done', (req, res) => {
  console.log('on_publish_done')
  res.status(200).send()
})
