import { useEffect, useState } from "react";

export enum StreamLayoutTheme {
  GREEN = "green",
  RED = "red",
}

export const HOURINMS = 60 * 60 * 1000;
const MS_IN_A_DAY = 24 * HOURINMS;

export const STARS_FADE_IN_START = 19 * HOURINMS;
export const STARS_FADE_IN_STOP = 22 * HOURINMS;
export const STARS_FADE_OUT_START = 5 * HOURINMS;
export const STARS_FADE_OUT_STOP = 8 * HOURINMS;

// default 1
export const SPEED = 1;

// in miliseconds
const UPDATE_RATE = 100;

const getMsOfDay = (currentTime: Date) => {
  const totalMs =
    currentTime.getHours() * 60 * 60 * 1000 +
    currentTime.getMinutes() * 60 * 1000 +
    currentTime.getSeconds() * 1000 +
    currentTime.getMilliseconds();

  return (totalMs * SPEED) % MS_IN_A_DAY;
};

export type UseCurrentMsOfDayOptions = {
  customHours?: number;
};

export const useCurrentMsOfDay = ({
  customHours,
}: UseCurrentMsOfDayOptions = {}) => {
  const [currentMsOfDay, setCurrentMsOfDay] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      setCurrentMsOfDay(
        typeof customHours !== "undefined"
          ? customHours * HOURINMS
          : getMsOfDay(currentTime)
      );
    };

    updateTime();
    const interval = setInterval(updateTime, UPDATE_RATE);
    return () => clearInterval(interval);
  }, [customHours]);

  return {
    currentMsOfDay,
  };
};
