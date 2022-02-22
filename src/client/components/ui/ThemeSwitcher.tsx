import { Box, BoxProps, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isShort?: boolean;
} & BoxProps;

export const ThemeSwitcher = ({ isShort, ...props }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const modeMargin = isShort ? 0 : 2;
  const { t: tCommon } = useTranslation("common");
  return (
    <Box onClick={toggleColorMode} cursor="pointer" {...props}>
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
          {colorMode === "dark" ? tCommon("dark-mode") : tCommon("light-mode")}
        </>
      )}
    </Box>
  );
};
