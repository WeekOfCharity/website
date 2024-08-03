import classNames from "classnames";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TwitchPlayer, TwitchPlayerInstance } from "react-twitch-embed";
import { Breakpoint, useBreakpoint } from "../../hooks/useBreakpoint";
import { Stream, useStreams } from "../../hooks/useStreams";
import { getState } from "../../utils/dateAndTime";
import { useTranslation } from "react-i18next";
import { getValidLanguage } from "../../i18n/i18n";

function getUserFromTwitchLink(link: string) {
  if (link) {
    return link.split("twitch.tv/")[1].split("/")[0];
  }
  return "";
}

// TODO: Refactor into tailwind breakpoints and classes instead of inline styles
const getPlayerDimensions = (breakpoint: Breakpoint) => {
  if (breakpoint === Breakpoint.sm) return { width: 393, height: 221 };
  if (breakpoint === Breakpoint.md) return { width: 640, height: 360 };
  return { width: 960, height: 540 };
};

const TwitchEmbed = memo(function TwitchEmbed() {
  const { t, i18n } = useTranslation();
  const validLang = getValidLanguage(i18n.language);
  const breakpoint = useBreakpoint();
  const [running, setRunning] = useState<Stream | undefined>(undefined);
  const [showInactive, setShowInactive] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { data: streams, status: streamsStatus } = useStreams(validLang);

  const checkRunningStream = useCallback(() => {
    const stream = (streams ?? []).find(
      (stream) => getState(stream.start, stream.end) === "running"
    );
    setRunning(stream);
    setShowInactive(streamsStatus === "success" && stream === undefined);
  }, [streams, streamsStatus]);

  useEffect(checkRunningStream, [checkRunningStream]);

  useEffect(() => {
    if (running) {
      setChannelName(getUserFromTwitchLink(running.streamer.stream_link));
    } else {
      setChannelName("");
    }
  }, [running]);

  const embed = useRef<TwitchPlayerInstance>(); // We use a ref instead of state to avoid rerenders.

  const handleReady = (player: TwitchPlayerInstance) => {
    embed.current = player;
  };

  const TwitchPlayerPreventRerender = useMemo(() => {
    return (
      <TwitchPlayer
        height="100%"
        width="100%"
        channel={channelName}
        autoplay
        muted
        onReady={handleReady}
        onOffline={checkRunningStream}
      />
    );
  }, [channelName, checkRunningStream]);

  return (
    <>
      {channelName && !showInactive && breakpoint !== undefined && (
        <section
          className={classNames("flex justify-center select-none", {
            "mb-32 md:mb-0": !privacyAccepted,
          })}
        >
          <div
            className="bg-neutral-800"
            style={getPlayerDimensions(breakpoint)}
          >
            {privacyAccepted ? (
              TwitchPlayerPreventRerender
            ) : (
              <div className="flex flex-col items-center justify-between text-center w-full h-full p-4 md:p-8 lg:p-16">
                <h2 className="font-pally font-bold mx-auto p-4 text-white text-xl md:text-4xl lg:text-5xl">
                  {t("twitchPlayer.heading")}
                </h2>
                <div className="mx-auto text-neutral-300 text-md md:text-xl lg:text-xl">
                  {t("twitchPlayer.privacyNote")}
                </div>
                <button
                  className="mt-10 md:mt-0"
                  onClick={() => setPrivacyAccepted(true)}
                >
                  <div className="font-fat text-center tracking-normal hover:tracking-wide rounded-full py-3 md:py-5 px-7 duration-300 bg-neutral-600 hover:bg-neutral-200 text-neutral-200 hover:text-neutral-600 text-2xl md:text-3xl mx-5 transition-all">
                    {t("twitchPlayer.accept")}
                  </div>
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
});

export default TwitchEmbed;
