import alertSound1 from "../../assets/layout25/donation_alert/woc25_donation_alert_1.mp3";
import alertSound2 from "../../assets/layout25/donation_alert/woc25_donation_alert_2.mp3";
import alertSound3 from "../../assets/layout25/donation_alert/woc25_donation_alert_3.mp3";
import alertSound4 from "../../assets/layout25/donation_alert/woc25_donation_alert_4.mp3";
import alertSound5 from "../../assets/layout25/donation_alert/woc25_donation_alert_5.mp3";

export const getAlertLengthFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500) return 8000;
  if (donated_amount_in_cents < 1000) return 8000;
  if (donated_amount_in_cents < 2000) return 8000;
  if (donated_amount_in_cents < 5000) return 8000;
  return 10000;
};

export const getAlertSoundFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500)
    return alertSound1;
  if (donated_amount_in_cents < 1000) return alertSound2;
  if (donated_amount_in_cents < 2000) return alertSound3;
  if (donated_amount_in_cents < 5000) return alertSound4;
  return alertSound5;
};

export const playSound = (
  donated_amount_in_cents: number | null | undefined
) => {
  const audioUrl = getAlertSoundFromDonationAmount(donated_amount_in_cents);
  const audio = new Audio(audioUrl);
  void audio.play();
};
