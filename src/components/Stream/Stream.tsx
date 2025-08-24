import { mdiAccount, mdiCalendarBlankOutline, mdiClockOutline } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Breakpoint, useBreakpoint } from "../../hooks/useBreakpoint";
import { formatDay, formatTime } from "../../utils/dateAndTime";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Stream.scss";
import { useTranslation } from "react-i18next";
import { StreamLanguageBadge } from "../StreamLanguageBadge/StreamLanguageBadge";
import { StreamLanguage } from "../../hooks/useStreams";
import { getValidLanguage, Language } from "../../i18n/i18n";

type StreamProps = {
  activityId: number;
  condensed?: boolean;
  endTime: string;
  gameImageUrl: string;
  highlight: boolean;
  clickDisabled?: boolean;
  noLink?: boolean;
  startTime: string;
  state?: "upcoming" | "running" | "ended";
  streamer: string;
  title: string;
  vodLink: string;
  streamLanguage?: StreamLanguage;
  activityHidden?: boolean;
};

export const Stream = ({
  activityId,
  condensed = false,
  endTime,
  gameImageUrl,
  highlight,
  clickDisabled = false,
  noLink = false,
  startTime,
  state = "upcoming",
  streamer,
  title,
  vodLink,
  streamLanguage,
  activityHidden,
}: StreamProps) => {
  const { t, i18n } = useTranslation();
  const validLang = getValidLanguage(i18n.language);
  const breakpoint = useBreakpoint();

  const getRootElement = () => {
    if (activityHidden) return "article";
    if (noLink && vodLink) return "a";
    if (condensed && !noLink) return Link;
    return "article";
  };

  const getBannerElement = () => {
    if (activityHidden || (noLink && vodLink)) return "div";
    if (!condensed && !noLink) return Link;
    return "div";
  };

  const RootElement = getRootElement();
  const BannerElement = getBannerElement();

  return (
    <RootElement
      className={classNames("flex select-none", {
        "cursor-pointer duration-300 hover:-mx-1.5 transition-all":
          condensed && !activityHidden,
        "opacity-50": state === "ended",
        "pointer-events-none": clickDisabled || (noLink && !vodLink),
      })}
      to={RootElement === Link ? `/streams?id=${activityId}` : ""}
      href={RootElement === "a" ? vodLink : undefined}
      title={RootElement === "a" ? t("program.toVOD") : undefined}
      rel={RootElement === "a" ? "nofollow noreferrer" : undefined}
      target={RootElement === "a" ? "_blank" : undefined}
    >
      {!condensed && (
        <div
          className={classNames(
            "border-2 flex flex-shrink-0 items-center justify-center mr-2 md:mr-4 rounded-md",
            {
              "bg-white border-mint-900 text-mint-900 woc-active-stream":
                state === "running" && !highlight,
              "bg-white border-mint-900 text-mint-900":
                state !== "running" && !highlight,
              "bg-mint-900 border-mint-900 text-white woc-active-highlight-stream":
                state === "running" && highlight,
              "bg-mint-900 border-mint-900 text-white":
                state !== "running" && highlight,
              "w-12 md:w-16": validLang === Language.DE,
              "w-14 md:w-20": validLang === Language.EN,
            }
          )}
        >
          <div className="flex flex-col font-round font-bold leading-none -rotate-6 -skew-x-6 text-sm text-center">
            <span>{formatTime(startTime, validLang)}</span>
            <span>&mdash;</span>
            <span>{formatTime(endTime, validLang)}</span>
          </div>
        </div>
      )}

      <BannerElement
        className={classNames(
          "flex flex-col md:flex-row relative md:rounded-md w-full",
          {
            "cursor-pointer duration-300 hover:-mx-2 transition-all":
              !condensed && !activityHidden,
          }
        )}
        to={BannerElement === Link ? `/streams?id=${activityId}` : ""}
      >
        <div
          className="bg-center bg-cover flex-shrink-0 h-28 md:h-20 rounded-l-md rounded-r-md md:rounded-r-none w-full md:w-20"
          style={{
            backgroundImage: `url("${gameImageUrl}")`,
          }}
        />

        {condensed && highlight && (
          <div className="absolute backdrop-blur-lg bg-neutral-900 bg-opacity-75 flex md:hidden items-center left-2 px-1 py-0.5 rounded-sm shadow-xl space-x-4 text-[#EAB308] text-xs top-2">
            <span className="font-round2 font-bold uppercase">
              {t("program.highlight")}
            </span>
          </div>
        )}

        {!condensed && (
          <div className="absolute backdrop-blur-lg bg-neutral-900 bg-opacity-75 flex md:hidden items-center px-1 py-0.5 right-2 rounded-sm shadow-xl space-x-4 text-accent-500 text-xs top-2">
            <Icon className="-mr-2" path={mdiAccount} size="1rem" />
            <span className="font-round font-bold">{streamer}</span>
          </div>
        )}

        <div
          className="absolute bg-center bg-cover bottom-0 rounded-r-md md:static w-full"
          style={{
            backgroundImage:
              breakpoint >= Breakpoint.md
                ? `url("${gameImageUrl}")`
                : undefined,
          }}
        >
          <div className="backdrop-blur-lg bg-neutral-900 bg-opacity-75 flex flex-col md:h-full justify-center p-2 md:px-4 rounded-b-md md:rounded-bl-none md:rounded-r-md text-white w-full">
            <div className="flex font-semibold leading-none md:mb-1.5 space-x-4 text-lg">
              <span
                className={classNames({
                  "pr-32": vodLink && !noLink,
                  "pr-[5.75rem]": vodLink && noLink,
                })}
              >
                {activityHidden && (
                  <span className="mr-2 text-[#ff8888] font-bold">
                    Warning: Activity hidden!
                  </span>
                )}
                {title}
                <StreamLanguageBadge
                  className="font-normal ml-2"
                  language={streamLanguage}
                />
              </span>
              {state === "ended" && vodLink && (
                <span className="md:block woc-vod-label">
                  {noLink ? t("program.toVOD") : t("program.VODavailable")}
                </span>
              )}
            </div>

            {condensed ? (
              <div className="flex font-round font-semibold items-center leading-none mt-1.5 space-x-4 text-sm">
                <Icon
                  path={mdiCalendarBlankOutline}
                  size="1rem"
                  style={{ marginRight: "-0.5rem" }}
                />
                <span>{formatDay(startTime, validLang)}</span>

                <Icon
                  path={mdiClockOutline}
                  size="1rem"
                  style={{ marginRight: "-0.5rem" }}
                />
                <span>
                  {formatTime(startTime, validLang)} &mdash;{" "}
                  {formatTime(endTime, validLang)}
                </span>

                {highlight && (
                  <span className="md:block font-round2 font-bold hidden text-[#EAB308] text-xs uppercase woc-highlight-label">
                    {t("program.highlight")}
                  </span>
                )}
              </div>
            ) : (
              <div className="md:flex hidden items-center space-x-4 text-sm">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-semibold">{streamer}</span>
              </div>
            )}
          </div>
        </div>
      </BannerElement>
    </RootElement>
  );
};

type LoadingStreamProps = {
  condensed?: boolean;
};

const Loading = ({ condensed = false }: LoadingStreamProps) => {
  return condensed ? (
    <Shimmer className="h-28 md:h-20 rounded-md" />
  ) : (
    <div className="flex h-28 md:h-20">
      <Shimmer className="border-2 border-transparent flex-shrink-0 mr-2 md:mr-4 rounded-md w-12 md:w-16" />
      <Shimmer className="rounded-md w-full" />
    </div>
  );
};

Stream.Loading = Loading;
