import React, { useEffect } from "react";

import { AtSignIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
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
  useCurrentUser,
  useCurrentUserSettings,
} from "miracle-tv-client/hooks/auth";
import { LogoutIcon } from "miracle-tv-client/components/icons/LogoutIcon";
import { ThemeSwitcher } from "miracle-tv-client/components/ui/ThemeSwitcher";
import { Link } from "miracle-tv-client/components/ui/Link";
import { HomeIcon } from "../icons/HomeIcon";
import { Avatar } from "miracle-tv-client/components/ui/Avatar";
import { LiveUpdateSwitch } from "miracle-tv-client/context/liveUpdate";

export const Navbar = () => {
  const { currentUser, isUserCalled, isUserLoading, logout } = useCurrentUser();
  const { currentSettings, isSettingsLoading, refetchSettings } =
    useCurrentUserSettings();

  useEffect(() => {
    if (currentUser?.id && !currentSettings) refetchSettings();
  }, [currentUser?.id]);

  const styles = useMultiStyleConfig("Navbar", {});

  return (
    <Flex __css={styles.navbar} zIndex={10}>
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
                  <Link href={`/user/${currentUser.username}`} w="100%">
                    <AtSignIcon mr={2} />
                    Your profile page
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/settings/user/profile" w="100%">
                    <SettingsIcon mr={2} />
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem closeOnSelect={false}>
                  <ThemeSwitcher />
                </MenuItem>
                <MenuItem closeOnSelect={false}>
                  <LiveUpdateSwitch />
                </MenuItem>
                <MenuItem onClick={logout}>
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
