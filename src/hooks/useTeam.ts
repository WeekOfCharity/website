import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Member = {
  icon: string;
  id: number;
  introduction: string | null;
  name: string;
  pronouns: string | null;
  roles: string[] | null;
  social_link: string | null;
  stream_link: string | null;
  streamer: boolean | null;
  theme: string | null;
};

export const useTeam = () => {
  return useQuery(['team'], async () => {
    const { data } = await axios.get<{ data: Member[]; }>('https://directus.weekofcharity.de/items/people');
    return data.data;
  });
};
