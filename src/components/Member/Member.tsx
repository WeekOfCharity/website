import classNames from 'classnames';
import { Shimmer } from '../Shimmer/Shimmer';

type MemberProps = {
  avatarUrl: string;
  condensed?: boolean;
  name: string;
  onClick?: () => void;
  pronouns?: string;
};

export const Member = ({ avatarUrl, condensed = false, name, onClick, pronouns = '' }: MemberProps) => {
  return (
    <div
      className={classNames('aspect-square cursor-pointer flex flex-col overflow-hidden relative rounded-md select-none', {
        'bg-blue23-500 group': !condensed,
        'bg-blue23-500 h-20 w-20': condensed,
      })}
      onClick={onClick}
    >
      <div
        className="bg-center bg-cover duration-300 flex-grow group-hover:mb-8 rounded-md group-hover:rounded-b-none transition-all"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      >
        <div
          className={classNames('bg-gradient-to-b duration-300 flex flex-col h-full rounded-md group-hover:rounded-b-none transition-all w-full', {
            'from-transparent via-blue23-500/10 to-blue23-900/90': !condensed,
            'from-transparent to-blue23-900/90': condensed,
          })}
        >
          <div
            className={classNames('font-pally font-bold leading-none -rotate-3 -skew-x-3 text-white text-center text-xl tracking-wide', {
              'mb-3 mt-auto': !condensed,
              'my-auto': condensed,
            })}
            style={{ textShadow: '0 0 10px #00000080, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000' }}
          >
            {pronouns && (
              <>
                <span className="text-sm">{pronouns}</span>
                <br />
              </>
            )}
            <span>{name}</span>
          </div>
        </div>
      </div>

      <div className="absolute bg-blue23-500 bottom-0 duration-300 font-round2 font-semibold h-8 p-1 rounded-b text-white text-center transition-all translate-y-full group-hover:translate-y-0 w-full">
        Details ansehen
      </div>
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

Member.Loading = Loading;
