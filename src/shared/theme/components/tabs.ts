import { mode } from "@chakra-ui/theme-tools";

export const tabsStyles = {
  variants: {
    line: (props: any) => {
      const lineColor = mode(
        "var(--chakra-colors-secondary-300)",
        "var(--chakra-colors-secondary-400)"
      )(props);
      const lineActiveColor = mode(
        "var(--chakra-colors-primary-200)",
        "var(--chakra-colors-primary-300)"
      )(props);
      const textActiveColor = mode(
        "var(--chakra-colors-primary-400)",
        "var(--chakra-colors-primary-200)"
      )(props);
      const textColor = mode(
        "secondaryText.light",
        "secondaryText.dark"
      )(props);
      return {
        root: {
          borderColor: lineColor,
        },
        tabList: {
          color: lineColor,
        },
        tab: {
          color: textColor,
          _selected: {
            color: textActiveColor,
            borderColor: lineActiveColor,
          },
          _active: {
            color: textActiveColor,
            borderColor: lineActiveColor,
          },
        },
      };
    },
  },
};
