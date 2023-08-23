import { Shimmer } from '../Shimmer/Shimmer';
import './GalleryImage.scss';

type GalleryImageProps = {
  imageID: number,
  imageUrl: string,
  year: number,
  category: string,
  onClickFunction: (imageID: number) => void,
};

export const GalleryImage = ({ imageID, imageUrl, year, category, onClickFunction }: GalleryImageProps) => {

  const handleClick = (e) => {
    onClickFunction(imageID);
  }

  return (
    <div className="aspect-square cursor-pointer flex flex-col relative rounded-md select-none woc-gallery-image-wrapper">
      <img src={imageUrl} onClick={handleClick} className="woc-gallery-image" />
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
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

GalleryImage.Loading = Loading;
