import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Stream } from './useStreams';

export type Bidwars = {
  active: boolean;
  bidwar_name: string;
  bidwar_description: string | null;
  id: number;
  timeslot: Stream | null;
};

export const useBidwars = () => {
  return useQuery(['bidwars'], async () => {
    const { data } = await axios.get<{ data: Bidwars[]; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/bidwars?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name');
    return data.data;
  });
};
