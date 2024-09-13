import { useSearchParams } from "react-router-dom";
import {
  HOURINMS,
  StreamLayoutTheme,
  useCurrentMsOfDay,
} from "../hooks/useCurrentMsOfDay";

import alertSound1 from "../assets/layout/donation_alert/alert_1.mp3";
import alertSound2 from "../assets/layout/donation_alert/alert_2.mp3";
import alertSound3 from "../assets/layout/donation_alert/alert_3.mp3";
import alertSound4 from "../assets/layout/donation_alert/alert_4.mp3";
import alertSound5 from "../assets/layout/donation_alert/alert_5.mp3";

import alertGif1 from "../assets/layout/donation_alert/Chesster_Animation_01.gif";
import alertGif2 from "../assets/layout/donation_alert/Chesster_Animation_02.gif";
import alertGif3 from "../assets/layout/donation_alert/Chesster_Animation_03.gif";
import alertGif4 from "../assets/layout/donation_alert/Chesster_Animation_04.gif";
import alertGif5 from "../assets/layout/donation_alert/Chesster_Animation_05.gif";

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
import "./LayoutOverlayWidget.scss";
import { LayoutMoneyText } from "../components/LayoutMoneyText/LayoutMoneyText";

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

const getTheme = (theme: StreamLayoutTheme | string | null) => {
  if (!theme) return StreamLayoutTheme.GREEN;
  const layoutTheme = theme as StreamLayoutTheme;
  if (Object.values(StreamLayoutTheme).includes(layoutTheme))
    return layoutTheme;
  return StreamLayoutTheme.GREEN;
};

const getAlertLengthFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500) return 10000;
  if (donated_amount_in_cents < 1000) return 10000;
  if (donated_amount_in_cents < 2000) return 10000;
  if (donated_amount_in_cents < 5000) return 12000;
  return 13000;
};

const getAlertSoundFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500)
    return alertSound1;
  if (donated_amount_in_cents < 1000) return alertSound2;
  if (donated_amount_in_cents < 2000) return alertSound3;
  if (donated_amount_in_cents < 5000) return alertSound4;
  return alertSound5;
};

const preloadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

const preloadImages = async () => {
  await Promise.all(
    [alertGif1, alertGif2, alertGif3, alertGif4, alertGif5].map((image) =>
      preloadImage(image)
    )
  );
};

const playSound = (donated_amount_in_cents: number | null | undefined) => {
  const audioUrl = getAlertSoundFromDonationAmount(donated_amount_in_cents);
  const audio = new Audio(audioUrl);
  void audio.play();
};

const getAlertGifFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500)
    return alertGif1;
  if (donated_amount_in_cents < 1000) return alertGif2;
  if (donated_amount_in_cents < 2000) return alertGif3;
  if (donated_amount_in_cents < 5000) return alertGif4;
  return alertGif5;
};

export const LayoutOverlayWidget = () => {
  const [donationGoalText, setDonationGoalText] = useState("");
  const [donationAlertGif, setDonationAlertGif] = useState<string>();
  const [donationAlertComment, setDonationAlertComment] = useState<
    string | null
  >();
  const [donationAlertName, setDonationAlertName] = useState<string | null>();
  const [donationAlertAmount, setDonationAlertAmount] = useState<
    number | null
  >();
  const [playDonationAlert, setPlayDonationAlert] = useState(false);
  const [isPreloading, setPreloading] = useState(true);
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
    preloadImages()
      .then(() => setPreloading(false))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      void refetchHighestDonations();
      void refetchNewestDonations();
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [refetchHighestDonations, refetchNewestDonations]);

  useEffect(() => {
    if (!newestDonations) return;
    const { donation_comment, donator_name, donated_amount_in_cents } =
      newestDonations[0];

    setDonationAlertComment(donation_comment);
    setDonationAlertName(donator_name);
    setDonationAlertAmount(donated_amount_in_cents);
    setDonationAlertGif(getAlertGifFromDonationAmount(donated_amount_in_cents));
    playSound(donated_amount_in_cents);

    setPlayDonationAlert(true);

    const timeout = setTimeout(
      () => setPlayDonationAlert(false),
      getAlertLengthFromDonationAmount(donated_amount_in_cents)
    );

    return () => clearTimeout(timeout);
  }, [newestDonations]);

  const isDay = currentMsOfDay < 21 * HOURINMS && currentMsOfDay > 6 * HOURINMS;
  const layoutTheme = getTheme(theme);

  if (isPreloading) return <div className="text-7xl">Loading...</div>;

  return (
    <div
      data-theme={`${layoutTheme}-${isDay ? "day" : "night"}`}
      className={cn(
        "overlay-root font-pixel grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden transition-[color,background-color,border-color,text-shadow] ease-in duration-[2000ms]",
        {
          "[text-shadow:0_0_5px_rgba(var(--text-r),var(--text-g),var(--text-b),0.5)]":
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
        isEn={isEn !== null}
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
        isEn={isEn !== null}
      />
      <div className="z-10 absolute text-[1.1875rem] w-[665px] left-[348px] top-[918px] h-[90px] flex justify-center items-center text-center overflow-hidden">
        {donationGoalText}
      </div>
      <div
        className={cn(
          "absolute z-10 text-lg top-[240px] left-[1200px] w-[600px] transition-[transform,opacity] ease-in-out duration-[2000ms]",
          {
            "opacity-0 translate-x-[700px]": !playDonationAlert,
          }
        )}
      >
        <div className="flex flex-col items-center justify-center text-center -rotate-6">
          <img
            className="size-96 object-contain object-top -mb-6"
            src={donationAlertGif}
            alt=""
          />
          <div
            className={cn(
              "flex flex-col gap-4 rounded-2xl py-5 px-10 animate-donationAlert [box-shadow:0_0_16px_black]",
              {
                "bg-layout-bg-green-night/[0.99]":
                  layoutTheme === StreamLayoutTheme.GREEN && !isDay,
                "bg-layout-bg-red-night/[0.99]":
                  layoutTheme === StreamLayoutTheme.RED && !isDay,
                "bg-layout-bg-green-day/[0.93]":
                  layoutTheme === StreamLayoutTheme.GREEN && isDay,
                "bg-layout-bg-red-day/[0.93]":
                  layoutTheme === StreamLayoutTheme.RED && isDay,
              }
            )}
          >
            <span className="text-[1.375rem] px-3">
              {donationAlertName || (isEn !== null ? "Anonymous" : "Anonym")}{" "}
              {isEn !== null ? "donates" : "spendet"}{" "}
              {donationAlertAmount && (
                <LayoutMoneyText
                  amount={donationAlertAmount / 100}
                  isDay={isDay}
                  customEuroClassName="w-5"
                />
              )}
            </span>
            {donationAlertComment && (
              <span className="max-w-[550px] max-h-32">
                {donationAlertComment.length > 150
                  ? `${donationAlertComment?.slice(0, 150)}...`
                  : donationAlertComment}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
