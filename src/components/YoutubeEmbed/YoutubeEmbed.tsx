import classNames from "classnames";
import { useState } from "react";

import { useTranslation } from "react-i18next";

export type YoutubeEmbedProps = {
  youtubeId: string;
};

export const YoutubeEmbed = ({ youtubeId }: YoutubeEmbedProps) => {
  const { t } = useTranslation();
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  return (
    <section
      className={classNames("flex justify-center select-none", {
        "mb-32 md:mb-0": !privacyAccepted,
      })}
      aria-label={t("youtubePlayer.label")}
    >
      <div
        className={classNames("w-full mx-5 md:mx-10 max-w-screen-lg", {
          "bg-neutral-800 md:aspect-video": !privacyAccepted,
          "aspect-video": privacyAccepted,
        })}
      >
        {privacyAccepted ? (
          <iframe
            height="100%"
            width="100%"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          />
        ) : (
          <div className="flex flex-col items-center justify-between text-center w-full h-full p-4 md:p-8 lg:p-16">
            <h2 className="font-pally font-bold mx-auto p-4 text-white text-xl md:text-4xl lg:text-5xl">
              {t("youtubePlayer.heading")}
            </h2>
            <div className="mx-auto text-neutral-300 text-md md:text-xl lg:text-xl">
              {t("youtubePlayer.privacyNote")}
            </div>
            <button
              className="mt-10 md:mt-0"
              onClick={() => setPrivacyAccepted(true)}
            >
              <div className="font-fat text-center tracking-normal hover:tracking-wide rounded-full py-3 md:py-5 px-7 duration-300 bg-neutral-600 hover:bg-neutral-200 text-neutral-200 hover:text-neutral-600 text-2xl md:text-3xl mx-5 transition-all">
                {t("youtubePlayer.accept")}
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
