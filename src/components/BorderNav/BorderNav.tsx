export const BorderNav = () => {
  return (
    <nav className="bg-neutral-800 md:flex hidden text-white w-full">
      <div className="flex h-[52px] items-center mr-auto px-5">
        <span className="font-brush mb-1">Week of Charity</span>
      </div>

      <a className="flex h-[52px] items-center px-5" href="/datenschutz">
        <span className="font-semibold">Datenschutz</span>
      </a>
      <a className="flex h-[52px] items-center px-5" href="/impressum">
        <span className="font-semibold">Impressum</span>
      </a>
      <a className="flex h-[52px] items-center px-5" href="https://www.shirtee.com/de/store/weekofcharity/" rel="nofollow noreferrer" target="_blank">
        <span className="font-semibold">Merchandise</span>
      </a>
      <a className="flex h-[52px] items-center px-5" href="https://www.tipeeestream.com/week-of-charity/donation" rel="nofollow noreferrer" target="_blank">
        <span className="font-semibold">Spenden</span>
      </a>
    </nav>
  );
};
