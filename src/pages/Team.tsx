import { mdiClose, mdiMusic, mdiOpenInNew, mdiTwitch } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Brush1 } from '../components/Brushes/Brush1';
import { Brush4 } from '../components/Brushes/Brush4';
import { Member } from '../components/Member/Member';
import { OutsideAlerter } from '../components/OutsideAlerter/OutsideAlerter';
import { Stream } from '../components/Stream/Stream';
import { useStreams } from '../hooks/useStreams';
import { Member as MemberData, useTeam } from '../hooks/useTeam';
import { getState } from '../utils/dateAndTime';
import { getDocumentTitle } from '../utils/getDocumentTitle';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Team = () => {
  const [activeMember, setActiveMember] = useState<MemberData | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (typeof activeMember !== 'undefined') {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'auto';
    }
  }, [activeMember]);

  document.title = getDocumentTitle('Team');

  const { data: streams, status: streamsStatus } = useStreams();
  const { data: members, status: membersStatus } = useTeam();

  const charity = typeof members !== 'undefined' && members.length > 0 ? members.find((member) => member.id === 28) : undefined;
  const chesster = typeof members !== 'undefined' && members.length > 0 ? members.find((member) => member.id === 27) : undefined;

  const getStreamsWithFellow = (memberId: number) => {
    return typeof streams !== 'undefined' && streams.length > 0 ? streams.filter((stream) => stream.fellows.some((fellow) => fellow.people_id.id === memberId)) : [];
  };

  const getStreamsWithHost = (memberId: number) => {
    return typeof streams !== 'undefined' && streams.length > 0 ? streams.filter((stream) => stream.streamer.id === memberId) : [];
  };

  const closeMember = () => {
    setSearchParams({}, { replace: true });
  };

  const openMember = (member: MemberData) => {
    setSearchParams({ id: member.id.toString() }, { replace: true });
  };

  useEffect(() => {
    if (searchParams.has('id')) {
      if (membersStatus === 'success') {
        setActiveMember(members.find((member) => member.id.toString() === searchParams.get('id')));
      }
    } else {
      setActiveMember(undefined);
    }
  }, [membersStatus, searchParams]);

  return (
    <main className="text-neutral-800">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Helfende und Freunde</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          Das Team der
          <br />
          Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className={classNames('max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5', { 'pointer-events-none': activeMember !== undefined })}>
        {membersStatus === 'success' && (
          <>
            <div>
              <div className="flex justify-center mt-8 -rotate-3 w-full">
                <span className="font-handwriting font-semibold text-xl">Klick uns an für mehr Infos</span>
                <img className="mt-4 ml-3 -scale-x-100" src={arrowDown.toString()} />
              </div>

              <div className="flex gap-3 justify-center">
                {charity && (
                  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%]">
                    <Member
                      avatarUrl={`https://directus.weekofcharity.de/assets/${charity.icon}?width=512&height=512&fit=cover`}
                      name={charity.name}
                      onClick={() => openMember(charity)}
                      pronouns={charity.pronouns}
                    />
                  </div>
                )}
                {chesster && (
                  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%]">
                    <Member
                      avatarUrl={`https://directus.weekofcharity.de/assets/${chesster.icon}?width=512&height=512&fit=cover`}
                      name={chesster.name}
                      onClick={() => openMember(chesster)}
                      pronouns={chesster.pronouns}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">Wir streamen für euch</div>

            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {members
                .filter((member) => member.streamer && member.id !== 27)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                  <Member
                    avatarUrl={`https://directus.weekofcharity.de/assets/${member.icon}?width=512&height=512&fit=cover`}
                    name={member.name}
                    onClick={() => openMember(member)}
                    pronouns={member.pronouns}
                    key={member.id}
                  />
                ))}
            </div>

            <div className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">Wir unterstützen und begleiten</div>
            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {members
                .filter((member) => !member.streamer && member.id !== 28)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                  <Member
                    avatarUrl={`https://directus.weekofcharity.de/assets/${member.icon}?width=512&height=512&fit=cover`}
                    name={member.name}
                    onClick={() => openMember(member)}
                    pronouns={member.pronouns}
                    key={member.id}
                  />
                ))}
            </div>
          </>
        )}

        {membersStatus !== 'success' && (
          <>
            <div className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">Wir streamen für euch</div>

            <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {[...Array(24)].map((members) => (
                <Member.Loading key={members} />
              ))}
            </div>
          </>
        )}
      </section>

      <OutsideAlerter active={activeMember !== undefined} onClick={closeMember}>
        <aside
          className={classNames(
            'bg-neutral-800 duration-300 ease-in-out fixed h-screen overflow-hidden right-0 top-0 transform-gpu transition w-full sm:w-2/3 lg:w-1/2 2xl:w-1/3 z-[99999]',
            {
              'translate-x-0': typeof activeMember !== 'undefined',
              'translate-x-full': typeof activeMember === 'undefined',
            }
          )}
        >
          <button
            className="absolute bg-white hover:bg-neutral-200 duration-300 inline-flex items-center leading-none p-3 right-5 rounded-full top-5 transition-all z-[9999]"
            onClick={closeMember}
          >
            <Icon path={mdiClose} size="1.25rem" />
          </button>

          {activeMember && (
            <main className="h-full max-h-screen overflow-y-scroll p-5 text-white" style={{ scrollbarWidth: 'thin' }}>
              <Brush1 className="absolute -right-24 text-accent-500 -top-8 w-[400px] -z-10" />

              <div className="flex items-start mb-5">
                <img
                  className="bg-lavender-500 h-40 object-cover object-center rounded-lg shadow-2xl w-40"
                  src={`https://directus.weekofcharity.de/assets/${activeMember.icon}?width=160&height=160&fit=cover`}
                />
              </div>

              <div className="flex items-start space-x-2">
                <div className="mr-auto">
                  <div className="font-pally font-bold text-4xl">{activeMember.name}</div>
                  {activeMember.pronouns && <div className="font-semibold">{activeMember.pronouns}</div>}
                </div>

                {activeMember.theme && (
                  <a
                    className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={`https://directus.weekofcharity.de/assets/${activeMember.theme}`}
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <Icon path={mdiMusic} size="1.25rem" />
                  </a>
                )}

                {activeMember.stream_link && (
                  <a
                    className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={activeMember.stream_link}
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <Icon path={mdiTwitch} size="1.25rem" />
                  </a>
                )}

                {activeMember.social_link && (
                  <a
                    className="bg-accent-500 hover:bg-accent-200 duration-300 p-3 rounded-full text-neutral-800 transition-all"
                    href={activeMember.social_link}
                    rel="nofollow noreferrer"
                    target="_blank"
                  >
                    <Icon path={mdiOpenInNew} size="1.25rem" />
                  </a>
                )}
              </div>

              {activeMember.roles && activeMember.roles.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center mt-5">
                  {activeMember.roles.map((role) => (
                    <span className="bg-lavender-500 flex font-round font-bold px-1 py-0.5 rounded-sm shadow text-lavender-900 text-xs" key={role}>
                      #{role}
                    </span>
                  ))}
                </div>
              )}

              {activeMember.introduction && <div className="mt-5 text-lg" dangerouslySetInnerHTML={{ __html: activeMember.introduction.replace(/\n/g, '<br />') }} />}

              {streamsStatus === 'success' && (
                <section className="flex flex-col gap-5 mt-5">
                  {getStreamsWithHost(activeMember.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-lavender-500">{activeMember.name} hostet</div>
                      {getStreamsWithHost(activeMember.id).map((stream) => (
                        <Stream
                          activityId={stream.activity.id}
                          condensed
                          endTime={stream.end}
                          gameImageUrl={`https://directus.weekofcharity.de/assets/${stream.activity.icon}`}
                          highlight={stream.highlight}
                          startTime={stream.start}
                          state={getState(stream.start, stream.end)}
                          streamer={stream.streamer.name}
                          title={stream.activity.name}
                          key={stream.id}
                        />
                      ))}
                    </div>
                  )}

                  {getStreamsWithFellow(activeMember.id).length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="font-round2 font-bold text-lavender-500">{activeMember.name} begleitet</div>
                      {getStreamsWithFellow(activeMember.id).map((stream) => (
                        <Stream
                          activityId={stream.activity.id}
                          condensed
                          endTime={stream.end}
                          gameImageUrl={`https://directus.weekofcharity.de/assets/${stream.activity.icon}`}
                          highlight={stream.highlight}
                          startTime={stream.start}
                          state={getState(stream.start, stream.end)}
                          streamer={stream.streamer.name}
                          title={stream.activity.name}
                          key={stream.id}
                        />
                      ))}
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
