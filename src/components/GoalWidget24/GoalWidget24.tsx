import { useEffect, useState } from "react";
import { DonationGoal, useDonationGoals } from "../../hooks/useDonationGoals";
import { useExternalDonationTotal } from "../../hooks/useExternalDonationTotal";
import { Language } from "../../i18n/i18n";
import cn from "classnames";
import { StreamLayoutTheme } from "../../hooks/useCurrentMsOfDay";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";

export type GoalWidget24Props = {
  theme: StreamLayoutTheme;
  isDay: boolean;
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
} as const;

const getHighestDonationGoalAmount = (goals: DonationGoal[] | undefined) => {
  if (!goals || goals.length === 0) return undefined;
  return goals[goals.length - 1].reached_at;
};

export const GoalWidget24 = ({
  theme,
  isDay,
  isEn,
  onDonationTextChange,
  className,
}: GoalWidget24Props) => {
  const [currentDonation, setCurrentDonation] = useState<number>(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number>();
  const [nextDonationGoalText, setNextDonationGoalText] = useState<string>();

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
      <div
        className={cn(
          "relative mt-auto h-10 rounded-[18px] overflow-hidden mx-4 transition-[background-color] duration-[2000ms] ease-in bg-layout-bg-current"
        )}
      >
        <div
          className={cn(
            "h-full absolute transition-[background-color] duration-[2000ms] ease-in",
            fillColorClasses[theme][isDay ? "day" : "night"]
          )}
          style={{
            width: moneyTarget
              ? `calc(min(${(currentDonation / moneyTarget) * 100}%, 100%))`
              : "",
          }}
        />
        <div className="absolute size-full flex gap-2.5 justify-center items-center mt-px">
          <LayoutMoneyText amount={currentDonation || 0} />
          <span>{isEn ? "of" : "von"}</span>
          <LayoutMoneyText amount={moneyTarget} />
        </div>
      </div>
    </div>
  );
};
