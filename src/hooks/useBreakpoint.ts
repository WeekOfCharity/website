import { useEffect, useState } from "react";

export enum Breakpoint {
  sm = 0,
  md = 768,
  lg = 1024,
  xl = 1280,
  xxl = 1536,
}

const getBreakPoint = (windowWidth: number): Breakpoint => {
  if (windowWidth >= Breakpoint.xxl.valueOf()) return Breakpoint.xxl;
  if (windowWidth >= Breakpoint.xxl.valueOf()) return Breakpoint.xl;
  if (windowWidth >= Breakpoint.xxl.valueOf()) return Breakpoint.lg;
  if (windowWidth >= Breakpoint.xxl.valueOf()) return Breakpoint.md;
  return Breakpoint.sm;
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.sm);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resizeListener = () => {
        setBreakpoint(getBreakPoint(window.innerWidth));
      };

      resizeListener();

      window.addEventListener("resize", resizeListener, { passive: true });

      return () => {
        window.removeEventListener("resize", resizeListener);
      };
    }
  }, [breakpoint]);
  return breakpoint;
};
