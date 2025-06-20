import cn from "classnames";
import { useEffect, useState } from "react";

type IntermissionClockProps = {
  className?: string;
};

const UPDATE_RATE = 1000;

const options: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Berlin",
};

const formatter = new Intl.DateTimeFormat("de-DE", options);

export const IntermissionClock = ({ className }: IntermissionClockProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(formatter.format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, UPDATE_RATE);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={cn("text-[26px] [text-shadow:_3px_4px_#150477]", className)}
    >
      {time}
    </span>
  );
};
