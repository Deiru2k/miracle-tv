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
import { CopyField } from "./CopyField";

type Props = {
  streamKey: string;
  channelId: string;
} & FlexProps;
export const StreamKeyDisplay = ({ streamKey, channelId, ...props }: Props) => {
  return (
    <CopyField value={`${channelId}?key=${streamKey}`} hideValue {...props} />
  );
};
