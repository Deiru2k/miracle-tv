import {
  PLFlagIcon,
  RussianFlagIcon,
  USFlagIcon,
} from "miracle-tv-client/components/icons/flags";
import React from "react";

export type LocaleItem = {
  name: string;
  code: string;
  flag: React.ReactNode;
};

export type LocaleKey = keyof typeof localesMap;

export const locales: LocaleItem[] = [
  { name: "English", code: "en", flag: <USFlagIcon mr={1} /> },
  { name: "Русский", code: "ru", flag: <RussianFlagIcon mr={1} /> },
  { name: "Polski", code: "pl", flag: <PLFlagIcon mr={1} /> },
];

export const localesMap: Record<LocaleItem["code"], LocaleItem> =
  locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale.code]: locale,
    }),
    {}
  );
