import { useEffect, useState } from "react";
import sky from "../assets/layout/sky.png";
import clouds from "../assets/layout/clouds.png";
import stars from "../assets/layout/stars.png";

const cutout =
  "path('m0 0 0 1080 1920 0 0-246-1542 0 0-6-12 0 0-6-6 0 0-12-6 0 0-810-354 0z')";

const HOURINMS = 60 * 60 * 1000;
const MS_IN_A_DAY = 24 * HOURINMS;
const MS_IN_HALF_A_DAY = 12 * HOURINMS;

const DEEPEST_NIGHT = 1.5 * HOURINMS; // 1:30 AM in seconds
const BRIGHTEST_DAY = 13.5 * HOURINMS; // 1:30 PM in seconds

const STARS_FADE_IN_START = 19 * HOURINMS;
const STARS_FADE_IN_STOP = 21 * HOURINMS;
const STARS_FADE_OUT_START = 6 * HOURINMS;
const STARS_FADE_OUT_STOP = 8 * HOURINMS;

// default 1
const SPEED = 1;
const CLOUD_SPEED_AMPLIFIER = 1;
const STARS_SPEED_AMPLIFIER = 1;

const CLIP_PATH_ENABLED = true;

// in seconds
const CLOUD_DURATION = 360;
const STARS_DURATION = 1440;

// in miliseconds
const UPDATE_RATE = 5000;

const getMsOfDay = (currentTime: Date) => {
  const totalMs =
    currentTime.getHours() * 60 * 60 * 1000 +
    currentTime.getMinutes() * 60 * 1000 +
    currentTime.getSeconds() * 1000 +
    currentTime.getMilliseconds();

  return (totalMs * SPEED) % MS_IN_A_DAY;
};

const getSkyPosition = (currentMs: number) => {
  const distance = Math.abs(currentMs - DEEPEST_NIGHT);
  const percentage = (distance / MS_IN_HALF_A_DAY) * 100;

  if (currentMs < BRIGHTEST_DAY) {
    return percentage;
  }

  return 200 - percentage;
};

const isBetweenMod = (value: number, start: number, end: number) => {
  if (start <= end) {
    return value >= start && value <= end;
  } else {
    return value >= start || value <= end;
  }
};

const getStarsOpacity = (currentMs: number) => {
  if (isBetweenMod(currentMs, STARS_FADE_IN_STOP, STARS_FADE_OUT_START))
    return 1;

  if (isBetweenMod(currentMs, STARS_FADE_OUT_STOP, STARS_FADE_IN_START))
    return 0;

  if (isBetweenMod(currentMs, STARS_FADE_IN_START, STARS_FADE_IN_STOP))
    return (
      1 -
      (STARS_FADE_IN_STOP - currentMs) /
        (STARS_FADE_IN_STOP - STARS_FADE_IN_START)
    );

  if (isBetweenMod(currentMs, STARS_FADE_OUT_START, STARS_FADE_OUT_STOP))
    return (
      (STARS_FADE_OUT_STOP - currentMs) /
      (STARS_FADE_OUT_STOP - STARS_FADE_OUT_START)
    );

  console.error("getStarsStyles didn't find opacity");
  return 0;
};

export const LayoutBgWidget = () => {
  const [currentMsOfDay, setCurrentMsOfDay] = useState(0);
  const [skyPosition, setSkyPosition] = useState(0);
  const [starsOpacity, setStarsOpacity] = useState(0);

  const updateTime = () => {
    const currentTime = new Date();
    setCurrentMsOfDay(getMsOfDay(currentTime));
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, UPDATE_RATE);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSkyPosition(getSkyPosition(currentMsOfDay));
    setStarsOpacity(getStarsOpacity(currentMsOfDay));
  }, [currentMsOfDay]);

  return (
    <div
      className="grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden"
      style={{
        clipPath: CLIP_PATH_ENABLED ? cutout : undefined,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${sky})`,
          backgroundPositionY: `${skyPosition}%`,
        }}
      />
      <div
        className="size-[200%] absolute bottom-0 animate-stars"
        style={{
          backgroundImage: `url(${stars})`,
          animationDuration: `${STARS_DURATION / STARS_SPEED_AMPLIFIER}s`,
          opacity: starsOpacity,
        }}
      />
      <div
        className="opacity-70 w-[200%] animate-clouds"
        style={{
          backgroundImage: `url(${clouds})`,
          animationDuration: `${CLOUD_DURATION / CLOUD_SPEED_AMPLIFIER}s`,
        }}
      />
    </div>
  );
};
