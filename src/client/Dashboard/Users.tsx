import { gql } from "@apollo/client";
import { SimpleGrid } from "@chakra-ui/layout";
import { Link } from "miracle-tv-client/components/ui/Link";
import { UserPanel } from "miracle-tv-client/components/ui/users/UserPanel";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { useUsersDirectoryQuery } from "miracle-tv-shared/hooks";

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
  const { data: { userDirectory = [] } = {} } = useUsersDirectoryQuery();
  return (
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
  );
};
