import { AspectRatio, Box, Flex, Heading, Image } from "@chakra-ui/react";
import { useServerConfig } from "miracle-tv-client/hooks/serverConfig";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { VideoJsPlayer } from "video.js";
import { OvenPlayer } from "./OverPlayer";
import { PlayerControls } from "./PlayerControls";

type Props = {
  channelId: string;
  isLive: boolean;
  thumbnail?: string;
};

export const Player = ({ channelId, isLive, thumbnail }: Props) => {
  const playerRef = useRef<VideoJsPlayer>();
  const videoRef = React.useRef<HTMLVideoElement>();
  const containerRef = useRef<HTMLDivElement>();
  const [isFullscreen, setFullscreen] = useState<boolean>(false);

  const initialQuality = localStorage.getItem("quality");
  const [currentSource, setCurrentSource] = useState<number>(
    initialQuality ? Number(initialQuality) : 0
  );

  useEffect(() => {
    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };
    return () => {
      document.onfullscreenchange = undefined;
    };
  }, []);

  return (
    <Box role="group" position="relative" ref={containerRef}>
      <AspectRatio
        ratio={16 / 9}
        maxW="100%"
        maxH={isFullscreen ? "100%" : "90vh"}
        zIndex={1}
      >
        <>
          <Box
            opacity={isLive ? 0 : 1}
            pointerEvents={isLive ? "none" : "auto"}
            transition="opacity linear 0.2s"
            position="relative"
            zIndex={isLive ? -1 : 3}
          >
            <Image src={thumbnail} w="100%" h="100%" objectFit="cover" />
            <Flex
              position="absolute"
              top={0}
              w="100%"
              h="100%"
              justify="center"
              align="center"
              backgroundColor="rgba(0, 0, 0, 0.6)"
            >
              <Heading size="sm" color="white">
                Stream is offline. Check back later, oh hang out in the chat!
              </Heading>
            </Flex>
          </Box>
          {isLive && (
            <OvenPlayer
              channelId={channelId}
              playerRef={playerRef}
              initialQuality={currentSource}
              setCurrentSource={setCurrentSource}
            />
          )}
        </>
      </AspectRatio>
      {isLive && (
        <PlayerControls
          isFullscreen={isFullscreen}
          setFullscreen={setFullscreen}
          playerRef={playerRef}
          videoRef={videoRef}
          containerRef={containerRef}
          currentSource={currentSource}
          setCurrentSource={setCurrentSource}
          stats={{ isLive, viewers: 0 }}
        />
      )}
    </Box>
  );
};

export default Player;

// src={streamUrl}
// hlsConfig={{
//   startPosition: 10000,
//   manifestLoadingMaxRetry: 10,
// }}
