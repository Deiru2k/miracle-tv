import { transparentize } from "@chakra-ui/theme-tools";

export const navigationStyles = {
  parts: ["menu", "header", "divider", "link", "content"],
  baseStyle: ({ colorMode }: any) => {
    const lightBg = transparentize("text.primary", 0.04);
    const bgColorMenu =
      colorMode === "dark" ? "var(--chakra-colors-secondary-400)" : lightBg;
    const bgColorContent = "transparent";
    const boxShadow =
      colorMode === "dark"
        ? "0px 0px 10px 0px rgba(34, 60, 80, 0.5) inset"
        : undefined;

    return {
      container: {
        h: "100%",
      },
      header: {
        fontSize: "lg",
      },
      menu: {
        flex: 2,
        alignItems: "flex-start",
        marginRight: 4,
        backgroundColor: bgColorMenu,
        padding: 2,
        boxShadow,
      },
      content: {
        flex: 10,
        alignSelf: "flex-start",
        height: "100%",
        overflowY: "auto",
        pl: 2,
        pr: 6,
        pt: 6,
        pb: 2,
        backgroundColor: bgColorContent,
      },
    };
  },
};
