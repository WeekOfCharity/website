import { useState } from "react";
import "./ButtonGroup.scss";
import cn from "classnames";

type ButtonGroupProps = {
  buttons?: string[];
  defaultIndex?: number;
  doSomethingAfterClick?: (id: number) => void;
};

export const ButtonGroup = ({
  buttons = [],
  defaultIndex = 0,
  doSomethingAfterClick,
}: ButtonGroupProps) => {
  const [clickedId, setClickedId] = useState(defaultIndex);

  const handleClick = (id: number) => {
    setClickedId(id);
    doSomethingAfterClick?.(id);
  };

  return (
    <div className="border-2 border-mint-800 bg-mint-800 overflow-hidden rounded-lg">
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={() => handleClick(i)}
          className={cn(
            "font-medium text-lg py-3 px-5 transition-colors duration-300",
            {
              "bg-mint-800 text-mint-100": i === clickedId,
              "bg-mint-100 hover:bg-mint-300 active:bg-mint-400 text-mint-900":
                i !== clickedId,
            }
          )}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};
