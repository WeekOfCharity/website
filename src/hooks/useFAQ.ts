import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";
import { BASE_URL } from "../utils/constants";

export type FAQItem = {
  answer: string;
  id: number;
  question: string;
};

type FAQItemWithAlternatives = FAQItem & {
  answer_en: string | null;
  question_en: string | null;
};

export const useFAQ = (lang: Language) => {
  const rawQueryResult = useQuery(["faq"], async () => {
    const { data } = await axios.get<{ data: FAQItemWithAlternatives[] }>(
      `${BASE_URL}/items/faq`
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const { answer_en, answer, question_en, question, ...rest } = dataEntry;
      return {
        ...rest,
        answer: lang === Language.DE || !answer_en ? answer : answer_en,
        question: lang === Language.DE || !question_en ? question : question_en,
      } as FAQItem;
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
