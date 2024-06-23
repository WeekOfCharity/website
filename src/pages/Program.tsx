import { mdiClose, mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Brush1 } from "../components/Brushes/Brush1";
import { Brush4 } from "../components/Brushes/Brush4";
import { Carousel } from "../components/Carousel/Carousel";
import { HighlightStream } from "../components/HighlightStream/HighlightStream";
import { Member } from "../components/Member/Member";
import { OutsideAlerter } from "../components/OutsideAlerter/OutsideAlerter";
import { Stream } from "../components/Stream/Stream";
import {
  Activity as ActivityData,
  useActivities,
} from "../hooks/useActivities";
import { Stream as StreamData, useStreams } from "../hooks/useStreams";
import { formatDay, getState } from "../utils/dateAndTime";
import { getDocumentTitle } from "../utils/getDocumentTitle";

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export const Program = () => {
  const [activeActivity, setActiveActivity] = useState<
    ActivityData | undefined
  >(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (typeof activeActivity !== "undefined") {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
    };
  }, [activeActivity]);

  document.title = getDocumentTitle("Programm");

  const { data: activities, status: activitiesStatus } = useActivities();
  const { data: streams, status: streamsStatus } = useStreams();

  const streamsGrouped = useMemo(() => {
    if (typeof streams === "undefined" || streams.length === 0) {
      return {};
    }

    return streams.reduce<Record<string, StreamData[]>>((groups, stream) => {
      const day = formatDay(stream.start);
      const group = groups[day] ?? [];

      return { ...groups, [day]: [...group, stream] };
    }, {});
  }, [streams]);

  const upcomingHighlights = useMemo(() => {
    if (typeof streams === "undefined") {
      return undefined;
    }

    return streams.filter(
      (stream) =>
        stream.highlight && getState(stream.start, stream.end) !== "ended"
    );
  }, [streams]);

  const getFellowsWithActivity = (activityId: number) => {
    const fellows: StreamData["fellows"] = [];

    getStreamsWithActivity(activityId).forEach((stream) => {
      stream.fellows.forEach((fellow) => {
        if (!fellows.some((f) => f.people_id.id === fellow.people_id.id)) {
          fellows.push(fellow);
        }
      });
    });

    return fellows.sort((a, b) =>
      a.people_id.name.localeCompare(b.people_id.name)
    );
  };

  const getStreamersWithActivity = (activityId: number) => {
    return getStreamsWithActivity(activityId).reduce<StreamData["streamer"][]>(
      (streamers, stream) => {
        if (!streamers.some((streamer) => streamer.id === stream.streamer.id)) {
          return [...streamers, stream.streamer];
        }

        return streamers;
      },
      []
    );
  };

  const getStreamsWithActivity = (activityId: number) => {
    return typeof streams !== "undefined" && streams.length > 0
      ? streams.filter((stream) => stream.activity.id === activityId)
      : [];
  };

  const closeActivity = () => {
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    if (searchParams.has("id")) {
      if (activitiesStatus === "success") {
        setActiveActivity(
          activities.find(
            (activity) => activity.id.toString() === searchParams.get("id")
          )
        );
      }
    } else {
      setActiveActivity(undefined);
    }
  }, [activitiesStatus, searchParams]);

  return (
    <main className="text-neutral-800 woc-accent-green23">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-green23-900 uppercase">
          Keine Events verpassen
        </div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-green23-500 text-4xl md:text-7xl w-4/5">
          Das Programm der Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      {streamsStatus === "success" && upcomingHighlights.length > 0 && (
        <section className="mb-20 md:mb-40 mt-12 md:mt-20">
          <div className="max-w-screen-2xl mb-6 mx-auto">
            <div className="font-semibold px-10 2xl:px-2.5 text-3xl md:text-4xl text-center md:text-left">
              Die Highlights 👑 der Woche
            </div>
          </div>
          <Carousel>
            {upcomingHighlights.map((stream) => (
              <HighlightStream
                endTime={stream.end}
                fellowCount={stream.fellows.length}
                gameImageUrl={
                  process.env.BASE_URL +
                  `/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`
                }
                startTime={stream.start}
                streamer={stream.streamer.name}
                title={stream.activity.name}
                key={stream.id}
              />
            ))}
          </Carousel>
        </section>
      )}

      {streamsStatus !== "success" && (
        <section className="mb-20 md:mb-40 mt-12 md:mt-20">
          <Carousel>
            {[...Array(4)].map((_, index) => (
              <HighlightStream.Loading key={"loading" + index} />
            ))}
          </Carousel>
        </section>
      )}

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="font-semibold mb-6 text-3xl md:text-4xl text-center md:text-left">
          {streamsStatus === "success" && streams.length > 0
            ? "Alle Streams"
            : "Bald seht ihr hier mehr!"}
        </div>

        <div className="gap-x-5 gap-y-10 grid xl:grid-cols-2">
          {streamsStatus === "success" &&
            Object.keys(streamsGrouped).map((day) => (
              <div className="space-y-4" key={day}>
                <div>
                  <div className="font-round2 font-bold text-green23-900 uppercase">
                    {day}
                  </div>
                  <div className="bg-green23-900 h-0.5 w-full"></div>
                </div>

                {streamsGrouped[day].map((stream) => (
                  <Stream
                    activityId={stream.activity.id}
                    endTime={stream.end}
                    gameImageUrl={
                      process.env.BASE_URL +
                      `/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`
                    }
                    highlight={stream.highlight}
                    startTime={stream.start}
                    clickDisabled={activeActivity ? true : undefined}
                    state={getState(stream.start, stream.end)}
                    streamer={stream.streamer.name}
                    title={stream.activity.name}
                    vodLink={stream.vod_link}
                    key={stream.id}
                  />
                ))}
              </div>
            ))}

          {streamsStatus !== "success" &&
            [...Array(8)].map((_, index) => (
              <div className="space-y-4" key={index}>
                {[...Array(5)].map((_, index) => (
                  <Stream.Loading key={index} />
                ))}
              </div>
            ))}
        </div>
      </section>

      <OutsideAlerter
        active={activeActivity !== undefined}
        onClick={closeActivity}
      >
        <aside
          className={classNames(
            "bg-neutral-800 duration-300 ease-in-out fixed h-screen overflow-hidden right-0 top-0 transform-gpu transition w-full sm:w-2/3 lg:w-1/2 2xl:w-1/3 z-[99999]",
            {
              "translate-x-0": typeof activeActivity !== "undefined",
              "translate-x-full": typeof activeActivity === "undefined",
            }
          )}
        >
          <button
            className="absolute bg-white hover:bg-neutral-200 duration-300 inline-flex items-center leading-none p-3 right-5 rounded-full top-5 transition-all z-[9999]"
            onClick={closeActivity}
          >
            <Icon path={mdiClose} size="1.25rem" />
          </button>

          {activeActivity && (
            <main
              className="h-full max-h-screen overflow-y-scroll p-5 text-white pb-24"
              style={{ scrollbarWidth: "thin" }}
            >
              <Brush1 className="absolute -right-24 text-green23-500 -top-8 w-[400px] -z-10" />

              <div className="flex items-start mb-5">
                <img
                  className="bg-green23-500 h-40 object-cover object-center rounded-lg shadow-2xl w-40"
                  src={
                    process.env.BASE_URL +
                    `/assets/${activeActivity.icon}?width=256&height=256&quality=50&fit=cover&format=webp`
                  }
                />
              </div>

              <div className="flex items-start space-x-2">
                <div className="font-pally font-bold mr-auto text-4xl">
                  {activeActivity.name}
                </div>

                {activeActivity.reference_link && (
                  <a
                    className="bg-green23-500 hover:bg-green23-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={activeActivity.reference_link}
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <Icon path={mdiOpenInNew} size="1.25rem" />
                  </a>
                )}
              </div>

              {activeActivity.description && (
                <div
                  className="mt-5 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: activeActivity.description.replace(/\n/g, "<br />"),
                  }}
                />
              )}

              {streamsStatus === "success" && (
                <section className="flex flex-col gap-5 mt-5">
                  {getStreamsWithActivity(activeActivity.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-green23-500">
                        Sei dabei in diesen Streams
                      </div>
                      {getStreamsWithActivity(activeActivity.id).map(
                        (stream) => (
                          <Stream
                            activityId={stream.activity.id}
                            condensed
                            endTime={stream.end}
                            gameImageUrl={
                              process.env.BASE_URL +
                              `/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`
                            }
                            highlight={stream.highlight}
                            noLink
                            startTime={stream.start}
                            state={getState(stream.start, stream.end)}
                            streamer={stream.streamer.name}
                            title={stream.activity.name}
                            vodLink={stream.vod_link}
                            key={stream.id}
                          />
                        )
                      )}
                    </div>
                  )}

                  {getStreamsWithActivity(activeActivity.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-green23-500">
                        {activeActivity.name} wird gehostet von
                      </div>
                      <div className="flex gap-2">
                        {getStreamersWithActivity(activeActivity.id).map(
                          (streamer) => (
                            <ConditionalWrapper
                              condition={!streamer.hide_from_team_page}
                              key={"streamer-" + streamer.id}
                              wrapper={(children) => (
                                <Link to={`/team?id=${streamer.id}`}>
                                  {children}
                                </Link>
                              )}
                            >
                              <Member
                                avatarUrl={
                                  process.env.BASE_URL +
                                  `/assets/${streamer.icon}?width=80&height=80&quality=50&fit=cover&format=webp`
                                }
                                condensed
                                name={streamer.name}
                              />
                            </ConditionalWrapper>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {getFellowsWithActivity(activeActivity.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-green23-500">
                        {activeActivity.name} wird begleitet von
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getFellowsWithActivity(activeActivity.id).map(
                          (fellow) => {
                            return (
                              <ConditionalWrapper
                                condition={
                                  !fellow.people_id.hide_from_team_page
                                }
                                key={"fellow-" + fellow.people_id.id}
                                wrapper={(children) => (
                                  <Link to={`/team?id=${fellow.people_id.id}`}>
                                    {children}
                                  </Link>
                                )}
                              >
                                <Member
                                  avatarUrl={
                                    process.env.BASE_URL +
                                    `/assets/${fellow.people_id.icon}?width=80&height=80&quality=50&fit=cover&format=webp`
                                  }
                                  condensed
                                  name={fellow.people_id.name}
                                />
                              </ConditionalWrapper>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </main>
          )}
        </aside>
      </OutsideAlerter>
    </main>
  );
};
