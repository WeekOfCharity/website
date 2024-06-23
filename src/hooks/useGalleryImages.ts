import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type GalleryImage = {
  description: string | null;
  image: string;
  id: number;
  author: string | null;
  author_link: string | null;
  year: number;
  category: string;
};

export const useGalleryImages = () => {
  return useQuery(["gallery_images"], async () => {
    const { data } = await axios.get<{ data: GalleryImage[] }>(
      process.env.BASE_URL + "/items/gallery_images"
    );
    return data.data;
  });
};
