import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export type Donation = {
  id: number;
  donated_amount_in_cents: number;
  donator_name: string;
  donation_comment: string;
};

export enum DonationSorting {
  HIGHEST = "-donated_amount_in_cents",
  NEWEST = "-date_created",
}

export const useDonations = (sorting?: DonationSorting) => {
  return useQuery(["donations", sorting], async () => {
    const { data } = await axios.get<{ data: Donation[] }>(
      `${BASE_URL}/items/donations?fields=id,donated_amount_in_cents,donator_name,donation_comment&limit=3${sorting ? `&sort=${sorting}` : ""}`
    );
    return data.data;
  });
};
