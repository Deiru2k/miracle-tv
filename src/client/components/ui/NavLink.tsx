import { Button, ButtonProps, useStyleConfig } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";

type Props = {
  href: string;
  isActive?: boolean;
} & ButtonProps;

export const NavLink = ({ isActive, href, ...props }: Props) => {
  const { push } = useRouter();
  const styles = useStyleConfig("NavLink", { isActive, ...props });

  const onClick = useCallback(() => {
    push(href, null, { shallow: true });
  }, []);

  return <Button {...props} sx={styles} variant="link" onClick={onClick} />;
};
