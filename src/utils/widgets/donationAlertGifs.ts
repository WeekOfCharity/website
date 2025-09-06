import alertGif1 from "../../assets/layout/donation_alert/Chesster_Animation_01.gif";
import alertGif2 from "../../assets/layout/donation_alert/Chesster_Animation_02.gif";
import alertGif3 from "../../assets/layout/donation_alert/Chesster_Animation_03.gif";
import alertGif4 from "../../assets/layout/donation_alert/Chesster_Animation_04.gif";
import alertGif5 from "../../assets/layout/donation_alert/Chesster_Animation_05.gif";
import { preloadImages } from "./preloadImage";

export const preloadDonationGifs = async () => {
  await preloadImages([alertGif1, alertGif2, alertGif3, alertGif4, alertGif5]);
};

export const getAlertGifFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500)
    return alertGif1;
  if (donated_amount_in_cents < 1000) return alertGif2;
  if (donated_amount_in_cents < 2000) return alertGif3;
  if (donated_amount_in_cents < 5000) return alertGif4;
  return alertGif5;
};
