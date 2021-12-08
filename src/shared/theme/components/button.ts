import { mode } from "@chakra-ui/theme-tools";

export const buttonStyles = {
  baseStyle: {
    textTransform: "uppercase",
    borderRadius: "0",
  },
  variants: {
    ghost: {
      color: "white",
      bgColor: "transparent",
    },
  },
  defaultProps: {
    colorScheme: "primary",
  },
};
