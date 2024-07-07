import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";

export type Stream = {
  activity: {
    icon: string;
    id: number;
    name: string;
  };
  end: string;
  fellows: {
    people_id: {
      icon: string;
      id: number;
      name: string;
      hide_from_team_page: boolean;
    };
  }[];
  highlight: boolean;
  id: number;
  start: string;
  status: boolean;
  streamer: {
    icon: string;
    id: number;
    name: string;
    stream_link: string;
    hide_from_team_page: boolean;
  };
  vod_link: string;
};

export type StreamWithAlternatives = Omit<Stream, "activity"> & {
  activity: Stream["activity"] & {
    name_en: string | null;
  };
};

export const useStreams = (lang: Language) => {
  const rawQueryResult = useQuery(["streams"], async () => {
    const { data } = await axios.get<{ data: StreamWithAlternatives[] }>(
      process.env.BASE_URL +
        "/items/timeslots?fields=*,activity.icon,activity.id,activity.name,activity.name_en,fellows.people_id.icon,fellows.people_id.id,fellows.people_id.name,fellows.people_id.hide_from_team_page,streamer.icon,streamer.id,streamer.name,streamer.stream_link,streamer.hide_from_team_page&sort=start"
    );
    return data.data;
  });

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: Stream[] = [];
  for (const dataEntry of rawQueryResult.data) {
    const { activity, ...rest } = dataEntry;
    const { name, name_en, ...restActivity } = activity;
    translatedData.push({
      ...rest,
      activity: {
        ...restActivity,
        name: lang === Language.DE || !name_en ? name : name_en,
      },
    });
  }
  return { ...rawQueryResult, data: translatedData };
};
