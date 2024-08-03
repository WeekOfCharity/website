import { DotPulse } from "@uiball/loaders";
import { MouseEventHandler, useEffect, useState } from "react";
import { GalleryImage as GalleryImageData } from "../../hooks/useGalleryImages";
import "./GalleryImageLarge.scss";
import { useTranslation } from "react-i18next";

const closeIcon = new URL("../../assets/close-line-icon.svg", import.meta.url);
const galleryArrow = new URL("../../assets/gallery-arrow.svg", import.meta.url);

type GalleryImageLargeProps = {
  imageData: GalleryImageData;
  hidePopUp: () => void;
  displayImageFunction: (id: number) => void;
  nextImage: number | undefined;
  prevImage: number | undefined;
};

export const GalleryImageLarge = ({
  imageData,
  hidePopUp,
  displayImageFunction,
  nextImage,
  prevImage,
}: GalleryImageLargeProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImage, setCurrentImage] = useState<string>();

  const handlePopUpClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      !(e.target instanceof HTMLDivElement) ||
      e.target.className !== "fullscreenPopUp"
    )
      return;

    hidePopUp();
  };

  const handleCloseButtonClick = () => {
    hidePopUp();
  };

  const handleArrowRightClick = () => {
    if (typeof nextImage === "undefined") return;
    displayImageFunction(nextImage);
  };

  const handleArrowLeftClick = () => {
    if (typeof prevImage === "undefined") return;
    displayImageFunction(prevImage);
  };

  useEffect(() => {
    setLoading(true);

    const imageUrl =
      import.meta.env.VITE_BASE_URL +
      `/assets/${imageData.image}?&quality=75&format=webp`;

    const abortController = new AbortController();

    fetch(imageUrl, { signal: abortController.signal })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        return Promise.reject();
      })
      .then((fetchedImage) => {
        setCurrentImage(URL.createObjectURL(fetchedImage));
        setLoading(false);
      })
      .catch(() => {
        if (!abortController.signal.aborted) {
          console.error("The request failed");
        }
      });

    return () => {
      abortController.abort();
    };
  }, [imageData]);

  return (
    <div className="fullscreenPopUp" onClick={handlePopUpClick}>
      <div className="relative">
        <button
          className="imageButton closeButton"
          type="button"
          onClick={handleCloseButtonClick}
          aria-label="Close image modal"
        >
          <img src={closeIcon.toString()} alt="" />
        </button>
        <div className="absolute flex justify-center items-center w-full h-full pb-16 flex-shrink-0">
          {nextImage !== undefined && (
            <button
              className="imageButton arrowRightButton"
              type="button"
              onClick={handleArrowRightClick}
              aria-label="Show next image"
            >
              <img src={galleryArrow.toString()} alt="" />
            </button>
          )}
          {prevImage !== undefined && (
            <button
              className="imageButton arrowLeftButton"
              type="button"
              onClick={handleArrowLeftClick}
              aria-label="Show previous image"
            >
              <img src={galleryArrow.toString()} alt="" />
            </button>
          )}
        </div>
        <div className="bg-neutral-800 largeImageWrapper rounded-xl overflow-hidden">
          {loading && (
            <div className="absolute flex justify-center items-center w-full h-full pb-16 flex-shrink-0">
              <DotPulse size={56} speed={1.3} color="white" />
            </div>
          )}

          {loading ? (
            <div className="largeImage" />
          ) : (
            <div className="imgContainer">
              <img
                src={currentImage}
                className="largeImage"
                style={{ opacity: loading ? 0 : 1 }}
                alt=""
              />
            </div>
          )}
          <div className="imageInformationWrapper">
            <div className="text-xl font-bold">
              {t("gallery.from")} {imageData.author}
            </div>
            <div
              className="imageDescription"
              dangerouslySetInnerHTML={{ __html: imageData.description || "" }}
            ></div>
            {imageData.author_link && (
              <div className="mt-1">
                {`${t("gallery.credit")} `}
                <a
                  className="text-green23-600"
                  href={imageData.author_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {imageData.author_link}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
