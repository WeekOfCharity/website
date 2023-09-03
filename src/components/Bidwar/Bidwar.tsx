import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Breakpoint, useBreakpoint } from '../../hooks/useBreakpoint';
import { Stream as StreamData } from '../../hooks/useStreams';
import { getState } from '../../utils/dateAndTime';
import { Brush1 } from '../Brushes/Brush1';
import { GoalStamp } from '../Icons/GoalStamp';
import { RoundArrow } from '../Icons/RoundArrow';
import { Stream } from '../Stream/Stream';

type BidwarProps = {
  name: string;
  description: string;
  options: object;
  status: "active" | "inactive" | "results";
  timeslot?: StreamData | null;
};

const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

function capitalize(word : string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const Bidwar = ({ name, description, options, status = "active", timeslot = undefined }: BidwarProps) => {
  const breakpoint = useBreakpoint();
  const maxHeightPerItem = breakpoint >= Breakpoint.md ? 56 : 72;
  const [expanded, setExpanded] = useState(false);

  const sortedOptionKeys = options ? Object.keys(options).sort((a, b) => options[b] - options[a]) : undefined;
  const maxOptionAmount = sortedOptionKeys ? options[sortedOptionKeys[0]] : undefined;

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  }

  return (
    <div className="relative flex flex-col font-bold max-w-screen-lg w-full">
      {timeslot && getState(timeslot.start, timeslot.end) === "ended" && <GoalStamp className="absolute text-blue23-700 -top-4 -right-4 rotate-[15deg] w-40 md:w-56"/>}
      <div className="bg-blue23-200 overflow-hidden">
        <div className="relative py-7 px-2 md:px-4">
          <Brush1 className="absolute pointer-events-none text-blue23-400 opacity-20 md:w-[750px] top-1/2 left-0 right-0 m-auto -translate-y-1/3" />
          <h2 className="relative text-blue23-800 text-2xl md:text-3xl text-center my-3 md:my-6 mx-6 z-[1]">{description}</h2>
          <h3 className={classNames("relative text-blue23-800 text-center my-3 md:my-6 px-2 z-[1]", {
            "text-xl md:text-2xl" : status === "active",
            "text-2xl md:text-3xl" : status === "results"
          })}>
            {status === "active" ? "Stimmt ab mit Euren Spenden" : "Endergebnis"}
          </h3>
          <div className="relative flex text-md px-3 z-[1]">
            <div className="flex flex-col w-full overflow-y-hidden overflow-x-hidden transition-all duration-300"
              style={{maxHeight: maxHeightPerItem * (expanded && sortedOptionKeys ? sortedOptionKeys.length : 3)}}
            >
              {sortedOptionKeys && 
                sortedOptionKeys.map((key) => {
                  return (
                    <div className={classNames("flex flex-col md:flex-row items-start md:items-center w-full gap-0 md:gap-4 my-2 md:my-3", {
                      "[&>span]:opacity-50 [&>span]:first:opacity-100 [&>span]:first:text-blue23-900 [&>span]:[&>div]:opacity-50 [&>span]:[&>div]:first:opacity-100 [&>span]:[&>div]:first:text-blue23-800 [&>div]:[&>div]:opacity-50 [&>div]:[&>div]:first:opacity-100 [&>div]:[&>div]:first:bg-blue23-700" : status === "results"
                    })} title={key} key={"wrapper-" + key}>
                      <span className="text-lg md:text-xl w-full md:w-52 text-blue23-700 text-left md:text-right shrink-0 text-ellipsis overflow-hidden whitespace-nowrap">#{capitalize(key)}</span>
                      <div className="flex items-center gap-4 shrink-0 w-[calc(100%-6.5rem)] md:w-[calc(100%-21.5rem)]">
                        {maxOptionAmount && <div className="self-stretch bg-blue23-500 rounded-md shrink-0" style={{width: `${(options[key] * 100)/maxOptionAmount}%`}}></div> }
                        <span className="text-xl md:text-2xl font-fat text-blue23-600 w-24 shrink-0">{formatter.format(options[key]/100).slice(0, -2)}</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
        {sortedOptionKeys && sortedOptionKeys.length > 3 && (
          <div className="flex justify-center items-center h-10 p-6">
          <button className="group flex justify-center items-center text-blue23-700 w-32 h-12" type="button" onClick={toggleExpanded}>
            <RoundArrow className={classNames("text-blue23-700 w-12 h-16 rotate-90 group-hover:scale-[1.15] transition duration-300", {
              "-rotate-90" : expanded
            })}/>
          </button>
        </div>
        )}
        <div className="p-5 pt-0">
          <div className='font-round2 font-bold mb-1 text-blue23-900'>Sei bei der Umsetzung dabei</div>
          {timeslot && (
            <Stream
              activityId={timeslot.activity.id}
              condensed
              endTime={timeslot.end}
              gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${timeslot.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`}
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
              <div className="font-bold text-neutral-900 text-opacity-75">Termin steht noch aus</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
