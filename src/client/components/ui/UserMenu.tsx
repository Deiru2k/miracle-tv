import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon, LockIcon, SettingsIcon } from "@chakra-ui/icons";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

type LinkProps = {
  url: string;
  label: string;
  icon: React.ReactNode;
};

const MenuLink = ({ url, label, icon }: LinkProps) => {
  const { asPath } = useRouter();
  const isActive = asPath === url;
  return (
    <Link href={url}>
      <MenuItem bgColor={isActive ? "primary.500" : undefined}>
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
  const { user, logout } = useCurrentUser();
  return (
    <>
      <Menu variant="solid">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          textTransform="none"
        >
          {user?.displayName || user?.username}
        </MenuButton>
        <MenuList>
          <MenuLink
            url="/profile"
            label="Profile"
            icon={<SettingsIcon aria-label="Settings" variant="ghost" mr={2} />}
          />
          <MenuLink
            url="/user/settings"
            label="Settings"
            icon={<SettingsIcon aria-label="Settings" variant="ghost" mr={2} />}
          />
          <MenuItem onClick={logout}>
            <LockIcon aria-label="Log Out" variant="ghost" mr={2} />
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
