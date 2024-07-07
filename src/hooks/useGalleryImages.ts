import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";

export type GalleryImage = {
  description: string | null;
  image: string;
  id: number;
  author: string | null;
  author_link: string | null;
  year: number;
  category: string;
};

type GalleryImageWithAlternatives = GalleryImage & {
  description_en: string | null;
};

export const useGalleryImages = (lang: Language) => {
  const rawQueryResult = useQuery(["gallery_images"], async () => {
    const { data } = await axios.get<{ data: GalleryImageWithAlternatives[] }>(
      process.env.BASE_URL + "/items/gallery_images"
    );
    return data.data;
  });

  if (!rawQueryResult.data) return rawQueryResult;

  const translatedData: GalleryImage[] = [];
  for (const dataEntry of rawQueryResult.data) {
    const { description_en, description, ...rest } = dataEntry;
    translatedData.push({
      ...rest,
      description:
        lang === Language.DE || !description_en ? description : description_en,
    });
  }
  return { ...rawQueryResult, data: translatedData };
};
