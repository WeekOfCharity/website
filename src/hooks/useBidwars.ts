import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream, StreamWithAlternatives } from "./useStreams";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";
import { BASE_URL } from "../utils/constants";

export type BidwarData = {
  bidwar_name: string;
  bidwar_description: string | null;
  id: number;
  status: "active" | "inactive" | "results";
  timeslot: Stream | null;
};

type BidwarDataWithAlternatives = Omit<BidwarData, "timeslot"> & {
  bidwar_name_en: string | null;
  bidwar_description_en: string | null;
  timeslot: StreamWithAlternatives | null;
};

export const useBidwars = (lang: Language) => {
  const rawQueryResult = useQuery(["bidwars"], async () => {
    const { data } = await axios.get<{ data: BidwarDataWithAlternatives[] }>(
      `${BASE_URL}/items/bidwars?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.activity.name_en,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name`
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const {
        bidwar_name_en,
        bidwar_name,
        bidwar_description_en,
        bidwar_description,
        timeslot,
        ...rest
      } = dataEntry;

      const translatedBidwar: BidwarData = {
        ...rest,
        bidwar_name:
          lang === Language.DE || !bidwar_name_en
            ? bidwar_name
            : bidwar_name_en,
        bidwar_description:
          lang === Language.DE || !bidwar_description_en
            ? bidwar_description
            : bidwar_description_en,
        timeslot: null,
      };

      if (!timeslot) return translatedBidwar;

      const { activity, ...restTimeslot } = timeslot;
      const { name, name_en, ...restActivity } = activity;

      return {
        ...translatedBidwar,
        timeslot: {
          ...restTimeslot,
          activity: {
            ...restActivity,
            name: lang === Language.DE || !name_en ? name : name_en,
          },
        },
      };
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
