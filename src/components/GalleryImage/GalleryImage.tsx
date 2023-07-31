import { Shimmer } from '../Shimmer/Shimmer';
import './GalleryImage.scss';

type GalleryImageProps = {
  description: string | null,
  imageUrl: string,
  author: string | null,
  author_link: string | null,
  year: number,
  category: string,
};

export const GalleryImage = ({ description, imageUrl, author, author_link, year, category }: GalleryImageProps) => {
  return (
    <div className="select-none h-48 sm:h-48 md:h-56 xl:h-80 w-48 sm:w-48 md:w-56 xl:w-80 woc-gallery-image-wrapper">
      <img src={imageUrl} className="select-none woc-gallery-image" />
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
