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
  value: string;
  isDisabled?: boolean;
  hideValue?: boolean;
} & FlexProps;

export const CopyField = ({
  value,
  hideValue = false,
  isDisabled = false,
  placeholder,
  ...props
}: Props) => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isMobile = useMediaQuery(MediaQuery.mobile);
  const passwordType = isVisible || !hideValue ? undefined : "password";
  const VisibleIcon = isVisible ? ViewOffIcon : ViewIcon;

  const copyKey = useCallback(() => {
    const fullKey = value;
    navigator.clipboard.writeText(fullKey).then(
      function () {
        toast({ status: "success", title: "Copied to clipboard!" });
      },
      function () {
        toast({ status: "error", title: "Could not copy to clipboard" });
      }
    );
  }, [toast, value]);

  return (
    <Flex {...props} direction={isMobile ? "column" : "row"}>
      <Input
        value={value}
        readOnly
        isDisabled={isDisabled}
        type={passwordType}
        borderRightRadius={isMobile ? undefined : 0}
        borderRight={isMobile ? undefined : 0}
        placeholder={placeholder}
        mb={isMobile ? 1 : undefined}
        _hover={{
          cursor: isDisabled ? "not-allowed" : undefined,
        }}
      />
      {hideValue && (
        <IconButton
          aria-label="Show / Hide password"
          isDisabled={isDisabled}
          icon={<VisibleIcon />}
          onClick={() => setIsVisible(!isVisible)}
          mb={isMobile ? 1 : undefined}
        />
      )}
      <IconButton
        aria-label="Copy"
        isDisabled={isDisabled}
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
