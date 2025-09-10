import { useTranslation } from "react-i18next";
import { Brush4 } from "../components/Brushes/Brush4";
import { useTitle } from "../hooks/useTitle";
import "./Projects.scss";
import { DONATION_URL } from "../utils/constants";

import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import { Link } from "react-router-dom";

const chessterMain = new URL("../assets/chesster-main.webp", import.meta.url);
const chesster2021 = new URL("../assets/chesster-2021.webp", import.meta.url);
const chesster2022 = new URL("../assets/chesster-2022.webp", import.meta.url);
const chesster2023 = new URL("../assets/chesster-2023.webp", import.meta.url);
const chesster2024 = new URL("../assets/chesster-2024.webp", import.meta.url);
const chesster2025 = new URL("../assets/chesster-2025.webp", import.meta.url);

export const Projects = () => {
  const { t } = useTranslation();
  useTitle(t("mainNav.projects"));

  return (
    <main className="text-neutral-800 woc-accent-royal">
      <header className="px-5 py-16 relative text-center">
        <div className="font-round2 font-bold text-royal-900 uppercase">
          {t("projects.subHeader")}
        </div>
        <h1 className="font-pally font-bold max-w-screen-md mx-auto my-5 text-royal-500 text-4xl md:text-7xl w-4/5">
          {t("projects.mainHeader")}
        </h1>
        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="max-w-screen-2xl mt-16 mb-40 mx-auto flex place-content-center hyphens-auto lg:hyphens-none">
        <div className="max-w-screen-xl flex flex-col items-center mx-1 md:mx-10 md:ml-[7.5rem] lg:mr-16">
          <div className="group">
            <div className="relative ml-4 float-right w-[142px] md:w-[272px] lg:w-[320px]">
              <img
                className="object-contain size-full object-right-top hover:scale-105 group-has-[.hover-target:hover]:scale-105 transition-transform duration-300"
                src={chessterMain.toString()}
                role="presentation"
              />
            </div>
            <div className="peer py-10 pl-4 md:pl-0 pr-8 md:pr-28 lg:pl-24 lg:pr-40">
              <div className="hover-target leading-relaxed p-6 md:p-10 min-h-56 bg-[#f3f9fe] max-w-screen-lg">
                <p className="mb-4">
                  <span className="text-lg font-semibold">
                    {`${t("projects.text.t1")} `}
                  </span>
                  {`${t("projects.text.t2")} `}
                  <Link
                    to="/team"
                    className="underline underline-offset-2 text-royal-600"
                  >
                    {t("projects.text.t3")}
                  </Link>
                  {` ${t("projects.text.t4")} `}
                  <Link
                    to="/streams"
                    className="underline underline-offset-2 text-royal-600"
                  >
                    {t("projects.text.t5")}
                  </Link>
                  {`${t("projects.text.t6")}`}
                </p>
                <p className="mb-4">
                  <span className="text-lg font-semibold">{`${t(
                    "projects.text.t7"
                  )} `}</span>
                  {`${t("projects.text.t8")} `}
                  <a
                    target="_blank"
                    href={DONATION_URL}
                    className="underline underline-offset-2 text-royal-600"
                    rel="noreferrer"
                  >
                    {t("projects.text.t9")}
                  </a>
                  {` ${t("projects.text.t10")} `}
                  <a
                    target="_blank"
                    href="https://www.shirtee.com/de/store/weekofcharity/"
                    className="underline underline-offset-2 text-royal-600"
                    rel="noreferrer"
                  >
                    {t("projects.text.t11")}
                  </a>
                  {`${t("projects.text.t12")}`}
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-pally font-bold max-w-screen-md mx-auto my-8 text-royal-500 text-4xl md:text-5xl w-4/5 text-center">
            {t("projects.ourProjects")}
          </h2>

          <div className="timeline">
            <div className="line"></div>
            <div className="card-container flex flex-col">
              <ProjectCard
                image={chesster2025.toString()}
                year="2025"
                textlink="https://www.islamicrelief.de/"
                imageWrapperClassName="h-[254px] md:h-[304px] lg:h-[352px]"
                imageSide="right"
              />
              <ProjectCard
                image={chesster2024.toString()}
                year="2024"
                textlink="https://www.exit-deutschland.de/"
                imageWrapperClassName="h-[228px] md:h-[284px] lg:h-[338px]"
              />
              <ProjectCard
                image={chesster2023.toString()}
                year="2023"
                textlink="https://tierschutz-berlin.de/"
                imageWrapperClassName="h-[254px] md:h-[304px] lg:h-[352px]"
                imageSide="right"
              />
              <ProjectCard
                image={chesster2022.toString()}
                year="2022"
                textlink="https://www.godesheim.de/angebote/queere-vielfalt-leben/"
                imageWrapperClassName="w-[186px] md:w-[272px] lg:w-[320px]"
              />
              <ProjectCard
                image={chesster2021.toString()}
                year="2021"
                textlink="https://www.lsvd.de/de/home"
                imageWrapperClassName="w-[154px] md:w-[192px] lg:h-[368px]"
                imageSide="right"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
