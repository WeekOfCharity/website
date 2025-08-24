import { useContext, useEffect, useState } from "react";
import { DonationGoal, useDonationGoals } from "../../hooks/useDonationGoals";
import { useExternalDonationTotal } from "../../hooks/useExternalDonationTotal";
import { Language } from "../../i18n/i18n";
import cn from "classnames";
import {
  StreamLayoutTheme,
  StreamLayoutTheme25,
} from "../../hooks/useCurrentMsOfDay";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import { IsDayContext } from "../../utils/IsDayContext";

export type GoalWidget24Props = {
  theme: StreamLayoutTheme | StreamLayoutTheme25;
  layout: "layout24" | "layout25";
  isEn?: boolean;
  onDonationTextChange?: (donationGoalText: string) => void;
  className?: string;
};

// const goalCutout =
//   "path('m12 0 0 4-8 0 0 8-4 0 0 11 4 0 0 8 8 0 0 4 607 0 0-4 8 0 0-8 4 0 0-11-4 0 0-8-8 0 0-4-607 0')";

const fillColorClasses = {
  [StreamLayoutTheme.GREEN]: {
    day: "bg-[#7B9C66]",
    night: "bg-[#325B45]",
  },
  [StreamLayoutTheme.RED]: {
    day: "bg-[#A94C56]",
    night: "bg-[#832C37]",
  },
  [StreamLayoutTheme25.BLUE]: {
    day: "bg-[#C1C7FF]",
    night: "bg-[#534DDC]",
  },
  [StreamLayoutTheme25.PINK]: {
    day: "bg-[#EEC8EA]",
    night: "bg-[#953286]",
  },
} as const;

const getHighestDonationGoalAmount = (goals: DonationGoal[] | undefined) => {
  if (!goals || goals.length === 0) return undefined;
  return goals[goals.length - 1].reached_at;
};

export const GoalWidget24 = ({
  theme,
  layout,
  isEn,
  onDonationTextChange,
  className,
}: GoalWidget24Props) => {
  const [currentDonation, setCurrentDonation] = useState<number>(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number>();
  const [nextDonationGoalText, setNextDonationGoalText] = useState<string>();
  const [lastReachedGoalAmount, setLastReachedGoalAmount] = useState<number>(0);
  const isDay = useContext(IsDayContext);

  const {
    data: donations,
    status: donationsStatus,
    refetch: refetchDonations,
  } = useExternalDonationTotal();

  const {
    data: donationGoals,
    status: donationGoalsStatus,
    refetch: refetchDonationGoals,
  } = useDonationGoals(isEn ? Language.EN : Language.DE);

  const moneyTarget =
    nextDonationGoal || getHighestDonationGoalAmount(donationGoals);

  const targetProgress =
    moneyTarget && moneyTarget - lastReachedGoalAmount !== 0
      ? ((currentDonation - lastReachedGoalAmount) * 100) /
        (moneyTarget - lastReachedGoalAmount)
      : 0;

  useEffect(() => {
    if (!donations || !donationGoals) return;

    const current = donations.donated_amount_in_cents / 100;
    setCurrentDonation(current);

    let lastIndex = -1;
    donationGoals.forEach((goal, index) => {
      if (goal.reached_at <= current) {
        lastIndex = index;
      }
    });

    setLastReachedGoalAmount(
      lastIndex >= 0 ? donationGoals[lastIndex].reached_at : 0
    );

    setNextDonationGoal(
      donationGoals.length > lastIndex + 1
        ? donationGoals[lastIndex + 1].reached_at
        : undefined
    );
    setNextDonationGoalText(
      donationGoals.length > lastIndex + 1
        ? donationGoals[lastIndex + 1].name
        : undefined
    );
  }, [donations, donationGoals]);

  useEffect(() => {
    const id = setInterval(() => void refetchDonations(), 5 * 1000);
    return () => clearInterval(id);
  }, [refetchDonations]);

  useEffect(() => {
    const id = setInterval(() => void refetchDonationGoals(), 60 * 1000);
    return () => clearInterval(id);
  }, [refetchDonationGoals]);

  useEffect(() => {
    const getDonationGoalsText = () => {
      if (typeof nextDonationGoal !== "undefined")
        return nextDonationGoalText || "";
      if (donationsStatus !== "success" || donationGoalsStatus !== "success")
        return "";
      return donationGoals && donationGoals.length > 0
        ? isEn
          ? "All goals have been met!"
          : "Alle Goals wurden erreicht!"
        : isEn
          ? "Currently there are no goals!"
          : "Es gibt aktuell keine Goals!";
    };

    onDonationTextChange?.(getDonationGoalsText());
  }, [
    donationGoals,
    donationGoalsStatus,
    donationsStatus,
    isEn,
    nextDonationGoal,
    nextDonationGoalText,
    onDonationTextChange,
  ]);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative mt-auto h-10 rounded-[18px] overflow-hidden mx-4 transition-[background-color] duration-[2000ms] ease-in bg-layout-bg-current">
        <div
          className={cn(
            "h-full absolute transition-[background-color] duration-[2000ms] ease-in",
            fillColorClasses[theme][isDay ? "day" : "night"]
          )}
          style={{
            width: targetProgress ? `calc(min(${targetProgress}%, 100%))` : "",
          }}
        />
        <div className="absolute size-full flex gap-2.5 justify-center items-center mt-px">
          <LayoutMoneyText amount={currentDonation || 0} variant={layout} />
          <span>{isEn ? "of" : "von"}</span>
          <LayoutMoneyText amount={moneyTarget} variant={layout} />
        </div>
      </div>
    </div>
  );
};
