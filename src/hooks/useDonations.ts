import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Donations = {
  donated_amount_in_cents: number
  id: number;
};

export const useDonations = () => {
  return useQuery(['donations'], async () => {
    const { data } = await axios.get<{ data: Donations; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/donations');
    return data.data;
  });
};
