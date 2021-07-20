import { mode } from "@chakra-ui/theme-tools";

export const tabsStyles = {
  variants: {
    line: (props: any) => {
      const lineColor = mode("secondary.300", "secondary.400")(props);
      const lineActiveColor = mode("primary.200", "primary.300")(props);
      const textActiveColor = mode("primary.400", "primary.200")(props);
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
