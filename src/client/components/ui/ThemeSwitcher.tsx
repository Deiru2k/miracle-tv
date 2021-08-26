import { Box, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

export const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box onClick={toggleColorMode}>
      {colorMode === "dark" && <MoonIcon mr={2} />}
      {colorMode !== "dark" && <SunIcon mr={2} />}
      <Switch
        mr={2}
        pointerEvents="none"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
      />
      {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
    </Box>
  );
};
