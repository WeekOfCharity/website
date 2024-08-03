import { MutableRefObject, ReactNode, useEffect, useRef } from "react";

function useOutsideAlerter(
  onClick: () => void,
  ref: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        ref.current.dataset.oaActive === "true" &&
        !ref.current.contains(event.target as unknown as Node)
      ) {
        event.stopPropagation();
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick, ref]);
}

type OutsideAlerterProps = {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
};

export const OutsideAlerter = ({
  active,
  children,
  onClick,
}: OutsideAlerterProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideAlerter(onClick, wrapperRef);

  return (
    <div className="contents" data-oa-active={active} ref={wrapperRef}>
      {children}
    </div>
  );
};
