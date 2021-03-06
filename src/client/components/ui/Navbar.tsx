import React, { useEffect, useMemo } from "react";

import {
  AtSignIcon,
  ChevronDownIcon,
  InfoIcon,
  QuestionIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spinner,
  Text,
  useMultiStyleConfig,
  MenuDivider,
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
import { useMediaQuery } from "miracle-tv-client/utils/css";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { hasAdminPanelAccess } from "miracle-tv-shared/acl/utils";
import { LocaleSwitcher } from "miracle-tv-client/context/locale";
import { useTranslation } from "next-i18next";

export const Navbar = () => {
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const { currentUser, isUserCalled, isUserLoading, logout } = useCurrentUser();
  const { currentSettings, isSettingsLoading, refetchSettings } =
    useCurrentUserSettings();
  const hasAdminAccesss = useMemo(
    () => hasAdminPanelAccess(currentUser?.roles ?? []),
    [currentUser]
  );

  useEffect(() => {
    if (currentUser?.id && !currentSettings) refetchSettings();
  }, [currentUser?.id]);

  const { t: tCommon } = useTranslation("common");
  const styles = useMultiStyleConfig("Navbar", {});

  return (
    <Flex __css={styles.navbar} zIndex={10}>
      <Box>
        <Link
          href="/"
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none" }}
        >
          <Image src="/logo.png" maxHeight="40px" mr={2} />
          {!isMobile && <Heading size="lg">Miracle TV</Heading>}
        </Link>
      </Box>
      <HStack>
        {isUserCalled && !isUserLoading && !currentUser && (
          <>
            <Link as={Button} href="/auth/login" minWidth="unset">
              {tCommon("login")}
            </Link>
            <Link as={Button} href="/auth/sign-up" minWidth="unset">
              {tCommon("signup")}
            </Link>
            <ThemeSwitcher isShort />
            <LocaleSwitcher isShort />
          </>
        )}
        {isUserCalled && !isUserLoading && !!currentUser && (
          <Menu>
            <MenuButton variant="ghost" px={0} aria-label="Open user menu">
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
                {!isMobile && (
                  <Text>
                    {currentUser?.displayName || currentUser?.username}{" "}
                  </Text>
                )}
                <ChevronDownIcon />
              </HStack>
            </MenuButton>
            <Portal>
              <MenuList zIndex={99999}>
                <MenuItem>
                  <Link href="/dashboard/home/streams" w="100%">
                    <HomeIcon mr={2} />
                    {tCommon("navbar_menu_dashboard")}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`/user/${currentUser.username}`} w="100%">
                    <AtSignIcon mr={2} />
                    {tCommon("navbar_menu_profile-page")}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/settings/user/profile" w="100%">
                    <SettingsIcon mr={2} />
                    {tCommon("navbar_menu_settings")}
                  </Link>
                </MenuItem>
                {hasAdminAccesss && (
                  <MenuItem>
                    <Link href="/admin" w="100%">
                      <InfoIcon mr={2} />
                      {tCommon("navbar_menu_admin")}
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link href="/help/obs" target="_blank" w="100%">
                    <QuestionIcon mr={2} />
                    {tCommon("navbar_menu_obs")}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/about" target="_blank" w="100%">
                    {tCommon("navbar_menu_landing")}
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem closeOnSelect={false}>
                  <LocaleSwitcher />
                </MenuItem>
                <MenuItem closeOnSelect={false}>
                  <ThemeSwitcher />
                </MenuItem>
                <MenuItem closeOnSelect={false}>
                  <LiveUpdateSwitch />
                </MenuItem>
                <MenuItem onClick={logout}>
                  <LogoutIcon mr={2} /> {tCommon("auth-logout")}
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
