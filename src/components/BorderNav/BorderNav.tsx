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
        className="flex h-[52px] items-center px-5 font-semibold focus-visible:underline hover:underline underline-offset-2"
        href={import.meta.env.VITE_DONATION_URL}
        rel="nofollow noreferrer"
        target="_blank"
      >
        {t("subNav.donate")}
      </a>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold focus-visible:underline hover:underline underline-offset-2"
        to="/musik"
      >
        {t("subNav.music")}
      </Link>
      <a
        className="flex h-[52px] items-center px-5 font-semibold focus-visible:underline hover:underline underline-offset-2"
        href="https://www.shirtee.com/de/store/weekofcharity/"
        rel="nofollow noreferrer"
        target="_blank"
      >
        {t("subNav.merch")}
      </a>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold focus-visible:underline hover:underline underline-offset-2"
        to="/datenschutz"
      >
        {t("subNav.dataPrivacy")}
      </Link>
      <Link
        className="flex h-[52px] items-center px-5 font-semibold focus-visible:underline hover:underline underline-offset-2"
        to="/impressum"
      >
        {t("subNav.imprint")}
      </Link>
    </nav>
  );
};
