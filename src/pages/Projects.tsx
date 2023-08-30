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
    <main className="text-neutral-800 woc-accent-blue23">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-blue23-900 uppercase">Über uns</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-blue23-500 text-4xl md:text-7xl w-4/5">
          Die Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="max-w-screen-2xl mt-5 mb-40 mx-auto flex place-content-center">
        <div className="max-w-screen-xl flex flex-col items-center mx-10 md:mx-28 lg:mx-32">
          <section className="max-w-screen-lg mx-0 sm:mx-8 lg:mx-16 flex bg-blue23-100 bg-opacity-50 py-10 row-span-2">
            <div id="projectIntroduction">
              <div className="leading-relaxed mx-5 md:mx-10 text-left">
                <div className="inline chesster-1-wrapper">
                  <img className="chesster-timeline-image chesster-1" src={chesster1.toString()} />
                </div>
                <span className="text-lg font-semibold">Die Week of Charity </span>ist ein Dauerstreamprojekt für einen guten Zweck! Eine Woche lang wird
                abwechselnd auf den Twitch-Kanälen unserer <a href="/team" className="cursor-pointer text-blue23-600">Mitglieder</a> durchgängig gestreamt, um Spenden zu
                sammeln. Das Programm ist breit gefächert und neben diversen Videospielen wird unter Anderem Dungeons and Dragons gespielt und es werden Quizshows
                abgehalten. Was wann wo zu sehen ist, findet ihr in unserem <a href="/streams" className="cursor-pointer text-blue23-600">Zeitplan</a>. <br /><br />
                
                <span className="text-lg font-semibold">Unser Projekt </span>wurde zuerst 2021 auf die Beine gestellt und geht in diesem Jahr schon in die dritte Runde! Alle Spenden,
                die in dieser Woche gesammelt werden, gehen dieses Jahr an das Tierheim Berlin. Ihr könnt uns über direkte <a target="_blank" href="https://www.betterplace.org/de/fundraising-events/45057-week-of-charity-2023" className="cursor-pointer text-blue23-600">Spenden </a>
                während des Streams unterstützen, oder in unserem <a target="_blank" href="https://www.shirtee.com/de/store/weekofcharity/" className="cursor-pointer text-blue23-600">Shop</a> vorbeischauen.
                Unser Anteil am verkauften Merchandise wird zu 100% gespendet und ihr könnt euch mit unserem Maskottchen Chesster schmücken.
              </div>
            </div>
          </section>
          
          <div className="font-pally font-bold max-w-screen-md mx-auto mt-20 mb-10 text-blue23-500 text-4xl md:text-5xl w-4/5 text-center">
            Unsere Projekte
          </div>

          <div className="timeline">
            <div className="line"></div>
            <div className="card-container">
              <div className="card">
                <div className="timeline-image-wrapper-right wrapper-chesster-4">
                  <img className="chesster-timeline-image chesster-4" src={chesster4.toString()} />
                </div>
                <div className="leading-relaxed py-5 pl-5 md:pl-8 pr-5 text-left">
                  <div className="year">2023</div>
                  <h3 className="title font-bold">Tierheim Berlin</h3>
                  <p>
                    Für den dritten Durchlauf gehen alle unsere Spenden dieses Jahr an das <a target="_blank" href="https://tierschutz-berlin.de/" className="cursor-pointer text-blue23-600">Tierheim Berlin</a>.
                    Dort werden von Nagetieren, über Hunde und Katzen bis hin zu Hoftieren und Exoten insgesamt 1300 Tiere behaust, versorgt und gesund gepflegt.
                    Da das nicht nur emotional sehr fordernd ist, sondern auch erhebliche finanzielle Mittel erfordert, würden wir uns sehr über eure Spenden freuen!
                  </p>
                </div>
                
              </div>

              <div className="card">
                <div className="timeline-image-wrapper-left wrapper-chesster-3">
                  <img className="chesster-timeline-image chesster-3" src={chesster3.toString()} />
                </div>
                
                <div className="leading-relaxed py-5 pr-5 md:pr-8 pl-5 text-right">
                  <div className="year">2022</div>
                  <h3 className="title font-bold">Queere Vielfalt leben</h3>
                  <p>
                    Für unsere zweite Runde haben wir 2022 das LGBTQ+ Jugendwohnheim "<a target="_blank" href="https://www.godesheim.de/angebote/queere-vielfalt-leben/" className="cursor-pointer text-blue23-600">Queere Vielfalt leben</a>" in Köln unterstützt.
                    Dort finden queere Jugendliche eine sensible und liebevolle Unterkunft, die sie außerdem bei ihrer Identitätsfindung und eigenverantwortlichen Lebensgestaltung unterstützt. Am Ende der zweiten WoC, bei der manchmal sogar die Jugendlichen und Mitarbeitenden des Wohnheims mitgespielt haben, konnten wir unseren ersten Streamingmarathon überbieten und unglaubliche 3550€ sammeln!
                    Mit diesem Geld konnte unter anderem endlich der Keller des Hauses ausgebaut werden.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="leading-relaxed py-5 pl-5 md:pl-8 pr-5 text-left">
                  <div className="timeline-image-wrapper-right wrapper-chesster-2">
                    <img className="chesster-timeline-image chesster-2" src={chesster2.toString()} />
                  </div>
                  <div className="year">2021</div>
                  <h3 className="title font-bold">Lesben- und Schwulenverband in Deutschland</h3>
                  <p>Der <a target="_blank" href="https://www.lsvd.de/de/home" className="cursor-pointer text-blue23-600">Lesben- und Schwulenverband in Deutschland</a> (oder kurz: LSVD) war die
                  erste Organisation, die wir durch unsere Week of Charity 2021 unterstützten. Bei dem LSVD handelt es sich um einen Bürgerrechtsverband, der sich für die Rechte
                  und Interessen von Lesben, Schwulen, Bisexuellen, trans- und intergeschlechtlichen sowie queeren Menschen einsetzt. Unsere Spenden gingen dabei konkret an das
                  Covidhilfe Afrika Projekt, bei dem der LSVD mit Partner*innen vor Ort queere Menschen in Afrika unterstützte, die als Minderheit oft besonders hart von
                  Krisensituationen betroffen sind. Sie werden zum Sündenbock für Virenausbrüche gemacht, wodurch der Hass gegen sie zunimmt und sie schneller als andere ihren Job
                  oder familiäre Unterstützung verlieren. Außerdem fehlte es an kritischen Gütern wie Masken, Desinfektions- und Hygienemitteln. Für die Unterstützung dieser
                  Menschen haben wir insgesamt bei unserer ersten WoC jemals unglaubliche 2500€ dank eurer Hilfe sammeln können! </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </main>
  );
};
