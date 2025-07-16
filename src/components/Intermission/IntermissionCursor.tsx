import cn from "classnames";

import cursorClicked from "../../assets/intermission/cursor-clicked.png";
import cursorDefault from "../../assets/intermission/cursor.png";
import { ForwardedRef, forwardRef } from "react";

import "./IntermissionCursor.scss";

type IntermissionCursorProps = {
  className?: string;
};

export const IntermissionCursor = forwardRef(
  (
    { className }: IntermissionCursorProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn(
          "intermission-cursor absolute pointer-events-none transition-[left,top] duration-1000",
          className
        )}
        style={{ left: -64, top: 1000 }}
        ref={ref}
      >
        <img alt="" src={cursorClicked} />
        <img alt="" src={cursorDefault} />
      </div>
    );
  }
);

IntermissionCursor.displayName = "IntermissionCursor";
