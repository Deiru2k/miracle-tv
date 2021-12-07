export const navbarStyles = {
  parts: ["navbar"],
  baseStyle: ({ colorMode }: any) => {
    const boxShadow =
      colorMode === "dark"
        ? "0px 9px 8px 0px rgba(34, 60, 80, 0.5)"
        : "0px 9px 8px 0px rgba(34, 60, 80, 0.1)";
    return {
      navbar: {
        display: "flex",
        width: "100%",
        height: "50px",
        position: "fixed",
        top: 0,
        left: 0,
        bgColor: "primary.500",
        color: "white",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        boxShadow,
      },
    };
  },
};
