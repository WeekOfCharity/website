import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { formatDay, formatTime } from "../../utils/dateAndTime";
import { Shimmer } from "../Shimmer/Shimmer";
import { useTranslation } from "react-i18next";
import { getValidLanguage } from "../../i18n/i18n";

type HighlightStreamProps = {
  endTime: string;
  fellowCount: number;
  gameImageUrl: string;
  startTime: string;
  streamer: string;
  title: string;
};

export const HighlightStream = ({
  endTime,
  fellowCount,
  gameImageUrl,
  startTime,
  streamer,
  title,
}: HighlightStreamProps) => {
  const { t, i18n } = useTranslation();
  const validLang = getValidLanguage(i18n.language);

  return (
    <article className="flex flex-col h-[400px] max-h-[400px] rounded-md select-none">
      <div
        className="bg-center bg-cover flex-grow rounded-t-md"
        style={{
          backgroundImage: `url("${gameImageUrl}")`,
        }}
      />
      <div className="bg-mint-600 flex-shrink-0 p-4 rounded-b-md">
        <div
          className="font-semibold text-2xl text-white"
          style={{ textShadow: "0 0 20px #000F1E33, 0 0 3px #000F1E4D" }}
        >
          {title}
        </div>

        <div className="flex items-center mt-2 space-x-4 text-white">
          <Icon className="-mr-2" path={mdiAccount} size="1rem" />
          <span className="font-round font-bold">{streamer}</span>
          {fellowCount > 0 && (
            <span className="bg-white font-semibold px-2 py-0.5 rounded text-mint-700 text-xs">
              +{fellowCount} {t("program.fellows")}
            </span>
          )}
        </div>

        <div className="flex font-round font-bold items-center mt-2 space-x-4 text-white">
          <span>{formatDay(startTime, validLang)}</span>
          <span>
            {formatTime(startTime, validLang)} &mdash;{" "}
            {formatTime(endTime, validLang)}
          </span>
        </div>
      </div>
    </article>
  );
};

const Loading = () => {
  return <Shimmer className=" h-[400px] rounded-md" />;
};

HighlightStream.Loading = Loading;
