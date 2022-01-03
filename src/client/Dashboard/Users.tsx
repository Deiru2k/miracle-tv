import { gql } from "@apollo/client";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { UserPanel } from "miracle-tv-client/components/ui/users/UserPanel";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { useUsersDirectoryQuery } from "miracle-tv-shared/hooks";
import React from "react";

export const USER_DIRECTORY_FRAGMENT = gql`
  fragment UserDirectoryProfile on User {
    id
    username
    displayName
    bio
    emailHash
    avatar {
      id
      filename
    }
    header {
      id
      filename
    }
    meta {
      followerCount
    }
    settings {
      useGravatar
    }
  }
`;

gql`
  query UsersDirectory {
    userDirectory {
      ...UserDirectoryProfile
    }
  }
  ${USER_DIRECTORY_FRAGMENT}
`;

export const DashboardUserDirectory = (): any => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { data: { userDirectory = [] } = {}, loading: isLoading } =
    useUsersDirectoryQuery();
  return !isLoading ? (
    <>
      {!userDirectory.length && (
        <Text>
          No users in the directory... be the first to{" "}
          <Link
            as={(props) => (
              <Button py={0} px={1} variant="ghost" mr={1} {...props} />
            )}
            href="/settings/user/preferences"
          >
            [feature yourself]
          </Link>
          ?
        </Text>
      )}
      <SimpleGrid columns={isMobile ? 2 : 4} spacing={4}>
        {userDirectory.map((user) => (
          <Link key={user.id} href={`/user/${user.username}`}>
            <UserPanel
              user={user}
              _hover={{
                textDecoration: "none",
              }}
              includeDescription={false}
            />
          </Link>
        ))}
      </SimpleGrid>
    </>
  ) : (
    <Loading />
  );
};
