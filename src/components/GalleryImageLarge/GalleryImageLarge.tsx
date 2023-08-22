import { DotPulse } from '@uiball/loaders';
import { useState } from 'react';
import { GalleryImage as GalleryImageData } from '../../hooks/useGalleryImages';
import './GalleryImageLarge.scss';

const closeIcon = new URL('../../assets/close-line-icon.svg', import.meta.url);

type GalleryImageLargeProps = {
  imageData: GalleryImageData,
  hidePopUp: () => void,
};

export const GalleryImageLarge = ({ imageData, hidePopUp } : GalleryImageLargeProps) => {

  const [loaded, setLoaded] = useState<boolean>(false);
  
  const handlePopUpClick = (e) => {
    if (e.target.className == "fullscreenPopUp") {
      hidePopUp();
    }
  }

  return (
    <div className="fullscreenPopUp" onClick={handlePopUpClick}>
        <div className="largeImageWrapper bg-neutral-800">
          
          {!loaded && (
            <div className="absolute flex justify-center items-center w-full h-full pb-16 flex-shrink-0">
              <DotPulse size={56} speed={1.3} color="white" />
            </div>
          )}
          <button className="imageButton" type="button" onClick={hidePopUp}><img src={closeIcon.toString()} /></button>
          <img
            src={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${imageData.image}?&quality=75&format=webp`}
            className="largeImage"
            style={{opacity: loaded ? 1 : 0}}
            onLoad={() => setLoaded(true)}
          />
          <div className="imageInformationWrapper">
              <div className='text-xl font-bold'>Bild von <a href={imageData.author_link} target="_blank" className="text-green23-600">{imageData.author}</a></div>
              <div>{imageData.description}</div>
          </div>
        </div>
    </div>
  );
};


// const Loading = () => {
//   return <Shimmer className="aspect-square rounded-md" />;
// };

// GalleryImage.Loading = Loading;
