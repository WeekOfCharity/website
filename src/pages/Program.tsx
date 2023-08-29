import { useMemo } from 'react';
import { Brush4 } from '../components/Brushes/Brush4';
import { Carousel } from '../components/Carousel/Carousel';
import { HighlightStream } from '../components/HighlightStream/HighlightStream';
import { Stream } from '../components/Stream/Stream';
import { Stream as StreamData, useStreams } from '../hooks/useStreams';
import { formatDay, getState } from '../utils/dateAndTime';
import { getDocumentTitle } from '../utils/getDocumentTitle';

export const Program = () => {
  document.title = getDocumentTitle('Programm');

  const { data: streams, status } = useStreams();
  const streamsGrouped = useMemo(() => {
    if (typeof streams === 'undefined' || streams.length === 0) {
      return {};
    }

    return streams.reduce<Record<string, StreamData[]>>((groups, stream) => {
      const day = formatDay(stream.start);
      const group = groups[day] ?? [];

      return { ...groups, [day]: [...group, stream] };
    }, {});
  }, [streams]);

  const upcomingHighlights = useMemo(() => {
    if (typeof streams === 'undefined') {
      return undefined;
    }

    return streams.filter((stream) => stream.highlight && getState(stream.start, stream.end) !== 'ended');
  }, [streams]);

  return (
    <main className="text-neutral-800 woc-accent-green23">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-green23-900 uppercase">Keine Events verpassen</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto my-5 text-green23-500 text-4xl md:text-7xl w-4/5">Das Programm der Week of Charity</div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

        {status === 'success' && upcomingHighlights.length > 0 && ( 
          <section className="mb-20 md:mb-40 mt-12 md:mt-20">
            <div className="max-w-screen-2xl mb-6 mx-auto">
              <div className="font-semibold px-10 2xl:px-2.5 text-3xl md:text-4xl text-center md:text-left">Die Highlights 👑 der Woche</div>
            </div>
            <Carousel>
              {upcomingHighlights.map((stream) => (
                <HighlightStream
                  endTime={stream.end}
                  fellowCount={stream.fellows.length}
                  gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`}
                  startTime={stream.start}
                  streamer={stream.streamer.name}
                  title={stream.activity.name}
                  key={stream.id}
                />
              ))}
            </Carousel>
          </section>
        )}

        {status !== 'success' && (
          <section className="mb-20 md:mb-40 mt-12 md:mt-20">
            <Carousel>{[...Array(4)].map((_, index) => (
              <HighlightStream.Loading key={"loading" + index} />
            ))}</Carousel>
          </section>
        )}

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="font-semibold mb-6 text-3xl md:text-4xl text-center md:text-left">{status === 'success' && streams.length > 0 ? "Alle Streams" : "Bald seht ihr hier mehr!"}</div>

        <div className="gap-x-5 gap-y-10 grid xl:grid-cols-2">
          {status === 'success' &&
            Object.keys(streamsGrouped).map((day) => (
              <div className="space-y-4" key={day}>
                <div>
                  <div className="font-round2 font-bold text-green23-900 uppercase">{day}</div>
                  <div className="bg-green23-900 h-0.5 w-full"></div>
                </div>

                {streamsGrouped[day].map((stream) => (
                  <Stream
                    activityId={stream.activity.id}
                    endTime={stream.end}
                    gameImageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${stream.activity.icon}?width=512&height=512&quality=75&fit=cover&format=webp`}
                    highlight={stream.highlight}
                    startTime={stream.start}
                    state={getState(stream.start, stream.end)}
                    streamer={stream.streamer.name}
                    title={stream.activity.name}
                    vodLink={stream.vod_link}
                    key={stream.id}
                  />
                ))}
              </div>
            ))}

          {status !== 'success' &&
            [...Array(8)].map((_, index) => (
              <div className="space-y-4" key={index}>
                {[...Array(5)].map((_, index) => (
                  <Stream.Loading key={index} />
                ))}
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};
