import React, { useCallback } from "react";

import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";

type Props = {
  isShallow?: boolean;
  isDisabled?: boolean;
} & LinkProps;

export const Link = ({
  isShallow = true,
  isDisabled = false,
  href,
  ...props
}: Props) => {
  const { push } = useRouter();

  const onClick = useCallback(
    (e: any) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      if (!props.target) {
        e.preventDefault();
        push(href, null, { shallow: isShallow });
      }
    },
    [push, href, isShallow]
  );

  return <ChakraLink {...props} href={href} onClick={onClick} />;
};
