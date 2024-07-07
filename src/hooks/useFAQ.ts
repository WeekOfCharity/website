import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";

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
      process.env.BASE_URL + "/items/faq"
    );
    return data.data;
  });

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: FAQItem[] = [];
  for (const dataEntry of rawQueryResult.data) {
    const { answer_en, answer, question_en, question, ...rest } = dataEntry;
    translatedData.push({
      ...rest,
      answer: lang === Language.DE || !answer_en ? answer : answer_en,
      question: lang === Language.DE || !question_en ? question : question_en,
    });
  }
  return { ...rawQueryResult, data: translatedData };
};
