import { PropsWithChildren, useEffect, useState } from "react";
import cn from "classnames";
import { streamBanners } from "./streamBannerData";

import chessterWaveGif from "../../assets/layout/donation_alert/Chesster_Animation_02.gif";
import chessterJumpGif from "../../assets/layout/donation_alert/Chesster_Animation_01.gif";

export type AnimatedStreamBannerProps = PropsWithChildren<{
  isEn: boolean;
  className?: string;
}>;

const BANNER_VISIBLE_DURATION = 12000;
const BANNER_HIDDEN_DURATION = 30000;
const CHESSTER_ALONE_DURATION = 1000;

enum ChessterState {
  HIDDEN_LEFT = "hidden_left",
  HIDDEN_RIGHT = "hidden_right",
  LEFT = "left",
  RIGHT = "right",
}

const getChessterStateVisible = (bannerId: number) => {
  if (bannerId === 1 || bannerId === 4) return ChessterState.LEFT;
  if (bannerId === 2) return ChessterState.RIGHT;
  return ChessterState.HIDDEN_LEFT;
};

const getChessterStateHidden = (bannerId: number) => {
  if (bannerId === 1 || bannerId === 4) return ChessterState.HIDDEN_LEFT;
  if (bannerId === 2) return ChessterState.HIDDEN_RIGHT;
  return ChessterState.HIDDEN_LEFT;
};

export const AnimatedStreamBanner = ({
  isEn,
  className,
  children,
}: AnimatedStreamBannerProps) => {
  const [currentBanner, setCurrentBanner] = useState(-1);
  const [isBannerVisible, setBannerVisible] = useState(false);
  const [chessterState, setChessterState] = useState(ChessterState.HIDDEN_LEFT);

  const hideCurrentBanner = () => {
    setBannerVisible(false);
    setTimeout(() => {
      setChessterState((prev) => {
        if (prev === ChessterState.LEFT) return ChessterState.HIDDEN_LEFT;
        if (prev === ChessterState.RIGHT) return ChessterState.HIDDEN_RIGHT;
        return ChessterState.HIDDEN_LEFT;
      });
    }, CHESSTER_ALONE_DURATION);
  };

  const displayNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % streamBanners.length);
    setTimeout(() => {
      setBannerVisible(true);
    }, CHESSTER_ALONE_DURATION + 750);
  };

  useEffect(() => {
    let timeout;

    if (isBannerVisible)
      timeout = setTimeout(hideCurrentBanner, BANNER_VISIBLE_DURATION);
    else timeout = setTimeout(displayNextBanner, BANNER_HIDDEN_DURATION);

    return () => clearTimeout(timeout);
  }, [isBannerVisible]);

  useEffect(() => {
    setChessterState(getChessterStateHidden(currentBanner));
    setTimeout(
      () => setChessterState(getChessterStateVisible(currentBanner)),
      750
    );
  }, [currentBanner]);

  const chessterLeft =
    chessterState === ChessterState.HIDDEN_LEFT ||
    chessterState === ChessterState.LEFT;

  const chessterRight =
    chessterState === ChessterState.HIDDEN_RIGHT ||
    chessterState === ChessterState.RIGHT;

  const chessterVisible =
    chessterState === ChessterState.LEFT ||
    chessterState === ChessterState.RIGHT;

  const chessterHidden =
    chessterState === ChessterState.HIDDEN_LEFT ||
    chessterState === ChessterState.HIDDEN_RIGHT;

  return (
    <div className={className}>
      <div
        className={cn(
          "grid font-bold transition-[transform,opacity] duration-[1500ms] ease-in-out-back size-full",
          {
            "translate-y-16 opacity-0 scale-95": !isBannerVisible,
          }
        )}
      >
        <div className="animate-float">
          {children}
          <div className="absolute inset-0 flex items-center justify-center flex-col leading-7">
            {currentBanner >= 0 &&
              streamBanners[currentBanner][isEn ? "en" : "de"]}
            {currentBanner >= 0 && streamBanners[currentBanner].both}
          </div>
        </div>
      </div>
      <img
        className={cn(
          "absolute bottom-0 size-24 object-contain object-top -mb-6 ease-in-out-back transition-transform duration-1000",
          {
            "rotate-[18deg] left-0": chessterLeft,
            "translate-x-4 right-0": chessterRight,
            "translate-y-2": chessterVisible,
            "translate-y-20": chessterHidden,
            "-translate-x-10": chessterState === ChessterState.LEFT,
            "-translate-x-20": chessterState === ChessterState.HIDDEN_LEFT,
          }
        )}
        src={chessterLeft ? chessterWaveGif : chessterJumpGif}
        alt=""
      />
    </div>
  );
};
