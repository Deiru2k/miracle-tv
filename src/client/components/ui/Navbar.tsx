import React from "react";

import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
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
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { signOut, useCurrentUser } from "miracle-tv-client/hooks/auth";
import { LogoutIcon } from "miracle-tv-client/components/icons/LogoutIcon";
import { ThemeSwitcher } from "miracle-tv-client/components/ui/ThemeSwitcher";
import { Link } from "miracle-tv-client/components/ui/Link";
import { HomeIcon } from "../icons/HomeIcon";

export const Navbar = () => {
  const { currentUser, isUserCalled, isUserLoading } = useCurrentUser();

  const styles = useMultiStyleConfig("Navbar", {});

  return (
    <Flex __css={styles.navbar}>
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
                <MenuItem>
                  <Link href="/dashboard/home/streams" w="100%">
                    <HomeIcon mr={2} /> Dashboard
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/settings" w="100%">
                    <SettingsIcon mr={2} /> Settings
                  </Link>
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
