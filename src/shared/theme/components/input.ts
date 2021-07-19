import cn from "classnames";

export const inputStyles = {
  variants: {
    solid: ({ colorScheme }: any) => {
      return {
        field: {
          bgColor: cn({
            "secondary.400": colorScheme === "secondary",
            "secondary.600": colorScheme === "primary",
          }),
          borderRadius: "4px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: cn({
            "primary.500": colorScheme === "primary",
            "secondary.400": colorScheme === "secondary",
          }),
          color: cn({
            white: colorScheme === "primary" || colorScheme === "secondary",
          }),
        },
      };
    },
  },
  defaultProps: {
    variant: "solid",
    colorScheme: "primary",
  },
};
