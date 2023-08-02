import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Brush4 } from '../components/Brushes/Brush4';
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
  const [imageContent, setImageContent] = useState(null);

  const { data: configuration, status: configurationStatus } = useConfiguration();
  const { data: galleryImages, status: galleryImagesStatus } = useGalleryImages();

  const handleImageClick=(imageID)=>{
    setImageClicked(true);
    const myImage = galleryImages.filter((image) => image.id==imageID)[0];
    setImageContent(myImage);
    document.body.style.overflow = 'hidden';
  }

  const hideLargeImage=()=>{
    console.log("Button");
    setImageClicked(false);
    document.body.style.overflow = 'unset';
  }

  return (
    <main className="text-neutral-800 woc-accent-arctic">
      <header className="px-5 py-20 relative text-center">
        <div className="font-round2 font-bold text-accent-900 uppercase">Von euch und uns</div>

        <div className="font-pally font-bold max-w-screen-md mx-auto mt-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          Die Galerie der
          <br />
          Week of Charity
        </div>

        <Brush4 className="absolute h-96 left-1/2 mt-8 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
      </header>

      {configurationStatus === 'success' && configuration.gallery_enabled && (
        <section className={classNames('max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5')}>
        {imageClicked && imageContent && <GalleryImageLarge imageData={imageContent} hidePopUp={hideLargeImage}/>}
        {galleryImagesStatus === 'success' && (
          <div className="imageGrid">
            {galleryImages
              //.filter((activity) => ![30, 58].includes(activity.id))
              //.sort((a, b) => a.name.localeCompare(b.name))
              .map((galleryImage) => (
                <GalleryImage
                  imageID={galleryImage.id}
                  imageUrl={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${galleryImage.image}`}
                  key={galleryImage.id}
                  year={galleryImage.year}
                  category={galleryImage.category}
                  onClickFunction={handleImageClick}
                />
              ))}
          </div>
        )}

        {galleryImagesStatus !== 'success' && (
          <div className="gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
            {[...Array(10)].map((galleryImage) => (
              <GalleryImage.Loading key={galleryImage} />
            ))}
          </div>
        )}
      </section>
      )}
    </main>
  );
};
