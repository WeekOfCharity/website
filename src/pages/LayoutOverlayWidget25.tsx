import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import {
  getIsDay,
  StreamLayoutTheme25,
  useCurrentMsOfDay,
} from "../hooks/useCurrentMsOfDay";

import overlayBlueDay from "../assets/layout25/overlay_blue_day.png";
import overlayBlueNight from "../assets/layout25/overlay_blue_night.png";
import overlayPinkDay from "../assets/layout25/overlay_pink_day.png";
import overlayPinkNight from "../assets/layout25/overlay_pink_night.png";

import bannerBlueDay from "../assets/layout25/banner_blue_day.png";
import bannerBlueNight from "../assets/layout25/banner_blue_night.png";
import bannerPinkDay from "../assets/layout25/banner_pink_day.png";
import bannerPinkNight from "../assets/layout25/banner_pink_night.png";

import { GoalWidget24 } from "../components/GoalWidget24/GoalWidget24";
import { useEffect, useRef, useState } from "react";
import { parseIntSearchParam } from "../utils/parseSearchParameters";
import { LayoutDonationList } from "../components/LayoutDonationList/LayoutDonationList";
import { Donation, DonationSorting, useDonations } from "../hooks/useDonations";
import "./LayoutOverlayWidget25.scss";
import { LayoutMoneyText } from "../components/LayoutMoneyText/LayoutMoneyText";
import { AnimatedStreamBanner } from "../components/AnimatedStreamBanner/AnimatedStreamBanner";
import { LayoutBidwarWidget } from "../components/LayoutBidwarWidget/LayoutBidwarWidget";
import { IsDayContext } from "../utils/IsDayContext";
import {
  getAlertGifFromDonationAmount,
  getAlertLengthFromDonationAmount,
  playSound,
  preloadDonationGifs,
} from "../utils/widgets/donationAlert";

const overlays = {
  [StreamLayoutTheme25.BLUE]: {
    day: overlayBlueDay,
    night: overlayBlueNight,
  },
  [StreamLayoutTheme25.PINK]: {
    day: overlayPinkDay,
    night: overlayPinkNight,
  },
} as const;

const banners = {
  [StreamLayoutTheme25.BLUE]: {
    day: bannerBlueDay,
    night: bannerBlueNight,
  },
  [StreamLayoutTheme25.PINK]: {
    day: bannerPinkDay,
    night: bannerPinkNight,
  },
} as const;

const getTheme = (theme: StreamLayoutTheme25 | string | null) => {
  if (!theme) return StreamLayoutTheme25.BLUE;
  const layoutTheme = theme as StreamLayoutTheme25;
  if (Object.values(StreamLayoutTheme25).includes(layoutTheme))
    return layoutTheme;
  return StreamLayoutTheme25.BLUE;
};

export const LayoutOverlayWidget25 = () => {
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
    preloadDonationGifs()
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
              "Das ist eine Testdonation! Hier steht der Kommentar, der einer Spende hinzugefügt werden kann.",
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

  const isDay = getIsDay(currentMsOfDay);
  const layoutTheme = getTheme(theme);

  if (isPreloading) return <div className="text-7xl">Loading...</div>;

  return (
    <IsDayContext.Provider value={isDay}>
      <div
        data-theme={`${layoutTheme}-${isDay ? "day" : "night"}`}
        className={cn(
          "overlay-root font-pixel grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden transition-[color,background-color,border-color,text-shadow] ease-in duration-[2000ms]",
          {
            "[text-shadow:0_0_0.5rem_rgba(var(--text-r),var(--text-g),var(--text-b),0.55)] [--drop-shadow-layout-text:0_0_5px_rgba(var(--text-r),var(--text-g),var(--text-b),0.6)]":
              !isDay,
            "[--current-layout-bg:#707AF2]":
              isDay && layoutTheme === StreamLayoutTheme25.BLUE,
            "[--current-layout-bg:#120950]":
              !isDay && layoutTheme === StreamLayoutTheme25.BLUE,
            "[--current-layout-bg:#E17FD7]":
              isDay && layoutTheme === StreamLayoutTheme25.PINK,
            "[--current-layout-bg:#320A30]":
              !isDay && layoutTheme === StreamLayoutTheme25.PINK,
          }
        )}
      >
        {alertonly === null && (
          <>
            <GoalWidget24
              layout="layout25"
              className="absolute w-[667px] left-[346px] top-[916px] h-[153px] text-center"
              isEn={isEn !== null}
              theme={layoutTheme}
              onDonationTextChange={setDonationGoalText}
            />
            <div
              className={cn(
                "z-10 transition-opacity ease-in duration-[2000ms]",
                {
                  "opacity-0": !isDay,
                }
              )}
              style={{
                backgroundImage: `url(${overlays[layoutTheme].day})`,
              }}
            />
            <div
              className={cn(
                "z-10 transition-opacity ease-in duration-[2000ms]",
                {
                  "opacity-0": isDay,
                }
              )}
              style={{
                backgroundImage: `url(${overlays[layoutTheme].night})`,
              }}
            />
            <LayoutBidwarWidget
              className="z-10 absolute text-[1.1875rem] w-[664px] left-[348px] top-[920px] h-[88px] flex justify-center items-center text-center overflow-hidden"
              layout="layout25"
              theme={layoutTheme}
              isEn={isEn !== null}
              donationGoalsText={donationGoalText}
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
              layout="layout25"
              headline={isEn !== null ? "Top Donations" : "Höchste Spenden"}
              donations={highestDonations}
              isEn={isEn !== null}
            />
            <LayoutDonationList
              className="z-10 absolute text-[1.1875rem] w-96 text-center left-[1508px] top-[922px] overflow-hidden whitespace-nowrap"
              layout="layout25"
              headline={isEn !== null ? "Last Donations" : "Letzte Spenden"}
              donations={newestDonations?.slice(0, 3)}
              isEn={isEn !== null}
            />
            <AnimatedStreamBanner
              className="z-10 absolute w-[320px] left-[12px] top-[916px] h-[156px] text-center"
              isEn={isEn !== null}
            >
              <img
                className={cn(
                  "col-start-1 row-start-1 size-full absolute transition-opacity ease-in duration-[2000ms]",
                  {
                    "opacity-0": !isDay,
                  }
                )}
                alt=""
                src={banners[layoutTheme].day}
              />
              <img
                className={cn(
                  "col-start-1 row-start-1 size-full absolute transition-opacity ease-in duration-[2000ms]",
                  {
                    "opacity-0": isDay,
                  }
                )}
                alt=""
                src={banners[layoutTheme].night}
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
                  "bg-layout-bg-blue-night/[0.99]":
                    layoutTheme === StreamLayoutTheme25.BLUE && !isDay,
                  "bg-layout-bg-pink-night/[0.98]":
                    layoutTheme === StreamLayoutTheme25.PINK && !isDay,
                  "bg-layout-bg-blue-day/[0.93]":
                    layoutTheme === StreamLayoutTheme25.BLUE && isDay,
                  "bg-layout-bg-pink-day/[0.93]":
                    layoutTheme === StreamLayoutTheme25.PINK && isDay,
                }
              )}
            >
              <span className="text-[1.5rem] px-2">
                {donationAlertName || (isEn !== null ? "Anonymous" : "Anonym")}{" "}
                {isEn !== null ? "donates" : "spendet"}{" "}
                {donationAlertAmount != null && (
                  <LayoutMoneyText
                    amount={donationAlertAmount / 100}
                    variant="layout25"
                    customEuroClassName="!w-5"
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
    </IsDayContext.Provider>
  );
};
