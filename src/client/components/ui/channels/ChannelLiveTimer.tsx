import { Text } from "@chakra-ui/layout";
import { DateTime } from "luxon";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  createdAt?: DateTime;
};

const formatNumber = (n: number): string => {
  const absN = Math.abs(n);
  if (absN < 10) {
    return `0${absN.toFixed(0)}`;
  }
  return `${absN.toFixed(0)}`;
};

export const ChannelLiveTimer = ({ createdAt }: Props) => {
  const [duration, setDuration] = useState<string>("00:00:00:00");

  const updateDuration = useCallback(() => {
    if (createdAt) {
      const diff = createdAt.diffNow(["days", "hours", "minutes", "seconds"]);
      setDuration(
        `${formatNumber(diff.days)}:${formatNumber(diff.hours)}:${formatNumber(
          diff.minutes
        )}:${formatNumber(diff.seconds)}`
      );
    } else {
      setDuration("00:00:00:00");
    }
  }, [createdAt, setDuration]);

  useEffect(() => {
    const interval = setInterval(updateDuration, 1000);
    return () => {
      setDuration("00:00:00:00");
      clearInterval(interval);
    };
  }, []);

  return <Text as="span">{duration}</Text>;
};
