import cn from "classnames";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useBidwarResults } from "../../hooks/useBidwarResults";

import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import { LayoutBidwarOptionText } from "../LayoutBidwarWidget/LayoutBidwarOptionText";

export type IntermissionBidwarWidgetProps = {
  totalBidwarDuration: number;
  isEn?: boolean;
  className?: string;
};

const MAX_BIDWAR_OPTION_AMOUNT = 6;

type PreparedBidwar = {
  name: string;
  options: {
    name: string;
    amount: number;
  }[];
};

export const IntermissionBidwarWidget = ({
  totalBidwarDuration,
  isEn,
  className,
}: IntermissionBidwarWidgetProps) => {
  const [currentBidwarIndex, setCurrentBidwarIndex] = useState<number>(0);
  const {
    data: bidwarResults,
    status: bidwarResultsStatus,
    refetch: refetchBidwarResults,
  } = useBidwarResults();

  useEffect(() => {
    const id = setInterval(() => void refetchBidwarResults(), 15 * 1000);
    return () => clearInterval(id);
  }, [refetchBidwarResults]);

  const preparedBidwars = useMemo(() => {
    const bidwars = bidwarResults?.results;
    const newPreparedBidwars: PreparedBidwar[] =
      bidwars
        ?.filter((bidwar) => bidwar.status === "inactive")
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
    return newPreparedBidwars;
  }, [bidwarResults, isEn]);

  const individualBidwarDuration =
    preparedBidwars.length > 0
      ? totalBidwarDuration / preparedBidwars.length
      : totalBidwarDuration;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (preparedBidwars.length === 0) return;

    const startBidwarRotation = () => {
      interval = setInterval(() => {
        setCurrentBidwarIndex((prev) => {
          if (prev < preparedBidwars.length - 1) return prev + 1;
          else return 0;
        });
      }, individualBidwarDuration);
    };

    setCurrentBidwarIndex(0);
    startBidwarRotation();

    return () => clearInterval(interval);
  }, [preparedBidwars.length, individualBidwarDuration]);

  return (
    <div
      className={cn(
        "grid *:col-start-1 *:row-start-1 custom-text-shadow-dark",
        className
      )}
    >
      {bidwarResultsStatus === "success" &&
        currentBidwarIndex < preparedBidwars.length &&
        preparedBidwars.map((bidwar, index) => {
          const text = `! bidwar: ${bidwar.name}`;
          return (
            <div
              key={`${bidwar.name}-${index}`}
              className={cn(
                "flex flex-col h-full transition-opacity ease-in duration-[2000ms]",
                {
                  "opacity-0": index !== currentBidwarIndex,
                }
              )}
            >
              <div className="text-2xl leading-none mt-1 mb-3 text-center grid relative">
                <div className="col-start-1 row-start-1 grid *:col-start-1 *:row-start-1 ![text-shadow:none]">
                  <div>
                    <span className="text-gradient-bidwars bg-clip-text text-transparent font-bold">
                      {text}
                    </span>
                  </div>
                  <span className="text-int-highlight-dark w-full translate-x-[3px] translate-y-[3px] -z-10">
                    {text}
                  </span>
                </div>
              </div>
              <div className="h-full relative">
                <div
                  className={cn(
                    "absolute grid grid-cols-[max-content_1fr_max-content] w-full pr-3 pl-1 gap-x-2 *:-mb-1.5 top-0",
                    {
                      "text-[15px]/[32px]": bidwar.options.length > 3,
                      "text-[17px]/[35px]": bidwar.options.length <= 3,
                    }
                  )}
                >
                  {bidwar.options.map((option, optionIndex) => (
                    <Fragment key={option.name}>
                      <div>{optionIndex + 1}.</div>
                      <div className="text-left overflow-x-hidden no-scrollbar flex text-nowrap">
                        <LayoutBidwarOptionText
                          text={option.name}
                          maxWidth={494}
                        />
                      </div>
                      <div className="flex justify-end items-start">
                        <LayoutMoneyText
                          variant="intermission25"
                          amount={
                            option.amount !== null ? option.amount / 100 : null
                          }
                          style={{
                            "--icon-size":
                              bidwar.options.length > 3 ? "14px" : "16px",
                          }}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
