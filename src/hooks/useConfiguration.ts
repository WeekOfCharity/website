import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Configuration = {
  id: number;
  twitch_embed: boolean;
  woc_start: string;
  schedule_complete: boolean;
};

export const useConfiguration = () => {
  return useQuery(["configuration"], async () => {
    const { data } = await axios.get<{ data: Configuration }>(
      process.env.BASE_URL + "/items/configuration"
    );
    return data.data;
  });
};
