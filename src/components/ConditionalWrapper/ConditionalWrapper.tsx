import { PropsWithChildren, ReactNode } from "react";

export type ConditionalWrapperProps = PropsWithChildren & {
  condition: boolean;
  wrapper: (children: ReactNode) => JSX.Element;
};

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);
