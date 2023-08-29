import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Stream } from './useStreams';

export type DonationGoal = {
  stream: Stream | null;
  description: string | null;
  hidden: boolean | null;
  id: number;
  name: string;
  reached_at: number;
};

export const useDonationGoals = () => {
  return useQuery(['donation_goals'], async () => {
    const { data } = await axios.get<{ data: DonationGoal[]; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/donation_goals?fields=*,activity.*,activity.activity.icon,activity.activity.id,activity.activity.name,activity.streamer.icon,activity.streamer.id,activity.streamer.name&sort=reached_at');
    return data.data;
  });
};
