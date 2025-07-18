import cn from "classnames";
import { useEffect, useState } from "react";
import { germanTimeFormatter } from "../../utils/dateAndTime";

type IntermissionClockProps = {
  className?: string;
};

const UPDATE_RATE = 1000;

export const IntermissionClock = ({ className }: IntermissionClockProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(germanTimeFormatter.format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, UPDATE_RATE);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col items-center w-[90px] custom-text-shadow-dark",
        className
      )}
    >
      <div className="text-[22px]">{time}</div>
      <div className="text-[16px]/5 pb-0.5">UTC+2</div>
    </div>
  );
};
