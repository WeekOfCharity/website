import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { Brush4 } from '../components/Brushes/Brush4';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { GalleryImage } from '../components/GalleryImage/GalleryImage';
import { GalleryImageLarge } from '../components/GalleryImageLarge/GalleryImageLarge';
import { useConfiguration } from '../hooks/useConfiguration';
import { GalleryImage as GalleryImageData, useGalleryImages } from '../hooks/useGalleryImages';
import { getDocumentTitle } from '../utils/getDocumentTitle';
import './Gallery.scss';

const arrowDown = new URL('../assets/arrow-down.svg', import.meta.url);

export const Gallery = () => {

  document.title = getDocumentTitle('Bilder Galerie');

  const [imageClicked, setImageClicked] = useState(false);
  const [sortMethod, setSortMethod] = useState("year");
  const [imageContent, setImageContent] = useState(null);
  const [galleryImageOrder, setGalleryImageOrder] = useState([]);

  const { data: configuration, status: configurationStatus } = useConfiguration();
  const { data: galleryImages, status: galleryImagesStatus } = useGalleryImages();

  const handleImageClick = (imageId) => {
    setImageClicked(true);
    const myImage = galleryImages.find(image => image.id == imageId);
    setImageContent(myImage);
    document.body.style.overflow = 'hidden';
  };

  const hideLargeImage = () => {
    setImageClicked(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const currentIndex = galleryImageOrder.findIndex(id => id == imageContent.id);
    const newImageId = galleryImageOrder[currentIndex + 1];
    const newImageData = galleryImages.find(image => image.id == newImageId);
    if (newImageData) {
      setImageContent(newImageData);
    }
  };

  const prevImage = () => {
    const currentIndex = galleryImageOrder.findIndex(id => id == imageContent.id);
    const newImageId = galleryImageOrder[currentIndex - 1];
    const newImageData = galleryImages.find(image => image.id == newImageId);
    if (newImageData) {
      setImageContent(newImageData);
    }
  };

  function toggleScrollbarGutter() {
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
      document.documentElement.style.scrollbarGutter = 'stable';
      document.body.style.scrollbarGutter = 'stable';
    } else {
      document.documentElement.style.scrollbarGutter = 'unset';
      document.body.style.scrollbarGutter = 'unset';
    }
  }

  const galleryImagesGrouped = useMemo(() => {
    if (typeof galleryImages === 'undefined' || galleryImages.length === 0) {
      return {};
    }

    return galleryImages.reduce<Record<string, GalleryImageData[]>>((groups, image) => {
      if (sortMethod === "year") {
        const year = image.year;
        const group = groups[year] ?? [];

        return { ...groups, [year]: [...group, image] };
      } else if (sortMethod === "category") {
        const category = image.category;
        const group = groups[category] ?? [];

        return { ...groups, [category]: [...group, image] };
      }
      
    }, {});
  }, [galleryImages, sortMethod]);

  useEffect(() => {
    let order = [];
    Object.keys(galleryImagesGrouped).map((categoryValue) => {
      galleryImagesGrouped[categoryValue].map((galleryImage) => {
        order.push(galleryImage.id);
      });
    });
    setGalleryImageOrder(order);
  }, [galleryImagesGrouped]);

  const handleCategoryClick = (e, id) => {
    const sortMethods = ["year", "category"];
    setSortMethod(sortMethods[id]);
  };

  useEffect(() => {
    toggleScrollbarGutter();
  }, [galleryImages]); 

  useEffect(() => {
    window.addEventListener('resize', toggleScrollbarGutter);

    return () => {
      window.removeEventListener('resize', toggleScrollbarGutter);
    };
  }, []); 

  return (
    <main className="text-neutral-800 woc-accent-green23">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-green23-900 uppercase">Von euch und uns</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto mt-5 text-green23-500 text-4xl md:text-7xl w-4/5">
          Die Galerie der
          <br />
          Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>
      
      <section className="max-w-screen-2xl mb-6 md:mb-12 mt-10 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        <div className="flex justify-center">
          <ButtonGroup buttons={["Jahr", "Kategorie"]} doSomethingAfterClick={handleCategoryClick}/>
        </div>
      </section>

      {configurationStatus === 'success' && configuration.gallery_enabled && (
        <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5">
        {imageClicked && imageContent && <GalleryImageLarge imageData={imageContent} hidePopUp={hideLargeImage} nextImage={nextImage} prevImage={prevImage}/>}
        {galleryImagesStatus === 'success' &&
          Object.keys(galleryImagesGrouped).map((categoryValue) => (
            <div className="space-y-4" key={categoryValue}>
              <div className="font-semibold mb-6 mt-12 md:mt-20  text-3xl md:text-4xl text-center md:text-left">{categoryValue}</div>

              <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {galleryImagesGrouped[categoryValue].map((galleryImage) => (
                  <GalleryImage
                    imageID={galleryImage.id}
                    imageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${galleryImage.image}?width=512&height=512&quality=75&fit=cover&format=webp`}
                    key={galleryImage.id}
                    year={galleryImage.year}
                    category={galleryImage.category}
                    onClickFunction={handleImageClick}
                  />
                ))}
              </div>
            </div>
          )
        )}

        {galleryImagesStatus !== 'success' && (
          <div className="gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            {[...Array(14)].map((_, index) => (
              <GalleryImage.Loading key={index} />
            ))}
          </div>
        )}
      </section>
      )}
    </main>
  );
};
