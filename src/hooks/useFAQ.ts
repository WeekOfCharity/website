import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type FAQItem = {
  answer: string;
  id: number;
  question: string;
};

export const useFAQ = () => {
  return useQuery(["faq"], async () => {
    const { data } = await axios.get<{ data: FAQItem[] }>(
      process.env.BASE_URL + "/items/faq"
    );
    return data.data;
  });
};
