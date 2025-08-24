declare namespace React {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // extends React's HTMLAttributes
    inert?: string;
  }
  interface CSSProperties {
    "--goalProgress"?: `${number}%` | undefined;
    "--max-scroll-y"?: `${number}px` | `-${number}px` | undefined;
    "--icon-size"?: `${number}px` | undefined;
    [varName: `--${string}`]: string | number | undefined;
  }
}
