import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream, StreamWithAlternatives } from "./useStreams";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";
import { BASE_URL } from "../utils/constants";

export type DonationGoal = {
  timeslot: Stream | null;
  description: string | null;
  hidden: boolean | null;
  id: number;
  name: string;
  reached_at: number;
  reached_at_hidden: boolean;
};

type DonationGoalWithAlternatives = Omit<DonationGoal, "timeslot"> & {
  name_en: string | null;
  description_en: string | null;
  timeslot: StreamWithAlternatives | null;
};

export const useDonationGoals = (lang: Language) => {
  const rawQueryResult = useQuery(["donation_goals"], async () => {
    const { data } = await axios.get<{ data: DonationGoalWithAlternatives[] }>(
      `${BASE_URL}/items/donation_goals?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.activity.name_en,timeslot.activity.hidden,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name&filter[hidden][_eq]=false&sort=reached_at`
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const { name_en, name, description_en, description, timeslot, ...rest } =
        dataEntry;

      const translatedDonationGoal: DonationGoal = {
        ...rest,
        name: lang === Language.DE || !name_en ? name : name_en,
        description:
          lang === Language.DE || !description_en
            ? description
            : description_en,
        timeslot: null,
      };

      if (!timeslot) return translatedDonationGoal;

      const { activity, ...restTimeslot } = timeslot;
      const {
        name: activity_name,
        name_en: activity_name_en,
        ...restActivity
      } = activity;

      return {
        ...translatedDonationGoal,
        timeslot: {
          ...restTimeslot,
          activity: {
            ...restActivity,
            name:
              lang === Language.DE || !activity_name_en
                ? activity_name
                : activity_name_en,
          },
        },
      };
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
