import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useMemo } from "react";

export type Configuration = {
  id: number;
  twitch_embed: boolean;
  woc_start: string | null;
  schedule_complete: boolean;
  trailer_youtube_id: string | null;
};

export const useConfigurationOriginal = () => {
  return useQuery(["configuration"], async () => {
    const { data } = await axios.get<{ data: Configuration }>(
      `${BASE_URL}/items/configuration`
    );
    return data.data;
  });
};

export const useMockedConfiguration = () => {
  return useMemo(
    () => ({
      data: {
        id: 1,
        twitch_embed: true,
        woc_start: "2025-08-24T24:00:00",
        schedule_complete: true,
        trailer_youtube_id: null,
      } satisfies Configuration,
      status: "success",
    }),
    []
  );
};

export const useConfiguration = useConfigurationOriginal;
