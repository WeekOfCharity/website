import classNames from 'classnames';
import { Stream as StreamData } from '../../hooks/useStreams';
import { getState } from '../../utils/dateAndTime';
import { Brush4 } from '../Brushes/Brush4';
import { Stream } from '../Stream/Stream';

type DonationGoalProps = {
  achieved?: boolean;
  amount: number;
  description: string;
  hidden?: boolean;
  timeslot?: StreamData | null;
  title: string;
};

export const DonationGoal = ({ achieved = false, amount, description, hidden = false, timeslot = undefined, title }: DonationGoalProps) => {
  return (
    <article className={classNames('flex flex-col', { 'bg-blue23-200': achieved, 'bg-neutral-100': !achieved })}>
      <div className="flex items-center my-auto p-5">
        <div className="flex items-center justify-center mr-7 relative">
          <Brush4 className={classNames('h-24 -ml-1 -my-2 rotate-45 w-auto', { 'text-blue23-500': achieved, 'text-neutral-300': !achieved })} />
          <div className={classNames('absolute font-fat ml-2 text-5xl z-10', { 'text-blue23-900': achieved, 'text-neutral-500': !achieved })}>{amount}</div>
        </div>
        <div>
          <div className="font-semibold text-lg">{!hidden ? title : 'Dieses Spendenziel ist noch geheim'}</div>
          {description && !hidden && <div>{description}</div>}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className={classNames('font-round2 font-bold mb-1', { 'text-blue23-900': achieved, 'text-neutral-500': !achieved })}>Sei bei der Umsetzung dabei</div>

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
    </article>
  );
};
