import { GalleryImage as GalleryImageData } from '../../hooks/useGalleryImages';
import { Shimmer } from '../Shimmer/Shimmer';
import './GalleryImageLarge.scss';

const closeIcon = new URL('../../assets/close-line-icon.svg', import.meta.url);

type GalleryImageLargeProps = {
  imageData: GalleryImageData,
  hidePopUp: () => void,
};

export const GalleryImageLarge = ({ imageData, hidePopUp } : GalleryImageLargeProps) => {
  
  const handlePopUpClick = (e) => {
    if (e.target.className == "fullscreenPopUp") {
      hidePopUp();
    }
  }

  return (
    <div className="fullscreenPopUp" onClick={handlePopUpClick}>
        <div className="largeImageWrapper bg-neutral-800">
            <button className="imageButton" type="button" onClick={hidePopUp}><img src={closeIcon.toString()} /></button>
            <img src={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${imageData.image}`} className="largeImage" />
            <div className="imageInformationWrapper">
                <div className='text-xl font-bold'>Bild von <a href={imageData.author_link} target="_blank" className="text-arctic-500">{imageData.author}</a></div>
                <div>{imageData.description}</div>
            </div>
            {/*
            <div className="rounded-md w-full leading-none p-2 sm:p-3 md:p-4 flex flex-col justify-between">   
                <p>{description}</p>
                <p>{year}</p>
                <p>{category}</p>
                
                {(author || author_link) && (
                <div>
                    &copy;<span className="px-1">{author}</span>
                    <a target="_blank" href={author_link}>{author_link}</a>
                </div>
                )}
                
            </div> */}
        </div>
    </div>
  );
};


// const Loading = () => {
//   return <Shimmer className="aspect-square rounded-md" />;
// };

// GalleryImage.Loading = Loading;
