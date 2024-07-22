import {
  mdiClose,
  mdiInstagram,
  mdiMenu,
  mdiTwitter,
  mdiYoutube,
} from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Brush1 } from "../Brushes/Brush1";
import { Brush2 } from "../Brushes/Brush2";
import "./Nav.scss";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";

const logo = new URL("../../assets/favicon.png", import.meta.url);
const tiktokPath =
  "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
const mastodonPath =
  "M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.647-1.501 1.927v2.791h-2.069V9.364c0-1.28-.501-1.927-1.502-1.927-.905 0-1.357.546-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z";

export const Nav = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrollbarGutterOriginalValue, setScrollbarGutterOriginalValue] =
    useState<string>("unset");

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
      setScrollbarGutterOriginalValue(
        document.documentElement.style.scrollbarGutter
      );
      document.documentElement.style.scrollbarGutter = "unset";
      document.body.style.scrollbarGutter = "unset";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
      document.documentElement.style.scrollbarGutter =
        scrollbarGutterOriginalValue;
      document.body.style.scrollbarGutter = scrollbarGutterOriginalValue;
    }
  }, [isMenuOpen]);

  return (
    <nav className="flex items-center p-5 md:p-10 select-none sticky text-neutral-800 top-0 w-full z-[99999]">
      <div className="pr-6 relative">
        <Brush2 className="absolute h-8 -left-6 text-accent-100 top-3 w-auto" />
        <a href="/">
          <div className="font-brush leading-none -rotate-3 -skew-x-6 text-2xl transform-gpu">
            <span>Week of</span>
            <br />
            <span className="ml-3">Charity</span>
          </div>
        </a>
        <span className="absolute font-fat right-1 rotate-3 text-accent-500 top-3">
          '23
        </span>
      </div>

      <menu className="md:flex hidden ml-auto space-x-5 menuWrapper">
        <div className="md:flex hidden items-center ml-auto space-x-5">
          <NavLink
            className={({ isActive }) =>
              classNames(
                isActive ? "text-pink23-500" : "hover:text-pink23-500",
                "hideable"
              )
            }
            to="/"
          >
            <span className="font-pally font-medium text-lg">
              {t("mainNav.home")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-blue23-500" : "hover:text-blue23-500")
            }
            to="/projekte"
          >
            <span className="font-pally font-medium text-lg">
              {t("mainNav.projects")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(
                isActive ? "text-green23-500" : "hover:text-green23-500"
              )
            }
            to="/streams"
          >
            <span className="font-pally font-medium text-lg">
              {t("mainNav.program")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-pink23-500" : "hover:text-pink23-500")
            }
            to="/aktivitaeten"
          >
            <span className="font-pally font-medium text-lg">
              {t("mainNav.activities")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-blue23-500" : "hover:text-blue23-500")
            }
            to="/team"
          >
            <span className="font-pally font-medium text-lg">
              {t("mainNav.team")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(
                isActive ? "text-green23-500" : "hover:text-green23-500"
              )
            }
            to="/galerie"
          >
            <span className="font-pally font-medium text-lg">
              {t("mainNav.gallery")}
            </span>
          </NavLink>
        </div>
        <div className="md:flex hidden items-center ml-auto space-x-5">
          <a
            className="hover:text-neutral-500"
            href="https://twitter.com/WeekOfCharity/"
            title="Twitter"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span>
              <Icon path={mdiTwitter} size="1.25rem" />
            </span>
          </a>
          <a
            className="hover:text-neutral-500"
            href="https://www.instagram.com/weekofcharity/"
            title="Instagram"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span>
              <Icon path={mdiInstagram} size="1.25rem" />
            </span>
          </a>
          <a
            className="hover:text-neutral-500"
            href="https://tech.lgbt/@weekofcharity"
            title="Mastodon"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span>
              <Icon path={mastodonPath} size="1.25rem" />
            </span>
          </a>
          <a
            className="hover:text-neutral-500"
            href="https://www.tiktok.com/@weekofcharity"
            title="TikTok"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span>
              <Icon path={tiktokPath} size="1.1rem" />
            </span>
          </a>
          <a
            className="hover:text-neutral-500"
            href="https://www.youtube.com/channel/UCtDccnVlCVBNBo-icr13dfQ"
            title="YouTube"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span>
              <Icon path={mdiYoutube} size="1.25rem" />
            </span>
          </a>
        </div>
      </menu>
      <a
        className="bg-accent-500 md:hidden inline-flex items-center leading-none ml-auto px-5 py-[14px] rounded-full text-white"
        href={process.env.DONATION_URL}
        rel="nofollow noreferrer"
        target="_blank"
      >
        <span className="font-semibold">{t("subNav.donate")}</span>
      </a>
      <LanguageSwitch className="h-[52px] px-5" />
      <button
        className="bg-neutral-800 md:hidden inline-flex items-center leading-none ml-2 p-3 rounded-full text-white"
        onClick={() => setMenuOpen(true)}
      >
        <Icon path={mdiMenu} size="1.25rem" />
      </button>
      <aside
        className={classNames(
          "absolute bg-neutral-800 duration-300 ease-in-out h-screen overflow-hidden p-5 right-0 top-0 transform-gpu transition w-full z-[99999]",
          {
            "translate-x-0": isMenuOpen,
            "translate-x-full": !isMenuOpen,
          }
        )}
        inert={!isMenuOpen ? "true" : undefined}
        aria-hidden={!isMenuOpen}
      >
        <Brush1 className="absolute -right-40 sm:-right-24 text-accent-500 -top-8 w-[400px] -z-10" />

        <div className="flex items-center mb-10">
          <img className="h-12" src={logo.toString()} alt="" />

          <button
            className="bg-white inline-flex items-center leading-none ml-auto p-3 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <Icon path={mdiClose} size="1.25rem" />
          </button>
        </div>

        <menu className="flex flex-col space-y-5 text-white">
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-pink23-500" : "hover:text-pink23-500")
            }
            onClick={() => setMenuOpen(false)}
            to="/"
          >
            <span className="font-pally font-medium text-2xl">
              {t("mainNav.home")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-blue23-500" : "hover:text-blue23-500")
            }
            onClick={() => setMenuOpen(false)}
            to="/projekte"
          >
            <span className="font-pally font-medium text-2xl">
              {t("mainNav.projects")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(
                isActive ? "text-green23-500" : "hover:text-green23-500"
              )
            }
            onClick={() => setMenuOpen(false)}
            to="/streams"
          >
            <span className="font-pally font-medium text-2xl">
              {t("mainNav.program")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-pink23-500" : "hover:text-pink23-500")
            }
            onClick={() => setMenuOpen(false)}
            to="/aktivitaeten"
          >
            <span className="font-pally font-medium text-2xl">
              {t("mainNav.activities")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(isActive ? "text-blue23-500" : "hover:text-blue23-500")
            }
            onClick={() => setMenuOpen(false)}
            to="/team"
          >
            <span className="font-pally font-medium text-2xl">
              {t("mainNav.team")}
            </span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames(
                isActive ? "text-green23-500" : "hover:text-green23-500"
              )
            }
            onClick={() => setMenuOpen(false)}
            to="/galerie"
          >
            <span className="font-pally font-medium text-2xl">
              {t("mainNav.gallery")}
            </span>
          </NavLink>
          <a href="/musik">
            <span className="font-pally font-medium hover:text-green23-500 text-2xl">
              {t("subNav.music")}
            </span>
          </a>
          <a
            href="https://www.shirtee.com/de/store/weekofcharity/"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span className="font-pally font-medium hover:text-mustard-500 text-2xl">
              {t("subNav.merch")}
            </span>
          </a>
          <div className="flex items-center space-x-5">
            <a
              className="hover:text-neutral-500"
              href="https://twitter.com/WeekOfCharity/"
              title="Twitter"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <Icon path={mdiTwitter} size="1.5rem" />
            </a>
            <a
              className="hover:text-neutral-500"
              href="https://www.instagram.com/weekofcharity/"
              title="Instagram"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <Icon path={mdiInstagram} size="1.5rem" />
            </a>
            <a
              className="hover:text-neutral-500"
              href="https://tech.lgbt/@weekofcharity"
              title="Mastodon"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <Icon path={mastodonPath} size="1.5rem" />
            </a>
            <a
              className="hover:text-neutral-500"
              href="https://www.tiktok.com/@weekofcharity"
              title="TikTok"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <Icon path={tiktokPath} size="1.25rem" />
            </a>
            <a
              className="hover:text-neutral-500"
              href="https://www.youtube.com/channel/UCtDccnVlCVBNBo-icr13dfQ"
              title="YouTube"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <Icon path={mdiYoutube} size="1.5rem" />
            </a>
          </div>
        </menu>

        <menu className="border-t flex flex-col mt-10 pt-5 space-y-2 text-neutral-400">
          <Link
            className="hover:text-white"
            onClick={() => setMenuOpen(false)}
            to="/datenschutz"
          >
            <span className="font-semibold">{t("subNav.dataPrivacy")}</span>
          </Link>
          <Link
            className="hover:text-white"
            onClick={() => setMenuOpen(false)}
            to="/impressum"
          >
            <span className="font-semibold">{t("subNav.imprint")}</span>
          </Link>
        </menu>
      </aside>
    </nav>
  );
};
