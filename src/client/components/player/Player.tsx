import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { VideoJsPlayer } from "video.js";
import { PlayIcon } from "../icons/PlayIcon";
import { OvenPlayer } from "./OverPlayer";
import { PlayerControls } from "./PlayerControls";

type Props = {
  channelId: string;
  isLive: boolean;
  isPreview?: boolean;
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
  isPreview = false,
}: Props) => {
  const playerRef = useRef<VideoJsPlayer>();
  const videoRef = React.useRef<HTMLVideoElement>();
  const containerRef = useRef<HTMLDivElement>();
  const volume = Number(localStorage.getItem("volume")) || 100;
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(!isPreview);

  const initialQuality = localStorage.getItem("quality");
  const [currentSource, setCurrentSource] = useState<number>(
    initialQuality ? Number(initialQuality) : 0
  );

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, [setIsPlaying, playerRef]);

  useEffect(() => {
    if (!isLive && isPlaying) {
      setIsPlaying(false);
    }
  }, [setIsPlaying, isLive]);

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
            opacity={isPlaying ? 0 : 1}
            pointerEvents={isPlaying ? "none" : "auto"}
            transition="opacity linear 0.2s"
            position="relative"
            zIndex={isPlaying ? -1 : 3}
          >
            <Image src={thumbnail} w="100%" h="100%" objectFit="cover" />
            <Flex
              position="absolute"
              top={0}
              w="100%"
              h="100%"
              justify="center"
              align="center"
              backgroundColor={isLive ? "none" : "rgba(0, 0, 0, 0.6)"}
            >
              {isLive ? (
                <IconButton
                  w="100%"
                  h="100%"
                  _hover={{
                    backgroundColor: "none",
                  }}
                  aria-label="Start playback"
                  onClick={startPlayback}
                  icon={
                    <PlayIcon
                      color="white"
                      w="20%"
                      h="20%"
                      filter="drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.5))"
                    />
                  }
                  variant="ghost"
                  zIndex={4}
                />
              ) : (
                <Heading size="sm" color="white">
                  Stream is offline. Check back later, or hang out in the chat!
                </Heading>
              )}
            </Flex>
          </Box>
          {isLive && isPlaying && (
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
      {isLive && isPlaying && (
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
