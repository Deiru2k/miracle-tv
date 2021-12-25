import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Image,
  useTimeout,
} from "@chakra-ui/react";
import { MediaPlayer } from "dashjs";
import * as shaka from "shaka-player";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactHlsPlayer from "react-hls-player/dist";

type Props = {
  channelId: string;
  isLive: boolean;
  thumbnail?: string;
};

export const Player = ({ channelId, isLive, thumbnail }: Props) => {
  const playerRef = useRef<HTMLVideoElement>();

  // const player = useMemo(() => {
  //   console.log(document.getElementById(`stream-player-${channelId}`));
  //   return new shaka.Player(
  //     document.getElementById(`stream-player-${channelId}`)
  //   );
  // }, [playerRef.current]);

  // useEffect(() => {
  //   if (channelId && isLive && player) {
  //     console.log(shaka);
  //     // const source = new shaka.player.DashVideoSource(
  //     //   `/streaming/${channelId}.mpd`,
  //     //   null
  //     // );
  //     // player
  //     //   .load(source)
  //     //   .then(() => {
  //     //     console.log("The video has now been loaded!");
  //     //   })
  //     //   .catch((e: any) => console.log(e));
  //   }
  // }, [channelId, isLive, playerRef.current, player]);

  // useEffect(() => {
  //   if (!isLive && player) {
  //     // player.pause();
  //   }
  // }, [isLive, player]);

  return (
    <AspectRatio ratio={16 / 9} maxW="100%" maxH="100%" zIndex={1}>
      <>
        <Box
          opacity={isLive ? 0 : 1}
          pointerEvents={isLive ? "none" : "auto"}
          transition="opacity linear 0.2s"
          position="relative"
        >
          <Image src={thumbnail} />
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
          <ReactHlsPlayer
            playerRef={playerRef}
            controls
            autoPlay
            muted
            src={`/streaming/${channelId}/index.m3u8`}
            hlsConfig={{
              startPosition: 10000,
              manifestLoadingMaxRetry: 10,
              enableWorker: true,
            }}
          />
        )}
      </>
    </AspectRatio>
  );
};
// <video
//   id={`stream-player-${channelId}`}
//   style={{
//     opacity: isLive ? 1 : 0,
//     pointerEvents: isLive ? "auto" : "none",
//   }}
//   ref={playerRef}
//   width="100%"
//   height="100%"
//   controls
//   muted
// />

export default Player;
