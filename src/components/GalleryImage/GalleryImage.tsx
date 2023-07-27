import { Shimmer } from '../Shimmer/Shimmer';
import './GalleryImage.scss';

type GalleryImageProps = {
  description: string | null,
  imageUrl: string,
  author: string | null,
  author_link: string | null,
};

export const GalleryImage = ({ description, imageUrl, author, author_link }: GalleryImageProps) => {
  return (
    <div className="bg-arctic-200 rounded-md select-none h-32 sm:h-40 md:h-60 xl:h-96 woc-gallery-image-wrapper">
      <img src={imageUrl} className="bg-arctic-200 rounded-md select-none woc-gallery-image" />
      <div className="rounded-md w-full leading-none p-2 sm:p-3 md:p-4 flex flex-col justify-between">   
        <p>{description}</p>
        
        {(author || author_link) && (
          <div>
            &copy;<span className="px-1">{author}</span>
            <a target="_blank" href={author_link}>{author_link}</a>
          </div>
        )}
        
      </div>
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

GalleryImage.Loading = Loading;
