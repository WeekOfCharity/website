import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const BorderNav = () => {
  const { t } = useTranslation();
  return (
    <nav className="bg-neutral-800 md:flex hidden text-white w-full">
      <div className="flex h-[52px] items-center mr-auto px-5">
        <span className="font-brush mb-1">Week of Charity</span>
      </div>
      <a
        className="flex h-[52px] items-center px-5 font-semibold"
        href="https://www.betterplace.org/de/fundraising-events/45057-week-of-charity-2023"
        rel="nofollow noreferrer"
        target="_blank"
      >
        {t("subNav.donate")}
      </a>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold"
        to="/musik"
      >
        {t("subNav.music")}
      </Link>
      <a
        className="flex h-[52px] items-center px-5 font-semibold"
        href="https://www.shirtee.com/de/store/weekofcharity/"
        rel="nofollow noreferrer"
        target="_blank"
      >
        {t("subNav.merch")}
      </a>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold"
        to="/datenschutz"
      >
        {t("subNav.dataPrivacy")}
      </Link>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold"
        to="/impressum"
      >
        {t("subNav.imprint")}
      </Link>
    </nav>
  );
};
