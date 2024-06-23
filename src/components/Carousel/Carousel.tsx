import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";
import React, { CSSProperties, ReactNode, useState } from "react";
import { Breakpoint, useBreakpoint } from "../../hooks/useBreakpoint";

type CarouselProps = {
  children: ReactNode;
};

export const Carousel = ({ children }: CarouselProps) => {
  const breakpoint = useBreakpoint();

  const [currentItem, setCurrentItem] = useState(0);

  const itemCount = React.Children.count(children);
  const itemsPerPage =
    breakpoint === Breakpoint.xxl || breakpoint === null
      ? 4
      : breakpoint === Breakpoint.xl
      ? 2
      : 1;

  const canSlideLeft = currentItem > 0;
  const canSlideRight = currentItem < itemCount - itemsPerPage;

  const itemStyle: CSSProperties = {
    width: `calc(${100 / itemsPerPage}% - 1.25rem)`,
  };

  const slideLeft = () =>
    setCurrentItem(Math.max(currentItem - itemsPerPage, 0));
  const slideRight = () =>
    setCurrentItem(
      Math.min(currentItem + itemsPerPage, itemCount - itemsPerPage)
    );

  return (
    <div className="mx-4 md:mx-40 relative">
      {children && (
        <div
          className="duration-300 flex gap-5 max-w-screen-2xl mx-auto overflow-x-visible transition-all"
          style={{
            transform: `translate3d(calc((${
              currentItem * (100 / itemsPerPage)
            }% - 0.625rem) * -1), 0, 0)`,
          }}
        >
          {React.Children.map(children, (child) => (
            <div className="flex-shrink-0" style={itemStyle}>
              {child}
            </div>
          ))}
        </div>
      )}

      {canSlideLeft && (
        <button
          className="absolute backdrop-blur bg-white bg-opacity-75 hover:bg-opacity-100 -left-4 md:-left-40 px-2 py-6 top-1/2 transition-all -translate-y-1/2"
          onClick={() => slideLeft()}
        >
          <Icon path={mdiArrowLeft} size="2rem" />
        </button>
      )}

      {canSlideRight && (
        <button
          className="absolute backdrop-blur bg-white bg-opacity-75 hover:bg-opacity-100 px-2 py-6 -right-4 md:-right-40  top-1/2 transition-all -translate-y-1/2"
          onClick={() => slideRight()}
        >
          <Icon path={mdiArrowRight} size="2rem" />
        </button>
      )}
    </div>
  );
};
