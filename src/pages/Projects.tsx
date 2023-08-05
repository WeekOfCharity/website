import classNames from 'classnames';
import { Brush4 } from '../components/Brushes/Brush4';
import { getDocumentTitle } from '../utils/getDocumentTitle';
import './Projects.scss';

const chesster1 = new URL('../assets/chesster-1.png', import.meta.url);
const chesster2 = new URL('../assets/chesster-2.png', import.meta.url);
const chesster3 = new URL('../assets/chesster-3.png', import.meta.url);
const chesster4 = new URL('../assets/chesster-4.png', import.meta.url);

export const Projects = () => {

  document.title = getDocumentTitle('Projekte');

  return (
    <main className="text-neutral-800 woc-accent-persian">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Über uns</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          Die Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="max-w-screen-2xl mt-5 mb-40 mx-auto flex place-content-center">
        <div className="max-w-screen-lg mx-10 md:mx-32 lg:mx-56">
          <section className="flex bg-persian-100 bg-opacity-50 py-10 row-span-2">
            <div>
              <div className="leading-relaxed mx-5 md:mx-10 text-left">
                <div className="inline chesster-1-wrapper">
                  <img className="chesster-1" src={chesster1.toString()} />
                </div>
                <span className="text-lg font-semibold">Willkommen! </span>Wir sind die Week of Charity, ein Dauerstreamprojekt für einen guten Zweck! Eine Woche lang wird
                abwechselnd auf den Twitch-Kanälen unserer Mitglieder durchgängig gestreamt, um Spenden zu sammeln. Das Programm ist breit gefächert und neben diversen Videospielen
                wird unter Anderem gezeichnet, Dungeons and Dragons gespielt und es werden Quizshows abgehalten. Dabei unterhalten euch fast alle Streamer*Innen des letzten Jahres
                plus einige Neuzugänge. Was wann wo zu sehen ist, findet ihr in unserem <a href="/streams" className="cursor-pointer text-persian-500">Zeitplan</a>. <br /><br />
                
                <span className="text-lg font-semibold">Unser Projekt </span>wurde zuerst 2021 auf die Beine gestellt und geht in diesem Jahr schon in die dritte Runde! Alle Spenden,
                die in dieser Woche gesammelt werden, gehen dieses Jahr an das Tierheim Berlin. Ihr könnt uns über direkte Spenden während des Streams unterstützen, oder in unserem
                Shop vorbeischauen. Unser Anteil am verkauften Merchandise wird zu 100% gespendet und ihr könnt euch mit unserem Maskottchen Chesster schmücken.
                
              </div>
            </div>
          </section>

          <div className="font-pally font-bold max-w-screen-md mx-auto mt-20 mb-10 text-accent-500 text-2xl md:text-5xl w-4/5 text-center">
            Unsere Projekte
          </div>

          <div className="timeline">
            <div className="line"></div>
            <div className="card-container">
              <div className="card bg-persian-100 bg-opacity-50">
                <div className="info leading-relaxed py-5 pl-8 text-left">
                  <div className="year">2023</div>
                  <h3 className="title font-bold">Tierheim Berlin</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed id aliquet libero. Ut venenatis vehicula laoreet. Phasellus ut auctor purus. Mauris porttitor nunc odio, et consequat arcu dapibus ut. Nam tristique viverra mi feugiat vehicula. Donec condimentum orci eget quam ullamcorper dapibus. Ut vehicula diam nec fringilla finibus. Maecenas imperdiet, turpis et pellentesque vehicula, nibh lacus egestas dui, id volutpat leo felis in enim. Vivamus dignissim tortor sit amet condimentum maximus. Sed consectetur vehicula orci in tempor. Nulla eu velit ultrices, venenatis purus id, tristique orci. Nam nunc nisl, luctus sed blandit non, laoreet quis mauris. </p>
                </div>
                <div className="timeline-image-wrapper-right">
                  <img className="chesster-4" src={chesster4.toString()} />
                </div>
              </div>

              <div className="card bg-persian-100 bg-opacity-50">
                <div className="timeline-image-wrapper-left">
                  <img className="chesster-3" src={chesster3.toString()} />
                </div>
                
                <div className="info leading-relaxed py-5 pr-8 text-right">
                  <div className="year">2022</div>
                  <h3 className="title font-bold">Queere Vielfalt leben</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed id aliquet libero. Ut venenatis vehicula laoreet. Phasellus ut auctor purus. Mauris porttitor nunc odio, et consequat arcu dapibus ut. Nam tristique viverra mi feugiat vehicula. Donec condimentum orci eget quam ullamcorper dapibus. Ut vehicula diam nec fringilla finibus. Maecenas imperdiet, turpis et pellentesque vehicula, nibh lacus egestas dui, id volutpat leo felis in enim. Vivamus dignissim tortor sit amet condimentum maximus. Sed consectetur vehicula orci in tempor. Nulla eu velit ultrices, venenatis purus id, tristique orci. Nam nunc nisl, luctus sed blandit non, laoreet quis mauris. </p>
                </div>
              </div>

              <div className="card bg-persian-100 bg-opacity-50">
                <div className="info leading-relaxed py-5 pl-8 text-left">
                  <div className="year">2021</div>
                  <h3 className="title font-bold">Lesben- und Schwulenverband Deutschland</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed id aliquet libero. Ut venenatis vehicula laoreet. Phasellus ut auctor purus. Mauris porttitor nunc odio, et consequat arcu dapibus ut. Nam tristique viverra mi feugiat vehicula. Donec condimentum orci eget quam ullamcorper dapibus. Ut vehicula diam nec fringilla finibus. Maecenas imperdiet, turpis et pellentesque vehicula, nibh lacus egestas dui, id volutpat leo felis in enim. Vivamus dignissim tortor sit amet condimentum maximus. Sed consectetur vehicula orci in tempor. Nulla eu velit ultrices, venenatis purus id, tristique orci. Nam nunc nisl, luctus sed blandit non, laoreet quis mauris. </p>
                </div>
                <div className="timeline-image-wrapper-right">
                  <img className="chesster-2" src={chesster2.toString()} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </main>
  );
};
