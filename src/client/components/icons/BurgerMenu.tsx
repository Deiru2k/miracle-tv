import React from "react";
import { Icon, IconProps } from "@chakra-ui/icon";

export const BurgerMenuIcon = (props: IconProps) => (
  <Icon viewBox="0 0 100 80" {...props}>
    <rect width="100" height="20" fill="currentcolor"></rect>
    <rect y="30" width="100" height="20" fill="currentcolor"></rect>
    <rect y="60" width="100" height="20" fill="currentcolor"></rect>
  </Icon>
);
