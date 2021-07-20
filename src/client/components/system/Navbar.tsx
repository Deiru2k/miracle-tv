import React, { useCallback, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BurgerMenuIcon } from "../icons/BurgerMenu";
import { Sidebar } from "./Sidebar";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { UserMenu } from "../ui/UserMenu";

export const Navbar = () => {
  const { push } = useRouter();
  const defaultUrl: string = "/";
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setSidebarOpen]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, [setSidebarOpen]);

  const goToDefault = useCallback(() => {
    push(defaultUrl);
  }, [push, defaultUrl]);

  const { user, logout } = useCurrentUser();

  const bgColor = useColorModeValue("primary.400", "primary.500");
  const color = useColorModeValue("text.light", "text.dark");

  return (
    <>
      <Flex
        width="100%"
        position="sticky"
        top={0}
        left={0}
        align="center"
        zIndex={9999999}
      >
        <Flex
          width="100%"
          align="center"
          position="sticky"
          bgColor={bgColor}
          color={color}
          p={5}
          height={16}
          boxShadow="0px 2px 26px -9px rgba(0,0,0,0.75)"
          zIndex={9999999}
          justify="space-between"
        >
          <Flex h="100%" align="center">
            {user && (
              <IconButton
                aria-label="Side Menu"
                variant="link"
                color={color}
                fontSize={35}
                icon={<BurgerMenuIcon />}
                onClick={toggleSidebar}
                mr={5}
              />
            )}
            <Heading
              as={(props) => <Button {...props} variant="ghost" />}
              textTransform="none"
              p={0}
              m={0}
              cursor="pointer"
              onClick={goToDefault}
              color={color}
            >
              Miracle TV
            </Heading>
          </Flex>
          <Flex h="100%" align="center">
            {user && <UserMenu />}
            {!user && <Link href="/auth/login">Login</Link>}
          </Flex>
        </Flex>
        {user && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}
      </Flex>
    </>
  );
};
