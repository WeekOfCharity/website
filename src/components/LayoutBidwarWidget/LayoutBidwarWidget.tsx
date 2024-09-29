import cn from "classnames";
import { StreamLayoutTheme } from "../../hooks/useCurrentMsOfDay";
import { useBidwarResults } from "../../hooks/useBidwarResults";
import { useContext, useEffect, useState } from "react";

import dividerGreenDay from "../../assets/layout/Divider_Green_Day.png";
import dividerGreenNight from "../../assets/layout/Divider_Green_Night.png";
import dividerRedDay from "../../assets/layout/Divider_Red_Day.png";
import dividerRedNight from "../../assets/layout/Divider_Red_Night.png";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import { LayoutBidwarOptionText } from "./LayoutBidwarOptionText";
import { IsDayContext } from "../../utils/IsDayContext";

export type LayoutBidwarWidgetProps = {
  theme: StreamLayoutTheme;
  isEn?: boolean;
  donationGoalsText?: string;
  className?: string;
};

const TOTAL_CYCLE_DURATION = 15 * 60 * 1000;
const SINGLE_BIDWAR_DURATION = 1 * 60 * 1000;

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
  isEn,
  donationGoalsText,
  className,
}: LayoutBidwarWidgetProps) => {
  const [showBidwards, setShowBidwars] = useState(false);
  const [currentBidwarIndex, setCurrentBidwarIndex] = useState<number>(0);
  const [preparedBidwars, setPreparedBidwars] = useState<PreparedBidwar[]>([]);
  const {
    data: bidwarResults,
    status: bidwarResultsStatus,
    refetch: refetchBidwarResults,
  } = useBidwarResults();
  const isDay = useContext(IsDayContext);
  const [styleList, setStyleList] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const bidwars = bidwarResults?.results;
    const newPreparedBidwars: PreparedBidwar[] =
      bidwars
        ?.filter((bidwar) => bidwar.status === "active")
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

    newPreparedBidwars.forEach((bidwar) => {
      const difference = 10 + 26 * bidwar.options.length - 88;
      setStyleList((prev) => [
        ...prev,
        {
          "--max-scroll-y": difference <= 0 ? "0px" : `-${difference}px`,
        } as React.CSSProperties,
      ]);
    });

    setPreparedBidwars(newPreparedBidwars);
  }, [bidwarResults, isEn]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (preparedBidwars.length === 0) return;

    const startBidwarRotation = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setCurrentBidwarIndex((prev) => {
          if (prev < preparedBidwars.length - 1) return prev + 1;
          else {
            setShowBidwars(false);
            clearInterval(interval);
            return prev;
          }
        });
      }, SINGLE_BIDWAR_DURATION);
    };

    if (showBidwards) {
      setCurrentBidwarIndex(0);
      startBidwarRotation();
      return;
    }

    const timeout = setTimeout(
      () => setShowBidwars(true),
      TOTAL_CYCLE_DURATION - preparedBidwars.length * SINGLE_BIDWAR_DURATION
    );

    return () => clearTimeout(timeout);
  }, [preparedBidwars.length, showBidwards]);

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
            <div className="w-[44%] h-full text-base relative top-0">
              {preparedBidwars.map((bidwar, bidwar_index) => (
                <span
                  key={`${bidwar.name}-${bidwar_index}`}
                  className={cn(
                    "absolute flex items-center px-3 justify-center size-full left-0 transition-opacity ease-in duration-[2000ms]",
                    { "opacity-0": bidwar_index !== currentBidwarIndex }
                  )}
                >
                  ! bidwar: {bidwar.name}
                </span>
              ))}
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
            <div className="text-[15px] w-[56%] h-full animate-scrollY relative">
              <div className="grid w-full">
                {preparedBidwars.map((bidwar, bidwar_index) => (
                  <div
                    key={`${bidwar.name}-${bidwar_index}`}
                    className={cn(
                      "col-start-1 row-start-1 animate-scrollY pl-3 pr-4 py-[5px] w-full h-fit top-0 transition-opacity ease-in duration-[2000ms]",
                      { "opacity-0": bidwar_index !== currentBidwarIndex }
                    )}
                    style={styleList[bidwar_index]}
                  >
                    {bidwar.options.map((option, option_index) => (
                      <span
                        key={option.name}
                        className="flex justify-between w-full h-[26px] relative"
                      >
                        <span className="flex items-center">
                          {option_index + 1}.
                          <div className="w-[230px] text-left overflow-x-hidden no-scrollbar flex items-center text-nowrap px-2 translate-x-5 absolute h-full">
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
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
