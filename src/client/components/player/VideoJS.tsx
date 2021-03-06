import React from "react";
import { Box } from "@chakra-ui/react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

type Props = {
  options?: VideoJsPlayerOptions;
  playerRef: React.MutableRefObject<VideoJsPlayer>;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  onReady?: (player: VideoJsPlayer, video: HTMLVideoElement) => void;
};

export const VideoJS = ({ playerRef, videoRef, options, onReady }: Props) => {
  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.info("player is ready");
        onReady?.(player, videoElement);
      }));
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <div><video ref={videoRef} style={{ width: "100%", height: "100%" }} /></div>;
;
};

export default VideoJS;
