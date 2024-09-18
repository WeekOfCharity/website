import cn from "classnames";
import { useTranslation } from "react-i18next";

type ProjectCardProps = {
  image: string;
  year: string;
  textlink: string;
  imageWrapperClassName?: string;
  imageSide?: "left" | "right";
};

export const ProjectCard = ({
  image,
  textlink,
  year,
  imageWrapperClassName,
  imageSide = "left",
}: ProjectCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="group card relative md:ml-8">
      <div
        className={cn(
          "relative mx-2",
          {
            "float-right": imageSide === "right",
            "float-left": imageSide === "left",
          },
          imageWrapperClassName
        )}
      >
        <img
          className={cn(
            "object-contain size-full hover:scale-105 group-has-[.hover-target:hover]:scale-105 transition-transform duration-300",
            {
              "object-left-top": imageSide === "right",
              "object-right-top": imageSide === "left",
            }
          )}
          src={image}
          role="presentation"
        />
      </div>
      <div className="p-10 lg:px-20">
        <div
          className={cn(
            "hover-target leading-relaxed py-5 px-6 md:px-10 min-h-56 bg-[#f3f9fe] max-w-screen-lg",
            {
              "text-right": imageSide === "left",
            }
          )}
        >
          <div className="year">{year}</div>
          <h3 className="title font-bold">{t(`projects.${year}.header`)}</h3>
          <p>
            {t(`projects.${year}.text.t1`)}{" "}
            <a
              target="_blank"
              href={textlink}
              className="underline underline-offset-2 text-blue23-600"
              rel="noreferrer"
            >
              {t(`projects.${year}.text.t2`)}
            </a>
            {t(`projects.${year}.text.t3`)}
          </p>
        </div>
      </div>
    </div>
  );
};
