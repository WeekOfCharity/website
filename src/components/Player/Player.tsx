import {
  mdiBroadcast,
  mdiCalendar,
  mdiClose,
  mdiInformation,
  mdiPlay,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stream, useStreams } from "../../hooks/useStreams";
import { formatTime, getState } from "../../utils/dateAndTime";
import { Brush1 } from "../Brushes/Brush1";
import "./Player.scss";
import { useTranslation } from "react-i18next";
import { getValidLanguage } from "../../i18n/i18n";
import { StreamLanguageBadge } from "../StreamLanguageBadge/StreamLanguageBadge";
import { ChibiChesster } from "../Game/ChibiChesster/ChibiChesster";

const arrowRight = new URL("../../assets/arrow-right.svg", import.meta.url);

function Player() {
  const { t, i18n } = useTranslation();
  const validLang = getValidLanguage(i18n.language);
  const [isPlayerOpen, setPlayerOpen] = useState(true);
  const [running, setRunning] = useState<Stream | undefined>(undefined);
  const [showInactive, setShowInactive] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  const { data: streams, status: streamsStatus } = useStreams(validLang);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date(time.getTime() - 1000));

      const stream = (streams ?? []).find(
        (stream) => getState(stream.start, stream.end) === "running"
      );

      setRunning(stream);
      setShowInactive(streamsStatus === "success" && stream === undefined);
    }, 1000);

    return () => clearInterval(id);
  }, [streams, streamsStatus, time]);

  return (
    <div className="bottom-0 right-0 fixed z-[99997] pointer-events-none">
      <ChibiChesster
        className="bottom-7 right-3 md:bottom-12 md:right-8 w-12 hover:-translate-y-5 duration-300"
        inert={isPlayerOpen ? "true" : undefined}
      />
      <button
        className={classNames(
          "bg-accent-500 m-5 md:m-10 p-4 absolute bottom-0 right-0 rounded-full text-white woc-player-button pointer-events-auto"
        )}
        onClick={() => setPlayerOpen(true)}
        inert={isPlayerOpen ? "true" : undefined}
      >
        <Icon path={mdiBroadcast} size="2rem" />
      </button>
      <div
        className={classNames(
          "pointer-events-auto absolute bg-neutral-800 duration-300 ease-in-out bottom-0 right-0 md:max-w-screen-sm overflow-hidden md:right-10 md:rounded-lg text-white transform-gpu transition-all w-screen",
          {
            "md:bottom-10 md:shadow-lg translate-y-0": isPlayerOpen,
            "shadow-none translate-y-full": !isPlayerOpen,
          }
        )}
        inert={!isPlayerOpen ? "true" : undefined}
      >
        <Brush1 className="absolute -bottom-24 duration-300 -left-40 -scale-100 text-accent-500 transform-gpu transition-all w-[400px] -z-10" />

        {running && (
          <div className="flex items-center justify-between p-5">
            <div>
              <div className="flex items-center">
                <Icon
                  className="mr-2 text-accent-500"
                  path={mdiBroadcast}
                  size="1rem"
                />
                <div className="font-bold text-accent-500 text-xs uppercase">
                  {t("player.currentStream")}
                </div>
              </div>
              <div className="font-round font-bold">
                {running.activity && (
                  <>
                    <Link
                      className="duration-300 hover:text-accent-500 transition-all"
                      to={`/streams?id=${running.activity.id}`}
                    >
                      {running.activity.name}
                    </Link>{" "}
                  </>
                )}

                {running.streamer && (
                  <>
                    <span className="font-normal">mit</span>{" "}
                    <Link
                      className="duration-300 hover:text-accent-500 transition-all"
                      to={`/team?id=${running.streamer.id}`}
                    >
                      {running.streamer.name}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col font-round font-bold ml-5 text-neutral-400 whitespace-nowrap">
              <span>
                {formatTime(running.start, validLang)} &mdash;{" "}
                {formatTime(running.end, validLang)}
              </span>
              <StreamLanguageBadge
                className="font-bold text-right"
                language={running.language}
              />
            </div>
          </div>
        )}

        {showInactive && (
          <div className="font-round font-bold p-5">
            {t("player.notActive1")}
            <br />
            {t("player.notActive2")}
          </div>
        )}

        {(streamsStatus !== "success" || (!running && !showInactive)) && (
          <div className="font-round font-bold p-5">{t("player.loading")}</div>
        )}

        <div className="flex justify-end p-5 space-x-2">
          {running && (
            <>
              <div className="bottom-4 flex mr-1 relative">
                <span
                  className="font-handwriting font-semibold mr-3 mt-3 text-xl whitespace-nowrap"
                  style={{ textShadow: "0 0 3px #26262680, 0 0 2px #262626" }}
                >
                  {t("player.watchNow")}
                </span>
                <img
                  className="rotate-12 w-[78px]"
                  src={arrowRight.toString()}
                  alt=""
                />
              </div>

              {running.streamer && (
                <a
                  className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all woc-player-button"
                  href={running.streamer.stream_link}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <Icon path={mdiPlay} size="1.25rem" />
                </a>
              )}
              {running.activity && (
                <Link
                  className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                  to={`/streams?id=${running.activity.id}`}
                >
                  <Icon path={mdiInformation} size="1.25rem" />
                </Link>
              )}
            </>
          )}

          {showInactive && (
            <Link
              className="bg-accent-500 hover:bg-accent-200 duration-300 flex items-center px-4 py-2 rounded-full text-neutral-800 transition-all"
              to="/streams"
            >
              <Icon path={mdiCalendar} size="1.25rem" aria-hidden />
              <span className="font-semibold ml-2">{t("mainNav.program")}</span>
            </Link>
          )}

          <button
            className="bg-white hover:bg-neutral-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
            onClick={() => setPlayerOpen(false)}
          >
            <Icon path={mdiClose} size="1.25rem" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
