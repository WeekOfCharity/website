import { useTranslation } from "react-i18next";
import { Brush4 } from "../components/Brushes/Brush4";
import { MusicRelease } from "../components/MusicRelease/MusicRelease";
import { useMusicReleases } from "../hooks/useMusicReleases";
import { useTitle } from "../hooks/useTitle";

export const Music = () => {
  const { t } = useTranslation();
  useTitle(t("subNav.music"));

  const { data: musicReleases, status: musicReleasesStatus } =
    useMusicReleases();

  return (
    <main className="text-neutral-800 woc-accent-green23">
      <header className="px-5 py-20 relative text-center">
        <h1 className="font-pally font-bold max-w-screen-md mx-auto text-accent-500 text-4xl md:text-7xl w-4/5">
          {t("music.mainHeader")}
        </h1>

        <Brush4 className="absolute h-64 left-1/2 mt-4 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="flex flex-col items-center mx-10 md:mx-28 lg:mx-32">
        <section className="max-w-screen-lg mx-0 sm:mx-8 lg:mx-16 mb-6 flex bg-green23-100 bg-opacity-50 py-10 row-span-2">
          <div className="leading-relaxed mx-5 md:mx-10 text-left">
            <span className="text-lg font-semibold">{t("music.text.t1")}</span>
            {` ${t("music.text.t2")} `}
            <a
              target="_blank"
              href="https://battleofthebits.com/barracks/Profile/kleeder/"
              className="cursor-pointer text-green23-800 underline underline-offset-2"
              rel="noreferrer"
            >
              Amy
            </a>
            {` ${t("and")} `}
            <a
              target="_blank"
              href="https://battleofthebits.com/barracks/Profile/mirageofher/"
              className="cursor-pointer text-green23-800 underline underline-offset-2"
              rel="noreferrer"
            >
              Mioh
            </a>
            {` ${t("music.text.t3")}`}
          </div>
        </section>

        <section className="max-w-screen-xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto space-y-2 text-center text-green23-700 font-pally font-bold text-3xl">
          <div className="gap-14 grid grid-cols-1 lg:grid-cols-2 mx-5 md:mx-10">
            {musicReleasesStatus === "success" &&
              musicReleases.map((album) => (
                <MusicRelease
                  key={album.id}
                  coverUrl={
                    process.env.BASE_URL +
                    `/assets/${album.cover_art}?width=512&height=512&quality=75&fit=cover&format=webp`
                  }
                  link={album.link}
                  name={album.name}
                  year={album.year}
                />
              ))}
            {musicReleasesStatus !== "success" &&
              [...Array(4)].map((_, index) => (
                <MusicRelease.Loading key={index} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};
