import { Brush4 } from '../components/Brushes/Brush4';

export const Placeholder = () => {
  return (
    <main className="text-neutral-800">
      <header className="p-10 relative">
        <div className="pb-1">
          <div className="font-round2 font-bold inline-block -rotate-[10deg] -skew-x-[10deg] text-accent-900 transform-gpu uppercase">Hey schau mal!</div>
        </div>

        <div className="font-pally font-bold max-w-screen-md my-5 text-accent-500 text-3xl md:text-5xl w-4/5">Ich bin eine beispielhafte Unterseite</div>

        <Brush4 className="absolute bottom-1/2 h-48 text-neutral-100 transform-gpu -translate-x-1/2 translate-y-1/2 w-auto -z-10" />
      </header>
    </main>
  );
};
