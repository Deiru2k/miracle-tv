export const menuStyles = {
  baseStyles: {
    list: {
      borderRadius: 0,
    },
  },
  variants: {
    solid: {
      list: {
        border: "none",
        bgColor: "secondary.400",
        py: 0,
        borderRadius: "4px",
      },
      item: {
        px: 2,
        _focus: {
          bgColor: "secondary.600",
          color: "white",
        },
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
};
