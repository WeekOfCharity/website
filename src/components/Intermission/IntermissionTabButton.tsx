import {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";

import smallTab from "../../assets/intermission/start-button.png";
import smallTabActive from "../../assets/intermission/start-button-active.png";
import normalTab from "../../assets/intermission/window-button.png";
import normalTabActive from "../../assets/intermission/window-button-active.png";
import { preloadImages } from "../../utils/widgets/preloadImage";

type IntermissionTabButtonProps = PropsWithChildren<{
  size?: "normal" | "small";
  preload?: boolean;
  active?: boolean;
  className?: string;
}>;

export const IntermissionTabButton = forwardRef(
  (
    {
      children,
      size = "normal",
      preload,
      active: activeFromProps = false,
      className,
    }: IntermissionTabButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const activeTimeout = useRef<ReturnType<typeof setTimeout>>();
    const [active, setActive] = useState(activeFromProps);

    useEffect(() => {
      setActive(activeFromProps);
    }, [activeFromProps]);

    useEffect(() => {
      if (!preload) return;
      void preloadImages([
        smallTab,
        smallTabActive,
        normalTab,
        normalTabActive,
      ]);
    }, [preload]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
      if (activeTimeout.current) clearTimeout(activeTimeout.current);
      setActive(true);
      activeTimeout.current = setTimeout(() => {
        setActive(false);
      }, 1500);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "grid *:col-start-1 *:row-start-1 [text-shadow:_3px_3px_#150477]",
          className
        )}
        onClick={handleClick}
      >
        {!active && <img src={size === "normal" ? normalTab : smallTab} />}
        {active && (
          <img src={size === "normal" ? normalTabActive : smallTabActive} />
        )}
        <div
          className={cn("flex items-center", {
            "justify-center text-[21px]": size === "small",
            "px-3.5 text-[18px]": size === "normal",
          })}
        >
          <span>{children}</span>
        </div>
      </button>
    );
  }
);

IntermissionTabButton.displayName = "IntermissionTabButton";
