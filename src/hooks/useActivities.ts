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
    const { data } = await axios.get<{ data: Activity[]; }>('https://directus.weekofcharity.de/items/activities');
    return data.data;
  });
};
