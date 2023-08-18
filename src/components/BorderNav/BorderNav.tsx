import { Link } from 'react-router-dom';

export const BorderNav = () => {
  return (
    <nav className="bg-neutral-800 md:flex hidden text-white w-full">
      <div className="flex h-[52px] items-center mr-auto px-5">
        <span className="font-brush mb-1">Week of Charity</span>
      </div>

      <a className="flex h-[52px] items-center px-5" href="https://www.betterplace.org/de/fundraising-events/45057-week-of-charity-2023" rel="nofollow noreferrer" target="_blank">
        <span className="font-semibold">Spenden</span>
      </a>
      <a className="flex h-[52px] items-center px-5" href="https://www.shirtee.com/de/store/weekofcharity/" rel="nofollow noreferrer" target="_blank">
        <span className="font-semibold">Merchandise</span>
      </a>
      <Link className="flex h-[52px] items-center px-5" to="/datenschutz">
        <span className="font-semibold">Datenschutz</span>
      </Link>
      <Link className="flex h-[52px] items-center px-5" to="/impressum">
        <span className="font-semibold">Impressum</span>
      </Link>
    </nav>
  );
};
