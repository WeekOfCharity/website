import classNames from "classnames";
import { ReactNode } from "react";
import "./BrushLink.scss";

export const BrushLink = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={classNames("inline-block relative woc-brush-link", className)}
    >
      {children}
    </div>
  );
};
