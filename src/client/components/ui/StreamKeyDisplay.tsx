import { CopyIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FlexProps,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

type Props = {
  streamKey: string;
} & FlexProps;
export const StreamKeyDisplay = ({ streamKey, ...props }: Props) => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const passwordType = isVisible ? undefined : "password";
  const VisibleIcon = isVisible ? ViewOffIcon : ViewIcon;

  const copyKey = useCallback(() => {
    navigator.clipboard.writeText(streamKey).then(
      function () {
        toast({ status: "success", title: "Stream key copied!" });
      },
      function () {
        toast({ status: "error", title: "Stream key copy failed :(" });
      }
    );
  }, [toast, streamKey]);

  return (
    <Flex {...props}>
      <Input
        value={streamKey}
        type={passwordType}
        borderRightRadius={0}
        borderRight={0}
      />
      <IconButton
        aria-label="Show / Hide password"
        icon={<VisibleIcon />}
        onClick={() => setIsVisible(!isVisible)}
      />
      <IconButton
        aria-label="Copy stream key"
        icon={<CopyIcon />}
        borderLeftWidth="1px"
        borderLeftStyle="solid"
        borderLeftColor="primary.500"
        borderRightRadius="4px"
        onClick={copyKey}
      />
    </Flex>
  );
};
