import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ExternalDonationTotal = {
  donated_amount_in_cents: number
  id: number;
};

export const useExternalDonationTotal = () => {
  return useQuery(['external_donation_total'], async () => {
    const { data } = await axios.get<{ data: ExternalDonationTotal; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/external_donation_total');
    return data.data;
  });
};
