import {
  mdiClose,
  mdiInstagram,
  mdiMenu,
  mdiTwitter,
  mdiYoutube,
  mdiMastodon,
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
const blueSkyPath =
  "M 5.203125 1.746094 C 7.75 3.722656 10.492188 7.734375 11.5 9.886719 C 12.507812 7.734375 15.25 3.722656 17.796875 1.746094 C 19.636719 0.316406 22.617188 -0.785156 22.617188 2.726562 C 22.617188 3.429688 22.226562 8.621094 22 9.464844 C 21.207031 12.398438 18.3125 13.144531 15.742188 12.691406 C 20.238281 13.484375 21.382812 16.101562 18.910156 18.722656 C 14.21875 23.699219 12.167969 17.476562 11.640625 15.878906 C 11.546875 15.585938 11.5 15.449219 11.5 15.566406 C 11.5 15.449219 11.453125 15.585938 11.359375 15.878906 C 10.832031 17.476562 8.78125 23.699219 4.089844 18.722656 C 1.617188 16.101562 2.761719 13.484375 7.257812 12.691406 C 4.6875 13.144531 1.792969 12.398438 1 9.464844 C 0.773438 8.621094 0.382812 3.429688 0.382812 2.726562 C 0.382812 -0.785156 3.363281 0.316406 5.203125 1.746094 Z M 5.203125 1.746094";

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
  }, [isMenuOpen, scrollbarGutterOriginalValue]);

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
          &apos;23
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
        <div className="md:flex hidden items-center ml-auto space-x-5 pt-0.5">
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
              <Icon path={mdiMastodon} size="1.25rem" />
            </span>
          </a>
          <a
            className="hover:text-neutral-500 pt-px"
            href="https://bsky.app/profile/chesster.weekofcharity.de"
            title="Bluesky"
            rel="nofollow noreferrer"
            target="_blank"
          >
            <span>
              <Icon path={blueSkyPath} size="1.2rem" />
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
              <Icon path={mdiYoutube} size="1.5rem" />
            </span>
          </a>
        </div>
      </menu>
      <a
        className="bg-accent-500 md:hidden inline-flex items-center leading-none ml-auto px-5 py-[14px] rounded-full text-white"
        href={import.meta.env.VITE_DONATION_URL}
        rel="nofollow noreferrer"
        target="_blank"
      >
        <span className="font-semibold">{t("subNav.donate")}</span>
      </a>
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

          <LanguageSwitch className="ml-auto !text-accent-500" />
          <button
            className="bg-white inline-flex items-center leading-none ml-4 p-3 rounded-full"
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
              <Icon path={mdiMastodon} size="1.5rem" />
            </a>
            <a
              className="hover:text-neutral-500 pt-0.5"
              href="https://bsky.app/profile/chesster.weekofcharity.de"
              title="Bluesky"
              rel="nofollow noreferrer"
              target="_blank"
            >
              <Icon path={blueSkyPath} size="1.5rem" />
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
              <Icon path={mdiYoutube} size="1.75rem" />
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
