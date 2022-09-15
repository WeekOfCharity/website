import { mdiAccount, mdiCalendarBlankOutline, mdiClockOutline } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { Breakpoint, useBreakpoint } from '../../hooks/useBreakpoint';
import { formatDay, formatTime } from '../../utils/dateAndTime';

type StreamProps = {
  condensed?: boolean;
  endTime: string;
  gameImageUrl: string;
  highlight: boolean;
  startTime: string;
  streamer: string;
  title: string;
};

export const Stream = ({ condensed = false, endTime, gameImageUrl, highlight, startTime, streamer, title }: StreamProps) => {
  const breakpoint = useBreakpoint();

  return (
    <article className="flex">
      {!condensed && (
        <div
          className={classNames('border-2 flex flex-shrink-0 items-center justify-center mr-2 md:mr-4 rounded-md w-12 md:w-16', {
            'bg-aqua-900 border-aqua-900 text-aqua-100': highlight,
            'bg-white border-aqua-900 text-aqua-900': !highlight,
          })}
        >
          <div className="font-round font-bold leading-none -rotate-6 -skew-x-6 text-sm text-center">
            {formatTime(startTime)}
            <br />
            &mdash;
            <br />
            {formatTime(endTime)}
          </div>
        </div>
      )}

      <div className="md:contents flex flex-col relative w-full">
        <div
          className="bg-center bg-cover flex-shrink-0 h-28 md:h-20 rounded-l-md rounded-r-md md:rounded-r-none w-full md:w-20"
          style={{
            backgroundImage: `url("${gameImageUrl}")`,
          }}
        />

        {!condensed && (
          <div className="absolute backdrop-blur-lg bg-neutral-900 bg-opacity-75 flex md:hidden items-center px-1 py-0.5 right-2 rounded-sm shadow-xl space-x-4 text-aqua-500 text-xs top-2">
            <Icon className="-mr-2" path={mdiAccount} size="1rem" />
            <span className="font-round font-bold">{streamer}</span>
          </div>
        )}

        <div
          className="absolute bg-center bg-cover bottom-0 rounded-r-md md:static w-full"
          style={{
            backgroundImage: breakpoint >= Breakpoint.md ? `url("${gameImageUrl}")` : undefined,
          }}
        >
          <div className="backdrop-blur-lg bg-neutral-900 bg-opacity-75 flex flex-col md:h-full justify-center p-2 md:px-4 rounded-b-md md:rounded-bl-none md:rounded-r-md text-white w-full">
            <div className="font-semibold md:mb-1.5 leading-none text-lg">{title}</div>

            {condensed ? (
              <div className="flex font-round font-semibold items-center leading-none mt-1.5 space-x-4 text-sm">
                <Icon path={mdiCalendarBlankOutline} size="1rem" style={{ marginRight: '-0.5rem' }} />
                <span>{formatDay(startTime)}</span>

                <Icon path={mdiClockOutline} size="1rem" style={{ marginRight: '-0.5rem' }} />
                <span>
                  {formatTime(startTime)} &mdash; {formatTime(endTime)}
                </span>
              </div>
            ) : (
              <div className="md:flex hidden items-center space-x-4 text-sm">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-semibold">{streamer}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
