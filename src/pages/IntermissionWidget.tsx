import { useSearchParams } from "react-router-dom";
import cn from "classnames";

import { useCallback, useEffect, useRef, useState } from "react";

import { Donation, DonationSorting, useDonations } from "../hooks/useDonations";
import "./IntermissionWidget.css";
import {
  getAlertLengthFromDonationAmount,
  playSound,
} from "../utils/widgets/donationAlertSounds25";

import { IntermissionTabButton } from "../components/Intermission/IntermissionTabButton";
import { IntermissionClock } from "../components/Intermission/IntermissionClock";
import { IntermissionWindow } from "../components/Intermission/IntermissionWindow";

import backgroundGrid from "../assets/intermission/bg-grid-small.png";
import gridGradient from "../assets/intermission/bg-grid-gradient.png";
import windowTop from "../assets/intermission/window-top.png";
import windowRight from "../assets/intermission/window-right.png";
import windowBottom from "../assets/intermission/window-bottom.png";
import windowLeft from "../assets/intermission/window-left.png";
import bigArtwork from "../assets/intermission/chesster.png";

import headerPause from "../assets/intermission/header-pause.png";
import headerStart from "../assets/intermission/header-start.png";
import headerFin from "../assets/intermission/header-fin.png";

import { IntermissionCursor } from "../components/Intermission/IntermissionCursor";
import {
  cursorClick,
  moveTo,
  teleportTo,
  wait,
} from "../utils/widgets/intermission";
import { UpcomingStreams } from "../components/Intermission/UpcomingStreams";
import { GoalWidget } from "../components/Intermission/GoalWidget";
import { TextDocumentWidget } from "../components/Intermission/TextDocumentWidget";
import { IntermissionBidwarWidget } from "../components/Intermission/IntermissionBidwarWidget";
import { preloadDonationGifs } from "../utils/widgets/donationAlertGifs";
import { DonationAlert } from "../components/DonationAlert25/DonationAlert";

const CURSOR_ANIMATION = true;
const CURSOR_ANIMATION_INTERVAL = 70 * 1000;

const validHeaderTypes = ["pause", "start", "fin"];
type HeaderType = (typeof validHeaderTypes)[number];
const headerMap: Record<HeaderType, string> = {
  pause: headerPause,
  start: headerStart,
  fin: headerFin,
};
const defaultHeader = headerMap.pause;

