import { Stream as StreamData } from '../../hooks/useStreams';
import { getState } from '../../utils/dateAndTime';
import { Brush1 } from '../Brushes/Brush1';
import { Stream } from '../Stream/Stream';

type BidwarProps = {
  name: string;
  description: string;
  options: object;
  timeslot?: StreamData | null;
};

const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

function capitalize(word : string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const Bidwar = ({ name, description, options, timeslot = undefined }: BidwarProps) => {
  const sortedOptionKeys = Object.keys(options).sort((a, b) => options[b] - options[a]);
  const topThree = sortedOptionKeys.slice(0, 3);
  const lastOptions = sortedOptionKeys.slice(3);
  const maxOptionAmount = options[sortedOptionKeys[0]];

  return (
    <div className="flex flex-col font-bold max-w-screen-lg w-full">
      <div className="bg-blue23-200">
        <div className="relative py-5 px-2 md:px-4">
          <Brush1 className="absolute pointer-events-none text-blue23-400 opacity-20 md:w-[600px] top-1/2 left-0 right-0 m-auto -translate-y-1/3" />
          <h2 className="relative text-blue23-800 text-2xl md:text-3xl text-center my-3 md:my-6 px-2 z-[1]">{description}</h2>
          <div className="relative flex text-md px-3 z-[1]">
            <div className="flex flex-col w-full gap-0 md:gap-2">
              {topThree && 
                topThree.map((key) => {
                    return (
                      <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-0 md:gap-4 my-2" title={key} key={"wrapper-" + key}>
                        <span className="text-lg md:text-xl w-full md:w-52 text-blue23-700 text-left md:text-right shrink-0 text-ellipsis overflow-hidden whitespace-nowrap">#{capitalize(key)}</span>
                        <div className="flex items-center gap-4 shrink-0 w-[calc(100%-6rem)] md:w-[calc(100%-20rem)]">
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
