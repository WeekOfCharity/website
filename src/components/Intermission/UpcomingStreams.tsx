import cn from "classnames";
import {
  StreamFilter,
  StreamSorting,
  useStreams,
} from "../../hooks/useStreams";
import { Language } from "../../i18n/i18n";
import { useEffect } from "react";
import { UpcomingStreamItem } from "./UpcomingStreamItem";

type UpcomingStreamsProps = {
  className?: string;
};

export const UpcomingStreams = ({ className }: UpcomingStreamsProps) => {
  const {
    data: upcomingStreams,
    status: streamsStatus,
    refetch: refetchUpcomingStreams,
  } = useStreams(Language.DE, {
    sorting: StreamSorting.START,
    filter: StreamFilter.UPCOMING,
    limit: 3,
  });

  useEffect(() => {
    const id = setInterval(() => {
      void refetchUpcomingStreams();
    }, 60 * 1000);
    return () => clearInterval(id);
  }, [refetchUpcomingStreams]);

  return (
    <div className={cn("grid grid-rows-3", className)}>
      {streamsStatus === "loading" && <span>Laden...</span>}
      {streamsStatus === "error" && <span>Fehler beim Laden der Streams</span>}
      {streamsStatus === "success" &&
        upcomingStreams?.map((stream) => (
          <UpcomingStreamItem
            key={stream.id}
            activityIcon={stream.activity.icon}
            activityName={stream.activity.name}
            streamerLink={stream.streamer.stream_link}
            start={stream.start}
            end={stream.end}
          />
        ))}
    </div>
  );
};
