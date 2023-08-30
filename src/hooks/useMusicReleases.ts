import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type MusicRelease = {
    name: string;
    link: string;
    cover_art: string;
    year: number;
    id: number;
};

export const useMusicReleases = () => {
    return useQuery(['music_releases'], async () => {
        const { data } = await axios.get<{ data: MusicRelease[]; }>(
            (process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/music_releases?sort=-year');
        return data.data;
    });
};
