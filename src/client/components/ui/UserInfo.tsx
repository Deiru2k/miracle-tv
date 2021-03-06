import React, { useEffect } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  FlexProps,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { gql } from "@apollo/client";
import { useUserInfoLazyQuery } from "miracle-tv-shared/hooks";
import { getMediaURL } from "miracle-tv-shared/media";

type UserInfo = {
  avatar?: {
    filename: string;
  };
  username: string;
  displayName?: string;
};

type Props = {
  id?: string;
  user?: UserInfo;
  imageHeight?: string;
} & FlexProps;

gql`
  query UserInfo($id: ID!) {
    user(id: $id) {
      avatar {
        filename
      }
      username
      displayName
    }
  }
`;

export const UserInfo = ({
  id,
  user: propsUser,
  imageHeight = "30px",
  ...props
}: Props) => {
  const [
    loadUser,
    { data: { user: remoteUser } = { user: undefined }, loading },
  ] = useUserInfoLazyQuery();

  const user = propsUser || remoteUser;

  useEffect(() => {
    if (id && propsUser) {
      console.error("ERROR! Cannot user both ID and User in UserInfo!");
    } else if (id && !propsUser) {
      loadUser({ variables: { id } });
    }
  }, [loadUser, propsUser, id]);

  return (
    <Flex align="center" {...props}>
      {loading && <Skeleton width="120px" height="14px" />}
      {!!user && (
        <>
          {!!user.avatar && (
            <Box
              w="100%"
              h="100%"
              borderRadius="6px"
              bgColor="secondary.600"
              borderStyle="solid"
              borderWidth="1px"
              borderColor="secondary.400"
            >
              <AspectRatio ratio={1} h={imageHeight} w={imageHeight}>
                <Image
                  boxSizing="border-box"
                  borderRadius="6px"
                  w="100%"
                  h="100%"
                  src={`${getMediaURL(user.avatar.filename)}`}
                />
              </AspectRatio>
            </Box>
          )}
          <Text as="span" ml={2}>
            {user.displayName || user.username}
          </Text>
        </>
      )}
    </Flex>
  );
};
