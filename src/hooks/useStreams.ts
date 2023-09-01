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
      hide_from_team_page: boolean;
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
    hide_from_team_page: boolean;
  };
  vod_link: string;
};

export const useStreams = () => {
  return useQuery(['streams'], async () => {
    const { data } = await axios.get<{ data: Stream[]; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/timeslots?fields=*,activity.icon,activity.id,activity.name,fellows.people_id.icon,fellows.people_id.id,fellows.people_id.name,fellows.people_id.hide_from_team_page,streamer.icon,streamer.id,streamer.name,streamer.stream_link,streamer.hide_from_team_page&sort=start');
    return data.data;
  });
};
