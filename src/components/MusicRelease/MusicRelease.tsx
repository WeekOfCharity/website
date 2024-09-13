import { Shimmer } from "../Shimmer/Shimmer";

type MusicReleaseProps = {
  year: number;
  name: string;
  coverUrl: string;
  link: string;
};

export const MusicRelease = ({ name, coverUrl, link }: MusicReleaseProps) => {
  return (
    <a
      className="group flex flex-col items-center justify-center mb-5 gap-4"
      rel="noreferrer nofollow"
      href={link}
      target="_blank"
    >
      <span>{name}</span>
      <div className="overflow-hidden max-w-[512px] max-h-[512px]">
        <img
          className="w-max group-hover:scale-[1.03] group-hover:opacity-85 group-focus-visible:opacity-85 group-focus-visible:scale-[1.03] transition-[transform,opacity] duration-300"
          height={512}
          width={512}
          src={coverUrl.toString()}
          alt=""
        />
      </div>
    </a>
  );
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-5 gap-4">
      <Shimmer className="w-52 h-8" />
      <Shimmer className="aspect-square rounded-md max-w-[512px] max-h-[512px]" />
    </div>
  );
};

MusicRelease.Loading = Loading;
