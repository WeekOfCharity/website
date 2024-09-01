import { toTimeString } from "../../utils/dateAndTime";

export const AudioDuration = ({ seconds }: { seconds: number }) => {
  return (
    <time dateTime={`P${Math.round(seconds)}S`}>{toTimeString(seconds)}</time>
  );
};
