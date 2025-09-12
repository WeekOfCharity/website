import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export type ExternalDonationTotal = {
  donated_amount_in_cents: number;
  id: number;
};

export const useExternalDonationTotal = () => {
  return useQuery(["donation_total_test"], async () => {
    const { data } = await axios.get<{ data: ExternalDonationTotal }>(
      `${BASE_URL}/items/donation_total_test`
    );
    return data.data;
  });
};
