import { mode } from "@chakra-ui/theme-tools";
export const menuStyles = {
  baseStyles: {
    list: {
      borderRadius: 0,
    },
  },
  variants: {
    solid: (props: any) => {
      const bgColor = mode("white", "secondary.400")(props);
      const bgColorActive = mode("primary.300", "primary.400")(props);
      const color = mode("secondaryText.light", "text.dark")(props);
      const colorActive = mode("text.light", "text.dark")(props);
      return {
        list: {
          border: "none",
          bgColor,
          color,
          py: 0,
          borderRadius: "4px",
        },
        item: {
          px: 2,
          _focus: {
            bgColor: bgColorActive,
            color: colorActive,
          },
        },
      };
    },
  },
  defaultProps: {
    variant: "solid",
  },
};
