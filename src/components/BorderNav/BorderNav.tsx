import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";
import { DONATION_URL } from "../../utils/constants";

export const BorderNav = () => {
  const { t } = useTranslation();
  return (
    <nav className="bg-neutral-800 md:flex hidden text-white w-full md:gap-2 lg:gap-6 px-5">
      <div className="flex h-[52px] items-center mr-auto">
        <span className="font-brush mb-1">Week of Charity</span>
      </div>
      <a
        className="flex h-[52px] items-center px-2 font-semibold focus-visible:underline hover:underline underline-offset-2"
        href={DONATION_URL}
        rel="nofollow noreferrer"
        target="_blank"
      >
        {t("subNav.donate")}
      </a>
      <Link
        className="flex h-[52px] items-center px-2 font-semibold focus-visible:underline hover:underline underline-offset-2"
        to="/musik"
      >
        {t("subNav.music")}
      </Link>
      <a
        className="flex h-[52px] items-center px-2 font-semibold focus-visible:underline hover:underline underline-offset-2"
        href="https://www.shirtee.com/de/store/weekofcharity/"
        rel="nofollow noreferrer"
        target="_blank"
      >
        {t("subNav.merch")}
      </a>
      <Link
        className="flex h-[52px] items-center px-2 font-semibold focus-visible:underline hover:underline underline-offset-2"
        to="/datenschutz"
      >
        {t("subNav.dataPrivacy")}
      </Link>
      <Link
        className="flex h-[52px] items-center px-2 font-semibold focus-visible:underline hover:underline underline-offset-2"
        to="/impressum"
      >
        {t("subNav.imprint")}
      </Link>
      <LanguageSwitch />
    </nav>
  );
};
