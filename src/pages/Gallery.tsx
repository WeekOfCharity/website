import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Brush4 } from "../components/Brushes/Brush4";
import { ButtonGroup } from "../components/ButtonGroup/ButtonGroup";
import { GalleryImage } from "../components/GalleryImage/GalleryImage";
import { GalleryImageLarge } from "../components/GalleryImageLarge/GalleryImageLarge";
import {
  GalleryImage as GalleryImageData,
  useGalleryImages,
} from "../hooks/useGalleryImages";
import { useTitle } from "../hooks/useTitle";
import { getValidLanguage } from "../i18n/i18n";
import { BASE_URL } from "../utils/constants";

const sortMethods = ["year", "category"] as const;

export const Gallery = () => {
  const { t, i18n } = useTranslation();
  useTitle(t("mainNav.gallery"));

  const [nextImageId, setNextImageId] = useState<number>();
  const [prevImageId, setPrevImageId] = useState<number>();
  const [imageClicked, setImageClicked] = useState(false);
  const [sortMethod, setSortMethod] =
    useState<(typeof sortMethods)[number]>("year");
  const [imageContent, setImageContent] = useState<GalleryImageData>();

  const { data: galleryImages, status: galleryImagesStatus } = useGalleryImages(
    getValidLanguage(i18n.language)
  );

  const displayLargeImage = (imageId: number) => {
    if (!galleryImages) return;

    setImageClicked(true);
    const newImageData = galleryImages.find((image) => image.id == imageId);
    if (newImageData) {
      setImageContent(newImageData);
    }
    document.body.style.overflow = "hidden";
  };

  const hideLargeImage = () => {
    setImageClicked(false);
    document.body.style.overflow = "unset";
  };

  function toggleScrollbarGutter() {
    if (
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight
    ) {
      document.documentElement.style.scrollbarGutter = "stable";
      document.body.style.scrollbarGutter = "stable";
    } else {
      document.documentElement.style.scrollbarGutter = "unset";
      document.body.style.scrollbarGutter = "unset";
    }
  }

  const galleryImagesGrouped = useMemo(() => {
    if (!galleryImages?.length) return {};

    return galleryImages.reduce(
      (groups, image) => {
        const sortValue = image[sortMethod];
        const group = groups[sortValue] ?? [];

        return { ...groups, [sortValue]: [...group, image] };
      },
      {} as Record<string, GalleryImageData[]>
    );
  }, [galleryImages, sortMethod]);

  const galleryImageOrder = useMemo(() => {
    if (!galleryImagesGrouped) return [];
    const order: number[] = [];
    Object.keys(galleryImagesGrouped).forEach((categoryValue) => {
      galleryImagesGrouped[categoryValue].forEach((galleryImage) => {
        order.push(galleryImage.id);
      });
    });
    return order;
  }, [galleryImagesGrouped]);

  useEffect(() => {
    if (!imageContent || galleryImageOrder.length == 0) {
      setNextImageId(undefined);
      setPrevImageId(undefined);
      return;
    }
    const currentIndex = galleryImageOrder.findIndex(
      (id) => id == imageContent.id
    );
    setNextImageId(galleryImageOrder[currentIndex + 1]);
    setPrevImageId(galleryImageOrder[currentIndex - 1]);
  }, [imageContent, galleryImageOrder]);

  const handleCategoryClick = (id: number) => {
    setSortMethod(sortMethods[id]);
  };

  useEffect(() => {
    toggleScrollbarGutter();
  }, [galleryImages]);

  useEffect(() => {
    window.addEventListener("resize", toggleScrollbarGutter);

    return () => {
      window.removeEventListener("resize", toggleScrollbarGutter);
    };
  }, []);

  return (
    <main className="text-neutral-800 woc-accent-mint">
      <header className="px-5 pt-10 pb-5 relative text-center">
        <div className="font-round2 font-bold text-mint-900 uppercase">
          {t("gallery.subHeader")}
        </div>

        <h1 className="font-pally font-bold max-w-screen-md mx-auto my-5 text-mint-500 text-4xl md:text-7xl w-4/5">
          {t("gallery.mainHeader")}
          <br />
          Week of Charity
        </h1>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      <section className="max-w-screen-2xl mt-10 md:mt-28 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="flex justify-center">
          <ButtonGroup
            buttons={[t("gallery.year"), t("gallery.category")]}
            doSomethingAfterClick={handleCategoryClick}
          />
        </div>
      </section>

      <section className="max-w-screen-2xl mb-20 md:mb-40 mt-10 md:mt-14 mx-auto px-4 md:px-10 2xl:px-2.5">
        {imageClicked && imageContent && (
          <GalleryImageLarge
            imageData={imageContent}
            hidePopUp={hideLargeImage}
            displayImageFunction={displayLargeImage}
            nextImage={nextImageId}
            prevImage={prevImageId}
          />
        )}
        {galleryImagesStatus === "success" &&
          galleryImagesGrouped &&
          Object.keys(galleryImagesGrouped).map((categoryValue) => (
            <div className="space-y-4" key={categoryValue}>
              <div className="font-semibold mb-6 mt-12 md:mt-20 text-3xl md:text-4xl text-center md:text-left">
                {categoryValue}
              </div>

              <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {galleryImagesGrouped[categoryValue].map((galleryImage) => (
                  <GalleryImage
                    imageID={galleryImage.id}
                    imageUrl={`${BASE_URL}/assets/${galleryImage.image}?width=512&height=512&quality=75&fit=cover&format=webp`}
                    key={galleryImage.id}
                    onClickFunction={displayLargeImage}
                  />
                ))}
              </div>
            </div>
          ))}

        {galleryImagesStatus !== "success" && (
          <div className="gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            {Array.from({ length: 14 }).map((_, index) => (
              <GalleryImage.Loading key={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
