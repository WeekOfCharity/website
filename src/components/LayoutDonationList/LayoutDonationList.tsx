import cn from "classnames";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import { Donation } from "../../hooks/useDonations";
import { useEffect, useRef, useState } from "react";
import { LayoutDonationName } from "./LayoutDonationName";

export type LayoutDonationListProps = {
  headline: string;
  donations: Donation[] | undefined;
  isDay: boolean;
  isEn: boolean;
  className?: string;
  listClassName?: string;
};

export const LayoutDonationList = ({
  headline,
  donations = [],
  isDay,
  isEn,
  className,
  listClassName,
}: LayoutDonationListProps) => {
  const [newDonationIds, setNewDonationIds] = useState<number[]>([]);
  const [newAnimationRunning, setNewAnimationRunning] = useState(false);
  const previousDonationIds = useRef<number[]>([]);

  useEffect(() => {
    const updatedDonationIds = donations.map((donation) => donation.id);
    const newDonationIds = updatedDonationIds.filter(
      (id) => !previousDonationIds.current.includes(id)
    );
    if (newDonationIds.length > 0) {
      setNewDonationIds(newDonationIds);
      setNewAnimationRunning(true);
    }
    previousDonationIds.current = donations.map((donation) => donation.id);
  }, [donations]);

  useEffect(() => {}, [newAnimationRunning, newDonationIds]);

  return (
    <div className={className}>
      <h2 className={cn("mb-[16px] px-5")}>{headline}</h2>
      <ul
        className={cn("flex flex-col gap-1 pl-8 pr-2 text-base", listClassName)}
      >
        {donations?.map((donation) => (
          <li key={donation.id} className="flex justify-between">
            <LayoutDonationName
              name={donation.donator_name}
              animate={newDonationIds.includes(donation.id)}
              isEn={isEn}
            />
            <LayoutMoneyText
              amount={
                donation.donated_amount_in_cents !== null
                  ? donation.donated_amount_in_cents / 100
                  : null
              }
              isDay={isDay}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
