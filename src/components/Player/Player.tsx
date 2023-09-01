import { mdiBroadcast, mdiCalendar, mdiClose, mdiInformation, mdiPlay } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stream, useStreams } from '../../hooks/useStreams';
import { formatTime, getState } from '../../utils/dateAndTime';
import { Brush1 } from '../Brushes/Brush1';
import './Player.scss';

const arrowRight = new URL('../../assets/arrow-right.svg', import.meta.url);

function Player() {
  const [isPlayerOpen, setPlayerOpen] = useState(true);
  const [running, setRunning] = useState<Stream | undefined>(undefined);
  const [showInactive, setShowInactive] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  const { data: streams, status: streamsStatus } = useStreams();

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date(time.getTime() - 1000));

      const stream = (streams ?? []).find((stream) => getState(stream.start, stream.end) === 'running');

      setRunning(stream);
      setShowInactive(streamsStatus === 'success' && stream === undefined);
    }, 1000);

    return () => clearInterval(id);
  }, [time]);

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
        <Brush1 className="absolute -bottom-24 duration-300 -left-40 -scale-100 text-accent-500 transform-gpu transition-all w-[400px] -z-10" />

        {running && (
          <div className="flex items-center justify-between p-5">
            <div>
              <div className="flex items-center">
                <Icon className="mr-2 text-accent-500" path={mdiBroadcast} size="1rem" />
                <div className="font-bold text-accent-500 text-xs uppercase">Aktueller Stream</div>
              </div>
              <div className="font-round font-bold">
                <Link className="duration-300 hover:text-accent-500 transition-all" to={`/streams?id=${running.id}`}>
                  {running.activity && running.activity.name}
                </Link>{' '}
                {running.streamer && (
                  <>
                  <span className="font-normal">mit</span>{' '}
                  <Link className="duration-300 hover:text-accent-500 transition-all" to={`/team?id=${running.streamer.id}`}>
                    {running.streamer.name}
                  </Link>
                  </>
                )}
              </div>
            </div>

            <div className="font-round font-bold ml-5 text-neutral-400 whitespace-nowrap">
              {formatTime(running.start)} &mdash; {formatTime(running.end)}
            </div>
          </div>
        )}

        {showInactive && (
          <div className="font-round font-bold p-5">
            Die Week of Charity ist aktuell nicht aktiv.
            <br />
            Sieh dir unser Programm an, um keine Events zu verpassen.
          </div>
        )}

        {(streamsStatus !== 'success' || (!running && !showInactive)) && <div className="font-round font-bold p-5">Aktueller Stream wird geladen...</div>}

        <div className="flex justify-end p-5 space-x-2">
          {running && (
            <>
              <div className="bottom-4 flex mr-1 relative">
                <span className="font-handwriting font-semibold mr-3 mt-3 text-xl whitespace-nowrap" style={{ textShadow: '0 0 3px #26262680, 0 0 2px #262626' }}>
                  jetzt zusehen
                </span>
                <img className="rotate-12 w-[78px]" src={arrowRight.toString()} />
              </div>

              {running.streamer && (
                <a
                  className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all woc-player-button"
                  href={running.streamer.stream_link}
                  rel="nofollow noreferrer"
                  target="_blank"
                >
                  <Icon path={mdiPlay} size="1.25rem" />
                </a>
              )}
              {running.activity && (
                <Link className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all" to={`/streams?id=${running.id}`}>
                  <Icon path={mdiInformation} size="1.25rem" />
                </Link>
              )}
            </>
          )}

          {showInactive && (
            <Link className="bg-accent-500 hover:bg-accent-200 duration-300 flex items-center px-3 py-2 rounded-full text-neutral-800 transition-all" to="/streams">
              <Icon path={mdiCalendar} size="1.25rem" />
              <span className="font-semibold ml-3">Programm</span>
            </Link>
          )}

          <button className="bg-white hover:bg-neutral-200 duration-300 p-3 rounded-full text-neutral-800 transition-all" onClick={() => setPlayerOpen(false)}>
            <Icon path={mdiClose} size="1.25rem" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Player;
