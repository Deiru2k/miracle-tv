import { AuthRedirect } from "miracle-tv-client/components/auth/Redirect";
import { Box, Flex, Button } from "@chakra-ui/react";
import { signOut, useCurrentUser } from "miracle-tv-client/hooks/auth";

const Home = () => {
  const { user } = useCurrentUser();
  return (
    <AuthRedirect>
      <Flex w="100%" h="100%" justify="center" align="center" direction="column">
        <Box>Lmao, {user?.username}</Box>
        <Button mt={6} onClick={signOut}>Sign Out</Button>
      </Flex>
    </AuthRedirect>
  )
}

export default Home;