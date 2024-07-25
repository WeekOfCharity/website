import classNames from "classnames";
import { useContext, useState } from "react";
import { SetGameStateContext } from "../GameStateProvider/GameStateProvider";

const chibiChesster = new URL(
  "../../../assets/chibi-chesster.webp",
  import.meta.url
);

type ChibiChessterProps = {
  inert?: "true" | "false";
  onClick?: () => void;
  className?: string;
};

export const ChibiChesster = ({
  inert,
  onClick,
  className,
}: ChibiChessterProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const setGameState = useContext(SetGameStateContext);

  const handleClick = () => {
    setIsClicked(true);
    setGameState((prev) => ({
      ...prev,
      found: prev.found + 1,
      firstDialogOpen: true,
    }));
    onClick?.();
  };

  return (
    <button
      className={classNames(
        "absolute pointer-events-auto p-4 box-content",
        className
      )}
      tabIndex={-1}
      inert={inert}
      onClick={handleClick}
      disabled={isClicked}
    >
      <img
        className={classNames({
          "-translate-y-14 opacity-0 transition-[transform,opacity] duration-500":
            isClicked,
        })}
        src={chibiChesster.toString()}
      />
    </button>
  );
};

ChibiChesster.displayName = "ChibiChesster";
