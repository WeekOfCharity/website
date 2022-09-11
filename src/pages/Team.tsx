import { Brush4 } from '../components/Brushes/Brush4';
import { getDocumentTitle } from '../utils/getDocumentTitle';

export const Team = () => {
  document.title = getDocumentTitle('Team');

  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Helfer und Freunde</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          Das Team der
          <br />
          Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>
    </main>
  );
};
