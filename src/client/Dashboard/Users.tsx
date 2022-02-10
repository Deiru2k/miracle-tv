import { gql } from "@apollo/client";
import { SimpleGrid, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Link } from "miracle-tv-client/components/ui/Link";
import { Loading } from "miracle-tv-client/components/ui/Loading";
import { UserPanel } from "miracle-tv-client/components/ui/users/UserPanel";
import { useCurrentUserSettings } from "miracle-tv-client/hooks/auth";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { useUsersDirectoryQuery } from "miracle-tv-shared/hooks";
import Head from "next/head";
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
    roles {
      id
      name
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
  const { currentSettings } = useCurrentUserSettings();
  const { data: { userDirectory = [] } = {}, loading: isLoading } =
    useUsersDirectoryQuery();
  return !isLoading ? (
    <>
      <Head>
        <title>User Directory - Dashboard - Miracle TV</title>
      </Head>
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
      {!!userDirectory.length && (
        <>
          {!currentSettings.featureInDirectory && (
            <Text as="span" size="sm">
              To add your own account to this page, go to{" "}
              <Link
                as={(props) => (
                  <Button py={0} px={1} variant="ghost" mr={1} {...props} />
                )}
                href="/settings/user/preferences"
              >
                [profile preferences]
              </Link>
              and feature yourself!
            </Text>
          )}
          <SimpleGrid columns={isMobile ? 2 : 4} spacing={4}>
            {userDirectory.map((user) => (
              <Link
                key={user.id}
                href={`/user/${user.username}`}
                _hover={{ textDecoration: "none" }}
              >
                <UserPanel
                  user={user}
                  transition="all 0.1s linear"
                  _hover={{
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "primary.500",
                    borderRadius: "5px",
                  }}
                  includeDescription={false}
                />
              </Link>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  ) : (
    <Loading />
  );
};
