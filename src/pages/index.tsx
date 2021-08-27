import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Box, Flex, Button, Link } from "@chakra-ui/react";
import { signOut, useCurrentUser } from "miracle-tv-client/hooks/auth";

const Home = () => {
  const { currentUser } = useCurrentUser();
  return (
    <AuthRedirect>
      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <Box>Lmao, {currentUser?.username}</Box>
        <Flex justify="space-between">
          <Link href="/settings/profile">Settings</Link>
        </Flex>
        <Button mt={6} onClick={signOut}>
          Sign Out
        </Button>
      </Flex>
    </AuthRedirect>
  );
};

export default Home;
