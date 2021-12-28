import React from "react";
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

      if (playerRef.current) {
        playerRef.current.dispose();
      }
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

  return <video ref={videoRef} />;
};

export default VideoJS;
