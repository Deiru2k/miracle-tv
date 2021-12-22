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
  Spinner,
  Text,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import {
  signOut,
  useCurrentUser,
  useCurrentUserSettings,
} from "miracle-tv-client/hooks/auth";
import { LogoutIcon } from "miracle-tv-client/components/icons/LogoutIcon";
import { ThemeSwitcher } from "miracle-tv-client/components/ui/ThemeSwitcher";
import { Link } from "miracle-tv-client/components/ui/Link";
import { HomeIcon } from "../icons/HomeIcon";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";

export const Navbar = () => {
  const { currentUser, isUserCalled, isUserLoading } = useCurrentUser();
  const { currentSettings, isSettingsLoading } = useCurrentUserSettings();

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
              <HStack>
                {isSettingsLoading && <Spinner />}
                {!isSettingsLoading && (
                  <Avatar
                    borderRadius="50%"
                    username={currentUser?.username}
                    emailHash={currentUser?.emailHash}
                    useGravatar={currentSettings?.useGravatar}
                    aspectMaxH="25px"
                    aspectMaxW="25px"
                    imageId={currentUser.avatar?.filename}
                    bgColor="white"
                  />
                )}
                <Text>
                  {currentUser?.displayName || currentUser?.username}{" "}
                </Text>
                <ChevronDownIcon />
              </HStack>
            </MenuButton>
            <Portal>
              <MenuList zIndex={99999}>
                <MenuItem>
                  <Link href="/dashboard/home/streams" w="100%">
                    <HomeIcon mr={2} />
                    Dashboard
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/settings" w="100%">
                    <SettingsIcon mr={2} />
                    Settings
                  </Link>
                </MenuItem>
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
