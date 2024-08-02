import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream, StreamWithAlternatives } from "./useStreams";
import { Language } from "../i18n/i18n";

export type Bidwars = {
  bidwar_name: string;
  bidwar_description: string | null;
  id: number;
  status: "active" | "inactive" | "results";
  timeslot: Stream | null;
};

type BidwarsWithAlternatives = Omit<Bidwars, "timeslot"> & {
  bidwar_name_en: string | null;
  bidwar_description_en: string | null;
  timeslot: StreamWithAlternatives | null;
};

export const useBidwars = (lang: Language) => {
  const rawQueryResult = useQuery(["bidwars"], async () => {
    const { data } = await axios.get<{ data: BidwarsWithAlternatives[] }>(
      import.meta.env.VITE_BASE_URL +
        "/items/bidwars?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.activity.name_en,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name"
    );
    return data.data;
  });

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: Bidwars[] = [];
  for (const dataEntry of rawQueryResult.data) {
    const {
      bidwar_name_en,
      bidwar_name,
      bidwar_description_en,
      bidwar_description,
      timeslot,
      ...rest
    } = dataEntry;
    const { activity, ...restTimeslot } = timeslot;
    const { name, name_en, ...restActivity } = activity;
    translatedData.push({
      ...rest,
      timeslot: {
        ...restTimeslot,
        activity: {
          ...restActivity,
          name: lang === Language.DE || !name_en ? name : name_en,
        },
      },
      bidwar_name:
        lang === Language.DE || !bidwar_name_en ? bidwar_name : bidwar_name_en,
      bidwar_description:
        lang === Language.DE || !bidwar_description_en
          ? bidwar_description
          : bidwar_description_en,
    });
  }
  return { ...rawQueryResult, data: translatedData };
};
