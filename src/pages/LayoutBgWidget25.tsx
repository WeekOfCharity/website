import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import bgBlue from "../assets/layout25/background_blue.png";
import bgPink from "../assets/layout25/background_pink.png";
import backgroundGrid from "../assets/intermission/bg-grid-small.png";

import {
  BRIGHTEST_DAY,
  DEEPEST_NIGHT,
  getIsDay,
  MS_IN_HALF_A_DAY,
  StreamLayoutTheme25,
  useCurrentMsOfDay,
} from "../hooks/useCurrentMsOfDay";
import { parseIntSearchParam } from "../utils/parseSearchParameters";

const cutout =
  "path('m0 0 0 1080 1920 0 0-182-1584 0 0-3-8 0 0-6-6 0 0-8-2 0 0-882-320 0z')";

const CLIP_PATH_ENABLED = true;

const getSkyPosition = (currentMs: number) => {
  const distance = Math.abs(currentMs - DEEPEST_NIGHT);
  const percentage = (distance / MS_IN_HALF_A_DAY) * 100;

  if (currentMs < BRIGHTEST_DAY) {
    return percentage;
  }

  return 200 - percentage;
};

const getValidTheme = (theme: StreamLayoutTheme25 | string | null) => {
  if (!theme) return StreamLayoutTheme25.BLUE;
  const layoutTheme = theme as StreamLayoutTheme25;
  if (!Object.values(StreamLayoutTheme25).includes(layoutTheme))
    return StreamLayoutTheme25.BLUE;
  return layoutTheme;
};

const getBackground = (theme: StreamLayoutTheme25) => {
  if (theme === StreamLayoutTheme25.BLUE) return bgBlue;
  if (theme === StreamLayoutTheme25.PINK) return bgPink;
  return bgBlue;
};

const getGridColor = (theme: StreamLayoutTheme25, isDay: boolean) => {
  if (theme === StreamLayoutTheme25.BLUE) {
    if (isDay) return "#F2F0FF";
    else return "#7877C5";
  }
  if (theme === StreamLayoutTheme25.PINK) {
    if (isDay) return "#FFF0FE";
    else return "#B272AD";
  }
};

export const LayoutBgWidget25 = () => {
  const [skyPosition, setSkyPosition] = useState(0);
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const fullBg = searchParams.get("full");
  const customHours = parseIntSearchParam(searchParams.get("time"));
  const validTheme = getValidTheme(theme);

  const { currentMsOfDay } = useCurrentMsOfDay({ customHours });
  const isDay = getIsDay(currentMsOfDay);

  useEffect(() => {
    setSkyPosition(getSkyPosition(currentMsOfDay));
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
          backgroundImage: `url(${getBackground(validTheme)})`,
          backgroundPositionY: `${skyPosition}%`,
        }}
      >
        <div
          className="w-[1920px] h-[1080px] bg-repeat animate-gridLayout mix-blend-screen opacity-50"
          style={{ maskImage: `url("${backgroundGrid}")` }}
        >
          <div
            className="size-full transition-colors duration-[2000ms]"
            style={{ backgroundColor: getGridColor(validTheme, isDay) }}
          />
        </div>
      </div>
    </div>
  );
};
