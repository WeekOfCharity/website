import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Language } from "../i18n/i18n";
import { useMemo } from "react";

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
      import.meta.env.VITE_BASE_URL + "/items/gallery_images"
    );
    return data.data;
  });

  const translatedData = useMemo(() => {
    if (!rawQueryResult.data) return undefined;
    return rawQueryResult.data.map((dataEntry) => {
      const { description_en, description, ...rest } = dataEntry;
      return {
        ...rest,
        description:
          lang === Language.DE || !description_en
            ? description
            : description_en,
      } as GalleryImage;
    });
  }, [lang, rawQueryResult.data]);

  return { ...rawQueryResult, data: translatedData };
};
