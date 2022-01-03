import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Switch } from "@chakra-ui/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

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

export const LiveUpdateSwitch = () => {
  const { isLiveUpdate, setLiveUpdate } = useContext(LiveUpdateContext);

  const toggleLiveUpdate = useCallback(() => {
    localStorage.setItem("liveUpdate", String(!isLiveUpdate));
    setLiveUpdate(!isLiveUpdate);
  }, [isLiveUpdate, setLiveUpdate]);

  return (
    <Box onClick={toggleLiveUpdate} cursor="pointer">
      <RepeatIcon mr={2} />
      <Switch
        mr={2}
        pointerEvents="none"
        isChecked={isLiveUpdate}
        onChange={toggleLiveUpdate}
      />
      Live Update
    </Box>
  );
};

export const useLiveUpdate = () => {
  const { isLiveUpdate } = useContext(LiveUpdateContext);
  return isLiveUpdate;
};
