import classNames from 'classnames';
import { useEffect, useState } from 'react';
import tailwind from '../../../tailwind.config.js';
import './DonationMeter.scss';

const easeInOutCirc = (t: number) => (t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2);
const frameDuration = 1000 / 60;

type DonationMeterProps = {
  currentValue: number;
  nextGoalValue?: number;
  startValue: number;
};

export const DonationMeter = ({ currentValue, nextGoalValue, startValue }: DonationMeterProps) => {
  const [amount, setAmount] = useState(startValue);
  const [animatedAmount, setAnimatedAmount] = useState(startValue);
  const [isAnimatingAmount, setIsAnimatingAmount] = useState(false);

  useEffect(() => {
    if (animatedAmount >= amount) return;

    let frame = 0;
    const initialAmount = animatedAmount;
    const totalFrames = Math.round(2000 / frameDuration);

    setIsAnimatingAmount(true);
    const counter = setInterval(() => {
      frame++;

      const progress = easeInOutCirc(frame / totalFrames);
      setAnimatedAmount(initialAmount + (amount - initialAmount) * progress);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setIsAnimatingAmount(false);
      }
    }, frameDuration);
  }, [amount]);

  setTimeout(() => setAmount(currentValue));

  return (
    <section className="mx-5 md:mx-10 relative">
      <div className="bg-opacity-50 flex flex-col items-center p-5 md:p-10">
        <div className="pb-10">
          <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-arctic-900 text-center transform-gpu uppercase">
            Aktueller
            <br />
            Spendenstand
          </div>
        </div>
        <div className="font-fat text-arctic-500 text-7xl md:text-9xl">
          <span className={classNames('woc-donation-amount', { 'is-current': !isAnimatingAmount })}>
            {animatedAmount.toLocaleString('de', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="font-semibold mt-4 text-arctic-600 text-lg">EURO</div>

        <div className="h-10 my-10 w-full">
          <div className="bg-arctic-100 ring-2 ring-offset-2 ring-arctic-600 ring-offset-white rounded w-full">
            <div
              className=" bg-no-repeat h-10 rounded woc-donation-meter"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, ${tailwind.theme.colors.arctic[500]} 0 6px, transparent 6px 12px)`,
                backgroundSize: '200% 100%',
                width: `${(100 / nextGoalValue ?? currentValue) * amount}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="font-fat text-neutral-500 text-4xl md:text-7xl">
          {nextGoalValue !== undefined ? nextGoalValue.toLocaleString('de', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : '❤️'}
        </div>
        <div className="font-semibold mt-4 text-neutral-900">{nextGoalValue !== undefined ? 'aktuelles Spendenziel' : 'Alle Ziele wurden erreicht!'}</div>
      </div>

      <div className="absolute bg-neutral-100 left-1/2 h-full max-w-xs min-w-[160px] top-0 transform-gpu -translate-x-1/2 w-1/2 md:w-1/3 -z-10"></div>
    </section>
  );
};
