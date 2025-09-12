import { useContext, useEffect, useRef, useState } from "react";
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
import { customConfetti } from "../../utils/widgets/confettiEffect";

export type GoalWidget24Props = {
  theme: StreamLayoutTheme | StreamLayoutTheme25;
  layout: "layout24" | "layout25";
  isEn?: boolean;
  onDonationTextChange?: (donationGoalText: string) => void;
  onGoalReachedTextChange?: (announcingName: string | undefined) => void;
  className?: string;
};

const getHighestDonationGoalAmount = (goals: DonationGoal[] | undefined) => {
  if (!goals || goals.length === 0) return undefined;
  return goals[goals.length - 1].reached_at;
};

export const GoalWidget24 = ({
  theme,
  layout,
  isEn,
  onDonationTextChange,
  onGoalReachedTextChange,
  className,
}: GoalWidget24Props) => {
  const [announcingGoalReached, setAnnouncingGoalReached] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<number>(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number>();
  const [nextDonationGoalText, setNextDonationGoalText] = useState<string>();
  const [lastReachedGoalAmount, setLastReachedGoalAmount] = useState<number>(0);
  const isDay = useContext(IsDayContext);

  const skipReachedQueue = useRef<boolean>(true);
  const goalReachedQueue = useRef<DonationGoal[]>([]);
  const alreadyQueuedIds = useRef<number[]>([]);

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

    setTimeout(() => onDonationTextChange?.(getDonationGoalsText()), 2000);
  }, [
    donationGoals,
    donationGoalsStatus,
    donationsStatus,
    isEn,
    nextDonationGoal,
    nextDonationGoalText,
    onDonationTextChange,
  ]);

  useEffect(() => {
    if (
      !donationGoals ||
      donationGoalsStatus !== "success" ||
      typeof donations === "undefined" ||
      donations === null ||
      donationsStatus !== "success"
    )
      return;

    const current = donations.donated_amount_in_cents / 100;

    if (skipReachedQueue.current) {
      donationGoals.forEach((goal) => {
        if (goal.reached_at <= current) alreadyQueuedIds.current.push(goal.id);
      });

      skipReachedQueue.current = false;
      return;
    }

    donationGoals.forEach((goal) => {
      if (
        goal.reached_at <= current &&
        !alreadyQueuedIds.current.some((id) => id === goal.id)
      )
        goalReachedQueue.current.unshift(goal);
    });

    if (goalReachedQueue.current.length > 0) {
      setTimeout(() => setAnnouncingGoalReached(true), 1000);
    }
  }, [donationGoals, donationGoalsStatus, donations, donationsStatus]);

  useEffect(() => {
    if (skipReachedQueue.current) return;
    if (!announcingGoalReached) {
      if (goalReachedQueue.current.length > 0) {
        setAnnouncingGoalReached(true);
        return;
      }
    }

    const currentGoalReached = goalReachedQueue.current.pop();
    alreadyQueuedIds.current.push(currentGoalReached?.id || -1);
    if (!currentGoalReached) return;
    const { name } = currentGoalReached;

    onGoalReachedTextChange?.(name);
    void customConfetti();

    const timeout = setTimeout(() => {
      setAnnouncingGoalReached(false);
      onGoalReachedTextChange?.(undefined);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [announcingGoalReached, onGoalReachedTextChange]);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative mt-auto h-10 rounded-[18px] overflow-hidden mx-4 transition-[background-color] duration-[2000ms] ease-in bg-layout-bg-current">
        <div
          className={cn(
            "absolute goal-widget-25-progress-transition size-full animate-bgDonationGoals25layout bg-repeat bg-[length:200%_100%]",
            {
              "bg-donation-goals-25-blue-day":
                isDay && theme === StreamLayoutTheme25.BLUE,
              "bg-donation-goals-25-blue-night":
                !isDay && theme === StreamLayoutTheme25.BLUE,
              "bg-donation-goals-25-pink-day":
                isDay && theme === StreamLayoutTheme25.PINK,
              "bg-donation-goals-25-pink-night":
                !isDay && theme === StreamLayoutTheme25.PINK,
            }
          )}
          style={{
            "--goalProgress": `${targetProgress}%`,
            maskImage:
              "linear-gradient(to right, black var(--goalProgress), transparent var(--goalProgress))",
          }}
        />
        <div className="absolute size-full pb-px flex gap-2.5 justify-center items-center text-[19px]">
          <LayoutMoneyText
            amount={currentDonation || 0}
            variant={layout}
            customEuroClassName="!w-[18px]"
          />
          <span>{isEn ? "of" : "von"}</span>
          <LayoutMoneyText
            amount={moneyTarget}
            variant={layout}
            customEuroClassName="!w-[18px]"
          />
        </div>
      </div>
    </div>
  );
};
