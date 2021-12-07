import { mode, transparentize } from "@chakra-ui/theme-tools";

export const textareaStyles = {
  variants: {
    solid: (props: any) => {
      const bgColor = mode("white", "secondary.500")(props);
      const borderColorFocus = transparentize(
        mode("primary.500", "primary.200")(props),
        mode(0.3, 0.5)(props)
      )(props.theme);
      const borderColor = transparentize(
        "primary.500",
        mode(0.3, 0.5)(props)
      )(props.theme);
      return {
        background: "none",
        backgroundColor: bgColor,
        borderColor,
        borderRadius: "6px",
        borderWidth: "1px",
        borderStyle: "solid",
        transition: "all 0.1s ease-in",
        py: 4,
        _placeholder: {
          color: mode("secondary.500", "secondary.200")(props),
        },
        _focus: {
          borderColor: borderColorFocus,
          transition: "all 0.1s ease-out",
        },
      };
    },
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "primary",
  },
};
