import cn from "classnames";
import { useEffect, useRef, useState } from "react";

export type LayoutDonationNameProps = {
  name: string;
  animate: boolean;
};

export const LayoutDonationName = ({
  name,
  animate,
}: LayoutDonationNameProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleName, setVisibleName] = useState({ name: "" });
  const animationIntervalId = useRef<ReturnType<typeof setInterval>>();
  const animationTimeoutId = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (animate) {
      setVisibleName({ name: "" });
    } else {
      setVisibleName({ name });
    }
    setIsAnimating(animate);
  }, [animate, name]);

  useEffect(() => {
    if (isAnimating) {
      animationIntervalId.current = setInterval(() => {
        console.log("Update", name);
        if (visibleName.name === name) {
          animationTimeoutId.current = setTimeout(
            () => setIsAnimating(false),
            (4 - (name.length % 4)) * 250
          );
        } else
          setVisibleName((prev) => {
            if (!name.startsWith(prev.name)) return { name: "" };
            return { name: prev.name + name[prev.name.length] };
          });
      }, 249);
    }

    return () => {
      clearInterval(animationIntervalId.current);
      clearTimeout(animationTimeoutId.current);
    };
  }, [isAnimating, name, visibleName]);

  return (
    <div
      className={cn(
        "flex items-center border-current pl-2 h-5 max-w-[234px] overflow-x-clip",
        {
          "animate-blink": isAnimating,
        }
      )}
    >
      {visibleName.name}
    </div>
  );
};
