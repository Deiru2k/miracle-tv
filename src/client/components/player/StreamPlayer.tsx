import { ChatIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  FlexProps,
  Heading,
  InputGroup,
  InputAddon,
  Input,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { User } from "miracle-tv-shared/graphql";
import { getMediaURL } from "miracle-tv-shared/media";
import React from "react";
import { UserInfo } from "../ui/UserInfo";
import { Player } from "./Player";

type Props = {
  src: string;
  w?: string;
  h?: string;
  user?: User;
} & FlexProps;

export const StreamPlayer = ({
  src,
  w = "100%",
  h = "100%",
  user,
  ...props
}: Props) => {
  return (
    <Box w={w} h={h} position="relative">
      <Flex w={w} h={h} {...props} direction="row">
        <AspectRatio w={w} h={h} ratio={16 / 9} flex={5}>
          <Box w="100%" h="100%">
            {!!user && (
              <Box
                w="100%"
                h="100%"
                bgSize="cover"
                position="absolute"
                top={0}
                left={0}
                zIndex={2}
                bgColor="primary.400"
                bgRepeat="no-repeat"
                bgPosition="center"
                bgImage={getMediaURL(user?.streamThumbnail?.filename)}
              ></Box>
            )}
            <Box
              position="absolute"
              pointerEvents="none"
              top={0}
              left={0}
              w="100%"
              h="100%"
              zIndex={4}
              bg={
                !!user && [
                  "linear-gradient(0deg, rgba(0,0,0,0.8029412448573179) 0%, rgba(9,9,9,0.30154068463322825) 43%, rgba(0,0,0,0) 100%)",
                  "linear-gradient(0deg, rgba(0,0,0,0.8029412448573179) 0%, rgba(9,9,9,0.30154068463322825) 43%, rgba(0,0,0,0) 100%)",
                  "linear-gradient(180deg, rgba(0,0,0,0.8029412448573179) 0%, rgba(9,9,9,0.30154068463322825) 43%, rgba(0,0,0,0) 100%)",
                ]
              }
            />
            <Box position="absolute" top={0} left={0} px={6} py={3} zIndex={5}>
              <UserInfo user={user} imageHeight="3rem" fontSize="3rem" />
            </Box>
            <Player src={src} autoplay mute zIndex={3} />
          </Box>
        </AspectRatio>
        <Flex flex={2} mx={2} direction="column" boxSizing="content-box">
          <Heading px={2} mt={8} size="lg" textAlign="right" pb={2}>
            Chat
          </Heading>
          <Flex
            h="100%"
            direction="column"
            borderColor="green"
            borderStyle="solid"
          >
            <Flex px={2} height="100%" justify="flex-end" direction="column">
              <Text textAlign="right">
                <b>User 1:</b> Hello!
              </Text>
              <Text textAlign="right">
                <b>User 2:</b> Henlo!
              </Text>
              <Text textAlign="right">
                <b>Dale:</b> Yuuk!
              </Text>
            </Flex>
            <InputGroup pl={2} mt={2}>
              <Input />
              <InputRightAddon cursor="pointer">
                <IconButton
                  cursor="pointer"
                  variant="ghost"
                  icon={<ChatIcon />}
                  aria-label="send"
                  title="send"
                />
              </InputRightAddon>
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
