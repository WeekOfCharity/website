import { mdiClose, mdiOpenInNew } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Activity } from '../components/Activity/Activity';
import { Brush1 } from '../components/Brushes/Brush1';
import { Brush4 } from '../components/Brushes/Brush4';
import { Member } from '../components/Member/Member';
import { OutsideAlerter } from '../components/OutsideAlerter/OutsideAlerter';
import { Stream } from '../components/Stream/Stream';
import { Activity as ActivityData, useActivities } from '../hooks/useActivities';
import { Stream as StreamData, useStreams } from '../hooks/useStreams';
import { getState } from '../utils/dateAndTime';
import { getDocumentTitle } from '../utils/getDocumentTitle';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Activities = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityData | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (typeof activeActivity !== 'undefined') {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
    }
  }, [activeActivity]);

  document.title = getDocumentTitle('Aktivitäten');

  const { data: activities, status: activitiesStatus } = useActivities();
  const { data: streams, status: streamsStatus } = useStreams();

  const openingId = 999;
  const finaleId = 1000;
  const opening = typeof activities !== 'undefined' && activities.length > 0 ? activities.find((activity) => activity.id === openingId) : undefined;
  const finale = typeof activities !== 'undefined' && activities.length > 0 ? activities.find((activity) => activity.id === finaleId) : undefined;

  const getFellowsWithActivity = (activityId: number) => {
    const fellows: StreamData['fellows'] = [];

    getStreamsWithActivity(activityId).forEach((stream) => {
      stream.fellows.forEach((fellow) => {
        if (!fellows.some((f) => f.people_id.id === fellow.people_id.id)) {
          fellows.push(fellow);
        }
      });
    });

    return fellows.sort((a, b) => a.people_id.name.localeCompare(b.people_id.name));
  };

  const getStreamersWithActivity = (activityId: number) => {
    return getStreamsWithActivity(activityId).reduce<StreamData['streamer'][]>((streamers, stream) => {
      if (!streamers.some((streamer) => streamer.id === stream.streamer.id)) {
        return [...streamers, stream.streamer];
      }

      return streamers;
    }, []);
  };

  const getStreamsWithActivity = (activityId: number) => {
    return typeof streams !== 'undefined' && streams.length > 0 ? streams.filter((stream) => stream.activity.id === activityId) : [];
  };

  const closeActivity = () => {
    setSearchParams({}, { replace: true });
  };

  const openActivity = (activity: ActivityData) => {
    setSearchParams({ id: activity.id.toString() }, { replace: true });
  };

  useEffect(() => {
    if (searchParams.has('id')) {
      if (activitiesStatus === 'success') {
        setActiveActivity(activities.find((activity) => activity.id.toString() === searchParams.get('id')));
      }
    } else {
      setActiveActivity(undefined);
    }
  }, [activitiesStatus, searchParams]);

  return (
    <main className="text-neutral-800 woc-accent-pink23">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-pink23-900 uppercase">Alle in der Übersicht</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-pink23-500 text-4xl md:text-7xl w-4/5">
          Die Aktivitäten der
          <br />
          Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className={classNames('max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5', { 'pointer-events-none': activeActivity !== undefined })}>
        {activitiesStatus === 'success' && (
          <>
            {activities.length > 0 && (
              <div>
                <div className="flex justify-center mt-8 -rotate-3 w-full">
                  <span className="font-handwriting font-semibold text-xl">Klick uns an für mehr Infos</span>
                  <img className="mt-4 ml-3 -scale-x-100" src={arrowDown.toString()} />
                </div>

                <div className="flex gap-3 justify-center">
                  {opening && (
                    <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%]">
                      <Activity
                        gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${opening.icon}?width=512&height=512&fit=cover`}
                        name={opening.name}
                        onClick={() => openActivity(opening)}
                      />
                    </div>
                  )}
                  {finale && (
                    <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%]">
                      <Activity
                        gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${finale.icon}?width=512&height=512&fit=cover`}
                        name={finale.name}
                        onClick={() => openActivity(finale)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">{activities.length > 0 ? "Aktivitäten" : "Bald seht ihr hier mehr!"}</div>

            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {activities
                .filter((activity) => ![openingId, finaleId].includes(activity.id))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((activity) => (
                  <Activity
                    gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${activity.icon}?width=512&height=512&fit=cover`}
                    name={activity.name}
                    onClick={() => openActivity(activity)}
                    key={activity.id}
                  />
                ))}
            </div>
          </>
        )}

        {activitiesStatus !== 'success' && (
          <>
            <div className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">Aktivitäten</div>

            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {[...Array(48)].map((activity) => (
                <Activity.Loading key={activity} />
              ))}
            </div>
          </>
        )}
      </section>

      <OutsideAlerter active={activeActivity !== undefined} onClick={closeActivity}>
        <aside
          className={classNames(
            'bg-neutral-800 duration-300 ease-in-out fixed h-screen overflow-hidden right-0 top-0 transform-gpu transition w-full sm:w-2/3 lg:w-1/2 2xl:w-1/3 z-[99999]',
            {
              'translate-x-0': typeof activeActivity !== 'undefined',
              'translate-x-full': typeof activeActivity === 'undefined',
            }
          )}
        >
          <button
            className="absolute bg-white hover:bg-neutral-200 duration-300 inline-flex items-center leading-none p-3 right-5 rounded-full top-5 transition-all z-[9999]"
            onClick={closeActivity}
          >
            <Icon path={mdiClose} size="1.25rem" />
          </button>

          {activeActivity && (
            <main className="h-full max-h-screen overflow-y-scroll p-5 text-white" style={{ scrollbarWidth: 'thin' }}>
              <Brush1 className="absolute -right-24 text-pink23-500 -top-8 w-[400px] -z-10" />

              <div className="flex items-start mb-5">
                <img className="bg-pink23-500 h-40 object-cover object-center rounded-lg shadow-2xl w-40" src={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${activeActivity.icon}`} />
              </div>

              <div className="flex items-start space-x-2">
                <div className="font-pally font-bold mr-auto text-4xl">{activeActivity.name}</div>

                {activeActivity.reference_link && (
                  <a
                    className="bg-pink23-500 hover:bg-pink23-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={activeActivity.reference_link}
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <Icon path={mdiOpenInNew} size="1.25rem" />
                  </a>
                )}
              </div>

              {activeActivity.description && <div className="mt-5 text-lg" dangerouslySetInnerHTML={{ __html: activeActivity.description.replace(/\n/g, '<br />') }} />}

              {streamsStatus === 'success' && (
                <section className="flex flex-col gap-5 mt-5">
                  {getStreamsWithActivity(activeActivity.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-pink23-500">Sei dabei in diesen Streams</div>
                      {getStreamsWithActivity(activeActivity.id).map((stream) => (
                        <Stream
                          activityId={stream.activity.id}
                          condensed
                          endTime={stream.end}
                          gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${stream.activity.icon}`}
                          highlight={stream.highlight}
                          noLink
                          startTime={stream.start}
                          state={getState(stream.start, stream.end)}
                          streamer={stream.streamer.name}
                          title={stream.activity.name}
                          key={stream.id}
                        />
                      ))}
                    </div>
                  )}

                  {getStreamsWithActivity(activeActivity.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-pink23-500">{activeActivity.name} wird gehostet von</div>
                      <div className="flex gap-2">
                        {getStreamersWithActivity(activeActivity.id).map((streamer) => (
                          <Link to={`/team?id=${streamer.id}`} key={streamer.id}>
                            <Member avatarUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${streamer.icon}?width=80&height=80&fit=cover`} condensed name={streamer.name} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {getFellowsWithActivity(activeActivity.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-pink23-500">{activeActivity.name} wird begleitet von</div>
                      <div className="flex flex-wrap gap-2">
                        {getFellowsWithActivity(activeActivity.id).map((fellow) => (
                          <Link to={`/team?id=${fellow.people_id.id}`} key={fellow.people_id.id}>
                            <Member
                              avatarUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${fellow.people_id.icon}?width=80&height=80&fit=cover`}
                              condensed
                              name={fellow.people_id.name}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </main>
          )}
        </aside>
      </OutsideAlerter>
    </main>
  );
};
