import { mdiAccount, mdiCalendarBlankOutline, mdiClockOutline } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Breakpoint, useBreakpoint } from "../../hooks/useBreakpoint";
import { formatDay, formatTime } from "../../utils/dateAndTime";
import { Shimmer } from "../Shimmer/Shimmer";
import "./Stream.scss";
import { useTranslation } from "react-i18next";

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
}: StreamProps) => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  const RootElement =
    noLink && vodLink ? "a" : condensed && !noLink ? Link : "article";
  const BannerElement =
    noLink && vodLink ? "div" : !condensed && !noLink ? Link : "div";

  return (
    <RootElement
      className={classNames("flex select-none", {
        "cursor-pointer duration-300 hover:-mx-1.5 transition-all": condensed,
        "opacity-50": state === "ended",
        "pointer-events-none": clickDisabled || (noLink && !vodLink),
      })}
      to={condensed && !noLink ? `/streams?id=${activityId}` : undefined}
      href={noLink && vodLink ? vodLink : undefined}
      title={noLink && vodLink ? t("program.toVOD") : undefined}
      rel={noLink && vodLink ? "nofollow noreferrer" : undefined}
      target={noLink && vodLink ? "_blank" : undefined}
    >
      {!condensed && (
        <div
          className={classNames(
            "border-2 flex flex-shrink-0 items-center justify-center mr-2 md:mr-4 rounded-md w-12 md:w-16",
            {
              "bg-white border-green23-900 text-green23-900 woc-active-stream":
                state === "running" && !highlight,
              "bg-white border-green23-900 text-green23-900":
                state !== "running" && !highlight,
              "bg-green23-900 border-green23-900 text-white woc-active-highlight-stream":
                state === "running" && highlight,
              "bg-green23-900 border-green23-900 text-white":
                state !== "running" && highlight,
            }
          )}
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

      <BannerElement
        className={classNames(
          "flex flex-col md:flex-row relative md:rounded-md w-full",
          {
            "cursor-pointer duration-300 hover:-mx-2 transition-all":
              !condensed,
          }
        )}
        to={!condensed && !noLink ? `/streams?id=${activityId}` : undefined}
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
              <span>{title}</span>
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
                <span>{formatDay(startTime)}</span>

                <Icon
                  path={mdiClockOutline}
                  size="1rem"
                  style={{ marginRight: "-0.5rem" }}
                />
                <span>
                  {formatTime(startTime)} &mdash; {formatTime(endTime)}
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
