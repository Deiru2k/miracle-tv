import { mode } from "@chakra-ui/theme-tools";
export const headingStyles = {
  baseStyle: (props: any) => {
    const color = mode("primary.400", "white")(props);
    return {
      color,
    };
  },
};
