import { mode, transparentize } from "@chakra-ui/theme-tools";

export const inputStyles = {
  variants: {
    solid: (props: any) => {
      const bgColor = mode("white", "secondary.500")(props);
      const borderColor = mode("primary.500", "primary.200")(props);
      const borderColorFocus = mode("secondary.500", "secondary.200")(props);
      const shadowColor = transparentize(
        mode("primary.500", "primary.200")(props),
        mode(0.9, 0.4)(props)
      )(props.theme);
      return {
        field: {
          bgColor,
          borderColor,
          borderRadius: "6px",
          borderWidth: "1px",
          borderStyle: "solid",
          transition: "all 0.5s ease-in",
          _placeholder: {
            color: mode("secondary.500", "secondary.200")(props),
          },
          _focus: {
            borderColor: borderColorFocus,
            transition: "all 0.5s ease-out",
          },
        },
      };
    },
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "primary",
  },
};
