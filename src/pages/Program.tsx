import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import { Brush4 } from '../components/Brushes/Brush4';
import { Carousel } from '../components/Carousel/Carousel';
import { Stream } from '../components/Stream/Stream';
import { getDocumentTitle } from '../utils/getDocumentTitle';

export const Program = () => {
  document.title = getDocumentTitle('Programm');

  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Keine Events verpassen</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">Das Programm der Week of Charity</div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className="mb-20 md:mb-40 mt-12 md:mt-20">
        <div className="max-w-screen-2xl mb-6 mx-auto">
          <div className="font-semibold px-10 2xl:px-2.5 text-3xl md:text-4xl text-center md:text-left">Die Highlights der Woche</div>
        </div>

        <Carousel>
          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage:
                'url("https://cdn.pocket-lint.com/r/s/1201x/assets/images/151643-games-news-super-mario-galaxy-mario-sunshine-mario-64-coming-to-nintendo-switch-image1-o3nkczdltj.jpg")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Super Mario Galaxy
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Pia</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Dienstag, 17:00 &mdash; 19:00</div>
            </div>
          </article>

          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage: 'url("https://i.b6t.it/N2Q5N")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Shenanigans
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Benedikt</span>
                <span className="bg-aqua-100 font-semibold px-2 py-0.5 rounded text-aqua-900 text-xs">+3 Mitspieler</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Mittwoch, 22:00 &mdash; 24:00</div>
            </div>
          </article>

          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage: 'url("https://f.2by.es/MTM1N")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Beesechurger
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Tobias</span>
                <span className="bg-aqua-100 font-semibold px-2 py-0.5 rounded text-aqua-900 text-xs">+155 Mitspieler</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Donnerstag, 01:00 &mdash; 01:30</div>
            </div>
          </article>

          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage: 'url("https://www.rostock-heute.de/wp-content/uploads/2022/04/Faehre_Nils_Holgersson_Rostock_Warnemuende.jpg")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Schiffsimulator 2023
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Fabian</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Donnerstag, 03:00 &mdash; 03:10</div>
            </div>
          </article>

          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage:
                'url("https://media.istockphoto.com/photos/chess-financial-business-strategy-concept-picture-id865739462?k=20&m=865739462&s=612x612&w=0&h=YybYldDj4sBvOhqzPqfVrUfR8bcItpD0Ik9qvwIEz9w=")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Schachstream
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Noah</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Freitag, 10:00 &mdash; 10:00</div>
            </div>
          </article>

          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage: 'url("https://images.cgames.de/images/gsgp/290/mario-kart-8-deluxe_2793943.jpg")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Mario Kart 8
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Waluigi</span>
                <span className="bg-aqua-100 font-semibold px-2 py-0.5 rounded text-aqua-900 text-xs">+7 Mitspieler</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Freitag, 10:00 &mdash; 10:00</div>
            </div>
          </article>

          <article
            className="bg-center bg-cover h-[400px] rounded-md"
            style={{
              backgroundImage: 'url("https://sportshub.cbsistatic.com/i/2022/08/24/e935963e-0f11-4aa0-8e80-b538dc1efe83/among-us-update.jpg")',
            }}
          >
            <div className="bg-gradient-to-t from-aqua-900 to-transparent flex flex-col justify-end h-full p-4 rounded-md">
              <div className="font-semibold text-2xl text-white" style={{ textShadow: '0 0 20px #000F1E33,0 0 3px #000F1E4D' }}>
                Among Us
              </div>

              <div className="flex items-center mt-2 space-x-4 text-white">
                <Icon className="-mr-2" path={mdiAccount} size="1rem" />
                <span className="font-round font-bold">Sus?</span>
                <span className="bg-aqua-100 font-semibold px-2 py-0.5 rounded text-aqua-900 text-xs">+6 Mitspieler</span>
              </div>

              <div className="font-round font-bold mt-6 text-aqua-100">Freitag, 10:00 &mdash; 10:00</div>
            </div>
          </article>
        </Carousel>
      </section>

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="font-semibold mb-6 text-3xl md:text-4xl text-center md:text-left">Alle Streams</div>

        <div className="gap-x-5 gap-y-10 grid xl:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="font-round2 font-bold text-aqua-900 uppercase">Mittwoch, 28.9.</div>
              <div className="bg-aqua-900 h-0.5 w-full"></div>
            </div>

            <Stream
              endTime="10:00"
              gameImageUrl="https://fs-prod-cdn.nintendo-europe.com/media/images/06_screenshots/games_5/nintendo_switch_download_software_2/nswitchds_portalcompanioncollection/NSwitchDS_PortalCompanionCollection_02.jpg"
              startTime="7:30"
              streamer="Cave Johnson"
              title="Portal 2"
            />

            <Stream
              endTime="13:00"
              gameImageUrl="https://img.zeit.de/digital/games/2016-07/inside-game-2/wide__980x551"
              startTime="10:00"
              streamer="Junge im roten Shirt"
              title="INSIDE"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="font-round2 font-bold text-aqua-900 uppercase">Donnerstag, 29.9.</div>
              <div className="bg-aqua-900 h-0.5 w-full"></div>
            </div>

            <Stream
              endTime="3:00"
              gameImageUrl="https://images.cgames.de/images/gamestar/287/voxel-tycoon-screenshots_6135134.jpg"
              startTime="1:00"
              streamer="Bürgermeister der Stadt Bad Gottleuba-Berggießhübel"
              title="Voxel Tycoon"
            />

            <Stream
              endTime="16:00"
              gameImageUrl="https://cdn2.unrealengine.com/rl-playerschoice-bundle-3840x2160-723248b32611.jpg"
              startTime="12:30"
              streamer="Octane"
              title="Rocket League"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="font-round2 font-bold text-aqua-900 uppercase">Freitag, 30.9.</div>
              <div className="bg-aqua-900 h-0.5 w-full"></div>
            </div>

            <Stream endTime="9:45" gameImageUrl="https://images.cgames.de/images/gsgp/290/mario-kart-8-deluxe_2793943.jpg" startTime="7:15" streamer="Luigi" title="Mario Kart 8" />

            <Stream
              endTime="24:00"
              gameImageUrl="https://sportshub.cbsistatic.com/i/2022/08/24/e935963e-0f11-4aa0-8e80-b538dc1efe83/among-us-update.jpg"
              startTime="21:00"
              streamer="Sus?"
              title="Among Us"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
