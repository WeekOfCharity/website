import { useTranslation } from "react-i18next";
import { Brush4 } from "../components/Brushes/Brush4";
import { useTitle } from "../hooks/useTitle";
import "./Projects.scss";

const chesster1 = new URL("../assets/chesster-1.png", import.meta.url);
const chesster2 = new URL("../assets/chesster-2.png", import.meta.url);
const chesster3 = new URL("../assets/chesster-3.png", import.meta.url);
const chesster4 = new URL("../assets/chesster-4.png", import.meta.url);

export const Projects = () => {
  const { t } = useTranslation();
  useTitle(t("mainNav.projects"));

  return (
    <main className="text-neutral-800 woc-accent-blue23">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-blue23-900 uppercase">
          {t("projects.subHeader")}
        </div>
        <h1 className="font-pally font-bold max-w-screen-md mx-auto my-5 text-blue23-500 text-4xl md:text-7xl w-4/5">
          {t("projects.mainHeader")}
        </h1>
        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <div className="max-w-screen-2xl mt-5 mb-40 mx-auto flex place-content-center">
        <div className="max-w-screen-xl flex flex-col items-center mx-10 md:mx-28 lg:mx-32">
          <section className="max-w-screen-lg mx-0 sm:mx-8 lg:mx-16 flex bg-blue23-100 bg-opacity-50 py-10 row-span-2">
            <div id="projectIntroduction">
              <div className="leading-relaxed mx-5 md:mx-10 text-left">
                <div className="inline chesster-1-wrapper">
                  <img
                    className="chesster-timeline-image chesster-1"
                    src={chesster1.toString()}
                    role="presentation"
                  />
                </div>
                <p className="mb-4">
                  <span className="text-lg font-semibold">
                    {`${t("projects.text.t1")} `}
                  </span>
                  {`${t("projects.text.t2")} `}
                  <a
                    href="/team"
                    className="underline underline-offset-2 text-blue23-600"
                  >
                    {t("projects.text.t3")}
                  </a>
                  {` ${t("projects.text.t4")} `}
                  <a
                    href="/streams"
                    className="underline underline-offset-2 text-blue23-600"
                  >
                    {t("projects.text.t5")}
                  </a>
                  {` ${t("projects.text.t6")}`}
                </p>
                <p className="mb-4">
                  <span className="text-lg font-semibold">{`${t(
                    "projects.text.t7"
                  )} `}</span>
                  {`${t("projects.text.t8")} `}
                  <a
                    target="_blank"
                    href="https://www.betterplace.org/de/fundraising-events/45057-week-of-charity-2023"
                    className="underline underline-offset-2 text-blue23-600"
                    rel="noreferrer"
                  >
                    {t("projects.text.t9")}
                  </a>
                  {` ${t("projects.text.t10")} `}
                  <a
                    target="_blank"
                    href="https://www.shirtee.com/de/store/weekofcharity/"
                    className="underline underline-offset-2 text-blue23-600"
                    rel="noreferrer"
                  >
                    {t("projects.text.t11")}
                  </a>
                  {` ${t("projects.text.t12")}`}
                </p>
              </div>
            </div>
          </section>

          <h2 className="font-pally font-bold max-w-screen-md mx-auto mt-20 mb-10 text-blue23-500 text-4xl md:text-5xl w-4/5 text-center">
            {t("projects.ourProjects")}
          </h2>

          <div className="timeline">
            <div className="line"></div>
            <div className="card-container">
              <div className="card">
                <div className="timeline-image-wrapper-right wrapper-chesster-4">
                  <img
                    className="chesster-timeline-image chesster-4"
                    src={chesster4.toString()}
                    role="presentation"
                  />
                </div>
                <div className="leading-relaxed py-5 pl-5 md:pl-8 pr-5 text-left">
                  <div className="year">2023</div>
                  <h3 className="title font-bold">
                    {t("projects.2023.header")}
                  </h3>
                  <p>
                    {`${t("projects.2023.text.t1")} `}
                    <a
                      target="_blank"
                      href="https://tierschutz-berlin.de/"
                      className="underline underline-offset-2 text-blue23-600"
                      rel="noreferrer"
                    >
                      {t("projects.2023.text.t2")}
                    </a>
                    {t("projects.2023.text.t3")}
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="timeline-image-wrapper-left wrapper-chesster-3">
                  <img
                    className="chesster-timeline-image chesster-3"
                    src={chesster3.toString()}
                    role="presentation"
                  />
                </div>

                <div className="leading-relaxed py-5 pr-5 md:pr-8 pl-5 text-right">
                  <div className="year">2022</div>
                  <h3 className="title font-bold">
                    {t("projects.2022.header")}
                  </h3>
                  <p>
                    {`${t("projects.2022.text.t1")} `}
                    <a
                      target="_blank"
                      href="https://www.godesheim.de/angebote/queere-vielfalt-leben/"
                      className="underline underline-offset-2 text-blue23-600"
                      rel="noreferrer"
                    >
                      {t("projects.2022.text.t2")}
                    </a>
                    {` ${t("projects.2022.text.t3")}`}
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="leading-relaxed py-5 pl-5 md:pl-8 pr-5 text-left">
                  <div className="timeline-image-wrapper-right wrapper-chesster-2">
                    <img
                      className="chesster-timeline-image chesster-2"
                      src={chesster2.toString()}
                      role="presentation"
                    />
                  </div>
                  <div className="year">2021</div>
                  <h3 className="title font-bold">
                    {t("projects.2021.header")}
                  </h3>
                  <p>
                    {`${t("projects.2021.text.t1")} `}
                    <a
                      target="_blank"
                      href="https://www.lsvd.de/de/home"
                      className="underline underline-offset-2 text-blue23-600"
                      rel="noreferrer"
                    >
                      {t("projects.2021.text.t2")}
                    </a>
                    {` ${t("projects.2021.text.t3")}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
