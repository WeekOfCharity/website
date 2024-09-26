import cn from "classnames";
import { PixelEuro } from "../Icons/PixelEuro";

export type LayoutMoneyTextProps = {
  amount: number | null | undefined;
  customEuroClassName?: string;
};

const formatter = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 });

export const LayoutMoneyText = ({
  amount,
  customEuroClassName,
}: LayoutMoneyTextProps) => {
  return (
    <span className="inline-flex items-center">
      {amount != null ? formatter.format(amount) : "?"}
      <PixelEuro
        className={cn(
          "ml-px w-3.5 mb-px transition-[filter] duration-[2000ms] ease-in drop-shadow-layout-text",
          customEuroClassName || "w-3.5"
        )}
      />
    </span>
  );
};
