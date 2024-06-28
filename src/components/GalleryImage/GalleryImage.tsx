import { Shimmer } from "../Shimmer/Shimmer";
import "./GalleryImage.scss";

type GalleryImageProps = {
  imageID: number;
  imageUrl: string;
  onClickFunction: (imageID: number) => void;
};

export const GalleryImage = ({
  imageID,
  imageUrl,
  onClickFunction,
}: GalleryImageProps) => {
  return (
    <div className="aspect-square cursor-pointer flex flex-col relative rounded-md select-none woc-gallery-image-wrapper">
      <img
        src={imageUrl}
        onClick={() => onClickFunction(imageID)}
        className="woc-gallery-image"
        alt=""
      />
    </div>
  );
};

const Loading = () => {
  return <Shimmer className="aspect-square rounded-md" />;
};

GalleryImage.Loading = Loading;
