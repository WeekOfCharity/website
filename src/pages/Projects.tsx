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
    </main>
  );
};
