import { mdiInstagram, mdiTwitter, mdiYoutube, mdiMastodon } from "@mdi/js";
import Icon from "@mdi/react";

import cardgourmetLogo from "../../assets/cardgourmet.png";

type MultiLanguageBanner = {
  de?: React.ReactNode;
  en?: React.ReactNode;
  both?: React.ReactNode;
};

const tiktokPath =
  "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
const blueSkyPath =
  "M 5.203125 1.746094 C 7.75 3.722656 10.492188 7.734375 11.5 9.886719 C 12.507812 7.734375 15.25 3.722656 17.796875 1.746094 C 19.636719 0.316406 22.617188 -0.785156 22.617188 2.726562 C 22.617188 3.429688 22.226562 8.621094 22 9.464844 C 21.207031 12.398438 18.3125 13.144531 15.742188 12.691406 C 20.238281 13.484375 21.382812 16.101562 18.910156 18.722656 C 14.21875 23.699219 12.167969 17.476562 11.640625 15.878906 C 11.546875 15.585938 11.5 15.449219 11.5 15.566406 C 11.5 15.449219 11.453125 15.585938 11.359375 15.878906 C 10.832031 17.476562 8.78125 23.699219 4.089844 18.722656 C 1.617188 16.101562 2.761719 13.484375 7.257812 12.691406 C 4.6875 13.144531 1.792969 12.398438 1 9.464844 C 0.773438 8.621094 0.382812 3.429688 0.382812 2.726562 C 0.382812 -0.785156 3.363281 0.316406 5.203125 1.746094 Z M 5.203125 1.746094";

export const streamBanners: MultiLanguageBanner[] = [
  {
    de: "Gesponsert von",
    en: "Sponsored by",
    both: <img className="mt-4 px-2" alt="" src={cardgourmetLogo} />,
  },
  {
    de: "Alle Spenden gehen an",
    en: "All donations go to",
    both: (
      <>
        <br />
        <span className="text-xl mt-1">EXIT-Deutschland</span>
      </>
    ),
  },
  {
    de: (
      <>
        Für mehr Infos zum
        <br />
        Spenden schreibt
        <br />
        <span className="text-xl my-1">!spenden</span>
        in den Chat
      </>
    ),
    en: (
      <>
        For the donation
        <br />
        link write
        <br />
        <span className="text-xl my-1">!donate</span>
        in the chat
      </>
    ),
  },
  {
    de: "Folgt uns auf",
    en: "Follow us on",
    both: (
      <div className="flex flex-col text-[15px] gap-1.5 mt-2 *:flex *:items-center *:justify-center *:leading-6">
        <span className="gap-2 tracking-tighter" key="twitter">
          <Icon
            className="drop-shadow-layout-text"
            path={mdiTwitter}
            size="1.5rem"
          />
          @WeekOfCharity
        </span>
        <span className="gap-1 tracking-tighter" key="mastodon">
          <Icon
            className="drop-shadow-layout-text"
            path={mdiMastodon}
            size="1.5rem"
          />
          WeekOfCharity@tech.lgbt
        </span>
        <span className="gap-1 tracking-[-0.065em]" key="bluesky">
          <Icon
            className="drop-shadow-layout-text"
            path={blueSkyPath}
            size="1.4rem"
          />
          chesster.weekofcharity.de
        </span>
      </div>
    ),
  },
  {
    de: "Folgt uns auf",
    en: "Follow us on",
    both: (
      <div className="flex flex-col text-[15px] gap-1.5 mt-2 *:flex *:items-center *:justify-center *:gap-2 *:leading-5 *:tracking-tighter">
        <span key="youtube">
          <span className="w-8">
            <Icon
              className="drop-shadow-layout-text"
              path={mdiYoutube}
              size="1.75rem"
            />
          </span>
          @WeekOfCharity
        </span>
        <span key="tiktok">
          <span className="w-6">
            <Icon
              className="drop-shadow-layout-text mb-0.5"
              path={tiktokPath}
              size="1.4rem"
            />
          </span>
          @WeekOfCharity
        </span>
        <span key="instagram" className="mb-0.5">
          <span className="w-7">
            <Icon
              className="drop-shadow-layout-text"
              path={mdiInstagram}
              size="1.5rem"
            />
          </span>
          weekofcharity
        </span>
      </div>
    ),
  },
];
