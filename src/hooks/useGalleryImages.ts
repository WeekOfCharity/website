import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type GalleryImage = {
    description: string | null;
    image: string;
    id: number;
    author: string | null;
    author_link: string | null;
};

export const useGalleryImages = () => {
    return useQuery(['gallery_images'], async () => {
        const { data } = await axios.get<{ data: GalleryImage[]; }>(
            (process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + '/items/gallery_images');
        return data.data;
    });
};

