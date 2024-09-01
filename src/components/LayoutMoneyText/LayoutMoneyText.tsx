import cn from "classnames";
import { PixelEuro } from "../Icons/PixelEuro";

export type LayoutMoneyTextProps = {
  amount: number;
  isDay: boolean;
};

const formatter = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 });

export const LayoutMoneyText = ({ amount, isDay }: LayoutMoneyTextProps) => {
  return (
    <span className="inline-flex items-center">
      {formatter.format(amount)}
      <PixelEuro
        className={cn(
          "ml-px w-3.5 mb-px transition-[filter] duration-[2000ms] ease-in",
          {
            "drop-shadow-[0_0_5px_rgba(var(--text-r),var(--text-g),var(--text-b),0.6)]":
              !isDay,
          }
        )}
      />
    </span>
  );
};
