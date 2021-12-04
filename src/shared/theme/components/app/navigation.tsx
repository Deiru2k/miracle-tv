export const navigationStyles = {
  parts: ["menu", "header", "divider", "link", "content"],
  baseStyle: ({ colorMode }: any) => {
    const bgColor =
      colorMode === "dark" ? "var(--chakra-colors-secondary-400)" : "white";

    return {
      container: {
        h: "100%",
        padding: 2,
      },
      header: {
        fontSize: "lg",
      },
      menu: {
        flex: 2,
        alignItems: "flex-start",
        marginRight: 4,
        backgroundColor: bgColor,
        padding: 2,
      },
      content: {
        flex: 10,
        alignSelf: "flex-start",
        maxHeight: "100%",
        overflowY: "auto",
        padding: 2,
        backgroundColor: bgColor,
      },
    };
  },
};
