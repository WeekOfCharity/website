import { mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brush1 } from '../components/Brushes/Brush1';
import { Brush4 } from '../components/Brushes/Brush4';
import { Brush5 } from '../components/Brushes/Brush5';
import { DonationGoal } from '../components/DonationGoal/DonationGoal';
import { DonationMeter } from '../components/DonationMeter/DonationMeter';
import { Shimmer } from '../components/Shimmer/Shimmer';
import { Ticket } from '../components/Ticket/Ticket';
import TwitchEmbed from '../components/TwitchEmbed/TwitchEmbed';
import { useConfiguration } from '../hooks/useConfiguration';
import { useDonationGoals } from '../hooks/useDonationGoals';
import { useDonations } from '../hooks/useDonations';
import { useFAQ } from '../hooks/useFAQ';
import { useStreams } from '../hooks/useStreams';
import { getDocumentTitle } from '../utils/getDocumentTitle';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Home = () => {
  document.title = getDocumentTitle();

  const [currentDonation, setCurrentDonation] = useState<number | undefined>(0);
  const [lastDonationGoal, setLastDonationGoal] = useState(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number | undefined>(undefined);
  const [wocStatus, setWocStatus] = useState("");

  const { data: donations, status: donationsStatus } = useDonations();
  const { data: donationGoals, status: donationGoalsStatus } = useDonationGoals();
  const { data: faq, status: faqStatus } = useFAQ();
  const { data: configuration, status: configurationStatus } = useConfiguration();
  const { data: streams, status: streamsStatus } = useStreams();

  const upcomingText = "Wir streamen wieder für den guten Zweck";
  const runningText = "Wir streamen wieder für den guten Zweck";
  const endedText = "Danke fürs dabei Sein";


  useEffect(() => {
    console.log("uwu");
      const time = new Date(Date.now());
      if(configurationStatus === "success" && (streamsStatus === "error" || (streamsStatus === "success" && streams.length === 0))){
        const woc_start_date = new Date(configuration.woc_start);
        if(time<woc_start_date){
          setWocStatus("wocUpcoming");
        }else{
          setWocStatus("wocEnded");
        }
      }else if(streamsStatus === "success" && streams.length > 0){
        const woc_start_date = new Date(streams[0].start);
        const woc_end_date = new Date(streams[streams.length-1].end);
        console.log(woc_start_date);
        console.log(woc_end_date);
        if(time<woc_start_date){
          setWocStatus("wocUpcoming");
        }else if(time>woc_start_date && time<woc_end_date){
          setWocStatus("wocRunning");
        }else{
          setWocStatus("wocEnded");
        }
      }
  }, [configurationStatus, streamsStatus, configuration, streams]);





  useEffect(() => {
    if (!donations || !donationGoals) return;

    const current = donations && donations.length > 0 ? donations[0].data.data.datas.series['Donations amount'].total : undefined;
    setCurrentDonation(current);

    let lastIndex = -1;
    donationGoals.forEach((goal, index) => {
      if (goal.reached_at <= current) {
        lastIndex = index;
      }
    });

    setLastDonationGoal(lastIndex > -1 ? donationGoals[lastIndex].reached_at : 0);
    setNextDonationGoal(donationGoals.length >= lastIndex + 2 ? donationGoals[lastIndex + 1].reached_at : undefined);
  }, [donations, donationGoals]);


  useEffect(() => {
    const path = window.location.hash;

    if (path && path.includes('#')) {
      const id = path.replace('#', '');

      if (id) {
        document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Neues Jahr, neue Woche</div>
        
        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          {wocStatus === 'wocEnded' ? endedText : (wocStatus === 'wocRunning' ? runningText : (wocStatus === 'wocUpcoming' ? upcomingText : ""))}
        </div>

        {/*
        <div className="absolute flex justify-center left-1/2 mt-8 rotate-3 transform-gpu -translate-x-1/2 w-full">
          <span className="font-handwriting font-semibold text-xl">dein Ticket zu guter Unterhaltung</span>
          <img className="mt-4 ml-3 -scale-x-100" src={arrowDown.toString()} />
        </div>
        */}
        <Brush4 className="absolute h-96 left-1/2 text-neutral-100 bottom-0 transform-gpu -translate-x-1/2 translate-y-1/3 md:translate-y-1/4 w-auto -z-10" />
        
      </header>

      {configurationStatus === 'success' && configuration.twitch_embed && wocStatus === "wocRunning" && <TwitchEmbed />}

      {/*<Ticket />*/}

      <div className="max-w-screen-2xl my-20 mx-auto space-y-20 md:space-y-40">
        <div className="flex flex-col gap-5 xl:grid grid-cols-2 grid-rows-2 mx-5 md:mx-10">
          <section className="bg-persian-100 bg-opacity-50 pb-5 pt-10 row-span-2">
            <div className="font-round2 font-bold -rotate-[10deg] -skew-x-[10deg] text-persian-900 text-center transform-gpu uppercase">Week of Was?</div>
            {/* <div className="flex font-semibold justify-center max-w-screen-md mx-auto py-10 relative text-3xl md:text-5xl w-4/5">
              <span className="z-10">Über das Projekt</span>
              <Brush5 className="absolute h-12 left-1/2 -rotate-2 text-persian-900 text-opacity-75 top-8 md:top-10 -translate-x-1/2 w-auto" />
            </div> */}
            <div className="font-semibold max-w-screen-md mx-auto pt-10 text-3xl md:text-4xl text-center w-4/5">Über das Projekt</div>

            <Brush5 className="h-4 mx-auto md:mb-10 md:mt-5 my-10 -rotate-2 text-persian-900 text-opacity-75 w-auto" />

            <div className="leading-relaxed mx-5 text-center">
              Willkommen! Wir sind die Week of Charity, ein Dauerstreamprojekt für einen guten Zweck! Eine Woche lang wird abwechselnd auf den Twitch-Kanälen unserer Mitglieder
              durchgängig gestreamt, um Spenden zu sammeln. Das Programm ist breit gefächert und neben diversen Videospielen wird unter anderem gezeichnet, Dungeons and Dragons
              gespielt, gebacken und eine Quizshow abgehalten. Abgerundet wird das Ganze am Ende vom großen 24-Stunden-Schachstream.
              <br />
              <br />
              Alle Spenden, die in dieser Woche gesammelt werden, gehen dieses Jahr an Queere Vielfalt leben, ein LGBTQ+ Jugendwohnheim in Köln, das queere Jugendliche aufnimmt und
              ihnen eine Unterkunft bietet, die sensibel und liebevoll ist. Unser Projekt wurde zuerst 2021 auf die Beine gestellt und geht nun nach großem Erfolg und 2526
              erzielten Euro in die zweite Runde! Im Programm sind fast alle Streamer*Innen des letzten Jahres + einige Neuzugänge dabei. Wir hoffen, die Woche wird euch genau so
              viel Freude und Unterhaltung bringen wie uns. Wir freuen uns auf euch!
            </div>
          </section>

          {/* <div className="relative">
            <Brush1 className="absolute h-96 pointer-events-none -right-24 text-aqua-500 -top-36 z-20" />

            <section className="bg-aqua-100 hover:bg-aqua-900 bg-opacity-50 cursor-pointer duration-300 flex flex-col group h-full justify-end hover:-mx-2.5 p-5 relative hover:text-white transition-all">
              <div className="duration-300 font-round2 font-bold -ml-1 pb-[70px] -rotate-[10deg] -skew-x-[10deg] text-aqua-900 group-hover:text-aqua-300 transform-gpu transition-all uppercase">Entertainment<br />ohne Ende</div>
              <div className="flex font-semibold items-center text-3xl md:text-4xl w-full">
                <span>Das ganze Programm</span>
                <Icon className="ml-auto" path={mdiArrowRight} size="2rem" />
              </div>
            </section>
          </div> */}

          <Link className="contents" to="/streams">
            <div className="group relative">
              <Brush1 className="absolute pointer-events-none -right-24 text-aqua-500 -top-8 w-[356px] z-[1]" />

              <section className="bg-aqua-100 hover:bg-white bg-opacity-50 cursor-pointer duration-300 flex flex-col h-full justify-end hover:-mx-5 p-5 relative hover:text-aqua-500 transition-all">
                <div className="pb-5 pt-16 xl:pt-0">
                  <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-aqua-900 transform-gpu uppercase">
                    Entertainment
                    <br />
                    ohne Ende
                  </div>
                </div>

                <div className="flex font-semibold items-center text-3xl md:text-4xl w-full">
                  <span>Das ganze Programm</span>
                  <Icon className="ml-auto" path={mdiArrowRight} size="2rem" />
                </div>
              </section>
            </div>
          </Link>

          <Link className="contents" to="/team">
            <div className="relative">
              {/* <Brush1 className="absolute -bottom-52 h-96 -left-40 -scale-100 text-lavender-500 transform-gpu" /> */}

              <section className="bg-lavender-100 hover:bg-white bg-opacity-50 cursor-pointer duration-300 flex flex-col h-full justify-end hover:-mx-5 p-5 hover:text-lavender-500 transition-all">
                <div className="pb-5 pt-16 xl:pt-0">
                  <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-lavender-900 transform-gpu uppercase">
                    Wir stecken
                    <br />
                    dahinter
                  </div>
                </div>

                <div className="flex font-semibold items-center text-3xl md:text-4xl w-full">
                  <span>Teilnehmer und Helfer</span>
                  <Icon className="ml-auto" path={mdiArrowRight} size="2rem" />
                </div>
              </section>
            </div>
          </Link>
        </div>

        <div id="spenden" />

        {donationsStatus === 'success' && donationGoalsStatus === 'success' && (
          <>
            <DonationMeter currentValue={currentDonation} nextGoalValue={nextDonationGoal} startValue={lastDonationGoal} />

            <div className="flex flex-col gap-5 xl:grid grid-cols-2 mx-5 md:mx-10">
              {donationGoals.map((goal) => (
                <DonationGoal
                  achieved={goal.reached_at <= currentDonation}
                  amount={goal.reached_at}
                  description={goal.description}
                  hidden={goal.hidden}
                  key={goal.id}
                  timeslot={goal.activity}
                  title={goal.name}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="font-semibold mb-6 text-3xl md:text-4xl text-center md:text-left" id="faq">
          Häufige Fragen und Antworten
        </div>

        {faqStatus === 'success' && (
          <div className="md:gap-8 md:grid sm:grid-cols-2 md:grid-cols-3 space-y-5 md:space-y-0">
            {faq.map((item) => (
              <div key={item.id}>
                <div className="font-semibold mb-2 text-lg">{item.question}</div>
                <div className="leading-relaxed woc-html" dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            ))}
          </div>
        )}

        {faqStatus !== 'success' && (
          <div className="md:gap-8 md:grid sm:grid-cols-2 md:grid-cols-3 space-y-5 md:space-y-0">
            {[...Array(8)].map((item) => (
              <div key={item}>
                <Shimmer className="h-7 mb-2" />
                <Shimmer className="h-14" />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

{
  /* <section className="mx-5 mt-20 pt-10 relative">
  <div className="font-round2 font-bold -rotate-[10deg] -skew-x-12 text-persian-900 text-center transform-gpu uppercase">week of was?</div>

  <div className="font-semibold max-w-screen-md mx-auto py-10 text-3xl md:text-5xl text-center w-4/5">Über das Projekt</div>

  <div className="absolute bg-persian-100 bg-opacity-50 left-1/2 h-full max-w-xs min-w-[160px] top-0 transform-gpu -translate-x-1/2 w-1/3 -z-10"></div>
</section> */
}
