import alertSound1 from "../../assets/layout/donation_alert/alert_1.mp3";
import alertSound2 from "../../assets/layout/donation_alert/alert_2.mp3";
import alertSound3 from "../../assets/layout/donation_alert/alert_3.mp3";
import alertSound4 from "../../assets/layout/donation_alert/alert_4.mp3";
import alertSound5 from "../../assets/layout/donation_alert/alert_5.mp3";

export const getAlertLengthFromDonationAmount = (
  donated_amount_in_cents: number | null | undefined
) => {
  if (!donated_amount_in_cents || donated_amount_in_cents < 500) return 10000;
  if (donated_amount_in_cents < 1000) return 10000;
  if (donated_amount_in_cents < 2000) return 10000;
  if (donated_amount_in_cents < 5000) return 12000;
  return 13000;
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
