import "@fontsource/ubuntu"; // Defaults to weight 400
import "@fontsource/ubuntu/400-italic.css";
import "@fontsource/ubuntu/400.css"; // Specify weight
import { useEffect, useState } from 'react';
import { useDonationGoals } from '../hooks/useDonationGoals';
import { useExternalDonationTotal } from '../hooks/useExternalDonationTotal';
import { getDocumentTitle } from '../utils/getDocumentTitle';
import './GoalWidget.scss';

const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export const GoalWidget = () => {

  document.title = getDocumentTitle('GoalWidget');

  const [currentDonation, setCurrentDonation] = useState<number | undefined>(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number | undefined>(undefined);
  const [nextDonationGoalText, setNextDonationGoalText] = useState<string | undefined>(undefined);

  const { data: donations, status: donationsStatus, refetch: refetchDonations } = useExternalDonationTotal();
  const { data: donationGoals, status: donationGoalsStatus, refetch: refetchDonationGoals } = useDonationGoals();

  useEffect(() => {
    if (!donations || !donationGoals) return;

    const current = donations.donated_amount_in_cents / 100;
    setCurrentDonation(current);

    let lastIndex = -1;
    donationGoals.forEach((goal, index) => {
      if (goal.reached_at <= current) {
        lastIndex = index;
      }
    });

    setNextDonationGoal(donationGoals.length > lastIndex + 1 ? donationGoals[lastIndex + 1].reached_at : undefined);
    setNextDonationGoalText(donationGoals.length > lastIndex + 1 ? donationGoals[lastIndex + 1].name : undefined);
  }, [donations, donationGoals]);

  useEffect(() => {
    const id = setInterval(() => {
      refetchDonations();
    }, 5000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      refetchDonationGoals();
    }, 60000);

    return () => clearInterval(id);
  }, []);

  return (
        <div className="widgetWrapper">
          {nextDonationGoal && (
            <>
              <div className="donationNameWrapper">
                <div className="donationName">
                  {nextDonationGoalText}
                </ div>  
              </ div>  
              <div className="donationBox">
                <div className="donationBoxText">
                  {formatter.format(currentDonation)} von {nextDonationGoal} €
                </ div>
                <div
                  className="donationFill"
                  style={{
                    backgroundColor: '#7F91E6',
                    backgroundSize: '200% 100%',
                    width: `${(currentDonation / nextDonationGoal)*100}%`,
                    height: '100%',
                    position: 'absolute',
                }}></ div>
              </ div>
            </>
          )}
          {donationsStatus === "success" && donationGoalsStatus === "success" && !nextDonationGoal && (
            <>
              <div className="donationNameWrapper">
                <div className='successMessage'>
                  {donationGoals.length > 0 ? "Alle Goals wurden erreicht!" : "Es gibt aktuell keine Goals!"}
                </div>
              </div>
            </>
          )}
        </ div>
  );
};
