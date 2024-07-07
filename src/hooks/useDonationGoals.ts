import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream } from "./useStreams";
import { Language } from "../i18n/i18n";

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
      process.env.BASE_URL +
        "/items/donation_goals?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name&sort=reached_at"
    );
    return data.data;
  });

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: DonationGoal[] = [];
  for (const dataEntry of rawQueryResult.data) {
    const { name_en, name, description_en, description, ...rest } = dataEntry;
    translatedData.push({
      ...rest,
      name: lang === Language.DE || !name_en ? name : name_en,
      description:
        lang === Language.DE || !description_en ? description : description_en,
    });
  }
  return { ...rawQueryResult, data: translatedData };
};
