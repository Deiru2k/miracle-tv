import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const mediaUrl = publicRuntimeConfig.mediaUrl || "http://localhost:4000/media";

export const getMediaURL = (filename: string): string => {
  return `${mediaUrl}/${filename}`;
};
