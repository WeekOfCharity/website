import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';

type StreamProps = {
  endTime: string;
  gameImageUrl: string;
  startTime: string;
  streamer: string;
  title: string;
};

export const Stream = ({ endTime, gameImageUrl, startTime, streamer, title }: StreamProps) => {
  return (
    <article className="flex">
      <div className="bg-aqua-900 flex flex-shrink-0 items-center justify-center mr-4 rounded-md text-aqua-100 w-16">
        <div className="font-round font-bold leading-none -rotate-6 -skew-x-6 text-sm text-center">
          {startTime}
          <br />
          &mdash;
          <br />
          {endTime}
        </div>
      </div>

      <div
        className="bg-center bg-cover flex-shrink-0 h-[80px] rounded-l-md w-[80px]"
        style={{
          backgroundImage: `url("${gameImageUrl}")`,
        }}
      />

      <div
        className="bg-center bg-cover rounded-r-md w-full"
        style={{
          backgroundImage: `url("${gameImageUrl}")`,
        }}
      >
        <div className="backdrop-blur-lg bg-neutral-900 bg-opacity-50 flex flex-col h-full justify-center px-4 rounded-r-md text-white w-full">
          <div className="font-semibold mb-1 text-xl">{title}</div>
          <div className="flex items-center space-x-4">
            <Icon className="-mr-2" path={mdiAccount} size="1rem" />
            <span className="font-round font-semibold text-sm">{streamer}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
