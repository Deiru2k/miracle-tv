import { useServerConfig } from "miracle-tv-client/hooks/serverConfig";
import ovenplayer from "ovenplayer";
import { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
(window as any).Hls = Hls;

type Props = {
  channelId: string;
  playerRef: React.MutableRefObject<any>;
};

export const OvenPlayer = ({ channelId, playerRef }: Props) => {
  const { omeEnabled, isLoading } = useServerConfig();
  const videoRef = useRef<HTMLVideoElement>(null);

  const streamSrc = useMemo(
    () => `/streaming/hls/${channelId}/index.m3u8`,
    [channelId]
  );

  const sources = useMemo(() => {
    if (!isLoading) {
      return omeEnabled
        ? [
            {
              label: "Original Quality",
              type: "webrtc",
              file: `wss://${location.hostname}/webrtc/live/${channelId}`,
            },
            {
              label: "1080p",
              type: "webrtc",
              file: `wss://${location.hostname}/webrtc/live/${channelId}_1080`,
            },
            {
              label: "720p",
              type: "webrtc",
              file: `wss://${location.hostname}/webrtc/live/${channelId}_720`,
            },
            {
              label: "360p",
              type: "webrtc",
              file: `wss://${location.hostname}/webrtc/live/${channelId}_360`,
            },
          ]
        : {
            label: "HLS",
            type: "hls",
            file: streamSrc,
          };
    }
    return null;
  }, [omeEnabled, isLoading, streamSrc]);

  useEffect(() => {
    if (videoRef.current && sources) {
      playerRef.current = ovenplayer.create(videoRef.current, {
        controls: false,
        showBigPlayButton: false,
        sources,
      });
    }
  }, [channelId, sources, videoRef]);

  return (
    <div>
      <video ref={videoRef} />
    </div>
  );
};
