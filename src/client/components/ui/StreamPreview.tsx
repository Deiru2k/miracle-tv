import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AspectRatio, Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import {
  PlaybackActions,
  Player as PlayerType,
} from "miracle-tv-client/components/player/Player";

const Player = dynamic(
  () =>
    import("miracle-tv-client/components/player/Player").then(
      ({ Player }) => Player
    ) as unknown as Promise<typeof PlayerType>,
  { ssr: false }
);

type Props = {
  name: string;
  w?: string;
  h?: string;
  alwaysShowInfo?: boolean;
  hideInfo?: boolean;
  hideThumbnail?: boolean;
  autoplay?: boolean;
} & FlexProps;

type Controls = {
  play: PlaybackActions["play"];
  pause: PlaybackActions["pause"];
  stop: () => void;
};

export const StreamPreview = ({
  name,
  h = "100%",
  w = "100%",
  alwaysShowInfo = false,
  hideInfo = false,
  hideThumbnail = false,
  autoplay = false,
  ...boxProps
}: Props) => {
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true);
  const [playerControls, setPlayerControls] = useState<Controls | null>(null);

  const enablePlayback = useCallback(() => {
    if (!autoplay) {
      playerControls?.play();
      if (showThumbnail) {
        setShowThumbnail(false);
      }
    }
  }, [playerControls, setShowThumbnail, showThumbnail]);
  const disablePlayback = useCallback(() => {
    if (!autoplay) {
      playerControls?.stop();
      if (!showThumbnail) {
        setShowThumbnail(true);
      }
    }
  }, [playerControls, setShowThumbnail, showThumbnail]);

  const onPlaybackActionReady = useCallback(
    (actions: Controls) => {
      setPlayerControls(actions);
    },
    [setPlayerControls]
  );

  return (
    <AspectRatio width={w} maxW={w} h={h} maxH={h} ratio={16 / 9} {...boxProps}>
      <Flex
        w="15vw"
        position="relative"
        zIndex={1}
        onMouseEnter={enablePlayback}
        onMouseLeave={disablePlayback}
        cursor="pointer"
      >
        {!hideThumbnail && (
          <Box
            w="100%"
            h="100%"
            bgImage="/game-example.png"
            position="absolute"
            top={0}
            left={0}
            bgSize="cover"
            bgRepeat="no-repeat"
            opacity={showThumbnail ? 1 : 0}
            transition="opacity 0.2s ease"
          />
        )}
        {!hideInfo && (
          <Flex
            w="100%"
            h="100%"
            position="absolute"
            top={0}
            left={0}
            zIndex={3}
            direction="column"
            justify="space-between"
            transition="opacity 0.2s ease"
            opacity={alwaysShowInfo ? 1 : 0}
            _hover={{
              opacity: 1,
            }}
          >
            <Flex zIndex={3}>
              <Box bgColor="secondary.400" px={2} py={1}>
                <Text as="span" color="red">
                  ●
                </Text>
                &nbsp;LIVE
              </Box>
            </Flex>
            <Flex zIndex={3} justify="flex-end">
              <Box bgColor="secondary.400" px={2} py={1}>
                {name}
              </Box>
            </Flex>
          </Flex>
        )}
        <Player
          kind="preview"
          src="/videos/kill-the-night.mp4"
          autoplay={autoplay}
          onPlaybackActionsReady={onPlaybackActionReady}
        />
      </Flex>
    </AspectRatio>
  );
};
