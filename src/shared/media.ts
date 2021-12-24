import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const mediaUrl = publicRuntimeConfig.mediaUrl || "http://localhost:4000/media";
const streamingUrl =
  publicRuntimeConfig.streamingUrl || "http://localhost:4000/streaming";

export const getMediaURL = (filename: string): string => {
  return `${mediaUrl}/${filename}`;
};
export const getStreamingURL = (filename: string): string => {
  return `${streamingUrl}/${filename}`;
};
