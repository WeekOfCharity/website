import alertChesster1 from "../../assets/layout25/Alert_Chesster_1.png";
import alertChesster2 from "../../assets/layout25/Alert_Chesster_2.png";
import alertChesster3 from "../../assets/layout25/Alert_Chesster_3.png";
import alertChesster4 from "../../assets/layout25/Alert_Chesster_4.png";
import alertChesster5 from "../../assets/layout25/Alert_Chesster_5.png";

export const getAlertChessterIconFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500)
    return alertChesster1;
  if (donated_amount_in_cents < 1000) return alertChesster2;
  if (donated_amount_in_cents < 2000) return alertChesster3;
  if (donated_amount_in_cents < 5000) return alertChesster4;
  return alertChesster5;
};
