import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type BidwarResults = {
  results: {
    id: number;
    status: "active" | "inactive" | "results";
    bidwar_name: string;
    bidwar_description: string;
    options: object;
  }[];
  id: number;
};

export const useBidwarResults = () => {
  return useQuery(["bidwar_results"], async () => {
    const { data } = await axios.get<{ data: BidwarResults }>(
      import.meta.env.VITE_BASE_URL + "/items/bidwar_results"
    );
    return data.data;
  });
};
