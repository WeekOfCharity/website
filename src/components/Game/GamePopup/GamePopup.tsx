import { useContext, useEffect, useRef, useState } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import classNames from "classnames";

const chibiChessterLarge = new URL(
  "../../../assets/chibi-chesster-large.webp",
  import.meta.url
);

type GamePopupProps = {
  className?: string;
};

export const GamePopup = ({ className }: GamePopupProps) => {
  const [isOpen, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const gameState = useContext(GameStateContext);

  useEffect(() => {
    setOpen(gameState.firstDialogOpen);
  }, [gameState.firstDialogOpen]);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <dialog
      ref={dialogRef}
      open={isOpen}
      className={classNames(
        "fixed inset-0 p-10 border-2 border-green23-900 rounded-xl",
        className
      )}
    >
      <p>I am a dialog!</p>
      <img className="w-20" src={chibiChessterLarge.toString()} />
      <button onClick={closeDialog}>close</button>
    </dialog>
  );
};

GamePopup.displayName = "GamePopup";
