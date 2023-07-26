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
    <div className="bg-arctic-500 rounded-md select-none h-32 sm:h-40 md:h-60 xl:h-96 woc-gallery-image-wrapper">
      <img src={imageUrl} className="bg-arctic-500 rounded-md select-none woc-gallery-image" />
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
  // return (
  //   <div className="aspect-square bg-arctic-500 cursor-pointer flex flex-col group overflow-hidden relative rounded-md select-none">
  //     <div
  //       className="bg-center bg-cover duration-300 flex-grow group-hover:mb-8 rounded-md group-hover:rounded-b-none transition-all"
  //       style={{ backgroundImage: `url("${imageUrl}")` }}
  //     >
  //       <div className="bg-gradient-to-b duration-300 flex flex-col from-transparent via-arctic-500/10 to-arctic-900/90 h-full rounded-md group-hover:rounded-b-none transition-all w-full">
  //         <div
  //           className="font-pally font-bold leading-none mb-3 mt-auto -rotate-3 -skew-x-3 text-white text-center text-xl tracking-wide"
  //           style={{ textShadow: '0 0 10px #00000080, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000, 1px 1px 1px #000' }}
  //         >
  //           <span className="px-1">{author}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

GalleryImage.Loading = Loading;
