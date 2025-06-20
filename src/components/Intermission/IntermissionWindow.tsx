import cn from "classnames";
import { PropsWithChildren, useRef } from "react";

type IntermissionWindowProps = PropsWithChildren<{
  title?: string;
  borderSrc?: string;
  textColor?: "light" | "dark";
  className?: string;
}>;

export const IntermissionWindow = ({
  title,
  borderSrc,
  textColor = "dark",
  className,
  children,
}: IntermissionWindowProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={windowRef}
      className={cn("grid *:col-start-1 *:row-start-1", className)}
    >
      <div className="pt-[42px] pr-[12px] pb-[12px] pl-[9px]">{children}</div>
      <img className="z-10" src={borderSrc} />
      <span
        className={cn("z-10 text-[19px] pl-4 py-2", {
          "text-int-highlight-dark": textColor === "dark",
          "text-int-highlight-light": textColor === "light",
        })}
      >
        {title}
      </span>
    </div>
  );
};
