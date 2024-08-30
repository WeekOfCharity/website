import { useSearchParams } from "react-router-dom";
import {
  HOURINMS,
  StreamLayoutTheme,
  useCurrentMsOfDay,
} from "../hooks/useCurrentMsOfDay";

import overlayGreenDay from "../assets/layout/overlay_green_day.png";
import overlayGreenNight from "../assets/layout/overlay_green_night.png";
import overlayRedDay from "../assets/layout/overlay_red_day.png";
import overlayRedNight from "../assets/layout/overlay_red_night.png";
import cn from "classnames";
import { GoalWidget24 } from "./GoalWidget24";
import { useEffect, useState } from "react";
import { parseIntSearchParam } from "../utils/parseSearchParameters";
import { LayoutDonationList } from "../components/LayoutDonationList/LayoutDonationList";
import { DonationSorting, useDonations } from "../hooks/useDonations";

const overlays = {
  [StreamLayoutTheme.GREEN]: {
    day: overlayGreenDay,
    night: overlayGreenNight,
  },
  [StreamLayoutTheme.RED]: {
    day: overlayRedDay,
    night: overlayRedNight,
  },
} as const;

const colorClasses = {
  [StreamLayoutTheme.GREEN]: {
    day: "text-[#203737]",
    night: "text-[#afe2b5]",
  },
  [StreamLayoutTheme.RED]: {
    day: "text-[#451821]",
    night: "text-[#eac0c0]",
  },
} as const;

const getTheme = (theme: StreamLayoutTheme | string | null) => {
  if (!theme) return StreamLayoutTheme.GREEN;
  const layoutTheme = theme as StreamLayoutTheme;
  if (Object.values(StreamLayoutTheme).includes(layoutTheme))
    return layoutTheme;
  return StreamLayoutTheme.GREEN;
};

export const LayoutOverlayWidget = () => {
  const [donationGoalText, setDonationGoalText] = useState("");
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const name = searchParams.get("name");
  const pronouns = searchParams.get("pronouns");
  const isEn = searchParams.get("en");
  const customHours = parseIntSearchParam(searchParams.get("time"));

  const { data: highestDonations, refetch: refetchHighestDonations } =
    useDonations(DonationSorting.HIGHEST);

  const { data: newestDonations, refetch: refetchNewestDonations } =
    useDonations(DonationSorting.NEWEST);

  const { currentMsOfDay } = useCurrentMsOfDay({ customHours });

  useEffect(() => {
    const id = setInterval(() => {
      void refetchHighestDonations();
      void refetchNewestDonations();
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [refetchHighestDonations, refetchNewestDonations]);

  const isDay = currentMsOfDay < 21 * HOURINMS && currentMsOfDay > 6 * HOURINMS;
  const layoutTheme = getTheme(theme);

  return (
    <div
      className={cn(
        "font-pixel grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden transition-[color,background-color,border-color,text-shadow] ease-in duration-[2000ms]",
        colorClasses[layoutTheme][isDay ? "day" : "night"],
        {
          "[text-shadow:0_0_5px_color-mix(in_srgb,_currentColor_50%,_transparent)]":
            !isDay,
        }
      )}
    >
      <GoalWidget24
        className="absolute w-[665px] left-[348px] top-[916px] h-[150px] text-center"
        isEn={isEn !== null}
        theme={layoutTheme}
        isDay={isDay}
        onDonationTextChange={setDonationGoalText}
      />
      <div
        className={cn("z-10 transition-opacity ease-in duration-[2000ms]", {
          "opacity-0": !isDay,
        })}
        style={{
          backgroundImage: `url(${overlays[layoutTheme].day})`,
        }}
      />
      <div
        className={cn("z-10 transition-opacity ease-in duration-[2000ms]", {
          "opacity-0": isDay,
        })}
        style={{
          backgroundImage: `url(${overlays[layoutTheme].night})`,
        }}
      />
      <div className="z-10 absolute text-2xl w-80 text-center px-5 top-[25px] overflow-hidden whitespace-nowrap">
        {name}
      </div>
      <div className="z-10 absolute text-lg w-80 text-center top-[54px] overflow-hidden whitespace-nowrap">
        {pronouns}
      </div>
      <LayoutDonationList
        className="z-10 absolute text-[1.1875rem] w-96 text-center left-[1060px] top-[922px] overflow-hidden whitespace-nowrap"
        listClassName={cn({
          "text-[#E9BDBD]": layoutTheme === StreamLayoutTheme.RED,
          "animate-fadeinout1": isDay && layoutTheme === StreamLayoutTheme.RED,
          "animate-fadeinout2": !isDay && layoutTheme === StreamLayoutTheme.RED,
        })}
        headline={isEn !== null ? "Top Donations" : "Höchste Spenden"}
        donations={highestDonations}
        isDay={isDay}
      />
      <LayoutDonationList
        className="z-10 absolute text-[1.1875rem] w-96 text-center left-[1508px] top-[922px] overflow-hidden whitespace-nowrap"
        listClassName={cn({
          "text-[#E9BDBD]": layoutTheme === StreamLayoutTheme.RED,
          "animate-fadeinout1": isDay && layoutTheme === StreamLayoutTheme.RED,
          "animate-fadeinout2": !isDay && layoutTheme === StreamLayoutTheme.RED,
        })}
        headline={isEn !== null ? "Last Donations" : "Letzte Spenden"}
        donations={newestDonations}
        isDay={isDay}
      />
      <div className="z-10 absolute text-[1.1875rem] w-[665px] left-[348px] top-[918px] h-[90px] flex justify-center items-center text-center overflow-hidden">
        {donationGoalText}
      </div>
    </div>
  );
};
