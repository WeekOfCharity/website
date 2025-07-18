import cn from "classnames";
import { PixelEuro } from "../Icons/PixelEuro";

export type LayoutMoneyTextProps = {
  amount: number | null | undefined;
  variant: "layout24" | "layout25";
  customEuroClassName?: string;
};

const formatter = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 });

export const LayoutMoneyText = ({
  amount,
  variant,
  customEuroClassName,
}: LayoutMoneyTextProps) => {
  return (
    <span className="inline-flex items-center">
      {amount != null ? formatter.format(amount) : "?"}
      <PixelEuro
        className={cn(
          {
            "transition-[filter] duration-[2000ms] ease-in drop-shadow-layout-text w-3.5 ml-px mb-px":
              variant === "layout24",
            "drop-shadow-layout-dark w-[18px] ml-0.5": variant === "layout25",
          },
          customEuroClassName
        )}
      />
    </span>
  );
};
