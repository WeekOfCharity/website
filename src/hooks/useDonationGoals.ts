import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type DonationGoal = {
  description: string | null;
  id: number;
  name: string;
  reached_at: number;
};

export const useDonationGoals = () => {
  return useQuery(['donation_goals'], async () => {
    const { data } = await axios.get<{ data: DonationGoal[]; }>('https://directus.weekofcharity.de/items/donation_goals');
    return data.data;
  });
};
