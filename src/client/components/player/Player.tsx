import React, { useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import ReactPlayer from "react-player";

type PlayerKind = "preview" | "vod" | "live";

export type PlaybackActions = {
  play: () => void;
  pause: () => void;
  stop: (pos: number) => void;
};

type Props = {
  src: string;
  w?: string;
  h?: string;
  kind?: PlayerKind;
  autoplay?: boolean;
  mute?: boolean;
  zIndex?: number;
  onPlaybackActionsReady?: (actions: PlaybackActions) => void;
};

export const Player = ({
  src,
  w = "100%",
  h = "100%",
  zIndex,
  autoplay = false,
  onPlaybackActionsReady,
}: Props) => {
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (playerRef.current !== null) {
      const actions: PlaybackActions = {
        play: () => playerRef.current?.getInternalPlayer()?.play(),
        pause: () => playerRef.current?.getInternalPlayer()?.play(),
        stop: () => {
          playerRef.current?.getInternalPlayer()?.pause();
          if (playerRef.current?.getInternalPlayer()) {
            playerRef.current.getInternalPlayer().currentTime = 0;
          }
        },
      };
      onPlaybackActionsReady?.(actions);
    }
  }, [playerRef.current, onPlaybackActionsReady]);

  return (
    <>
      <Global
        styles={css`
          .player-preview .replay-controls-bar {
            display: none;
          }
        `}
      />
      <Flex w={w} h={h} zIndex={zIndex}>
        <ReactPlayer
          url={src}
          width="100%"
          height="100%"
          ref={playerRef}
          playing={autoplay}
          volume={0}
          config={{
            file: {
              attributes: { preload: "metadata" },
            },
          }}
        />
      </Flex>
    </>
  );
};
