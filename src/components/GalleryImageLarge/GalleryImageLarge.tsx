import { GalleryImage as GalleryImageData } from '../../hooks/useGalleryImages';
import { Shimmer } from '../Shimmer/Shimmer';
import './GalleryImageLarge.scss';


type GalleryImageLargeProps = {
  imageData: GalleryImageData,
  hidePopUp: () => void,
};

export const GalleryImageLarge = ({ imageData, hidePopUp } : GalleryImageLargeProps) => {
  return (
    <div className="fullscreenPopUp">
        <div className="largeImageWrapper">
            <button className="imageButton" type="button" onClick={hidePopUp}>&times;</button> 
            <img src={(process.env.NODE_ENV === 'production' ? 'https://directus.weekofcharity.de' : 'http://localhost:8055') + `/assets/${imageData.image}`} className="largeImage" />
            <div className="imageInformationWrapper">
                <div className='text-lg font-bold'>Bild von <a href="/projekte" className="cursor-pointer text-persian-500">{imageData.author}</a></div>
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
