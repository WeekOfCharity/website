import { DotPulse } from '@uiball/loaders';
import { useEffect, useState } from 'react';
import { GalleryImage as GalleryImageData } from '../../hooks/useGalleryImages';
import './GalleryImageLarge.scss';

const closeIcon = new URL('../../assets/close-line-icon.svg', import.meta.url);
const galleryArrow = new URL('../../assets/gallery-arrow.svg', import.meta.url);

type GalleryImageLargeProps = {
  imageData: GalleryImageData,
  hidePopUp: () => void,
  nextImage: () => void,
  prevImage: () => void,
};

export const GalleryImageLarge = ({ imageData, hidePopUp, nextImage, prevImage } : GalleryImageLargeProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageId, setCurrentImageId] = useState<number>(null);
  const [currentImage, setCurrentImage] = useState(null);
  
  const handlePopUpClick = (e) => {
    if (e.target.className == "fullscreenPopUp") {
      hidePopUp();
    }
  }

  const handleCloseButtonClick = () => {
    hidePopUp();
  }

  const handleArrowRightClick = () => {
    nextImage();
  }

  const handleArrowLeftClick = () => {
    prevImage();
  }

  useEffect(() => {
    if (imageData.id == currentImageId) {
      return;
    }
    setLoading(true);
    setCurrentImageId(imageData.id);

    const imageUrl = (process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055')
      + `/assets/${imageData.image}?&quality=75&format=webp`;

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
      if (abortController.signal.aborted) {
        console.log('The user aborted the request');
      } else {
        console.error('The request failed');
      }
    })
  
    return () => {
      abortController.abort();
    };
    
  }, [imageData]);

  return (
    <div className="fullscreenPopUp" onClick={handlePopUpClick}>
      <div className="relative">
        
        <button className="imageButton closeButton" type="button" onClick={handleCloseButtonClick}><img src={closeIcon.toString()} /></button>
        <div className="absolute flex justify-center items-center w-full h-full pb-16 flex-shrink-0">
          <button className="imageButton arrowRightButton" type="button" onClick={handleArrowRightClick}><img src={galleryArrow.toString()} /></button>
          <button className="imageButton arrowLeftButton" type="button" onClick={handleArrowLeftClick}><img src={galleryArrow.toString()} /></button>
        </div>
        <div className="bg-neutral-800 largeImageWrapper rounded-xl overflow-hidden">
          {loading && (
            <div className="absolute flex justify-center items-center w-full h-full pb-16 flex-shrink-0">
              <DotPulse size={56} speed={1.3} color="white" />
            </div>
          )}
          
          {loading ? (
            <div
              className="largeImage"
            />
          ) : (
            <img
              src={currentImage}
              className="largeImage"
              style={{opacity: loading ? 0 : 1}}
            />
          )}
          <div className="imageInformationWrapper">
              <div className='text-xl font-bold'>Bild von <a href={imageData.author_link} target="_blank" className="text-green23-600">{imageData.author}</a></div>
              <div>{imageData.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


// const Loading = () => {
//   return <Shimmer className="aspect-square rounded-md" />;
// };

// GalleryImage.Loading = Loading;
