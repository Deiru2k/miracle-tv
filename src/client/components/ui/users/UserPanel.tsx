import {
  AspectRatio,
  Image,
  Box,
  Flex,
  Heading,
  Button,
  Divider,
  Text,
  BoxProps,
  Badge,
  Tag,
} from "@chakra-ui/react";
import { CircleIcon } from "miracle-tv-client/components/icons/CircleIcon";
import { PersonIcon } from "miracle-tv-client/components/icons/PersonIcon";
import { UserProfileFragment } from "miracle-tv-shared/graphql";
import { getMediaURL } from "miracle-tv-shared/media";
import React from "react";
import { Avatar } from "../Avatar";
import { Markdown } from "../Markdown";

type Props = {
  user: Omit<UserProfileFragment, "channels">;
  isUserLive?: boolean;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
  includeDescription?: boolean;
} & BoxProps;

export const UserPanel = ({
  user,
  isUserLive,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  includeDescription = true,
  ...boxProps
}: Props) => {
  const displayName = user?.displayName || user?.username;
  return (
    <Box {...boxProps}>
      <Flex position="relative">
        <AspectRatio w="100%" ratio={16 / 6} zIndex={1}>
          <Image
            src={
              user?.header
                ? getMediaURL(user?.header?.filename)
                : "/placeholders/sanae_profile.png"
            }
            borderTopRadius="5px"
            objectPosition="center"
          />
        </AspectRatio>
        <Flex
          zIndex={2}
          w="100%"
          px={2}
          py={1}
          align="center"
          bottom="-2rem"
          position="absolute"
        >
          <Avatar
            borderRadius="50%"
            username={user?.username}
            emailHash={user?.emailHash}
            useGravatar={user?.settings?.useGravatar}
            aspectMaxH="70px"
            aspectMaxW="70px"
            imageId={user?.avatar?.filename}
            bgColor="white"
            useAspectRatio={false}
            borderLeftWidth="1px"
            borderRightWidth="1px"
            borderTopWidth="1px"
            borderStyle="solid"
            borderColor="primary.200"
          />
        </Flex>
      </Flex>
      <Box
        px={4}
        py={4}
        borderLeftWidth="1px"
        borderRightWidth="1px"
        borderBottomWidth="1px"
        borderStyle="solid"
        borderColor="primary.500"
        borderBottomRadius="5px"
      >
        <Heading
          size="md"
          display="flex"
          align="center"
          mb={1}
          mt="2rem"
          py={1}
        >
          {isUserLive && <CircleIcon color="red" mr={2} />}
          {displayName}
        </Heading>
        <Flex flexWrap="wrap" gridGap={2} mb={2}>
          {user.roles.map((role) => (
            <Tag key={role.id} colorScheme="primary">
              {role.name}
            </Tag>
          ))}
        </Flex>
        <Flex justify="space-between" align="center">
          <Flex title="Followers:" align="center">
            <PersonIcon aria-label="Followers:" mr={1} />
            {user.meta.followerCount}
          </Flex>
          {onSubscribe && onUnsubscribe && (
            <>
              {!isSubscribed && (
                <Button size="sm" onClick={onSubscribe}>
                  Follow
                </Button>
              )}
              {isSubscribed && (
                <Button colorScheme="red" size="sm" onClick={onUnsubscribe}>
                  Unfollow
                </Button>
              )}
            </>
          )}
        </Flex>
        {includeDescription && user?.bio && (
          <>
            <Divider mb={2} mt={2} />
            <Text as="div">
              <Markdown>{user?.bio}</Markdown>
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};
