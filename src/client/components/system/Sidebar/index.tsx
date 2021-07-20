import { Flex, FlexProps } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SidebarNav } from "miracle-tv-client/components/system/Sidebar/SidebarNav";
import { useCurrentUser } from "miracle-tv-client/hooks/auth";
import { User } from "miracle-tv-shared/graphql";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

const links = (user: Partial<User>) => [
  { url: "/home", label: "Home" },
  { url: "/feed", label: "Feed" },
  { url: `/users/${user?.id}`, label: "Profile" },
  { url: "/subscriptions", label: "Subscriptions" },
  { url: "/dashboard", label: "Dashboard" },
];

export const Sidebar = ({ isOpen, onClose = () => {} }: Props) => {
  const { user } = useCurrentUser();
  const sidebarStyles: FlexProps = {
    w: ["35vw", "20vw"],
    left: isOpen ? 0 : ["-35vw", "-20vw"],
    boxShadow: isOpen ? "2px 0px 26px -9px rgba(0,0,0,0.75)" : "none",
  };

  const navLinks = useMemo(() => links(user as User), [user]);

  return (
    <Flex
      position="fixed"
      overflowX="hidden"
      top={16}
      transition="all 0.3s ease-in-out"
      h="calc(100vh - var(--chakra-sizes-16))"
      bgColor="secondary.400"
      color="black"
      zIndex={9999998}
      {...sidebarStyles}
    >
      <SidebarNav links={navLinks} onClose={onClose} />
    </Flex>
  );
};
