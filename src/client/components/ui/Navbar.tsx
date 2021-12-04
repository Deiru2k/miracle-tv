import React from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { signOut, useCurrentUser } from "miracle-tv-client/hooks/auth";
import { LogoutIcon } from "miracle-tv-client/components/icons/LogoutIcon";
import { ThemeSwitcher } from "miracle-tv-client/components/ui/ThemeSwitcher";
import { Link } from "miracle-tv-client/components/ui/Link";

export const Navbar = () => {
  const { currentUser, isUserCalled, isUserLoading } = useCurrentUser();
  return (
    <Flex
      w="100%"
      h="50px"
      position="fixed"
      top={0}
      left={0}
      bgColor="primary.500"
      color="white"
      alignItems="center"
      justifyContent="space-between"
      px={4}
    >
      <Box>
        <Link as={Heading} href="/">
          Miracle TV
        </Link>
      </Box>
      <HStack>
        {isUserCalled && !isUserLoading && !currentUser && (
          <>
            <Link as={Button} href="/auth/login">
              Login
            </Link>
            <Link as={Button} href="/auth/sign-up">
              Sign Up
            </Link>
            <ThemeSwitcher isShort />
          </>
        )}
        {isUserCalled && !isUserLoading && !!currentUser && (
          <Menu>
            <MenuButton variant="ghost" px={0}>
              {currentUser?.displayName || currentUser?.username}{" "}
              <ChevronDownIcon ml={2} />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem closeOnSelect={false}>
                  <ThemeSwitcher />
                </MenuItem>
                <MenuItem onClick={signOut}>
                  <LogoutIcon mr={2} /> Logout
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;