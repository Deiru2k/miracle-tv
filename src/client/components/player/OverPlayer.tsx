import { useServerConfig } from "miracle-tv-client/hooks/serverConfig";
import ovenplayer from "ovenplayer";
import { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
(window as any).Hls = Hls;

type Props = {
  channelId: string;
  initialQuality?: number;
  initialVolume?: number;
  setCurrentSource?: (index: number) => void;
  playerRef: React.MutableRefObject<any>;
  accessToken?: string;
  sessionId?: string;
  muted?: boolean;
};

export const OvenPlayer = ({
  channelId,
  playerRef,
  setCurrentSource,
  initialVolume = 100,
  initialQuality,
  accessToken,
  muted = false,
  sessionId,
}: Props) => {
  const { omeEnabled, isLoading } = useServerConfig();
  const videoRef = useRef<HTMLVideoElement>(null);

  const streamSrc = useMemo(
    () => `/streaming/hls/${channelId}/index.m3u8`,
    [channelId]
  );

  const sources = useMemo(() => {
    if (!isLoading) {
      let accessParam = "";
      if (accessToken) {
        accessParam = `?token=${accessToken}`;
      }
      if (sessionId) {
        const symbol = accessToken ? "&" : "?";
        accessParam = `${accessParam}${symbol}session=${sessionId}`;
      }
      return omeEnabled
        ? [
            {
              label: "Original Quality",
              type: "webrtc",
              file: `wss://${location.hostname}/webrtc/live/${channelId}${accessParam}`,
            },
            /* {
             *   label: "1080p",
             *   type: "webrtc",
             *   file: `wss://${location.hostname}/webrtc/live/${channelId}_1080`,
             * },
             * {
             *   label: "720p",
             *   type: "webrtc",
             *   file: `wss://${location.hostname}/webrtc/live/${channelId}_720`,
             * }, */
            {
              label: "360p",
              type: "webrtc",
              file: `wss://${location.hostname}/webrtc/live/${channelId}_360${accessParam}`,
            },
          ]
        : {
            label: "HLS",
            type: "hls",
            file: streamSrc,
          };
    }
    return null;
  }, [omeEnabled, isLoading, streamSrc, accessToken]);

  useEffect(() => {
    if (videoRef.current && sources) {
      playerRef.current = ovenplayer.create(videoRef.current, {
        volume: initialVolume,
        autoStart: true,
        controls: false,
        showBigPlayButton: false,
        mute: muted,
        webrtcConfig: {
          timeoutMaxRetry: 10,
          connectionTimeout: 5000,
        },
        sources,
      });
      if (initialQuality !== 0) {
        setTimeout(() => {
          playerRef.current.setCurrentSource(initialQuality);
          setCurrentSource?.(initialQuality);
          playerRef.current.stop();
          setTimeout(() => {
            playerRef.current.play();
          }, 500);
        }, 300);
      }
    }
  }, [channelId, sources, videoRef]);

  return (
    <div>
      <video ref={videoRef} />
    </div>
  );
};
