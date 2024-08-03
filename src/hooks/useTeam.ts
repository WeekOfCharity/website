import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";

export type Member = {
  icon: string;
  id: number;
  introduction: string | null;
  name: string;
  pronouns: string | null;
  roles: string[] | null;
  social_link: string | null;
  stream_link: string | null;
  streamer: boolean | null;
  theme: string | null;
  hide_from_team_page: boolean | null;
};

type MemberWithAlternatives = Member & {
  introduction_en: string | null;
};

export const useTeam = (lang: Language) => {
  const rawQueryResult = useQuery(["team"], async () => {
    const { data } = await axios.get<{ data: MemberWithAlternatives[] }>(
      import.meta.env.VITE_BASE_URL + "/items/people"
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const { introduction_en, introduction, ...rest } = dataEntry;
      return {
        ...rest,
        introduction:
          lang === Language.DE || !introduction_en
            ? introduction
            : introduction_en,
      } as Member;
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
