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

import bannerGreenDay from "../assets/layout/banner_green_day.png";
import bannerGreenNight from "../assets/layout/banner_green_night.png";
import bannerRedDay from "../assets/layout/banner_red_day.png";
import bannerRedNight from "../assets/layout/banner_red_night.png";

import cn from "classnames";
import { GoalWidget24 } from "../components/GoalWidget24/GoalWidget24";
import { useEffect, useRef, useState } from "react";
import { parseIntSearchParam } from "../utils/parseSearchParameters";
import { LayoutDonationList } from "../components/LayoutDonationList/LayoutDonationList";
import { Donation, DonationSorting, useDonations } from "../hooks/useDonations";
import "./LayoutOverlayWidget.scss";
import { LayoutMoneyText } from "../components/LayoutMoneyText/LayoutMoneyText";
import { AnimatedStreamBanner } from "../components/AnimatedStreamBanner/AnimatedStreamBanner";

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

const banners = {
  [StreamLayoutTheme.GREEN]: {
    day: bannerGreenDay,
    night: bannerGreenNight,
  },
  [StreamLayoutTheme.RED]: {
    day: bannerRedDay,
    night: bannerRedNight,
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
  const testalert = searchParams.get("testalert");
  const alertonly = searchParams.get("alertonly");
  const customHours = parseIntSearchParam(searchParams.get("time"));

  const skipAlerts = useRef<boolean>(true);
  const donationAlertQueue = useRef<Donation[]>([]);
  const alreadyQueuedIds = useRef<number[]>([]);

  const { data: highestDonations, refetch: refetchHighestDonations } =
    useDonations(DonationSorting.HIGHEST);

  const { data: newestDonations, refetch: refetchNewestDonations } =
    useDonations(DonationSorting.NEWEST, 10);

  const { currentMsOfDay } = useCurrentMsOfDay({ customHours });

  useEffect(() => {
    preloadImages()
      .then(() => {
        setPreloading(false);
        setTimeout(() => {
          skipAlerts.current = false;
          if (testalert === null) return;
          if (alreadyQueuedIds.current.includes(-1)) return;
          donationAlertQueue.current.unshift({
            id: -1,
            donator_name: "Chesster",
            donated_amount_in_cents: 556,
            donation_comment:
              "Das ist eine Testdonation! Hier steh der Kommentar, der einer Spende hinzugefügt werden kann.",
          });
          alreadyQueuedIds.current.push(-1);
          setPlayDonationAlert(true);
        }, 2500);
      })
      .catch(() => {});
  }, [testalert]);

  useEffect(() => {
    const id = setInterval(() => {
      void refetchHighestDonations();
      void refetchNewestDonations();
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [refetchHighestDonations, refetchNewestDonations]);

  useEffect(() => {
    if (!newestDonations) return;

    [...newestDonations].reverse().forEach((newestDonation) => {
      if (alreadyQueuedIds.current.some((id) => id >= newestDonation.id))
        return;

      donationAlertQueue.current.unshift(newestDonation);
      alreadyQueuedIds.current.push(newestDonation.id);
    });

    if (playDonationAlert || donationAlertQueue.current.length === 0) return;

    setTimeout(() => setPlayDonationAlert(true), 1700);
  }, [newestDonations, playDonationAlert]);

  useEffect(() => {
    if (skipAlerts.current) {
      setPlayDonationAlert(false);
      donationAlertQueue.current = [];
      return;
    }
    if (!playDonationAlert) return;

    const currentAlertDonation = donationAlertQueue.current.pop();
    if (!currentAlertDonation) return;
    const { donation_comment, donator_name, donated_amount_in_cents } =
      currentAlertDonation;

    setDonationAlertComment(donation_comment);
    setDonationAlertName(donator_name);
    setDonationAlertAmount(donated_amount_in_cents);
    setDonationAlertGif(getAlertGifFromDonationAmount(donated_amount_in_cents));
    playSound(donated_amount_in_cents);

    const timeout = setTimeout(
      () => setPlayDonationAlert(false),
      getAlertLengthFromDonationAmount(donated_amount_in_cents)
    );

    return () => clearTimeout(timeout);
  }, [playDonationAlert]);

  const isDay = currentMsOfDay < 21 * HOURINMS && currentMsOfDay > 6 * HOURINMS;
  const layoutTheme = getTheme(theme);

  if (isPreloading) return <div className="text-7xl">Loading...</div>;

  return (
    <div
      data-theme={`${layoutTheme}-${isDay ? "day" : "night"}`}
      className={cn(
        "overlay-root font-pixel grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden transition-[color,background-color,border-color,text-shadow] ease-in duration-[2000ms]",
        {
          "[text-shadow:0_0_0.5rem_rgba(var(--text-r),var(--text-g),var(--text-b),0.55)] [--drop-shadow-layout-text:0_0_5px_rgba(var(--text-r),var(--text-g),var(--text-b),0.6)]":
            !isDay,
          "[--current-layout-bg:#E1DFAC]":
            isDay && layoutTheme === StreamLayoutTheme.GREEN,
          "[--current-layout-bg:#00141E]":
            !isDay && layoutTheme === StreamLayoutTheme.GREEN,
          "[--current-layout-bg:#E9BDBD]":
            isDay && layoutTheme === StreamLayoutTheme.RED,
          "[--current-layout-bg:#370514]":
            !isDay && layoutTheme === StreamLayoutTheme.RED,
        }
      )}
    >
      {alertonly === null && (
        <>
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
          <div className="z-10 absolute text-2xl w-80 text-center px-5 top-[21px] overflow-hidden whitespace-nowrap leading-relaxed">
            {name === "empty" ? "" : name}
          </div>
          {!name && (
            <div className="font-sans font-semibold z-10 text-white bg-[#990000] absolute text-xl max-w-[520px] text-center p-2 top-[5px] left-[5px]">
              No name provided. Please provide your name by adding
              &name=[example] to the layout URL.
              <br /> Or add &name=empty to not show a name.
            </div>
          )}
          <div className="z-10 absolute text-[0.9375rem] w-80 text-center top-[59px] overflow-hidden whitespace-nowrap leading-relaxed">
            {pronouns === "empty" ? "" : pronouns}
          </div>
          {!pronouns && (
            <div className="font-sans font-semibold z-10 text-white bg-[#990000] absolute text-xl max-w-[520px] text-center p-2 top-[110px] left-[5px]">
              No pronouns provided. Please provide your pronouns by adding
              &pronouns=[example] to the layout URL.
              <br /> Or add &pronouns=empty to not show any pronouns.
            </div>
          )}
          <LayoutDonationList
            className="z-10 absolute text-[1.1875rem] w-96 text-center left-[1060px] top-[922px] overflow-hidden whitespace-nowrap"
            listClassName={cn({
              "text-[#E9BDBD]": layoutTheme === StreamLayoutTheme.RED,
              "animate-fadeinout1":
                isDay && layoutTheme === StreamLayoutTheme.RED,
              "animate-fadeinout2":
                !isDay && layoutTheme === StreamLayoutTheme.RED,
            })}
            headline={isEn !== null ? "Top Donations" : "Höchste Spenden"}
            donations={highestDonations}
            isEn={isEn !== null}
          />
          <LayoutDonationList
            className="z-10 absolute text-[1.1875rem] w-96 text-center left-[1508px] top-[922px] overflow-hidden whitespace-nowrap"
            listClassName={cn({
              "text-[#E9BDBD]": layoutTheme === StreamLayoutTheme.RED,
              "animate-fadeinout1":
                isDay && layoutTheme === StreamLayoutTheme.RED,
              "animate-fadeinout2":
                !isDay && layoutTheme === StreamLayoutTheme.RED,
            })}
            headline={isEn !== null ? "Last Donations" : "Letzte Spenden"}
            donations={newestDonations?.slice(0, 3)}
            isEn={isEn !== null}
          />
          <div className="z-10 absolute text-[1.1875rem] w-[665px] left-[348px] top-[918px] h-[90px] flex justify-center items-center text-center overflow-hidden">
            {donationGoalText}
          </div>
          <AnimatedStreamBanner
            className="z-10 absolute w-[322px] left-[12px] top-[916px] h-[156px] text-center"
            isEn={isEn !== null}
          >
            <img
              className="col-start-1 row-start-1 object-fill size-full absolute scale-[1.12]"
              alt=""
              src={banners[layoutTheme][isDay ? "day" : "night"]}
            />
          </AnimatedStreamBanner>
        </>
      )}

      <div
        className={cn(
          "absolute z-10 text-lg top-[240px] left-[1200px] w-[600px] transition-[transform,opacity] ease-in-out duration-[1500ms]",
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
              "flex flex-col gap-4 rounded-2xl py-5 px-5 animate-donationAlert [box-shadow:0_0_16px_black]",
              {
                "bg-layout-bg-green-night/[0.99]":
                  layoutTheme === StreamLayoutTheme.GREEN && !isDay,
                "bg-layout-bg-red-night/[0.98]":
                  layoutTheme === StreamLayoutTheme.RED && !isDay,
                "bg-layout-bg-green-day/[0.93]":
                  layoutTheme === StreamLayoutTheme.GREEN && isDay,
                "bg-layout-bg-red-day/[0.93]":
                  layoutTheme === StreamLayoutTheme.RED && isDay,
              }
            )}
          >
            <span className="text-[1.5rem] px-2">
              {donationAlertName || (isEn !== null ? "Anonymous" : "Anonym")}{" "}
              {isEn !== null ? "donates" : "spendet"}{" "}
              {donationAlertAmount != null && (
                <LayoutMoneyText
                  amount={donationAlertAmount / 100}
                  customEuroClassName="w-5"
                />
              )}
            </span>
            {donationAlertComment && (
              <span className="max-w-[550px] max-h-32 text-[1.1875rem] leading-8">
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
