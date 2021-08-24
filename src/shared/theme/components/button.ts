import { mode } from "@chakra-ui/theme-tools";

export const buttonStyles = {
  baseStyle: {
    textTransform: "uppercase",
    borderRadius: "4px",
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
