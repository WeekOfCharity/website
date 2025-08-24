import { mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bidwar } from "../components/Bidwar/Bidwar";
import { Brush1 } from "../components/Brushes/Brush1";
import { Brush4 } from "../components/Brushes/Brush4";
import { Brush5 } from "../components/Brushes/Brush5";
import Countdown from "../components/Countdown/Countdown";
import { DonationGoal } from "../components/DonationGoal/DonationGoal";
import { DonationMeter } from "../components/DonationMeter/DonationMeter";
import { Shimmer } from "../components/Shimmer/Shimmer";
import TwitchEmbed from "../components/TwitchEmbed/TwitchEmbed";
import { useBidwarResults } from "../hooks/useBidwarResults";
import { useBidwars } from "../hooks/useBidwars";
import { useConfiguration } from "../hooks/useConfiguration";
import { useDonationGoals } from "../hooks/useDonationGoals";
import { useExternalDonationTotal } from "../hooks/useExternalDonationTotal";
import { useFAQ } from "../hooks/useFAQ";
import { useStreams } from "../hooks/useStreams";

import { useTranslation } from "react-i18next";
import { useTitle } from "../hooks/useTitle";
import { getValidLanguage } from "../i18n/i18n";
import { DONATION_URL } from "../utils/constants";
import { YoutubeEmbed } from "../components/YoutubeEmbed/YoutubeEmbed";

