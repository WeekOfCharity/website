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
      icon: string;
      id: number;
      name: string;
    };
  }[];
  highlight: boolean;
  id: number;
  start: string;
  status: boolean;
  streamer: {
    icon: string;
    id: number;
    name: string;
    stream_link: string;
  };
  vod_link: string;
};

export const useStreams = () => {
  return useQuery(['streams'], async () => {
    const { data } = await axios.get<{ data: Stream[]; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/timeslots?fields=*,activity.icon,activity.id,activity.name,fellows.people_id.icon,fellows.people_id.id,fellows.people_id.name,streamer.icon,streamer.id,streamer.name,streamer.stream_link&sort=start');
    return data.data;
  });
};
