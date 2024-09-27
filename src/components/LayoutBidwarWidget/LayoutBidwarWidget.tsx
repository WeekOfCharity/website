import cn from "classnames";
import { StreamLayoutTheme } from "../../hooks/useCurrentMsOfDay";
import { useBidwarResults } from "../../hooks/useBidwarResults";
import { useEffect, useRef, useState } from "react";

import dividerGreenDay from "../../assets/layout/Divider_Green_Day.png";
import dividerGreenNight from "../../assets/layout/Divider_Green_Night.png";
import dividerRedDay from "../../assets/layout/Divider_Red_Day.png";
import dividerRedNight from "../../assets/layout/Divider_Red_Night.png";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import { LayoutBidwarOptionText } from "./LayoutBidwarOptionText";

export type LayoutBidwarWidgetProps = {
  theme: StreamLayoutTheme;
  isDay: boolean;
  isEn?: boolean;
  donationGoalsText?: string;
  className?: string;
};

const TOTAL_CYCLE_DURATION = 1 * 60 * 1000;
const SINGLE_BIDWAR_DURATION = 0.1 * 60 * 1000;

const MAX_BIDWAR_OPTION_AMOUNT = 6;

const dividers = {
  [StreamLayoutTheme.GREEN]: {
    day: dividerGreenDay,
    night: dividerGreenNight,
  },
  [StreamLayoutTheme.RED]: {
    day: dividerRedDay,
    night: dividerRedNight,
  },
} as const;

type PreparedBidwar = {
  name: string;
  options: {
    name: string;
    amount: number;
  }[];
};

export const LayoutBidwarWidget = ({
  theme,
  isDay,
  isEn,
  donationGoalsText,
  className,
}: LayoutBidwarWidgetProps) => {
  const [showBidwards, setShowBidwars] = useState(true);
  const [currentBidwarIndex, setCurrentBidwarIndex] = useState<number>(0);
  const [preparedBidwars, setPreparedBidwars] = useState<PreparedBidwar[]>([]);
  const {
    data: bidwarResults,
    status: bidwarResultsStatus,
    refetch: refetchBidwarResults,
  } = useBidwarResults();
  const [styles, setStyles] = useState<React.CSSProperties>();
  const bidwarOptionList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!bidwarOptionList.current) return;
      const difference =
        bidwarOptionList.current.getBoundingClientRect().height - 88;
      if (difference <= 0) return;
      setStyles({
        "--max-scroll-y": `-${difference}px`,
      } as React.CSSProperties);
    }, 100);
  }, [showBidwards, currentBidwarIndex]);

  useEffect(() => {
    const bidwars = bidwarResults?.results;
    const newPreparedBidwars: PreparedBidwar[] =
      bidwars
        //?.filter((bidwar) => bidwar.status !== "active")
        ?.map((bidwar) => {
          const optionNames = Object.keys(bidwar.options);
          return {
            name:
              isEn && bidwar.bidwar_name_en
                ? bidwar.bidwar_name_en
                : bidwar.bidwar_name,
            options: optionNames
              .map((optionName) => ({
                name: optionName,
                amount: bidwar.options[optionName],
              }))
              .sort((a, b) => b.amount - a.amount)
              .slice(0, MAX_BIDWAR_OPTION_AMOUNT),
          };
        }) || [];

    setPreparedBidwars(newPreparedBidwars);
  }, [bidwarResults, isEn]);

  useEffect(() => {
    const startBidwarRotation = () => {
      setCurrentBidwarIndex(0);
    };

    if (showBidwards) {
      startBidwarRotation();
      return;
    }
    const timeout = setTimeout(
      () => setShowBidwars(true),
      TOTAL_CYCLE_DURATION - preparedBidwars.length * SINGLE_BIDWAR_DURATION
    );

    return () => clearTimeout(timeout);
  }, [preparedBidwars, preparedBidwars.length, showBidwards]);

  useEffect(() => {
    const id = setInterval(() => void refetchBidwarResults(), 15 * 1000);
    return () => clearInterval(id);
  }, [refetchBidwarResults]);

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "absolute flex justify-center items-center size-full transition-opacity ease-in duration-[2000ms]",
          { "opacity-0": showBidwards }
        )}
      >
        {donationGoalsText}
      </div>
      {bidwarResultsStatus === "success" &&
        currentBidwarIndex < preparedBidwars.length && (
          <div
            className={cn(
              "absolute flex justify-center items-center size-full transition-opacity ease-in duration-[2000ms]",
              { "opacity-0": !showBidwards }
            )}
          >
            <div className="w-[44%] px-3 text-base">
              ! bidwar: {preparedBidwars[currentBidwarIndex]?.name}
            </div>
            <div className="absolute z-10 h-full w-2 left-[286px]">
              <img
                className={cn(
                  "absolute transition-[opacity,filter] ease-in duration-[2000ms] drop-shadow-layout-text",
                  {
                    "opacity-0": !isDay,
                  }
                )}
                alt=""
                src={dividers[theme].day}
              />
              <img
                className={cn(
                  "absolute transition-[opacity,filter] ease-in duration-[2000ms] drop-shadow-layout-text",
                  {
                    "opacity-0": isDay,
                  }
                )}
                alt=""
                src={dividers[theme].night}
              />
            </div>
            <div className="text-sm w-[56%] h-full animate-scrollY relative">
              <div
                ref={bidwarOptionList}
                className="absolute animate-scrollY pl-3 pr-4 py-1 w-full top-0"
                style={styles}
              >
                {preparedBidwars[currentBidwarIndex]?.options.map(
                  (option, index) => (
                    <span
                      key={option.name}
                      className="flex justify-between w-full h-7 relative"
                    >
                      <span className="flex items-center">
                        {index + 1}.
                        <div className="w-[236px] text-left overflow-x-hidden no-scrollbar flex items-center text-nowrap px-1 translate-x-5 absolute h-full">
                          <LayoutBidwarOptionText
                            text={option.name}
                            maxWidth={236}
                          />
                        </div>
                      </span>
                      <LayoutMoneyText
                        amount={
                          option.amount !== null ? option.amount / 100 : null
                        }
                      />
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
