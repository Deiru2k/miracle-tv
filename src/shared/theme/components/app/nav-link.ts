export const navLinkStyles = {
  baseStyle: ({ colorMode, isActive }: any) => {
    const linkColorInactive =
      colorMode === "dark" ? "primary.200" : "primary.500";
    const linkColorActive = colorMode === "dark" ? "white" : "white";
    const color = isActive ? linkColorActive : linkColorInactive;
    const bgColor = isActive ? "primary.500" : "transparent";
    const borderLeftWidth = isActive ? "var(--chakra-space-2)" : 0;
    const borderLeftColor = isActive ? "primary.500" : "transparent";

    return {
      w: "100%",
      p: 2,
      pl: 0,
      borderLeftWidth,
      borderLeftColor,
      color,
      bgColor,
      borderRadius: 0,
      justifyContent: "flex-start",
      textTransform: "none",
      transition: "all 0.2s ease-in-out",
      boxSizing: "border-box",
      overflow: "hidden",
      _hover: {
        borderLeftWidth: "var(--chakra-space-2)",
        color: "white",
        bgColor: "primary.500",
      },
    };
  },
};
