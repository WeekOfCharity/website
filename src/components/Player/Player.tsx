import { mdiBroadcast, mdiClose, mdiInformation, mdiPlay } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { useState } from 'react';
import { Brush1 } from '../Brushes/Brush1';
import './Player.scss';

const arrowRight = new URL('../../assets/arrow-right.svg', import.meta.url);

function Player() {
  const [isPlayerOpen, setPlayerOpen] = useState(false);

  return (
    <>
      <button className="bg-accent-500 bottom-0 fixed m-5 md:m-10 p-4 right-0 rounded-full text-white woc-player-button z-[99997]" onClick={() => setPlayerOpen(true)}>
        <Icon path={mdiBroadcast} size="2rem" />
      </button>

      <aside
        className={classNames(
          'bg-neutral-800 bottom-0 duration-300 ease-in-out fixed md:max-w-screen-sm overflow-hidden md:right-10 md:rounded-lg text-white transform-gpu transition-all w-full z-[99998]',
          {
            'md:bottom-10 md:shadow-lg translate-y-0': isPlayerOpen,
            'shadow-none translate-y-full': !isPlayerOpen,
          }
        )}
      >
        <Brush1 className="absolute -bottom-24 -left-40 -scale-100 text-accent-500 transform-gpu w-[400px] -z-10" />

        <div className="flex items-center justify-between p-5">
          <div>
            <div className="flex items-center">
              <Icon className="mr-2 text-accent-500" path={mdiBroadcast} size="1rem" />
              <div className="font-bold text-accent-500 text-xs uppercase">Aktueller Stream</div>
            </div>
            <div className="font-round font-bold">
              Super Mario Galaxy <span className="font-normal">mit</span> Eugen
            </div>
          </div>

          <div className="font-round font-bold text-neutral-400">17:00 &mdash; 19:00</div>
        </div>

        <div className="flex justify-end p-5 space-x-2">
          <div className="bottom-4 flex mr-1 relative">
            <span className="font-handwriting font-semibold mr-3 mt-3 text-xl whitespace-nowrap" style={{ textShadow: '0 0 3px #26262680, 0 0 2px #262626' }}>
              jetzt zusehen
            </span>
            <img className="rotate-12 w-[78px]" src={arrowRight.toString()} />
          </div>

          <button className="bg-accent-500 p-3 rounded-full text-neutral-800">
            <Icon path={mdiPlay} size="1.25rem" />
          </button>
          <button className="bg-accent-500 p-3 rounded-full text-neutral-800">
            <Icon path={mdiInformation} size="1.25rem" />
          </button>
          <button className="bg-white p-3 rounded-full text-neutral-800" onClick={() => setPlayerOpen(false)}>
            <Icon path={mdiClose} size="1.25rem" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Player;
