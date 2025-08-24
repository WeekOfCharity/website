export const preloadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

export const preloadImages = async (images: string[]) => {
  await Promise.all(images.map((image) => preloadImage(image)));
};
