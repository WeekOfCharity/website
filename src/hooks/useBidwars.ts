import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream } from "./useStreams";

export type Bidwars = {
  bidwar_name: string;
  bidwar_description: string | null;
  id: number;
  status: "active" | "inactive" | "results";
  timeslot: Stream | null;
};

export const useBidwars = () => {
  return useQuery(["bidwars"], async () => {
    const { data } = await axios.get<{ data: Bidwars[] }>(
      process.env.BASE_URL +
        "/items/bidwars?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name"
    );
    return data.data;
  });
};
