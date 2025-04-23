import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import "./DonationMeter.scss";
import { useTranslation } from "react-i18next";

const easeInOutCirc = (t: number) =>
  t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
const FRAME_DURATION = 1000 / 60;

type DonationMeterProps = {
  currentValue: number;
  nextGoalValue?: number;
  startValue: number;
};

export const DonationMeter = ({
  currentValue,
  nextGoalValue,
  startValue,
}: DonationMeterProps) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(startValue);
  const [animatedAmount, setAnimatedAmount] = useState(startValue);
  const [isAnimatingAmount, setIsAnimatingAmount] = useState(false);
  const previousAmount = useRef(startValue);

  useEffect(() => {
    if (previousAmount.current >= amount) return;

    let frame = 0;
    const initialAmount = previousAmount.current;
    const totalFrames = Math.round(2000 / FRAME_DURATION);

    const getNewAmount = (frame: number) => {
      const progress = easeInOutCirc(frame / totalFrames);
      return initialAmount + (amount - initialAmount) * progress;
    };

    setIsAnimatingAmount(true);
    const counter = setInterval(() => {
      frame++;
      const newAnimatedAmount = getNewAmount(frame);
      setAnimatedAmount(newAnimatedAmount);
      previousAmount.current = newAnimatedAmount;

      if (frame >= totalFrames) {
        clearInterval(counter);
        setIsAnimatingAmount(false);
      }
    }, FRAME_DURATION);

    return () => {
      clearInterval(counter);
      setIsAnimatingAmount(false);
    };
  }, [amount]);

  setTimeout(() => setAmount(currentValue));

  return (
    <section className="mx-5 md:mx-10 relative">
      <div className="bg-opacity-50 flex flex-col items-center p-5 md:p-10">
        <div className="pb-10">
          <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-royal-900 text-center transform-gpu uppercase">
            {t("donationMeter.current")}
            <br />
            {t("donationMeter.amount")}
          </div>
        </div>
        <div className="font-fat text-royal-500 text-7xl md:text-9xl">
          <span
            className={classNames("woc-donation-amount", {
              "is-current": !isAnimatingAmount,
            })}
          >
            {animatedAmount.toLocaleString("de", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="font-semibold mt-4 text-royal-600 text-lg">EURO</div>

        <div className="h-10 my-10 w-full">
          <div className="bg-royal-100 ring-2 ring-offset-2 ring-royal-600 ring-offset-white rounded w-full">
            <div
              className="bg-no-repeat h-10 rounded woc-donation-meter bg-repeating-linear-gradient"
              style={{
                backgroundSize: "200% 100%",
                width: `${(100 / (nextGoalValue ?? currentValue)) * animatedAmount}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="font-fat text-neutral-500 text-4xl md:text-7xl">
          {nextGoalValue !== undefined
            ? nextGoalValue.toLocaleString("de", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            : "❤️"}
        </div>
        <div className="font-semibold mt-4 text-neutral-900">
          {nextGoalValue !== undefined
            ? t("donationMeter.donationTarget")
            : t("donationMeter.allTargetsReached")}
        </div>
      </div>

      <div className="absolute bg-neutral-100 left-1/2 h-full max-w-xs min-w-[160px] top-0 transform-gpu -translate-x-1/2 w-1/2 md:w-1/3 -z-10"></div>
    </section>
  );
};
