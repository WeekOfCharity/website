import { Shimmer } from "../Shimmer/Shimmer";

type MusicReleaseProps = {
  year: number;
  name: string;
  coverUrl: string;
  link: string;
};

export const MusicRelease = ({ name, coverUrl, link }: MusicReleaseProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <a
        className="mb-4 cursor-pointer"
        target="_blank"
        href={link}
        rel="noreferrer"
      >
        {name}
      </a>
      <a
        className="cursor-pointer"
        target="_blank"
        href={link}
        rel="noreferrer"
      >
        <img className="w-max" src={coverUrl.toString()} />
      </a>
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

MusicRelease.Loading = Loading;
