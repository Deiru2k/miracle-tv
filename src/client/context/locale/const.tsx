import {
  PLFlagIcon,
  RussianFlagIcon,
  USFlagIcon,
} from "miracle-tv-client/components/icons/flags";

export type LocaleItem = {
  name: string;
  code: string;
};

export type LocaleKey = keyof typeof localesMap;

export const locales: LocaleItem[] = [
  { name: "English", code: "en" },
  { name: "Русский", code: "ru" },
  { name: "Polski", code: "pl" },
  { name: "Español", code: "es" },
];

export const localesMap: Record<LocaleItem["code"], LocaleItem> =
  locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale.code]: locale,
    }),
    {}
  );
