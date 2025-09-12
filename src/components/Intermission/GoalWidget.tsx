import { useEffect, useState } from "react";
import { DonationGoal, useDonationGoals } from "../../hooks/useDonationGoals";
import { useExternalDonationTotal } from "../../hooks/useExternalDonationTotal";
import { Language } from "../../i18n/i18n";
import cn from "classnames";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import goalBorder from "../../assets/intermission/goal-bar.png";

export type GoalWidgetProps = {
  isEn?: boolean;
  className?: string;
};

const getHighestDonationGoalAmount = (goals: DonationGoal[] | undefined) => {
  if (!goals || goals.length === 0) return undefined;
  return goals[goals.length - 1].reached_at;
};

export const GoalWidget = ({ isEn, className }: GoalWidgetProps) => {
  const [currentDonation, setCurrentDonation] = useState<number>(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number>();
  const [nextDonationGoalText, setNextDonationGoalText] = useState<string>();
  const [lastReachedGoalAmount, setLastReachedGoalAmount] = useState<number>(0);

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

  const donationGoalText = getDonationGoalsText();
  return (
    <div
      className={cn(
        "flex flex-col custom-text-shadow-dark gap-6 items-center h-full justify-center",
        className
      )}
    >
      <div
        className={cn("text-center text-balance", {
          "text-2xl/9": donationGoalText.length <= 40,
          "text-lg": donationGoalText.length > 40,
        })}
      >
        {donationGoalText}
      </div>
      <div className="relative w-[576px] h-[63px]">
        <div className="absolute rounded-[32px] overflow-hidden size-full bg-[#2d056873]">
          <div
            className="goal-widget-25-progress-transition size-full bg-donation-goals-25 animate-bgDonationGoals25 bg-repeat bg-[length:300%_100%]"
            style={{
              "--goalProgress": `${targetProgress}%`,
              maskImage:
                "linear-gradient(to right, black var(--goalProgress), transparent var(--goalProgress))",
            }}
          />
        </div>
        <div className="absolute size-full flex gap-2.5 justify-center items-center mt-px text-xl">
          <LayoutMoneyText
            amount={currentDonation || 0}
            variant="intermission25"
          />
          <span>{isEn ? "of" : "von"}</span>
          <LayoutMoneyText amount={moneyTarget} variant="intermission25" />
        </div>
        <img src={goalBorder} alt="" className="absolute" />
      </div>
    </div>
  );
};
