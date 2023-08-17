import classNames from 'classnames';
import { useEffect, useState } from 'react';
import tailwind from '../../tailwind.config.js';
import { useDonationGoals } from '../hooks/useDonationGoals';
import { useDonations } from '../hooks/useDonations';
import { getDocumentTitle } from '../utils/getDocumentTitle';
import './GoalWidget.scss';


export const GoalWidget = () => {

  document.title = getDocumentTitle('GoalWidget');

  const [currentDonation, setCurrentDonation] = useState<number | undefined>(0);
  const [nextDonationGoal, setNextDonationGoal] = useState<number | undefined>(undefined);

  const { data: donations, status: donationsStatus } = useDonations();
  const { data: donationGoals, status: donationGoalsStatus } = useDonationGoals();

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

    setNextDonationGoal(donationGoals.length >= lastIndex + 2 ? donationGoals[lastIndex + 1].reached_at : undefined);
  }, [donations, donationGoals]);

  return (
      <div className="widgetWrapper">
      {nextDonationGoal && (
          <>
            <div>{nextDonationGoal}</div>
          </>
        )}
      <div className="donationMeter">uwu</div>
    </div>
    
  );
};