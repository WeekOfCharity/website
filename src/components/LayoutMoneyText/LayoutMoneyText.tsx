import cn from "classnames";
import { PixelEuro } from "../Icons/PixelEuro";
import { CSSProperties } from "react";

export type LayoutMoneyTextProps = {
  amount: number | null | undefined;
  variant: "layout24" | "layout25";
  customEuroClassName?: string;
  style?: CSSProperties;
};

const formatter = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2 });

export const LayoutMoneyText = ({
  amount,
  variant,
  customEuroClassName,
  style,
}: LayoutMoneyTextProps) => {
  return (
    <span className="inline-flex items-center" style={style}>
      {amount != null ? formatter.format(amount) : "?"}
      <PixelEuro
        className={cn(
          {
            "transition-[filter] duration-[2000ms] ease-in drop-shadow-layout-text w-3.5 ml-px mb-px":
              variant === "layout24",
            "drop-shadow-layout-dark w-[var(--icon-size,_18px)] ml-0.5":
              variant === "layout25",
          },
          customEuroClassName
        )}
      />
    </span>
  );
};
