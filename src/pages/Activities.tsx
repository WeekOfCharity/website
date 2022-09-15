import { Brush2 } from '../components/Brushes/Brush2';
import { Brush4 } from '../components/Brushes/Brush4';
import { getDocumentTitle } from '../utils/getDocumentTitle';

export const Activities = () => {
  document.title = getDocumentTitle('Aktivitäten');

  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Alle in der Übersicht</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          Die Aktivitäten der
          <br />
          Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <article className="bg-arctic-100 bg-opacity-50 flex flex-col h-80 items-center justify-center relative">
          <Brush2 className="absolute bottom-12 left-1/2 text-arctic-500 -translate-x-1/2 w-80" />

          <img
            className="h-32 mt-8 object-center object-cover rounded-lg shadow-2xl w-32 z-10"
            src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/c3ef82c0d54111efb48f4937e87db74726f99b5c241ea81b1baf769837566451._SX1080_.jpg"
          />

          <div className="font-semibold my-auto px-4 text-arctic-900 text-xl text-center z-10" style={{ textShadow: '0 0 20px #000F1E33, 0 0 3px #000F1E4D' }}>
            Yu-Gi-Oh! Pack Openings + Custom Magic: the Gathering Karten
          </div>
        </article>

        <article className="bg-arctic-100 bg-opacity-50 flex flex-col h-80 items-center justify-center relative">
          <Brush2 className="absolute bottom-0 left-1/2 text-arctic-500 -translate-x-1/2 w-80" />

          <img
            className="h-32 mt-8 object-center object-cover rounded-lg shadow-2xl w-32 z-10"
            src="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/c3ef82c0d54111efb48f4937e87db74726f99b5c241ea81b1baf769837566451._SX1080_.jpg"
          />

          <div className="font-semibold my-auto px-4 text-arctic-900 text-xl text-center z-10" style={{ textShadow: '0 0 20px #000F1E33, 0 0 3px #000F1E4D' }}>
            Yu-Gi-Oh! Pack Openings + Custom Magic: the Gathering Karten
          </div>
        </article>
      </section>
    </main>
  );
};
