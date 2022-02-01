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
  viewers?: number;
  thumbnail?: string;
  accessToken?: string;
  sessionId?: string;
  muted?: boolean;
  maxH?: string;
};

export const Player = ({
  channelId,
  isLive,
  viewers,
  thumbnail,
  accessToken,
  sessionId,
  muted,
  maxH = "90vh",
}: Props) => {
  const playerRef = useRef<VideoJsPlayer>();
  const videoRef = React.useRef<HTMLVideoElement>();
  const containerRef = useRef<HTMLDivElement>();
  const volume = Number(localStorage.getItem("volume")) || 100;
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
    <Box role="group" position="relative" ref={containerRef} height="100%">
      <AspectRatio
        ratio={16 / 9}
        maxW="100%"
        maxH={isFullscreen ? "100%" : maxH}
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
                Stream is offline. Check back later, or hang out in the chat!
              </Heading>
            </Flex>
          </Box>
          {isLive && (
            <OvenPlayer
              channelId={channelId}
              playerRef={playerRef}
              initialQuality={currentSource}
              initialVolume={volume}
              setCurrentSource={setCurrentSource}
              accessToken={accessToken}
              sessionId={sessionId}
              muted={muted}
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
          stats={{ isLive, viewers }}
        />
      )}
    </Box>
  );
};

export default Player;
