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
    <div className='flex flex-col items-center justify-center mb-5'>
        <a className='mb-4 cursor-pointer' target="_blank" href={link}>
            {name}
        </a>
        <a className='cursor-pointer' target="_blank" href={link}>
            <img className='w-max' src={coverUrl.toString()} />
        </a>
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

MusicRelease.Loading = Loading;
