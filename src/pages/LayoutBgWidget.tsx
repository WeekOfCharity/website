import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import sky_green from "../assets/layout/sky_green.png";
import sky_red from "../assets/layout/sky_red.png";
import clouds from "../assets/layout/clouds.png";
import stars from "../assets/layout/stars.png";
import {
  HOURINMS,
  STARS_FADE_IN_START,
  STARS_FADE_IN_STOP,
  STARS_FADE_OUT_START,
  STARS_FADE_OUT_STOP,
  StreamLayoutTheme,
  useCurrentMsOfDay,
} from "../hooks/useCurrentMsOfDay";
import { parseIntSearchParam } from "../utils/parseSearchParameters";

const cutout =
  "path('m0 0 0 1080 1920 0 0-178-1576 0 0-6-12 0 0-4-8 0 0-16-6 0 0-878-354 0z')";

const MS_IN_HALF_A_DAY = 12 * HOURINMS;

const DEEPEST_NIGHT = 1.5 * HOURINMS;
const BRIGHTEST_DAY = 13.5 * HOURINMS;

// default 1
const CLOUD_SPEED_AMPLIFIER = 1;
const STARS_SPEED_AMPLIFIER = 1;

const CLIP_PATH_ENABLED = true;

// in seconds
const CLOUD_DURATION = 360;
const STARS_DURATION = 1440;

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

const getSkyBg = (theme: StreamLayoutTheme | string | null) => {
  if (!theme) return sky_green;
  const layoutTheme = theme as StreamLayoutTheme;
  if (!Object.values(StreamLayoutTheme).includes(layoutTheme)) return sky_green;
  if (layoutTheme === StreamLayoutTheme.GREEN) return sky_green;
  if (layoutTheme === StreamLayoutTheme.RED) return sky_red;
  return sky_green;
};

export const LayoutBgWidget = () => {
  const [skyPosition, setSkyPosition] = useState(0);
  const [starsOpacity, setStarsOpacity] = useState(0);
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const fullBg = searchParams.get("full");
  const customHours = parseIntSearchParam(searchParams.get("time"));

  const { currentMsOfDay } = useCurrentMsOfDay({ customHours });

  useEffect(() => {
    setSkyPosition(getSkyPosition(currentMsOfDay));
    setStarsOpacity(getStarsOpacity(currentMsOfDay));
  }, [currentMsOfDay]);

  return (
    <div
      className="grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden"
      style={{
        clipPath: CLIP_PATH_ENABLED && fullBg === null ? cutout : undefined,
      }}
    >
      <div
        style={{
          backgroundImage: `url(${getSkyBg(theme)})`,
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
        className="w-[5960px] animate-clouds"
        style={{
          backgroundImage: `url(${clouds})`,
          animationDuration: `${CLOUD_DURATION / CLOUD_SPEED_AMPLIFIER}s`,
          opacity: (1 - starsOpacity) * 0.8,
        }}
      />
    </div>
  );
};
