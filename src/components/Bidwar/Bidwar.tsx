import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useState } from "react";
import { Breakpoint, useBreakpoint } from "../../hooks/useBreakpoint";
import { Stream as StreamData } from "../../hooks/useStreams";
import { getState } from "../../utils/dateAndTime";
import { Brush1 } from "../Brushes/Brush1";
import { GoalStamp } from "../Icons/GoalStamp";
import { RoundArrow } from "../Icons/RoundArrow";
import { Stream } from "../Stream/Stream";

type BidwarProps = {
  name: string;
  description: string;
  options: object;
  status: "active" | "inactive" | "results";
  timeslot?: StreamData | null;
};

const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const Bidwar = ({
  name,
  description,
  options,
  status = "active",
  timeslot = undefined,
}: BidwarProps) => {
  const breakpoint = useBreakpoint();
  const maxHeightPerItem = breakpoint >= Breakpoint.md ? 56 : 72;
  const [expanded, setExpanded] = useState(false);
  const [descriptionShown, setDescriptionShown] = useState(false);

  const sortedOptionKeys = options
    ? Object.keys(options).sort((a, b) => options[b] - options[a])
    : undefined;
  const maxOptionAmount = sortedOptionKeys
    ? options[sortedOptionKeys[0]]
    : undefined;

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col font-bold max-w-screen-lg w-full">
      {timeslot && getState(timeslot.start, timeslot.end) === "ended" && (
        <GoalStamp className="absolute text-blue23-700 -top-4 -right-4 rotate-[15deg] w-40 md:w-56 z-[1]" />
      )}
      <div className="bg-blue23-200">
        <div className="relative py-7 px-2 md:px-4">
          <Brush1 className="absolute text-blue23-400 opacity-20 max-w-[700px] lg:w-[700px] top-1/2 left-0 right-0 m-auto -translate-y-1/3" />
          <h2 className="relative text-blue23-800 text-2xl md:text-3xl text-center mt-3 md:mt-6 mx-6 z-[1]">
            {name}
          </h2>
          <div className="flex flex-row items-center justify-center mt-2 mb-6 z-[1]">
            <h3
              className={classNames("text-blue23-800 text-center z-[1]", {
                "text-xl md:text-2xl": status === "active",
                "text-2xl md:text-3xl": status === "results",
              })}
            >
              {status === "active"
                ? "Stimmt ab mit Euren Spenden"
                : "Endergebnis"}
            </h3>
            {status === "active" && description && (
              <div className="relative font-normal text-md md:text-lg flex justify-center items-center z-[3]">
                <button
                  className="cursor-default py-2"
                  onMouseEnter={() => setDescriptionShown(true)}
                  onMouseLeave={() => setDescriptionShown(false)}
                  onFocus={() => setDescriptionShown(true)}
                  onBlur={() => setDescriptionShown(false)}
                >
                  <Icon
                    className={classNames("ml-2", {
                      "text-blue23-600": descriptionShown,
                      "text-blue23-800": !descriptionShown,
                    })}
                    path={mdiInformationOutline}
                    size="2rem"
                  />

                  {descriptionShown && (
                    <>
                      <div className="absolute top-10 right-1 left-1/2 -translate-x-1/4 w-18 flex items-center justify-center">
                        <div className="w-0 h-0 border-solid border-x-[14px] border-x-transparent border-b-[26px] border-b-blue23-700"></div>
                      </div>
                      <div className="absolute cursor-auto select-text top-16 -left-[296px] -right-[33px] md:-left-[446px] md:-right-[133px] bg-blue23-700 text-blue23-200 shadow-2xl rounded-lg p-6">
                        {description}
                      </div>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="relative flex text-md px-3 z-[1]">
            <div
              className="flex flex-col w-full overflow-y-hidden overflow-x-hidden transition-all duration-300"
              style={{
                maxHeight:
                  maxHeightPerItem *
                  (expanded && sortedOptionKeys ? sortedOptionKeys.length : 3),
              }}
            >
              {sortedOptionKeys &&
                sortedOptionKeys.map((key) => {
                  return (
                    <div
                      className={classNames(
                        "flex flex-col md:flex-row items-start md:items-center w-full gap-0 md:gap-4 my-2 md:my-3",
                        {
                          "[&>span]:opacity-50 [&>span]:first:opacity-100 [&>span]:first:text-blue23-900 [&>span]:[&>div]:opacity-50 [&>span]:[&>div]:first:opacity-100 [&>span]:[&>div]:first:text-blue23-800 [&>div]:[&>div]:opacity-50 [&>div]:[&>div]:first:opacity-100 [&>div]:[&>div]:first:bg-blue23-700":
                            status === "results",
                        }
                      )}
                      title={key}
                      key={"wrapper-" + key}
                    >
                      <span className="text-lg md:text-xl w-full md:w-52 text-blue23-700 text-left md:text-right shrink-0 text-ellipsis overflow-hidden whitespace-nowrap">
                        #{capitalize(key)}
                      </span>
                      <div className="flex items-center gap-4 shrink-0 w-[calc(100%-6.5rem)] md:w-[calc(100%-21.5rem)]">
                        {maxOptionAmount && (
                          <div
                            className="self-stretch bg-blue23-500 rounded-md shrink-0"
                            style={{
                              width: `${
                                (options[key] * 100) / maxOptionAmount
                              }%`,
                            }}
                          ></div>
                        )}
                        <span className="text-xl md:text-2xl font-fat text-blue23-600 w-24 shrink-0">
                          {formatter.format(options[key] / 100).slice(0, -2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {sortedOptionKeys && sortedOptionKeys.length > 3 && (
          <div className="flex justify-center items-center h-10 p-6">
            <button
              className="group flex justify-center items-center text-blue23-700 w-32 h-12"
              type="button"
              onClick={toggleExpanded}
            >
              <RoundArrow
                className={classNames(
                  "text-blue23-700 w-14 h-16 group-hover:text-blue23-500 transition-transform duration-300",
                  {
                    "-rotate-90": expanded,
                    "rotate-90": !expanded,
                  }
                )}
              />
            </button>
          </div>
        )}
        <div className="p-5 pt-0 isolate">
          <div className="font-round2 font-bold mb-1 text-blue23-900 isolate">
            Sei bei der Umsetzung dabei
          </div>
          {timeslot && (
            <Stream
              activityId={timeslot.activity.id}
              condensed
              endTime={timeslot.end}
              gameImageUrl={
                process.env.BASE_URL +
                `/assets/${timeslot.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`
              }
              highlight={timeslot.highlight}
              startTime={timeslot.start}
              state={getState(timeslot.start, timeslot.end)}
              streamer={timeslot.streamer.name}
              title={timeslot.activity.name}
              vodLink={timeslot.vod_link}
            />
          )}

          {!timeslot && (
            <div className="bg-neutral-900 bg-opacity-10 flex h-28 md:h-20 items-center justify-center rounded-md w-full">
              <div className="font-bold text-neutral-900 text-opacity-75">
                Termin steht noch aus
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
