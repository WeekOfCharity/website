import { useState } from "react";
import './ButtonGroup.scss';

export const ButtonGroup = ({ buttons, defaultIndex = 0, doSomethingAfterClick = (event, id) => {} }) => {
  const [clickedId, setClickedId] = useState(defaultIndex);

  const handleClick = (event, id) => {
    setClickedId(id);
    doSomethingAfterClick(event, id);
  };

  return (
    <div className="border-2 border-green23-800 bg-green23-800 overflow-hidden rounded-lg">
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={"font-medium text-lg py-3 px-5 duration-200 bg-green23-100" + (i === clickedId ? " bg-green23-800 text-green23-100" : " hover:bg-green23-300 active:bg-green23-400 text-green23-900")}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};
