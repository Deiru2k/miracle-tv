import { extendTheme } from "@chakra-ui/react";
import colors from "miracle-tv-shared/theme/colors";
import components from "miracle-tv-shared/theme/components";

import { createBreakpoints } from "@chakra-ui/theme-tools";
const breakpoints = createBreakpoints({
  sm: "35rem",
  md: "54rem",
  lg: "63rem",
  xl: "90rem",
  "2xl": "180rem",
});

const theme = extendTheme({
  colors,
  components,
  breakpoints,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
