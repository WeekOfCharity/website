import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import { formatTime, getWeekday } from '../../utils/dateAndTime';

type HighlightStreamProps = {
  endTime: string;
  fellowCount: number;
  gameImageUrl: string;
  startTime: string;
  streamer: string;
  title: string;
};

export const HighlightStream = ({ endTime, fellowCount, gameImageUrl, startTime, streamer, title }: HighlightStreamProps) => {
  return (
    <article
      className="bg-center bg-cover h-[400px] rounded-md"
      style={{
        backgroundImage: `url("${gameImageUrl}")`,
      }}
    >
      <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
        <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33, 0 0 3px #000F1E4D' }}>
          {title}
        </div>

        <div className="flex items-center mt-2 space-x-4 text-white">
          <Icon className="-mr-2" path={mdiAccount} size="1rem" />
          <span className="font-round font-bold">{streamer}</span>
          {fellowCount > 0 && <span className="bg-aqua-100 font-semibold px-2 py-0.5 rounded text-aqua-900 text-xs">+{fellowCount} Mitspieler</span>}
        </div>

        <div className="font-round font-bold mt-6 text-aqua-100">
          {getWeekday(startTime)}, {formatTime(startTime)} &mdash; {formatTime(endTime)}
        </div>
      </div>
    </article>
  );
};
