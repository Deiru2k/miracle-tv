import { mode } from "@chakra-ui/theme-tools";

export const buttonStyles = {
  baseStyle: {
    textTransform: "uppercase",
    borderRadius: "4px",
  },
  variants: {
    solid: (props: any) => {
      const bgColor = mode("primary.400", "primary.500")(props);
      const color = mode("text.light", "text.dark")(props);
      return {
        bgColor,
        color,
        _hover: {
          bg: mode("primary.300", "primary.400")(props),
        },
        _active: {
          bg: mode("primary.300", "primary.400")(props),
        },
      };
    },
    ghost: {
      color: "white",
      bgColor: "transparent",
    },
  },
  defaultProps: {
    colorScheme: "primary",
  },
};
