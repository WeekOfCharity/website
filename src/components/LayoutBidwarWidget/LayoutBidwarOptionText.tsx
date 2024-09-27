import { useEffect, useRef, useState } from "react";

type LayoutBidwarOptionTextProps = {
  maxWidth: number;
  text: string;
};

export const LayoutBidwarOptionText = ({
  maxWidth,
  text,
}: LayoutBidwarOptionTextProps) => {
  const [styles, setStyles] = useState<React.CSSProperties>();
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;
    const difference = spanRef.current.getBoundingClientRect().width - maxWidth;
    if (difference + 12 <= 0) return;
    setStyles({
      "--max-scroll-x": `-${difference + 12}px`,
    } as React.CSSProperties);
  }, [maxWidth, text]);

  return (
    <span
      ref={spanRef}
      className="inline-block animate-scrollX whitespace-nowrap"
      style={styles}
    >
      {text}
    </span>
  );
};
