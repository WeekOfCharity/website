import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Stream } from './useStreams';

export type DonationGoal = {
  activity: Stream | null;
  description: string | null;
  id: number;
  name: string;
  reached_at: number;
};

export const useDonationGoals = () => {
  return useQuery(['donation_goals'], async () => {
    const { data } = await axios.get<{ data: DonationGoal[]; }>('https://directus.weekofcharity.de/items/donation_goals?fields=*,activity.*,activity.activity.icon,activity.activity.id,activity.activity.name,activity.streamer.icon,activity.streamer.id,activity.streamer.name');
    return data.data;
  });
};
