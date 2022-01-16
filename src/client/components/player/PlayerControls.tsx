import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CircleIcon } from "../icons/CircleIcon";
import { PauseIcon } from "../icons/PauseIcon";
import { PlayIcon } from "../icons/PlayIcon";
import { VolumeIcon } from "../icons/VolumeIcon";
import { transparentize } from "@chakra-ui/theme-tools";
import { VolumeMutedIcon } from "../icons/VolumeMutedIcon";
import { FullscreenExitIcon } from "../icons/FullscreenExitIcon";
import { FullscreenIcon } from "../icons/FullscreenIcon";
import { SettingsIcon, ViewIcon } from "@chakra-ui/icons";

type Props = {
  playerRef: React.MutableRefObject<any>;
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  containerRef: React.MutableRefObject<HTMLDivElement>;
  currentSource: number;
  setCurrentSource: (index: number) => void;
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
  currentSource,
  setCurrentSource,
  stats,
}: Props) => {
  const theme = useTheme();
  const qualityDisclosure = useDisclosure();
  const [sourceOptions, setSourceOptions] = useState<any[]>([]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(
    Number(localStorage.getItem("volume")) || 100
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

  const onMenuOpen = useCallback(() => {
    setSourceOptions(
      playerRef.current?.getSources()?.map((s: any) => ({
        value: s.index,
        label: s.label,
      })) ?? []
    );
    qualityDisclosure.onOpen();
  }, [playerRef.current]);

  const setSource = useCallback(
    (index: number) => {
      playerRef.current?.setCurrentSource(index);
      setTimeout(() => {
        playerRef.current?.play(index);
      }, 300);
      setIsPlaying(true);
      setCurrentSource(index);
      localStorage.setItem("quality", `${index}`);
    },
    [playerRef, setIsPlaying, setCurrentSource]
  );

  const openStyles = {
    maxHeight: "100%",
    overflow: "visible",
    boxShadow: "0px -35px 22px -14px rgba(0, 0, 0, 0.8) inset;",
  };
  const disclosureStyles = qualityDisclosure.isOpen ? openStyles : undefined;

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
      _groupHover={openStyles}
      {...disclosureStyles}
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
        <Box mr={2}>
          <ViewIcon aria-label="viewers" mr={1} /> {stats?.viewers || 0}
        </Box>
        <Menu
          isOpen={qualityDisclosure.isOpen}
          onClose={qualityDisclosure.onClose}
        >
          <MenuButton
            as={IconButton}
            aria-label="Stream quality"
            variant="ghost"
            color="primary.200"
            icon={<SettingsIcon />}
            onClick={onMenuOpen}
          >
            Actions
          </MenuButton>
          <Portal>
            <MenuList>
              {sourceOptions.map((s: any) => (
                <MenuItem
                  backgroundColor={
                    currentSource === s.value ? "primary.500" : undefined
                  }
                  key={s.value}
                  onClick={() => setSource(s.value)}
                >
                  {s.label}
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </Menu>{" "}
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
