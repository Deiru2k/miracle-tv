import { Flex, FlexProps } from "@chakra-ui/react";
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

type SidebarLinkProps = { onClose?: () => void } & LinkConfig;

const SidebarLink = ({ url, label, onClose }: SidebarLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === url;
  const flexStyle: FlexProps = {
    w: "100%",
    fontSize: "1.7rem",
    px: 5,
    py: 2,
    bgColor: isActive ? "primary.500" : "none",
    borderTopWidth: isActive ? 4 : 0,
    borderBottomWidth: isActive ? 4 : 0,
    borderStyle: "solid",
    borderColor: "transparent",
    // justify: "center",
    _hover: {
      bgColor: "secondary.600",
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
