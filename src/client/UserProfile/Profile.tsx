import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { CircleIcon } from "miracle-tv-client/components/icons/CircleIcon";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { ChannelDisplayFragment } from "miracle-tv-client/components/ui/channels/ChannelDisplay";
import { ChannelDisplayGrid } from "miracle-tv-client/components/ui/channels/ChannelDisplayGrid";
import { VodList } from "miracle-tv-client/components/ui/vods/VodList";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { getMediaURL } from "miracle-tv-shared/media";
import React from "react";

type Props = {
  user: any;
};

export const UserProfileFragment = gql`
  fragment UserProfile on User {
    id
    username
    displayName
    bio
    emailHash
    channels {
      ...ChannelCommon
    }
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    useGravatar
    streamThumbnail {
      filename
    }
  }
  ${ChannelDisplayFragment}
`;

export const UserProfile = ({ user }: Props) => {
  const displayName = user?.displayName || user?.username;
  const isMobile = useMediaQuery(MediaQuery.mobile);

  return (
    <>
      <Flex direction={isMobile ? "column" : "row"}>
        <Box
          w="100%"
          px={2}
          py={6}
          flex={3}
          position={!isMobile ? "sticky" : undefined}
          top="0"
          height="0%"
        >
          <Flex position="relative">
            <AspectRatio w="100%" ratio={16 / 6} zIndex={1}>
              <Image
                src={getMediaURL(user?.header?.filename)}
                borderTopRadius="5px"
                objectPosition="top"
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
                useGravatar={user?.useGravatar}
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
            <Heading size="md" display="flex" align="center" mb={2} mt="2rem">
              <CircleIcon color="red" mr={2} />
              {displayName}
              <Text whiteSpace="nowrap"></Text>
            </Heading>
            <Divider mb={2} />
            <Text whiteSpace="pre-wrap">{user?.bio}</Text>
          </Box>
        </Box>
        <Box flex={9} px={4} mt={6} pb={6}>
          <Box flex={!isMobile ? 5 : undefined} w="100%" mb={6}>
            <Heading size="md" mb={2}>
              Their channels
            </Heading>
            <ChannelDisplayGrid
              columns={isMobile ? 1 : undefined}
              channels={user?.channels ?? []}
              defaultThumbnail={user?.streamThumbnail?.filename}
            />
          </Box>
          <Box flex={!isMobile ? 3 : undefined} w="100%">
            <Heading size="md" mb={2}>
              Latest Clips
            </Heading>
            <VodList columns={isMobile ? 2 : 4} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};
