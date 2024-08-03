import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream } from "./useStreams";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";

export type DonationGoal = {
  timeslot: Stream | null;
  description: string | null;
  hidden: boolean | null;
  id: number;
  name: string;
  reached_at: number;
};

type DonationGoalWithAlternatives = DonationGoal & {
  name_en: string | null;
  description_en: string | null;
};

export const useDonationGoals = (lang: Language) => {
  const rawQueryResult = useQuery(["donation_goals"], async () => {
    const { data } = await axios.get<{ data: DonationGoalWithAlternatives[] }>(
      import.meta.env.VITE_BASE_URL +
        "/items/donation_goals?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name&filter[hidden][_eq]=false&sort=reached_at"
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const { name_en, name, description_en, description, ...rest } = dataEntry;
      return {
        ...rest,
        name: lang === Language.DE || !name_en ? name : name_en,
        description:
          lang === Language.DE || !description_en
            ? description
            : description_en,
      } as DonationGoal;
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
