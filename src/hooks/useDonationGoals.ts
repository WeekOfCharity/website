import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stream } from "./useStreams";

export type DonationGoal = {
  timeslot: Stream | null;
  description: string | null;
  hidden: boolean | null;
  id: number;
  name: string;
  reached_at: number;
};

export const useDonationGoals = () => {
  return useQuery(["donation_goals"], async () => {
    const { data } = await axios.get<{ data: DonationGoal[] }>(
      process.env.BASE_URL +
        "/items/donation_goals?fields=*,timeslot.*,timeslot.activity.icon,timeslot.activity.id,timeslot.activity.name,timeslot.streamer.icon,timeslot.streamer.id,timeslot.streamer.name&sort=reached_at"
    );
    return data.data;
  });
};
