import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import React from "react";
import { LogoutIcon } from "../icons/LogoutIcon";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Navbar = () => {
  const { currentUser } = useCurrentUser();
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
        <Heading>Miracle TV</Heading>
      </Box>
      <Box>
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
              <MenuItem>
                <LogoutIcon mr={2} /> Logout
              </MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
