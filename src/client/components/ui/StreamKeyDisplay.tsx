import { CopyIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FlexProps,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { MediaQuery } from "miracle-tv-client/utils/const";
import { useMediaQuery } from "miracle-tv-client/utils/css";
import React, { useCallback, useState } from "react";

type Props = {
  streamKey: string;
  channelId: string;
} & FlexProps;
export const StreamKeyDisplay = ({ streamKey, channelId, ...props }: Props) => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const passwordType = isVisible ? undefined : "password";
  const VisibleIcon = isVisible ? ViewOffIcon : ViewIcon;

  const copyKey = useCallback(() => {
    const fullKey = `${channelId}?key=${streamKey}`;
    navigator.clipboard.writeText(fullKey).then(
      function () {
        toast({ status: "success", title: "Stream key copied!" });
      },
      function () {
        toast({ status: "error", title: "Stream key copy failed :(" });
      }
    );
  }, [toast, streamKey, channelId]);

  return (
    <Flex {...props} direction={isMobile ? "column" : "row"}>
      <Input
        value={`${channelId}?key=${streamKey}`}
        readOnly
        type={passwordType}
        borderRightRadius={isMobile ? undefined : 0}
        borderRight={isMobile ? undefined : 0}
        mb={isMobile ? 1 : undefined}
      />
      <IconButton
        aria-label="Show / Hide password"
        icon={<VisibleIcon />}
        onClick={() => setIsVisible(!isVisible)}
        mb={isMobile ? 1 : undefined}
      />
      <IconButton
        aria-label="Copy stream key"
        icon={<CopyIcon />}
        borderLeftWidth="1px"
        borderLeftStyle={isMobile ? undefined : "solid"}
        borderLeftColor={isMobile ? undefined : "primary.500"}
        borderRightRadius={isMobile ? undefined : "4px"}
        onClick={copyKey}
        mb={isMobile ? 1 : undefined}
      />
    </Flex>
  );
};
