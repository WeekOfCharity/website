import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";

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

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: Member[] = [];
  for (const member of rawQueryResult.data) {
    const { introduction_en, introduction, ...rest } = member;
    const formattedMember = {
      ...rest,
      introduction:
        lang === Language.DE || !introduction_en
          ? introduction
          : introduction_en,
    };
    translatedData.push(formattedMember);
  }
  return { ...rawQueryResult, data: translatedData };
};
