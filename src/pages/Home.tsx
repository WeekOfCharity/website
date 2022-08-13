import { mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { Brush1 } from '../components/Brushes/Brush1';
import { Brush4 } from '../components/Brushes/Brush4';
import { Brush5 } from '../components/Brushes/Brush5';
import { DonationMeter } from '../components/DonationMeter/DonationMeter';
import { Ticket } from '../components/Ticket/Ticket';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Home = () => {
  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-persian-400 uppercase">Neues Jahr, neue Woche</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-persian-500 text-4xl md:text-7xl w-4/5">Wir streamen wieder für den guten Zweck</div>

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
              Spicy jalapeno bacon ipsum dolor amet prosciutto lorem short loin in et, ullamco beef ribs hamburger short ribs jowl cupim occaecat pork belly. Rump proident
              prosciutto, et cupidatat frankfurter labore. Boudin dolor occaecat, consequat chislic irure shank chuck tail. Tri-tip tongue exercitation laboris beef, pig quis ball
              tip. Salami filet mignon occaecat, cillum anim proident magna beef alcatra fatback.
              <br />
              <br />
              Officia t-bone frankfurter shankle eiusmod ut, pariatur velit ham hock laboris. Ut chislic tri-tip flank shoulder reprehenderit sint bacon venison in jowl short ribs
              shankle lorem. Pig porchetta duis frankfurter fatback jerky adipisicing. Ipsum brisket picanha pork, in andouille shoulder prosciutto pastrami chicken. Chuck minim
              nisi aliquip proident nostrud chicken landjaeger beef ribs fatback adipisicing enim salami. Magna sint sirloin tenderloin pork chop. Short loin jowl fugiat ham hock
              swine adipisicing in tenderloin.
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

          <Link className="contents" to="/program">
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
      </div>
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
