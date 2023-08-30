import { Brush4 } from '../components/Brushes/Brush4';
import { MusicRelease } from '../components/MusicRelease/MusicRelease';
import { useMusicReleases } from '../hooks/useMusicReleases';
import { getDocumentTitle } from '../utils/getDocumentTitle';

export const Music = () => {

    document.title = getDocumentTitle('Musik');

    const { data: musicReleases, status: musicReleasesStatus } = useMusicReleases();

    return (
        <main className="text-neutral-800 woc-accent-mustard">
        <header className="px-5 py-20 relative text-center">
            <div className="font-pally font-bold max-w-screen-md mx-auto text-accent-500 text-4xl md:text-7xl w-4/5">Unsere Musik</div>

            <Brush4 className="absolute h-64 left-1/2 mt-4 text-neutral-100 top-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 w-auto -z-10" />
        </header>

        <section className="max-w-screen-2xl mb-20 md:mb-40 mt-12 md:mt-20 mx-auto px-4 md:px-10 2xl:px-2.5 space-y-2 text-justify">
            {musicReleasesStatus === "success" && (
                <div className="flex flex-col gap-5 xl:grid grid-cols-2 mx-5 md:mx-10">
                {musicReleases.map((album) => (
                  <MusicRelease
                    coverUrl={album.image}
                    link={album.link}
                    name={album.name}
                    year={album.year}
                  />
                ))}
              </div>
            )}
        </section>
        </main>
    );
};
