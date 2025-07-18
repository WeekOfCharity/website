import {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
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

type IntermissionTabButtonProps = {
  label: string;
  size?: "normal" | "small";
  preload?: boolean;
  active?: boolean;
  className?: string;
};

export const IntermissionTabButton = forwardRef(
  (
    {
      label,
      size = "normal",
      preload,
      active: activeFromProps = false,
      className,
    }: IntermissionTabButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const activeTimeout = useRef<ReturnType<typeof setTimeout>>();
    const [active, setActive] = useState(activeFromProps);

    const visualLabel = label.length <= 12 ? label : label.slice(0, 10) + "...";

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
        <span
          className={cn("my-auto py-1.5", {
            "flex items-center justify-center text-[21px]": size === "small",
            "inline-block overflow-hidden whitespace-nowrap px-3.5 text-[18px] max-w-[201px] [text-overflow:_'...']":
              size === "normal",
          })}
        >
          {visualLabel}
        </span>
      </button>
    );
  }
);

IntermissionTabButton.displayName = "IntermissionTabButton";
