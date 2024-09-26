import { useTranslation } from "react-i18next";
import { Brush4 } from "../components/Brushes/Brush4";
import { useTitle } from "../hooks/useTitle";

export const Imprint = () => {
  const { t } = useTranslation();
  useTitle(t("subNav.imprint"));

  return (
    <main className="text-neutral-800 woc-accent-neutral">
      <header className="px-5 pt-14 pb-5 relative text-center">
        <h1 className="font-pally font-bold max-w-screen-md mx-auto text-accent-500 text-4xl md:text-7xl w-4/5">
          {t("subNav.imprint")}
        </h1>
        <Brush4 className="absolute h-64 left-1/2 mt-4 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>
      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5 space-y-2 text-justify">
        <div className="font-round2 font-bold uppercase">
          {t("imprint.paragraph")}
        </div>
        <p>
          Sven Gohlke
          <br />
          Rosenallee 26
          <br />
          52249 Eschweiler
        </p>
        <p>{t("imprint.email")}: svengo16@outlook.com</p>
        <div className="font-round2 font-bold pt-6 text-xl">
          {t("imprint.disclaimer")}:
        </div>
        <div className="font-round2 font-bold uppercase">
          {t("imprint.content.headline")}
        </div>
        <p>{t("imprint.content.text")}</p>
        <div className="font-round2 font-bold uppercase">
          {t("imprint.links.headline")}
        </div>
        <p>{t("imprint.links.text")}</p>
      </section>
    </main>
  );
};
