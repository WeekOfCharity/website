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
    if (difference + 8 <= 0) return;
    setStyles({
      "--max-scroll-x": `-${difference + 14}px`,
    } as React.CSSProperties);
  }, [maxWidth, text]);

  return (
    <span
      ref={spanRef}
      className="inline-block animate-scrollX whitespace-nowrap tracking-[-0.06em]"
      style={styles}
    >
      {text}
    </span>
  );
};
