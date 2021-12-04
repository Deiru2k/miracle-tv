import React, { useCallback } from "react";

import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

type Props = {
  isShallow?: boolean;
} & LinkProps;

export const Link = ({ isShallow = true, href, ...props }: Props) => {
  const { push } = useRouter();

  const onClick = useCallback(() => {
    push(href, null, { shallow: isShallow });
  }, [push, href, isShallow]);

  return <ChakraLink {...props} href={href} onClick={onClick} />;
};
