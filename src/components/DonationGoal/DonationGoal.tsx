import classNames from "classnames";
import { Stream as StreamData } from "../../hooks/useStreams";
import { getState } from "../../utils/dateAndTime";
import { Brush4 } from "../Brushes/Brush4";
import { GoalStamp } from "../Icons/GoalStamp";
import { Stream } from "../Stream/Stream";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../utils/constants";

type DonationGoalProps = {
  achieved?: boolean;
  amount: number;
  description: string | null;
  secret?: boolean;
  timeslot?: StreamData | null;
  title: string;
};

export const DonationGoal = ({
  achieved = false,
  amount,
  description,
  secret = false,
  timeslot = undefined,
  title,
}: DonationGoalProps) => {
  const { t } = useTranslation();
  return (
    <article
      className={classNames("flex flex-col relative", {
        "bg-blue23-200": achieved,
        "bg-neutral-100": !achieved,
      })}
    >
      {achieved &&
        timeslot &&
        getState(timeslot.start, timeslot.end) === "ended" && (
          <GoalStamp className="absolute text-blue23-700 -top-4 -right-4 rotate-[15deg] w-40 md:w-48" />
        )}
      <div className="flex items-center my-auto p-5">
        <div className="flex items-center justify-center mr-7 relative">
          <Brush4
            className={classNames("h-24 -ml-1 -my-2 rotate-45 w-auto", {
              "text-blue23-500": achieved,
              "text-neutral-300": !achieved,
            })}
          />
          <div
            className={classNames("absolute font-fat ml-2 text-5xl z-10", {
              "text-blue23-900": achieved,
              "text-neutral-500": !achieved,
            })}
          >
            {amount}
          </div>
        </div>
        <div>
          <div className="font-semibold text-lg">
            {!secret ? title : t("goals.secret")}
          </div>
          {description && !secret && <div>{description}</div>}
        </div>
      </div>

      <div className="p-5 pt-0">
        <div
          className={classNames("font-round2 font-bold mb-1", {
            "text-blue23-900": achieved,
            "text-neutral-500": !achieved,
          })}
        >
          {t("goals.beThere")}
        </div>

        {timeslot && (
          <Stream
            activityId={timeslot.activity.id}
            condensed
            endTime={timeslot.end}
            gameImageUrl={`${BASE_URL}/assets/${timeslot.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`}
            highlight={timeslot.highlight}
            startTime={timeslot.start}
            state={getState(timeslot.start, timeslot.end)}
            streamer={timeslot.streamer.name}
            title={timeslot.activity.name}
            vodLink={timeslot.vod_link}
            streamLanguage={timeslot.language}
          />
        )}

        {!timeslot && (
          <div className="bg-neutral-900 bg-opacity-10 flex h-28 md:h-20 items-center justify-center rounded-md w-full">
            <div className="font-bold text-neutral-900 text-opacity-75">
              {t("goals.tbd")}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
