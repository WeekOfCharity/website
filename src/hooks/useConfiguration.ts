import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Configuration = {
    id: number;
    twitch_embed: boolean;
    woc_start: string;
    gallery_enabled: boolean;
    schedule_complete: boolean;
};

export const useConfiguration = () => {
    return useQuery(['configuration'], async () => {
        const { data } = await axios.get<{ data: Configuration; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/configuration');
        return data.data;
    });
};
