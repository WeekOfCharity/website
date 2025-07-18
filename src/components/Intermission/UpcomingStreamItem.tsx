import cn from "classnames";
import { BASE_URL } from "../../utils/constants";
import { getShortTwitchUrl } from "../../utils/formatting";
import { formatTimestampInGermany } from "../../utils/dateAndTime";

type UpcomingStreamItemProps = {
  activityIcon?: string;
  activityName?: string;
  streamerLink?: string;
  start?: string;
  end?: string;
  className?: string;
};

export const UpcomingStreamItem = ({
  activityIcon,
  activityName,
  streamerLink,
  start = "",
  end,
  className,
}: UpcomingStreamItemProps) => {
  const startDate = start ? new Date(start + "+02:00") : undefined;
  const timeUntilStart = (startDate?.getTime() || 0) - new Date().getTime();
  const startString =
    timeUntilStart < 0 ? "Now!" : formatTimestampInGermany(start);

  return (
    <div className={cn("flex gap-6 px-3 items-center", className)}>
      <div className="rounded-lg overflow-hidden shrink-0 size-28">
        {activityIcon && (
          <img
            src={`${BASE_URL}/assets/${activityIcon}?width=256&height=256&quality=50&fit=cover&format=webp`}
            alt=""
          />
        )}
      </div>
      <div className="grid grid-cols-[1fr_max-content] py-2 gap-3 w-full custom-text-shadow-dark">
        <div className="flex flex-col justify-center gap-3">
          {activityName && (
            <div
              className={cn({
                "text-[32px]/[1.25]": activityName.length <= 20,
                "text-[30px]/[1.25]":
                  activityName.length > 20 && activityName.length <= 30,
                "text-[25px]/[1.2]":
                  activityName.length > 30 && activityName.length <= 48,
                "text-[23px]/[1.15]": activityName.length > 48,
              })}
            >
              {activityName}
            </div>
          )}
          {streamerLink && <div>{getShortTwitchUrl(streamerLink)}</div>}
        </div>
        <div className="flex flex-col items-center justify-center text-xl">
          <div>{startString}</div>
          <div className="mb-2.5 text-2xl/4">-</div>
          <div>{formatTimestampInGermany(end)}</div>
        </div>
      </div>
    </div>
  );
};
