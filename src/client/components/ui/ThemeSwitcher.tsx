import { Box, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";

type Props = {
  isShort?: boolean;
};

export const ThemeSwitcher = ({ isShort }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const modeMargin = isShort ? 0 : 2;
  return (
    <Box onClick={toggleColorMode} cursor="pointer">
      {colorMode === "dark" && <MoonIcon mr={modeMargin} />}
      {colorMode !== "dark" && <SunIcon mr={modeMargin} />}
      {!isShort && (
        <>
          <Switch
            mr={2}
            pointerEvents="none"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
          {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
        </>
      )}
    </Box>
  );
};
