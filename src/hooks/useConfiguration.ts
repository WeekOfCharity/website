import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Configuration = {
    id: number;
    twitch_embed: boolean;
};

export const useConfiguration = () => {
    return useQuery(['configuration'], async () => {
        const { data } = await axios.get<{ data: Configuration; }>((process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/configuration');
        return data.data;
    });
};