export const IntermissionWidget = () => {
  const [activeWindow, setActiveWindow] = useState<
    "donationGoals" | "bidwars" | null
  >("donationGoals");
  const [donationAlertComment, setDonationAlertComment] = useState<
    string | null
  >();
  const [donationAlertName, setDonationAlertName] = useState<string | null>();
  const [donationAlertAmount, setDonationAlertAmount] = useState<
    number | null
  >();
  const [playDonationAlert, setPlayDonationAlert] = useState(false);
  const [isPreloading, setPreloading] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const enParam = searchParams.get("en");
  const isEn = enParam !== null;
  const testalert = searchParams.get("testalert");
  const type = searchParams.get("type");
  const headerImage =
    type && validHeaderTypes.includes(type) ? headerMap[type] : defaultHeader;

  const skipAlerts = useRef<boolean>(true);
  const donationAlertQueue = useRef<Donation[]>([]);
  const alreadyQueuedIds = useRef<number[]>([]);

  const { data: newestDonations, refetch: refetchNewestDonations } =
    useDonations(DonationSorting.NEWEST, 10);

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
            donated_amount_in_cents: testalert ? parseInt(testalert) : 556,
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
      void refetchNewestDonations();
    }, 5 * 1000);
    return () => clearInterval(id);
  }, [refetchNewestDonations]);

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
    playSound(donated_amount_in_cents);

    const timeout = setTimeout(
      () => setPlayDonationAlert(false),
      getAlertLengthFromDonationAmount(donated_amount_in_cents)
    );

    return () => clearTimeout(timeout);
  }, [playDonationAlert]);

  const playCursorAnimationCloseBottomWindow = async () => {
    return new Promise<void>((resolve) => {
      void moveTo(cursorRef, { x: 1252, y: 649 })
        .then(() => cursorClick(cursorRef))
        .then(() => {
          setActiveWindow(null);
          return wait(600);
        })
        .then(() => {
          resolve();
        });
    });
  };

  const playCursorAnimationBidwars = useCallback(async () => {
    await teleportTo(cursorRef, { x: 1400, y: 1200 });
    await playCursorAnimationCloseBottomWindow();
    await moveTo(cursorRef, { x: 1098, y: 1041 });
    await cursorClick(cursorRef);
    setActiveWindow("bidwars");
    await wait(800);
    await moveTo(cursorRef, { x: 2260, y: 764, duration: 1300 });
  }, []);

  const playCursorAnimationDonationGoals = useCallback(async () => {
    await teleportTo(cursorRef, { x: 1600, y: 1200 });
    await playCursorAnimationCloseBottomWindow();
    await moveTo(cursorRef, { x: 885, y: 1041 });
    await cursorClick(cursorRef);
    setActiveWindow("donationGoals");
    await wait(800);
    await moveTo(cursorRef, { x: 2260, y: 764, duration: 1300 });
  }, []);

  useEffect(() => {
    let counter: number = 0;
    const id = setInterval(() => {
      if (!CURSOR_ANIMATION) return;
      if (counter % 2 === 0) void playCursorAnimationBidwars();
      else void playCursorAnimationDonationGoals();
      counter++;
    }, CURSOR_ANIMATION_INTERVAL);
    return () => clearInterval(id);
  }, [playCursorAnimationBidwars, playCursorAnimationDonationGoals]);

  if (isPreloading) return <div className="text-7xl">Loading...</div>;

  return (
    <div
      className={cn(
        "relative font-pixel grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden bg-int-accent-gradient"
      )}
    >
      <div
        className="w-[1920px] h-[1080px] bg-repeat animate-gridIntermission"
        style={{ maskImage: `url("${backgroundGrid}")` }}
      >
        <img src={gridGradient} alt="" width="1920" height="1080" />
      </div>

      <div className="absolute w-[450px] flex justify-center left-[49px] top-[156px] animate-floatXL">
        <img src={headerImage} alt="" />
      </div>
      <IntermissionWindow
        className="absolute left-[549px] top-[72px] h-[540px] w-[756px]"
        borderSrc={windowTop}
        title="UpcomingStreams.xls"
      >
        <UpcomingStreams className="px-4 py-7 text-int-highlight-light bg-int-highlight-dark/40 backdrop-blur-[7px]" />
      </IntermissionWindow>

      <IntermissionWindow
        className="absolute left-[1332px] top-[111px] h-[864px] w-[522px]"
        borderSrc={windowRight}
        title="Chesster.jpg"
      >
        <div className="size-full bg-int-highlight-dark/40 backdrop-blur-[7px]">
          <img
            src={bigArtwork}
            alt=""
            className="h-full object-cover object-[35%_50%]"
          />
        </div>
      </IntermissionWindow>

      <IntermissionWindow
        className="z-10 absolute left-[63px] top-[424px] w-[543px] h-[531px]"
        borderSrc={windowLeft}
        title="MessageBoard.txt"
      >
        <div className="p-4 text-int-highlight-light bg-int-highlight-dark/40 h-full backdrop-blur-[7px]">
          <TextDocumentWidget isEn={isEn} />
        </div>
      </IntermissionWindow>

      <IntermissionWindow
        className={cn(
          "z-10 absolute left-[687px] top-[630px] transition-[transform,opacity] duration-[800ms] w-[675px]",
          {
            "translate-y-[300px] scale-0": activeWindow !== "donationGoals",
          }
        )}
        borderSrc={windowBottom}
        title="DonationGoals.exe"
      >
        <div className="p-4 text-int-highlight-light bg-int-highlight-dark/40 h-full backdrop-blur-[7px]">
          <GoalWidget isEn={isEn} />
        </div>
      </IntermissionWindow>

      <IntermissionWindow
        className={cn(
          "z-10 absolute left-[687px] top-[630px] transition-[transform,opacity] duration-[800ms] w-[675px]",
          {
            "translate-y-[300px] scale-0": activeWindow !== "bidwars",
          }
        )}
        borderSrc={windowBottom}
        title="Bidwars.exe"
      >
        <div className="p-4 text-int-highlight-light bg-int-highlight-dark/40 h-full backdrop-blur-[7px]">
          <IntermissionBidwarWidget
            totalBidwarDuration={CURSOR_ANIMATION_INTERVAL}
            isEn={isEn}
          />
        </div>
      </IntermissionWindow>

      <div className="z-10 flex h-[63px] gap-4 bg-int-accent-primary bottom-0 absolute w-full border-t-[3px] border-int-highlight-light pl-2 pr-4 items-center text-int-highlight-light">
        <IntermissionTabButton size="small" preload label="Start" />
        <IntermissionTabButton label="Messages.txt" />
        <IntermissionTabButton label="UpcomingStreams.xls" />
        <IntermissionTabButton label="Chesster.jpg" />
        <IntermissionTabButton
          active={activeWindow === "donationGoals"}
          label="DonationGoals.exe"
        />
        <IntermissionTabButton
          active={activeWindow === "bidwars"}
          label="Bidwars.exe"
        />
        <IntermissionClock className="ml-auto" />
      </div>
      <div
        className={cn(
          "absolute z-50 text-lg top-[258px] left-[120px] w-[606px] transition-[transform,opacity] duration-[500ms] overflow-hidden",
          {
            "opacity-0 scale-[0.4]": !playDonationAlert,
          }
        )}
      >
        <DonationAlert
          amount={donationAlertAmount}
          comment={donationAlertComment}
          name={donationAlertName}
          isEn={isEn !== null}
          withBgBlur
        />
      </div>
      <IntermissionCursor ref={cursorRef} className="z-[90]" />
      <div className="size-full absolute z-[100] bg-scan-lines opacity-[0.1] bg-[0_3px] pointer-events-none" />
    </div>
  );
};
