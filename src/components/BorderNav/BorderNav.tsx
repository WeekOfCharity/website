import { Link } from "react-router-dom";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

export const BorderNav = () => {
  return (
    <nav className="bg-neutral-800 md:flex hidden text-white w-full">
      <div className="flex h-[52px] items-center mr-auto px-5">
        <span className="font-brush mb-1">Week of Charity</span>
      </div>
      <LanguageSwitch className="flex h-[52px] items-center px-5 font-semibold" />
      <a
        className="flex h-[52px] items-center px-5 font-semibold"
        href="https://www.betterplace.org/de/fundraising-events/45057-week-of-charity-2023"
        rel="nofollow noreferrer"
        target="_blank"
      >
        Spenden
      </a>
      <a
        className="flex h-[52px] items-center px-5 font-semibold"
        href="/musik"
        rel="nofollow noreferrer"
      >
        Musik
      </a>
      <a
        className="flex h-[52px] items-center px-5 font-semibold"
        href="https://www.shirtee.com/de/store/weekofcharity/"
        rel="nofollow noreferrer"
        target="_blank"
      >
        Merchandise
      </a>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold"
        to="/datenschutz"
      >
        Datenschutz
      </Link>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold"
        to="/impressum"
      >
        Impressum
      </Link>
    </nav>
  );
};