export const Home = () => {
  useTitle();
  const { t, i18n } = useTranslation();
  const validLang = getValidLanguage(i18n.language);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [lastDonationGoal, setLastDonationGoal] = useState(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number | undefined>(
    undefined
  );
  const [wocStatus, setWocStatus] = useState("");
  const [timerVisible, setTimerVisible] = useState(true);

  const { data: donations, status: donationsStatus } =
    useExternalDonationTotal();
  const { data: donationGoals, status: donationGoalsStatus } =
    useDonationGoals(validLang);
  const { data: faq, status: faqStatus } = useFAQ(validLang);
  const { data: configuration, status: configurationStatus } =
    useConfiguration();
  const { data: streams, status: streamsStatus } = useStreams(validLang);
  const { data: bidwarResults, status: bidwarResultsStatus } =
    useBidwarResults();
  const { data: bidwars, status: bidwarsStatus } = useBidwars(validLang);

  const hideCountdown = () => {
    setTimeout(() => {
      setTimerVisible(false);
    }, 1000);
  };

  useEffect(() => {
    const time = new Date(Date.now());
    if (
      configurationStatus === "success" &&
      (streamsStatus === "error" || !configuration.schedule_complete)
    ) {
      if (!configuration.woc_start) {
        setWocStatus("wocUpcomingSoon");
        return;
      }
      const woc_start_date = new Date(configuration.woc_start + "+02:00");
      if (time < woc_start_date) {
        setWocStatus("wocUpcoming");
      } else {
        setWocStatus("wocEnded");
      }
    } else if (
      configurationStatus === "success" &&
      streamsStatus === "success" &&
      streams &&
      streams.length > 0
    ) {
      const woc_start_date = new Date(streams[0].start + "+02:00");
      const woc_end_date = new Date(streams[streams.length - 1].end + "+02:00");
      if (time < woc_start_date) {
        setWocStatus("wocUpcoming");
      } else if (time > woc_start_date && time < woc_end_date) {
        setWocStatus("wocRunning");
      } else {
        setWocStatus("wocEnded");
      }
    }
  }, [
    configurationStatus,
    streamsStatus,
    configuration,
    streams,
    timerVisible,
  ]);

  useEffect(() => {
    if (!donations || !donationGoals) return;

    const current = donations.donated_amount_in_cents / 100;
    setCurrentDonation(current);

    let lastIndex = -1;
    donationGoals.forEach((goal, index) => {
      if (goal.reached_at <= current) {
        lastIndex = index;
      }
    });

    setLastDonationGoal(
      lastIndex > -1 ? donationGoals[lastIndex].reached_at : 0
    );
    setNextDonationGoal(
      donationGoals.length > lastIndex + 1
        ? donationGoals[lastIndex + 1].reached_at
        : undefined
    );
  }, [donations, donationGoals]);

  useEffect(() => {
    const path = window.location.hash;

    if (path && path.includes("#")) {
      const id = path.replace("#", "");

      if (id) {
        document
          .querySelector("#" + id)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  return (
    <main className="text-neutral-800">
      <header className="px-5 pt-20 pb-5 relative text-center">
        <div className="font-round2 font-bold text-pink-900 uppercase">
          {t("home.subHeader")}
        </div>

        <h1 className="font-pally font-bold max-w-screen-md mx-auto my-5 text-pink-500 text-4xl md:text-7xl w-4/5">
          {wocStatus === "wocEnded"
            ? t("home.endedText")
            : wocStatus === "wocRunning"
              ? t("home.runningText")
              : wocStatus === "wocUpcoming"
                ? t("home.upcomingText")
                : wocStatus === "wocUpcomingSoon"
                  ? t("home.upcomingText")
                  : ""}
        </h1>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="max-w-screen-2xl my-5 md:my-10 mx-auto space-y-16 md:space-y-32">
        {configurationStatus === "success" && wocStatus === "wocUpcoming" && (
          <Countdown timerZeroCallback={hideCountdown} />
        )}
        {configurationStatus === "success" &&
          !!configuration.trailer_youtube_id &&
          (wocStatus === "wocUpcomingSoon" || wocStatus === "wocUpcoming") && (
            <YoutubeEmbed youtubeId={configuration.trailer_youtube_id} />
          )}
        {configurationStatus === "success" &&
          configuration.twitch_embed &&
          wocStatus === "wocRunning" && <TwitchEmbed />}
        <div className="flex flex-col gap-5 xl:grid grid-cols-2 grid-rows-2 mx-5 md:mx-10">
          <section className="bg-pink-100 bg-opacity-50 pb-5 pt-10 row-span-2">
            <div className="font-round2 font-bold -rotate-[10deg] -skew-x-[10deg] text-pink-900 text-center transform-gpu uppercase">
              {t("home.weekOfWhat")}
            </div>
            <div className="font-semibold max-w-screen-md mx-auto pt-10 text-3xl md:text-4xl text-center w-4/5">
              {t("home.aboutProject")}
            </div>

            <Brush5 className="h-4 mx-auto md:mb-10 md:mt-5 my-10 -rotate-2 text-pink-900 text-opacity-75 w-auto" />

            <div className="leading-relaxed mx-5 text-center">
              <p className="mb-5">{t("home.welcome1")}</p>
              <p>
                {`${t("home.welcome2")} `}
                <Link
                  to="/projekte"
                  className="underline underline-offset-2 text-pink-700"
                >
                  {t("home.here")}
                </Link>
                {`. ${t("home.welcome3")}`}
              </p>
            </div>
          </section>

          <Link className="contents" to="/streams">
            <div className="group relative">
              <Brush1 className="absolute pointer-events-none -right-40 sm:-right-24 text-mint-500 -top-8 w-[356px] z-[1]" />

              <section className="bg-mint-100 hover:bg-white bg-opacity-50 cursor-pointer duration-300 flex flex-col h-full justify-end hover:-mx-5 p-5 relative hover:text-mint-500 transition-all">
                <div className="pb-5 pt-16 xl:pt-0">
                  <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-mint-900 transform-gpu uppercase">
                    {t("home.entertainment1")}
                    <br />
                    {t("home.entertainment2")}
                  </div>
                </div>

                <div className="flex font-semibold items-center text-3xl md:text-4xl w-full">
                  <span>{t("home.fullProgram")}</span>
                  <Icon className="ml-auto" path={mdiArrowRight} size="2rem" />
                </div>
              </section>
            </div>
          </Link>

          <Link className="contents" to="/team">
            <div className="relative">
              <section className="bg-royal-100 hover:bg-white bg-opacity-50 cursor-pointer duration-300 flex flex-col h-full justify-end hover:-mx-5 p-5 hover:text-royal-500 transition-all">
                <div className="pb-5 pt-16 xl:pt-0">
                  <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-royal-900 transform-gpu uppercase">
                    {t("home.weAreBehindIt1")}
                    <br />
                    {t("home.weAreBehindIt2")}
                  </div>
                </div>

                <div className="flex font-semibold items-center text-3xl md:text-4xl w-full">
                  <span>{t("home.participants")}</span>
                  <Icon className="ml-auto" path={mdiArrowRight} size="2rem" />
                </div>
              </section>
            </div>
          </Link>
        </div>

        <div id="spenden" />

        {donationsStatus === "success" &&
          donationGoalsStatus === "success" &&
          donationGoals &&
          donationGoals.length > 0 && (
            <>
              <DonationMeter
                currentValue={currentDonation}
                nextGoalValue={nextDonationGoal}
                startValue={lastDonationGoal}
              />
              <div className="flex flex-col items-center">
                <a
                  target="_blank"
                  href={DONATION_URL}
                  className="cursor-pointer"
                  rel="noreferrer"
                >
                  <div className="font-fat text-center tracking-normal hover:tracking-wide rounded-full py-6 md:py-8 px-12 max-w-4xl duration-300 bg-royal-200 hover:bg-royal-500 text-royal-500 hover:text-royal-200 text-4xl md:text-5xl mx-5 -mt-6 md:-mt-16 md:-mb-6 transition-all">
                    {t("home.donateNow")}
                  </div>
                </a>
              </div>
            </>
          )}

        <div id="bidwar" className="flex flex-col gap-10">
          {bidwarResultsStatus === "success" &&
            bidwarsStatus === "success" &&
            bidwars?.map((bidwar) => {
              if (bidwar.status === "inactive") return;
              const options = bidwarResults.results.find(
                (result) => result.id === bidwar.id
              )?.options;
              if (!options) return;

              return (
                <div
                  className="flex flex-col mx-5 md:mx-10 items-center"
                  key={bidwar.id}
                >
                  <Bidwar
                    name={bidwar.bidwar_name}
                    description={bidwar.bidwar_description}
                    options={options}
                    status={bidwar.status}
                    timeslot={bidwar.timeslot}
                  />
                </div>
              );
            })}
        </div>

        {donationsStatus === "success" &&
          donationGoalsStatus === "success" &&
          donationGoals &&
          donationGoals.length > 0 && (
            <div className="flex flex-col gap-7 xl:grid grid-cols-2 mx-5 md:mx-10">
              {donationGoals.map((goal) => (
                <DonationGoal
                  key={goal.id}
                  achieved={goal.reached_at <= currentDonation}
                  amount={goal.reached_at_hidden ? null : goal.reached_at}
                  description={goal.description}
                  timeslot={goal.timeslot}
                  title={goal.name}
                />
              ))}
            </div>
          )}

        <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
          <div
            className="font-semibold mb-6 text-3xl md:text-4xl text-center md:text-left"
            id="faq"
          >
            {t("home.faq")}
          </div>

          {faqStatus === "success" && (
            <div className="md:gap-8 md:grid sm:grid-cols-2 md:grid-cols-3 space-y-5 md:space-y-0">
              {faq?.map((item) => (
                <div key={item.id} className="bg-opacity-70 bg-mint-100 p-5">
                  <div className="text-mint-900 font-semibold mb-2 text-lg">
                    {item.question}
                  </div>
                  <div
                    className="leading-relaxed woc-html"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              ))}
            </div>
          )}

          {faqStatus !== "success" && (
            <div className="md:gap-8 md:grid sm:grid-cols-2 md:grid-cols-3 space-y-5 md:space-y-0">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <Shimmer className="h-7 mb-2" />
                  <Shimmer className="h-14" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
