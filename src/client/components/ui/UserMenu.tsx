import React from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  LockIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { UserInfo } from "./UserInfo";

type LinkProps = {
  url: string;
  label: string;
  icon: React.ReactNode;
};

const MenuLink = ({ url, label, icon }: LinkProps) => {
  const { asPath } = useRouter();
  const isActive = asPath === url;
  const bgColorActive = useColorModeValue("primary.400", "primary.400");
  const colorActive = useColorModeValue("text.light", "text.dark");
  return (
    <Link href={url}>
      <MenuItem
        bgColor={isActive ? bgColorActive : undefined}
        color={isActive ? colorActive : undefined}
      >
        <>
          {icon}
          {label}
        </>
      </MenuItem>
    </Link>
  );
};
//

export const UserMenu = () => {
  const { currentUser, logout } = useCurrentUser();
  const { colorMode, toggleColorMode } = useColorMode();

  const activeButtonColor = useColorModeValue("primary.300", "primary.400");
  const color = useColorModeValue("text.light", "text.dark");

  return (
    <>
      <Menu variant="solid">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="ghost"
          textTransform="none"
          _active={{
            color,
            bg: activeButtonColor,
          }}
        >
          <UserInfo user={currentUser} />
        </MenuButton>
        <MenuList>
          <MenuLink
            url={`/users/${currentUser?.id}`}
            label="Profile"
            icon={<SettingsIcon aria-label="Settings" variant="ghost" mr={2} />}
          />
          <MenuLink
            url="/settings"
            label="Settings"
            icon={<SettingsIcon aria-label="Settings" variant="ghost" mr={2} />}
          />
          <MenuItem onClick={logout}>
            <LockIcon aria-label="Log Out" variant="ghost" mr={2} />
            Sign Out
          </MenuItem>
          <MenuItem
            closeOnSelect={false}
            onClick={toggleColorMode}
            _active={{ bg: "transparent" }}
            _pressed={{ bg: "transparent" }}
          >
            <Flex w="100%" h="100%" align="center">
              {colorMode === "dark" && <MoonIcon mr={2} />}
              {colorMode !== "dark" && <SunIcon mr={2} />}
              <Switch
                mr={2}
                pointerEvents="none"
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
              {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
