import overlay from "../assets/layout/overlay.png";

export const LayoutOverlayWidget = () => {
  return (
    <div className="grid w-[1920px] h-[1080px] *:col-start-1 *:row-start-1 overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${overlay})`,
        }}
      />
    </div>
  );
};
