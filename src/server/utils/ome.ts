import config from "miracle-tv-server/config";
import superagent from "superagent";

export const getOmeStatus = async (channelId: string) => {
  try {
    const omeRequest = await superagent
      .get(`${config.omeAPIUrl}/streams/${channelId}`)
      .set("Authorization", "Basic b21lLWFjY2Vzcy10b2tlbg==")
      .send();
    return {
      id: channelId,
      isLive: true,
      viewers: omeRequest.body.response.totalConnections,
      length: 0,
      createdAt: omeRequest.body.response.createdTime,
      transferred: omeRequest.body.response.totalBytesIn,
    };
  } catch {}
  return {
    id: channelId,
    isLive: false,
    viewers: 0,
    length: 0,
    transferred: 0,
  };
};
