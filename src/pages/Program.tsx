import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import { Brush4 } from '../components/Brushes/Brush4';
import { Carousel } from '../components/Carousel/Carousel';

export const Program = () => {
  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Streamkalender</div>

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

              <div className="font-round font-bold mt-6 text-aqua-100">Dienstag, 17:00 &ndash; 19:00</div>
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

              <div className="font-round font-bold mt-6 text-aqua-100">Mittwoch, 22:00 &ndash; 24:00</div>
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

              <div className="font-round font-bold mt-6 text-aqua-100">Donnerstag, 01:00 &ndash; 01:30</div>
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

              <div className="font-round font-bold mt-6 text-aqua-100">Donnerstag, 03:00 &ndash; 03:10</div>
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

              <div className="font-round font-bold mt-6 text-aqua-100">Freitag, 10:00 &ndash; 10:00</div>
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

              <div className="font-round font-bold mt-6 text-aqua-100">Freitag, 10:00 &ndash; 10:00</div>
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

              <div className="font-round font-bold mt-6 text-aqua-100">Freitag, 10:00 &ndash; 10:00</div>
            </div>
          </article>
        </Carousel>
      </section>
    </main>
  );
};
