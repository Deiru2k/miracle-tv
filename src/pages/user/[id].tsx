import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Text,
  Flex,
  Image,
  Heading,
  Circle,
  HStack,
  VStack,
  Stack,
  Divider,
} from "@chakra-ui/react";
import {
  UserProfileFragment,
  UserProfile,
} from "miracle-tv-client/UserProfile/Profile";
import { useUserPageQuery } from "miracle-tv-shared/hooks";
import { useRouter } from "next/dist/client/router";
import React from "react";

gql`
  query UserPage($username: ID!) {
    user(id: $username) {
      ...UserProfile
    }
  }
  ${UserProfileFragment}
`;

const UserPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { data: { user } = {} } = useUserPageQuery({
    variables: { username: id as string },
  });

  return <UserProfile user={user} />;
};

export default UserPage;
