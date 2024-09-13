import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";
import { BASE_URL } from "../utils/constants";

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
      `${BASE_URL}/items/activities?filter[hidden][_eq]=false`
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
      } as Activity;
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
