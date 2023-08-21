import { Shimmer } from '../Shimmer/Shimmer';

type ActivityProps = {
  gameImageUrl: string;
  name: string;
  onClick?: () => void;
};

export const Activity = ({ gameImageUrl, name, onClick }: ActivityProps) => {
  return (
    <div className="aspect-square bg-pink23-500 cursor-pointer flex flex-col group overflow-hidden relative rounded-md select-none" onClick={onClick}>
      <div
        className="bg-center bg-cover duration-300 flex-grow group-hover:mb-8 rounded-md group-hover:rounded-b-none transition-all"
        style={{ backgroundImage: `url("${gameImageUrl}")` }}
      >
        <div className="bg-gradient-to-b duration-300 flex flex-col from-transparent via-lavender-500/10 to-lavender-900/70 h-full rounded-md group-hover:rounded-b-none transition-all w-full">
          <div
            className="font-pally font-bold leading-none mb-3 mt-auto -rotate-3 -skew-x-3 text-white text-center text-xl tracking-wide"
            style={{ textShadow: '0 0 10px #00000080, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000' }}
          >
            <span className="px-1">{name}</span>
          </div>
        </div>
      </div>

      <div className="absolute bg-pink23-500 bottom-0 duration-300 font-round2 font-semibold h-8 p-1 rounded-b text-white text-center transition-all translate-y-full group-hover:translate-y-0 w-full">
        Details ansehen
      </div>
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

Activity.Loading = Loading;
