type MemberProps = {
  avatarUrl: string;
  name: string;
  onClick?: () => void;
  pronouns: string;
};

export const Member = ({ avatarUrl, name, onClick, pronouns }: MemberProps) => {
  return (
    <div className="aspect-square bg-lavender-500 cursor-pointer flex flex-col group overflow-hidden relative rounded-md" onClick={onClick}>
      <div
        className="bg-center bg-cover duration-300 flex-grow group-hover:mb-8 rounded-md group-hover:rounded-b-none transition-all"
        style={{ backgroundImage: `url("${avatarUrl}")` }}
      >
        <div className="bg-gradient-to-b duration-300 flex flex-col from-transparent via-lavender-500/10 to-lavender-900/90 h-full rounded-md group-hover:rounded-b-none transition-all w-full">
          <div
            className="font-pally font-bold leading-none mb-3 mt-auto -rotate-3 -skew-x-3 text-white text-center text-xl tracking-wide"
            style={{ textShadow: '0 0 10px #00000080, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000' }}
          >
            <span className="text-sm">{pronouns}</span>
            <br />
            <span>{name}</span>
          </div>
        </div>
      </div>

      <div className="absolute bg-lavender-500 bottom-0 duration-300 font-round2 font-semibold h-8 p-1 rounded-b text-white text-center transition-all translate-y-full group-hover:translate-y-0 w-full">
        Details ansehen
      </div>
    </div>
  );
};
