import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Activity = {
  description: string | null;
  icon: string;
  id: number;
  kind: string | null;
  name: string;
  reference_link: string | null;
};

export const useActivities = () => {
  return useQuery(['activities'], async () => {
    const { data } = await axios.get<{ data: Activity[]; }>(
      (process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/activities');
    return data.data;
  });
};

