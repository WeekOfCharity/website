import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";

export type Activity = {
  description: string | null;
  icon: string;
  id: number;
  kind: string | null;
  name: string;
  reference_link: string | null;
};

type ActivityWithAlternatives = Activity & {
  name_en: string | null;
  description_en: string | null;
};

export const useActivities = (lang: Language) => {
  const rawQueryResult = useQuery(["activities"], async () => {
    const { data } = await axios.get<{ data: ActivityWithAlternatives[] }>(
      import.meta.env.VITE_BASE_URL + "/items/activities"
    );
    return data.data;
  });

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: Activity[] = [];
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
