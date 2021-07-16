import { Box, Text, Flex, Heading, VStack } from "@chakra-ui/react";

import { gql } from "@apollo/client";
import { useDashboardQuery } from "miracle-tv-shared/hooks";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";

gql`
  query Dashboard {
    self {
      channels {
        id
        name
        slug
        description
        activity {
          id
          name
          icon
          image
          verb
        }
      }
    }
  }
`;

const TestPage = () => {
  const { user } = useCurrentUser();
  const { data: { self } = {} } = useDashboardQuery({ skip: !user });

  return (
    <>
      <AuthRedirect />
      <Flex w="100%" h="100%" justify="center" align="center">
        <Heading>Dashboard</Heading>
        <VStack>
          {self?.channels?.map((channel) => (
            <Box>
              <Text>{channel.name}</Text>
            </Box>
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default TestPage;
