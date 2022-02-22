import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useTranslation } from "next-i18next";
import { LocaleKey, locales, localesMap } from "./const";
import { useRouter } from "next/router";

type LocaleContextType = {
  locale: LocaleKey;
  setLocale: (v: LocaleKey) => void;
};
export const LocaleContext = createContext<LocaleContextType>({
  locale: "en",
  setLocale: (_: LocaleKey) => {},
});

export const SetLocaleFromLocalStorage = (): null => {
  const { replace, asPath, locale } = useRouter();
  const { setLocale } = useContext(LocaleContext);

  useEffect(() => {
    const loc = localStorage.getItem("miracle-locale") ?? "en";
    setLocale(loc);
    if (loc !== locale) {
      replace(`/${asPath}`, null, { locale: loc });
    }
  }, []);

  return null;
};

type LocaleSwitcherProps = {
  isShort?: boolean;
} & Partial<MenuButtonProps>;

export const LocaleSwitcher = ({
  isShort = false,
  ...props
}: LocaleSwitcherProps) => {
  const { locale, setLocale } = useContext(LocaleContext);
  const { replace, asPath } = useRouter();

  const changeLocale = useCallback(
    (code: LocaleKey) => {
      localStorage.setItem("miracle-locale", code);
      setLocale(code);
      replace(`/${asPath}`, `${asPath}`, { locale: code });
    },
    [locale, setLocale, replace]
  );

  const currentLocale = useMemo(() => localesMap[locale], [locale]);

  return (
    <Menu>
      <MenuButton {...props} aria-label={currentLocale.name} w="100%">
        <Flex w="100%" align="center">
          {currentLocale.flag}&nbsp;
          {isShort ? "" : currentLocale.name}
        </Flex>
      </MenuButton>
      <Portal>
        <MenuList zIndex={99999}>
          {locales.map((loc) => (
            <MenuItem
              key={loc.code}
              onClick={() => changeLocale(loc.code)}
              aria-label={loc.name}
            >
              {loc.flag}&nbsp;{loc.name}{" "}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export const useLocale = () => {
  const { locale } = useContext(LocaleContext);
  return locale;
};
