import cn from "classnames";
import { BASE_URL } from "../../utils/constants";
import { getShortTwitchUrl } from "../../utils/formatting";
import { formatTime } from "../../utils/dateAndTime";
import { Language } from "../../i18n/i18n";

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
  start,
  end,
  className,
}: UpcomingStreamItemProps) => {
  return (
    <div className={cn("flex gap-4 pr-3", className)}>
      {activityIcon && (
        <img
          className="aspect-square max-h-full p-4"
          src={`${BASE_URL}/assets/${activityIcon}?width=256&height=256&quality=50&fit=cover&format=webp`}
          alt=""
        />
      )}
      <div className="grid grid-cols-[1fr_max-content] py-2 gap-3 w-full">
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
          {start && <div>{formatTime(start, Language.DE)}</div>}
          <div className="mb-2.5 text-2xl/4">-</div>
          {end && <div>{formatTime(end, Language.DE)}</div>}
        </div>
      </div>
    </div>
  );
};
