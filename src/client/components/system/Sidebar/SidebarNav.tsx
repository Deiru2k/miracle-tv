import { Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";

type LinkConfig = {
  url: string;
  label: string;
};

type Props = {
  links?: LinkConfig[];
  onClose?: () => void;
};

type SidebarLinkProps = {
  onClose?: () => void;
  colorMode?: "dark" | "light";
} & LinkConfig &
  FlexProps;

const SidebarLink = ({ url, label, onClose }: SidebarLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === url;
  const bgColor = useColorModeValue("primary.500", "primary.500");
  const activeBgColor = useColorModeValue("primary.400", "primary.400");
  const flexStyle: FlexProps = {
    w: "100%",
    fontSize: "1.7rem",
    px: 5,
    py: 2,
    bgColor: isActive ? bgColor : "transparent",
    borderTopWidth: isActive ? 4 : 0,
    borderBottomWidth: isActive ? 4 : 0,
    borderStyle: "solid",
    borderColor: "transparent",
    // justify: "center",
    _hover: {
      bgColor: activeBgColor,
      cursor: "pointer",
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderStyle: "solid",
      borderColor: "transparent",
      transition: "all 0.1s ease-in-out",
    },
    transition: "all 0.1s ease",
    color: "white",
  };
  const onClick = useCallback(() => {
    router.push(url);
    onClose?.();
  }, [router, onClose, url]);
  return (
    <Flex {...flexStyle} onClick={onClick}>
      {label}
    </Flex>
  );
};

export const SidebarNav = ({ links = [], onClose }: Props) => {
  return (
    <Flex width="100%" direction="column">
      {links.map((link) => (
        <SidebarLink key={link.url} {...link} onClose={onClose} />
      ))}
    </Flex>
  );
};
