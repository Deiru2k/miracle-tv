import { RepeatIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Switch } from "@chakra-ui/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";

type LiveUpdateContextType = {
  isLiveUpdate: boolean;
  setLiveUpdate: (v: boolean) => void;
};
export const LiveUpdateContext = createContext<LiveUpdateContextType>({
  isLiveUpdate: false,
  setLiveUpdate: (v: boolean) => {},
});

export const SetIsLiveFromLocalStorage = (): null => {
  const { setLiveUpdate } = useContext(LiveUpdateContext);

  useEffect(() => {
    const isLiveUpdate = localStorage.getItem("liveUpdate") === "true";
    setLiveUpdate(isLiveUpdate);
  }, []);

  return null;
};

export const LiveUpdateSwitch = (props: BoxProps) => {
  const { isLiveUpdate, setLiveUpdate } = useContext(LiveUpdateContext);

  const toggleLiveUpdate = useCallback(() => {
    localStorage.setItem("liveUpdate", String(!isLiveUpdate));
    setLiveUpdate(!isLiveUpdate);
  }, [isLiveUpdate, setLiveUpdate]);

  const { t: tCommon } = useTranslation("common");

  return (
    <Box onClick={toggleLiveUpdate} cursor="pointer" {...props}>
      <RepeatIcon mr={2} />
      <Switch
        mr={2}
        pointerEvents="none"
        isChecked={isLiveUpdate}
        onChange={toggleLiveUpdate}
      />
      {tCommon("live-update")}
    </Box>
  );
};

export const useLiveUpdate = () => {
  const { isLiveUpdate } = useContext(LiveUpdateContext);
  return isLiveUpdate;
};
