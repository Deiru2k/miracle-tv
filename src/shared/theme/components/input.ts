import { mode, transparentize } from "@chakra-ui/theme-tools";

export const inputStyles = {
  variants: {
    solid: (props: any) => {
      const bgColor = mode("white", "secondary.600")(props);
      const borderColor = mode("primary.400", "primary.500")(props);
      const shadowColor = transparentize(
        mode("primary.100", "primary.200")(props),
        mode(0.9, 0.4)(props)
      )(props.theme);
      const color = mode("secondaryText.light", "secondaryText.dark")(props);
      return {
        field: {
          bgColor,
          borderColor,
          color,
          borderRadius: "4px",
          borderWidth: "2px",
          borderStyle: "solid",
          _focus: {
            boxShadow: `1px 1px 10px 1px ${shadowColor} inset`,
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
