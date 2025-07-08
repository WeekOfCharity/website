import { RefObject } from "react";

type MoveOptions = {
  x?: number;
  y?: number;
  duration?: number;
};

export const moveTo = async (
  element: RefObject<HTMLElement>,
  { x, y, duration = 1000 }: MoveOptions
) => {
  if (!element.current) return;
  element.current.style.transitionDuration = `${duration}ms`;
  if (typeof x === "number") element.current.style.left = `${x}px`;
  if (typeof y === "number") element.current.style.top = `${y}px`;

  return new Promise<void>((resolve) => setTimeout(resolve, duration));
};

type TeleportOptions = {
  x?: number;
  y?: number;
};

export const teleportTo = async (
  element: RefObject<HTMLElement>,
  { x, y }: TeleportOptions
) => {
  if (!element.current) return;
  element.current.style.transition = "none";
  if (typeof x === "number") element.current.style.left = `${x}px`;
  if (typeof y === "number") element.current.style.top = `${y}px`;

  return new Promise<void>((resolve) =>
    setTimeout(() => {
      if (element.current) element.current.style.transition = "";
      resolve();
    }, 100)
  );
};

type ClickOptions = {
  duration?: number;
};

export const cursorClick = async (
  element: RefObject<HTMLElement>,
  { duration = 200 }: ClickOptions = {}
) => {
  if (!element.current) return;
  element.current.classList.add("clicked");

  return new Promise<void>((resolve) =>
    setTimeout(() => {
      element.current?.classList.remove("clicked");
      resolve();
    }, duration)
  );
};

export const wait = async (duration: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, duration));
};
