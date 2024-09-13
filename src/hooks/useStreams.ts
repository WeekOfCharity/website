import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";
import { BASE_URL } from "../utils/constants";

export type Stream = {
  activity: {
    icon: string;
    id: number;
    name: string;
    hidden: boolean;
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
  language: StreamLanguage;
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

export enum StreamLanguage {
  DE = "de",
  EN = "en",
  DEEN = "deen",
}

export const useStreams = (lang: Language) => {
  const rawQueryResult = useQuery(["streams"], async () => {
    const { data } = await axios.get<{ data: StreamWithAlternatives[] }>(
      `${BASE_URL}/items/timeslots?fields=*,activity.icon,activity.id,activity.name,activity.name_en,activity.hidden,fellows.people_id.icon,fellows.people_id.id,fellows.people_id.name,fellows.people_id.hide_from_team_page,streamer.icon,streamer.id,streamer.name,streamer.stream_link,streamer.hide_from_team_page&sort=start`
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const { activity, ...rest } = dataEntry;
      const { name, name_en, ...restActivity } = activity;
      return {
        ...rest,
        activity: {
          ...restActivity,
          name: lang === Language.DE || !name_en ? name : name_en,
        },
      } as Stream;
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
