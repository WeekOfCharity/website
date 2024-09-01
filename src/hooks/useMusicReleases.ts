import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export type MusicRelease = {
  name: string;
  link: string;
  cover_art: string;
  year: number;
  id: number;
};

export const useMusicReleases = () => {
  return useQuery(["music_releases"], async () => {
    const { data } = await axios.get<{ data: MusicRelease[] }>(
      `${BASE_URL}/items/music_releases?sort=-year`
    );
    return data.data;
  });
};
