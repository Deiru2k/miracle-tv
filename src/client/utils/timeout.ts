import React, { useCallback, useState } from "react";

type TimeoutReturn = [
  start: () => void,
  timeoutRef: React.MutableRefObject<number>
];

export function useInterval(callback: Function, delay: number): TimeoutReturn {
  const timeoutRef = React.useRef<number>();
  const callbackRef = React.useRef(callback);
  const [isStarted, start] = useState<boolean>(false);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setTimeout kicks in, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // timeout will be reset.

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the timeout:

  React.useEffect(() => {
    timeoutRef.current = window.setInterval(() => callbackRef.current(), delay);

    // Clear timeout if the components is unmounted or the delay changes:
    return () => window.clearTimeout(timeoutRef.current);
  }, [delay, isStarted]);

  const useStart = useCallback(() => start(true), [start]);

  // In case you want to manually clear the timeout from the consuming component...:
  return [useStart, timeoutRef];
}
