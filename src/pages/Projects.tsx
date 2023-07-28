import classNames from 'classnames';
import { Brush4 } from '../components/Brushes/Brush4';
import { getDocumentTitle } from '../utils/getDocumentTitle';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Projects = () => {

  document.title = getDocumentTitle('Projekte');

  return (
    <main className="text-neutral-800 woc-accent-persian">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Von euch und uns</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          Die Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="max-w-screen-lg my-20 mx-auto space-y-20 md:space-y-40">
          <section className="bg-persian-100 bg-opacity-50 pb-5 pt-10 row-span-2">
            <div className="font-round2 font-bold -rotate-[10deg] -skew-x-[10deg] text-persian-900 text-center transform-gpu uppercase">Week of Was?</div>
            {/* <div className="flex font-semibold justify-center max-w-screen-md mx-auto py-10 relative text-3xl md:text-5xl w-4/5">
              <span className="z-10">Über das Projekt</span>
              <Brush5 className="absolute h-12 left-1/2 -rotate-2 text-persian-900 text-opacity-75 top-8 md:top-10 -translate-x-1/2 w-auto" />
            </div> */}
            <div className="font-semibold max-w-screen-md mx-auto pt-10 text-3xl md:text-4xl text-center w-4/5">Über das Projekt</div>

            <div className="leading-relaxed mx-5 text-center">
              Willkommen! Wir sind die Week of Charity, ein Dauerstreamprojekt für einen guten Zweck! Eine Woche lang wird abwechselnd auf den Twitch-Kanälen unserer Mitglieder
              durchgängig gestreamt, um Spenden zu sammeln. Das Programm ist breit gefächert und neben diversen Videospielen wird unter anderem gezeichnet, Dungeons and Dragons
              gespielt und es werden Quizshows abgehalten.
              <br />
              <br />
              Alle Spenden, die in dieser Woche gesammelt werden, gehen dieses Jahr an das Tierheim Berlin. Unser Projekt wurde zuerst 2021 auf die Beine gestellt und geht in
              diesem Jahr schon in die dritte Runde! Im Programm sind fast alle Streamer*Innen des letzten Jahres + einige Neuzugänge dabei. Wir hoffen, die Woche wird euch genau
              so viel Freude und Unterhaltung bringen wie uns. Wir freuen uns auf euch! Mehr zu unserem Projekt findet ihr <a href="/projekte" className="cursor-pointer text-persian-500">hier</a>.
            </div>
          </section>

      </div>

    </main>
  );
};
