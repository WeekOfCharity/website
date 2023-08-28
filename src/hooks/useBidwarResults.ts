import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type BidwarResults = {
  results: {
    id: number;
    active: boolean;
    bidwar_name: string;
    bidwar_description: string;
    options: object;
  }[];
  id: number;
};

export const useBidwarResults = () => {
  return useQuery(['bidwar_results'], async () => {
    const { data } = await axios.get<{ data: BidwarResults; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/bidwar_results');
    return data.data;
  });
};
