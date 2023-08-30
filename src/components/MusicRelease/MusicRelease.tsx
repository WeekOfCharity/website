import classNames from 'classnames';
import { Shimmer } from '../Shimmer/Shimmer';

type MusicReleaseProps = {
  year: number;
  name: string;
  coverUrl: string;
  link: string;
};

export const MusicRelease = ({ year, name, coverUrl, link}: MusicReleaseProps) => {
  return (
    <div>
        {name}
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

MusicRelease.Loading = Loading;
