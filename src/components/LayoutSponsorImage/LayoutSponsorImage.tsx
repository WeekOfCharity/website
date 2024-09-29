import cardgourmetDay from "../../assets/layout/sponsor/logomark.svg";
import cardgourmetNight from "../../assets/layout/sponsor/cardgourmet-night.svg";
import { useContext } from "react";
import { IsDayContext } from "../../utils/IsDayContext";
import cn from "classnames";

export const LayoutSponsorImage = () => {
  const isDay = useContext(IsDayContext);
  return (
    <div className="relative w-full h-20">
      <img
        className={cn(
          "absolute mt-3 px-4 transition-opacity ease-in duration-[2000ms]",
          {
            "opacity-0": !isDay,
          }
        )}
        alt=""
        src={cardgourmetDay}
      />
      <img
        className={cn(
          "absolute mt-3 px-5 transition-[filter,opacity] drop-shadow-layout-text ease-in duration-[2000ms]",
          {
            "opacity-0": isDay,
          }
        )}
        alt=""
        src={cardgourmetNight}
      />
    </div>
  );
};
