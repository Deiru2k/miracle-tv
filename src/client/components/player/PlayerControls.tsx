import {
  Box,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useTheme,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { CircleIcon } from "../icons/CircleIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";
import { VolumeIcon } from "../icons/VolumeIcon";
import { transparentize } from "@chakra-ui/theme-tools";
import { VolumeMutedIcon } from "../icons/VolumeMutedIcon";
import { FullscreenExitIcon } from "../icons/FullscreenExitIcon";
import { FullscreenIcon } from "../icons/FullscreenIcon";
import { VideoJsPlayer } from "video.js";

type Props = {
  playerRef: React.MutableRefObject<any>;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  containerRef: React.MutableRefObject<HTMLDivElement>;
  isFullscreen: boolean;
  setFullscreen: (state: boolean) => void;
  stats: {
    isLive?: boolean;
    viewers?: number;
  };
};

export const PlayerControls = ({
  playerRef,
  containerRef,
  isFullscreen,
  setFullscreen,
  stats,
}: Props) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(
    Number(localStorage.getItem("volume")) || 1
  );
  const [isMuted, setIsMuted] = useState<boolean>(playerRef.current?.getMute());

  useEffect(() => {
    setIsMuted(playerRef.current?.getMute());
    setIsPlaying(playerRef.current?.getState() === "playing");
  }, [playerRef.current]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume);
  }, [playerRef.current]);

  const onFullScreen = useCallback(() => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
    setFullscreen(!isFullscreen);
  }, [isFullscreen, setFullscreen, containerRef]);

  const onPlayPause = useCallback(() => {
    const isPlaying = playerRef.current?.getState() === "playing";
    if (!isPlaying) {
      playerRef.current?.play();
      setIsPlaying(true);
    } else {
      playerRef.current?.pause();
      setIsPlaying(false);
    }
  }, [playerRef, setIsPlaying]);

  const handleVolumeChange = useCallback(
    (level: number) => {
      if (playerRef.current) {
        setVolume(level);
        setIsMuted(false);
        playerRef.current.setMute(false);
        playerRef.current.setVolume(level);
        localStorage.setItem("volume", level.toString());
      }
    },
    [playerRef, setVolume, setIsMuted]
  );

  const handleMute = useCallback(() => {
    if (playerRef.current) {
      setIsMuted(!playerRef.current.getMute());
      playerRef.current.setMute(!playerRef.current.getMute());
    }
  }, [playerRef, setIsMuted]);

  const PlayerStateIcon = isPlaying ? PauseIcon : PlayIcon;
  const VolumeStateIcon = isMuted ? VolumeMutedIcon : VolumeIcon;
  const FullscreenStateIcon = isFullscreen
    ? FullscreenExitIcon
    : FullscreenIcon;

  const sliderBgColor = transparentize("primary.500", 0.3)(theme);

  return (
    <Flex
      width="100%"
      position="absolute"
      bottom={0}
      justifyContent="space-between"
      align="center"
      overflow="hidden"
      maxHeight={0}
      id="playercontrols"
      _groupHover={{
        maxHeight: "100%",
        overflow: "visible",
        boxShadow: "0px -35px 22px -14px rgba(0, 0, 0, 0.8) inset;",
      }}
      transition="all linear 0.3s"
      zIndex={3}
      px={2}
    >
      {/* Left half */}
      <Flex flexDirection="row" align="center">
        {stats.isLive && (
          <CircleIcon w={5} h={5} color="red" aria-label="Stream is live!" />
        )}
        <IconButton
          variant="ghost"
          icon={<PlayerStateIcon w={5} h={5} color="primary.200" />}
          aria-label="Play and pause"
          onClick={onPlayPause}
        />
        {/* Left half */}
        <Flex align="center">
          <IconButton
            variant="ghost"
            aria-label="Mute and unmute"
            onClick={handleMute}
            icon={<VolumeStateIcon w={5} h={5} color="primary.200" />}
          />
          <Slider
            aria-label="Volume slider"
            min={0}
            max={100}
            step={5}
            value={volume}
            defaultValue={volume}
            w={24}
            onChange={handleVolumeChange}
            getAriaValueText={(level: number) =>
              `Volume is at ${level * 100} percent`
            }
          >
            <SliderTrack bgColor={sliderBgColor}>
              <SliderFilledTrack bgColor="primary.200" />
            </SliderTrack>
            <SliderThumb bgColor="primary.200" />
          </Slider>
        </Flex>
      </Flex>
      {/* Right half */}
      <Box>
        <IconButton
          variant="ghost"
          aria-label="Toggle fullscreen"
          onClick={onFullScreen}
          icon={<FullscreenStateIcon w={5} h={5} color="primary.200" />}
        />
      </Box>
    </Flex>
  );
};
