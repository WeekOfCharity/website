import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type FAQItem = {
  answer: string;
  id: number;
  question: string;
};

export const useFAQ = () => {
  return useQuery(['faq'], async () => {
    const { data } = await axios.get<{ data: FAQItem[]; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/faq');
    return data.data;
  });
};
