import { useCallback, useMemo, useState } from "react";

type UseAgeGateReturn = [
  checkMature: boolean,
  setCheckMature: (v: boolean) => void
];

export const useAgeGate = (channelId: string): UseAgeGateReturn => {
  let savedChannels: Record<string, boolean> = {};
  try {
    savedChannels = JSON.parse(localStorage.getItem("ageGates")) || {};
  } finally {
  }

  const [ageGates, setAgeGates] =
    useState<Record<string, boolean>>(savedChannels);

  const channelGate = useMemo(
    () => ageGates[channelId] ?? false,
    [savedChannels]
  );
  const changeChannelGate = useCallback(
    (v: boolean) => {
      const newGates = { ...ageGates, [channelId]: v };
      localStorage.setItem("ageGates", JSON.stringify(newGates));
      setAgeGates(newGates);
    },
    [ageGates, setAgeGates, channelId]
  );

  return [channelGate, changeChannelGate];
};
