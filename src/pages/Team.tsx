import { mdiClose, mdiMusic, mdiOpenInNew, mdiTwitch } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import { Brush1 } from "../components/Brushes/Brush1";
import { Brush4 } from "../components/Brushes/Brush4";
import { Member } from "../components/Member/Member";
import { OutsideAlerter } from "../components/OutsideAlerter/OutsideAlerter";
import { Stream } from "../components/Stream/Stream";
import { useStreams } from "../hooks/useStreams";
import { Member as MemberData, useTeam } from "../hooks/useTeam";
import { getState } from "../utils/dateAndTime";
import { useTitle } from "../hooks/useTitle";
import "./Team.scss";
import { useTranslation } from "react-i18next";
import { getValidLanguage } from "../i18n/i18n";
import { BASE_URL } from "../utils/constants";
import { useConfiguration } from "../hooks/useConfiguration";

const arrowDown = new URL("../assets/arrow-down.svg", import.meta.url);

export const Team = () => {
  const { t, i18n } = useTranslation();
  const validLanguage = getValidLanguage(i18n.language);
  useTitle(t("mainNav.team"));

  const [activeMember, setActiveMember] = useState<MemberData | undefined>(
    undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [themeStarted, setThemeStarted] = useState(false);

  const { data: configuration, status: configurationStatus } =
    useConfiguration();

  useEffect(() => {
    if (typeof activeMember !== "undefined") {
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
  }, [activeMember]);

  const { data: streams, status: streamsStatus } = useStreams(validLanguage);
  const { data: members, status: membersStatus } = useTeam(validLanguage);

  const charityId = -1;
  const chessterId = 30;
  const charity =
    typeof members !== "undefined" && members.length > 0
      ? members.find((member) => member.id === charityId)
      : undefined;
  const chesster =
    typeof members !== "undefined" && members.length > 0
      ? members.find((member) => member.id === chessterId)
      : undefined;

  const getStreamsWithFellow = (memberId: number) => {
    return typeof streams !== "undefined" && streams.length > 0
      ? streams.filter((stream) =>
          stream.fellows.some((fellow) => fellow.people_id.id === memberId)
        )
      : [];
  };

  const getStreamsWithHost = (memberId: number) => {
    return typeof streams !== "undefined" && streams.length > 0
      ? streams.filter((stream) => stream.streamer.id === memberId)
      : [];
  };

  const closeMember = () => {
    setSearchParams({}, { replace: true });
    setThemeStarted(false);
  };

  const openMember = (member: MemberData) => {
    setSearchParams({ id: member.id.toString() }, { replace: true });
  };

  const playTheme = () => {
    if (themeStarted) {
      setThemeStarted(false);
    } else {
      setThemeStarted(true);
    }
  };

  useEffect(() => {
    if (!searchParams.has("id")) {
      setActiveMember(undefined);
      return;
    }
    if (membersStatus !== "success") return;
    setActiveMember(
      members?.find(
        (member) =>
          member.id.toString() === searchParams.get("id") &&
          !member.hide_from_team_page
      )
    );
  }, [members, membersStatus, searchParams]);

  const showStreams =
    streamsStatus === "success" &&
    configurationStatus === "success" &&
    configuration.schedule_complete;

  return (
    <main className="text-neutral-800">
      <header className="px-5 pt-10 pb-5 relative text-center">
        <div className="font-round2 font-bold text-royal-900 uppercase">
          {t("team.subHeader")}
        </div>

        <h1 className="font-pally font-bold max-w-screen-md mx-auto my-5 text-royal-500 text-4xl md:text-7xl w-4/5">
          {t("team.mainHeader")}
          <br />
          Week of Charity
        </h1>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section
        className={classNames(
          "max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5",
          {
            "pointer-events-none": activeMember !== undefined,
          }
        )}
      >
        {membersStatus === "success" && (
          <>
            <div>
              <div className="flex justify-center mt-8 -rotate-3 w-full">
                <span className="font-handwriting font-semibold text-xl">
                  {t("clickForMoreInfo")}
                </span>
                <img
                  className="mt-4 ml-3 -scale-x-100"
                  src={arrowDown.toString()}
                  role="presentation"
                />
              </div>

              <div className="flex gap-3 justify-center">
                {charity && (
                  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%]">
                    <Member
                      avatarUrl={`${BASE_URL}/assets/${charity.icon}?width=256&height=256&quality=50&fit=cover&format=webp`}
                      name={charity.name}
                      onClick={() => openMember(charity)}
                      pronouns={charity.pronouns}
                    />
                  </div>
                )}
                {chesster && (
                  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%]">
                    <Member
                      avatarUrl={`${BASE_URL}/assets/${chesster.icon}?width=256&height=256&quality=50&fit=cover&format=webp`}
                      name={chesster.name}
                      onClick={() => openMember(chesster)}
                      pronouns={chesster.pronouns}
                    />
                  </div>
                )}
              </div>
            </div>

            <h1 className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">
              {t("team.weStream")}
            </h1>

            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {members
                ?.filter(
                  (member) =>
                    member.streamer &&
                    !member.hide_from_team_page &&
                    member.id !== charityId &&
                    member.id !== chessterId
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                  <Member
                    avatarUrl={`${BASE_URL}/assets/${member.icon}?width=256&height=256&quality=50&fit=cover&format=webp`}
                    name={member.name}
                    onClick={() => openMember(member)}
                    pronouns={member.pronouns}
                    key={member.id}
                  />
                ))}
            </div>

            <h2 className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">
              {t("team.weSupport")}
            </h2>
            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {members
                ?.filter(
                  (member) =>
                    !member.streamer &&
                    !member.hide_from_team_page &&
                    member.id !== charityId &&
                    member.id !== chessterId
                )
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                  <Member
                    avatarUrl={`${BASE_URL}/assets/${member.icon}?width=256&height=256&quality=50&fit=cover&format=webp`}
                    name={member.name}
                    onClick={() => openMember(member)}
                    pronouns={member.pronouns}
                    key={member.id}
                  />
                ))}
            </div>
          </>
        )}

        {membersStatus !== "success" && (
          <>
            <h2 className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">
              {t("team.weStream")}
            </h2>

            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {Array.from({ length: 24 }).map((_, index) => (
                <Member.Loading key={index} />
              ))}
            </div>
          </>
        )}
      </section>

      <OutsideAlerter active={activeMember !== undefined} onClick={closeMember}>
        <aside
          className={classNames(
            "bg-neutral-800 duration-300 ease-in-out fixed h-screen overflow-hidden right-0 top-0 transform-gpu transition-transform w-full sm:w-2/3 lg:w-1/2 2xl:w-1/3 z-[99999]",
            {
              "translate-x-0": typeof activeMember !== "undefined",
              "translate-x-full": typeof activeMember === "undefined",
            }
          )}
        >
          <button
            className="absolute bg-white hover:bg-neutral-200 duration-300 inline-flex items-center leading-none p-3 right-5 rounded-full top-5 transition-all z-[9999]"
            onClick={closeMember}
          >
            <Icon path={mdiClose} size="1.25rem" />
          </button>

          {activeMember && (
            <div
              className="h-full max-h-screen overflow-y-scroll p-5 text-white pb-24"
              style={{ scrollbarWidth: "thin" }}
            >
              <Brush1 className="absolute -right-24 text-royal-500 -top-8 w-[400px] -z-10" />

              <div className="flex items-start mb-5">
                <img
                  className="bg-royal-500 h-40 object-cover object-center rounded-lg shadow-2xl w-40"
                  src={`${BASE_URL}/assets/${activeMember.icon}?width=256&height=256&quality=50&fit=cover&format=webp`}
                  role="presentation"
                />
              </div>

              <div className="relative flex items-start space-x-2">
                <div className="mr-auto">
                  <div className="font-pally font-bold text-4xl">
                    {activeMember.name}
                  </div>
                  {activeMember.pronouns && (
                    <div className="font-semibold">{activeMember.pronouns}</div>
                  )}
                </div>

                {activeMember.theme && (
                  <div
                    className="relative bg-royal-500 hover:bg-royal-200 duration-300 p-3 rounded-full text-neutral-800 transition-all cursor-pointer"
                    onClick={playTheme}
                    title={t("team.playMusic")}
                  >
                    {themeStarted && (
                      <div className="triangleWrapper">
                        <div className="triangle"></div>
                      </div>
                    )}
                    <Icon path={mdiMusic} size="1.25rem" />
                  </div>
                )}

                {activeMember.stream_link && (
                  <a
                    className="relative bg-royal-500 hover:bg-royal-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={activeMember.stream_link}
                    rel="nofollow noreferrer"
                    title="Twitch"
                    target="_blank"
                  >
                    <Icon path={mdiTwitch} size="1.25rem" />
                  </a>
                )}

                {activeMember.social_link && (
                  <a
                    className="bg-royal-500 hover:bg-royal-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={activeMember.social_link}
                    rel="nofollow noreferrer"
                    title="Socials"
                    target="_blank"
                  >
                    <Icon path={mdiOpenInNew} size="1.25rem" />
                  </a>
                )}
                {themeStarted && (
                  <div className="player">
                    <AudioPlayer
                      url={`${BASE_URL}/assets/${activeMember.theme}.mp3`}
                    />
                  </div>
                )}
              </div>

              {activeMember.roles && activeMember.roles.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center mt-5 mb-0">
                  {activeMember.roles.map((role) => (
                    <span
                      className="bg-royal-500 flex font-round font-bold px-1 py-0.5 rounded-sm shadow text-royal-900 text-xs"
                      key={role}
                    >
                      #{t(`team.roles.${role}`)}
                    </span>
                  ))}
                </div>
              )}

              {activeMember.introduction && (
                <div
                  className="mt-5 mb-12 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: activeMember.introduction.replace(/\n/g, "<br />"),
                  }}
                />
              )}

              {showStreams && (
                <section className="flex flex-col gap-5 mt-5">
                  {getStreamsWithHost(activeMember.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-royal-500">
                        {activeMember.name} {t("team.hosts")}
                      </div>
                      {getStreamsWithHost(activeMember.id).map((stream) => (
                        <Stream
                          activityId={stream.activity.id}
                          condensed
                          endTime={stream.end}
                          gameImageUrl={`${BASE_URL}/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`}
                          highlight={stream.highlight}
                          startTime={stream.start}
                          state={getState(stream.start, stream.end)}
                          streamer={stream.streamer.name}
                          title={stream.activity.name}
                          vodLink={stream.vod_link}
                          key={stream.id}
                          streamLanguage={stream.language}
                          activityHidden={stream.activity.hidden}
                        />
                      ))}
                    </div>
                  )}

                  {getStreamsWithFellow(activeMember.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-royal-500">
                        {activeMember.name} {t("team.supports")}
                      </div>
                      {getStreamsWithFellow(activeMember.id).map((stream) => (
                        <Stream
                          activityId={stream.activity.id}
                          condensed
                          endTime={stream.end}
                          gameImageUrl={`${BASE_URL}/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`}
                          highlight={stream.highlight}
                          startTime={stream.start}
                          state={getState(stream.start, stream.end)}
                          streamer={stream.streamer.name}
                          title={stream.activity.name}
                          vodLink={stream.vod_link}
                          key={stream.id}
                          streamLanguage={stream.language}
                          activityHidden={stream.activity.hidden}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </aside>
      </OutsideAlerter>
    </main>
  );
};
