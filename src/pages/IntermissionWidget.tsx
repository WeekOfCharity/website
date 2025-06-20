import { useSearchParams } from "react-router-dom";
import cn from "classnames";

import { useEffect, useRef, useState } from "react";

import { Donation, DonationSorting, useDonations } from "../hooks/useDonations";
import "./LayoutOverlayWidget.scss";
import { LayoutMoneyText } from "../components/LayoutMoneyText/LayoutMoneyText";
import {
  getAlertGifFromDonationAmount,
  getAlertLengthFromDonationAmount,
  playSound,
  preloadDonationGifs,
} from "../utils/widgets/donationAlert";

import backgroundGrid from "../assets/intermission/bg-grid.png";
import { IntermissionTabButton } from "../components/Intermission/IntermissionTabButton";
import { IntermissionClock } from "../components/Intermission/IntermissionClock";

export const IntermissionWidget = () => {
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
  const isEn = searchParams.get("en");
  const testalert = searchParams.get("testalert");

  const skipAlerts = useRef<boolean>(true);
  const donationAlertQueue = useRef<Donation[]>([]);
  const alreadyQueuedIds = useRef<number[]>([]);
  const label1Ref = useRef<HTMLButtonElement>(null);

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
    setDonationAlertGif(getAlertGifFromDonationAmount(donated_amount_in_cents));
    playSound(donated_amount_in_cents);

    const timeout = setTimeout(
      () => setPlayDonationAlert(false),
      getAlertLengthFromDonationAmount(donated_amount_in_cents)
    );

    return () => clearTimeout(timeout);
  }, [playDonationAlert]);

  useEffect(() => {
    setTimeout(() => label1Ref.current?.click(), 4000);
  }, []);

  if (isPreloading) return <div className="text-7xl">Loading...</div>;

  return (
    <div
      className={cn(
        "relative font-pixel grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden bg-gradient-to-t from-int-accent-secondary to-int-accent-primary"
      )}
    >
      <img className="" src={backgroundGrid} />
      <div className="flex h-[63px] gap-4 bg-int-accent-primary bottom-0 absolute w-full border-t-[3px] border-int-highlight-light pl-2 pr-5 items-center text-int-highlight-light">
        <IntermissionTabButton size="small" preload>
          Start
        </IntermissionTabButton>
        <IntermissionTabButton>Label 1</IntermissionTabButton>
        <IntermissionTabButton active>Label 2</IntermissionTabButton>
        <IntermissionTabButton>Label 3</IntermissionTabButton>
        <IntermissionClock className="ml-auto" />
      </div>

      <div
        className={cn(
          "absolute z-50 text-lg top-[240px] left-[1200px] w-[600px] transition-[transform,opacity] ease-in-out duration-[1500ms]",
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
          <div className="flex flex-col gap-4 rounded-2xl py-5 px-5 animate-donationAlert [box-shadow:0_0_16px_black] bg-layout-bg-green-day/[0.93]">
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
      <div className="size-full absolute z-30 bg-scan-lines opacity-[0.1] animate-scanlines bg-[0_3px] pointer-events-none" />
    </div>
  );
};
