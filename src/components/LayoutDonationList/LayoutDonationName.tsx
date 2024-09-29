import cn from "classnames";
import { useEffect, useRef, useState } from "react";

export type LayoutDonationNameProps = {
  name: string | null;
  animate: boolean;
  isEn: boolean;
};

export const LayoutDonationName = ({
  name,
  animate,
  isEn,
}: LayoutDonationNameProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleName, setVisibleName] = useState({ name: "" });
  const animationIntervalId = useRef<ReturnType<typeof setInterval>>();
  const animationTimeoutId = useRef<ReturnType<typeof setInterval>>();

  const formattedName = name || (isEn ? "Anonymous" : "Anonym");

  useEffect(() => {
    if (animate) {
      setVisibleName({ name: "" });
    } else {
      setVisibleName({ name: formattedName });
    }
    setIsAnimating(animate);
  }, [animate, formattedName, isEn]);

  useEffect(() => {
    if (isAnimating) {
      animationIntervalId.current = setInterval(() => {
        if (visibleName.name === formattedName) {
          animationTimeoutId.current = setTimeout(
            () => setIsAnimating(false),
            (4 - (formattedName.length % 4)) * 250
          );
        } else
          setVisibleName((prev) => {
            if (!formattedName.startsWith(prev.name)) return { name: "" };
            return { name: prev.name + formattedName[prev.name.length] };
          });
      }, 249);
    }

    return () => {
      clearInterval(animationIntervalId.current);
      clearTimeout(animationTimeoutId.current);
    };
  }, [isAnimating, formattedName, visibleName]);

  return (
    <div
      className={cn(
        "flex items-center border-current pl-2 h-5 max-w-[234px] overflow-x-clip pt-1.5 tracking-[-0.06em]",
        {
          "animate-blink": isAnimating,
        }
      )}
    >
      {visibleName.name}
    </div>
  );
};
