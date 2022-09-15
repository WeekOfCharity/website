import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Stream = {
  activity: {
    icon: string;
    id: number;
    name: string;
  };
  end: string;
  fellows: {
    people_id: {
      id: number;
      name: string;
    };
  }[];
  highlight: boolean;
  id: number;
  start: string;
  status: boolean;
  streamer: {
    id: number;
    name: string;
  };
};

export const useStreams = () => {
  return useQuery(['streams'], async () => {
    const { data } = await axios.get<{ data: Stream[]; }>('https://directus.weekofcharity.de/items/timeslots?fields=*,activity.icon,activity.id,activity.name,fellows.people_id.id,fellows.people_id.name,streamer.id,streamer.name&sort=start');
    return data.data;
  });
};
