import { mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { Brush1 } from '../components/Brushes/Brush1';
import { Brush4 } from '../components/Brushes/Brush4';
import { Brush5 } from '../components/Brushes/Brush5';
import { DonationGoal } from '../components/DonationGoal/DonationGoal';
import { DonationMeter } from '../components/DonationMeter/DonationMeter';
import { Ticket } from '../components/Ticket/Ticket';
import { getDocumentTitle } from '../utils/getDocumentTitle';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Home = () => {
  document.title = getDocumentTitle();

  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Neues Jahr, neue Woche</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">Wir streamen wieder für den guten Zweck</div>

        <div className="absolute flex justify-center left-1/2 mt-8 rotate-3 transform-gpu -translate-x-1/2 w-full">
          <span className="font-handwriting font-semibold text-xl">dein Ticket zu guter Unterhaltung</span>
          <img className="mt-4 ml-3 -scale-x-100" src={arrowDown.toString()} />
        </div>

        <Brush4 className="absolute h-96 left-1/2 text-neutral-100 bottom-0 transform-gpu -translate-x-1/2 translate-y-1/3 md:translate-y-1/4 w-auto -z-10" />
      </header>

      <Ticket />

      <div className="max-w-screen-2xl my-20 md:my-40 mx-auto space-y-20 md:space-y-40">
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
              <Brush1 className="absolute h-96 pointer-events-none -right-24 text-aqua-500 -top-36 z-[1]" />

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

        <DonationMeter />

        <div className="flex flex-col gap-5 xl:grid grid-cols-3 mx-5 md:mx-10">
          <DonationGoal achieved amount={100} description="Bei 100€ kochen wir alle live gemeinsam ein Gericht, dass die Viewer aussuchen" title="Viele Köche..." />
          <DonationGoal amount={250} description='Bei 250€ muss Fabian "The Swedish Number" anrufen und auf Schwedisch Fragen stellen' title="Vem ringer?" />
          <DonationGoal amount={500} description="Bei 500€ wird sich Tobias die Haare Blau färben" title="Jetzt wird's bunt" />
          <DonationGoal amount={750} description="Bei 750€ probiert Benedikt Sojasauce im Sodastream zu sprudeln" title="Wenn Big Baba Ricebowl das wüsste" />
          <DonationGoal amount={1000} description="" title="" />
          <DonationGoal amount={2000} description="" title="" />
        </div>
      </div>

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="font-semibold mb-6 text-3xl md:text-4xl text-center md:text-left">Häufige Fragen und Antworten</div>
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
