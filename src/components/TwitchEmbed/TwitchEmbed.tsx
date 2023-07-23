import { useEffect, useRef, useState } from 'react';
import { TwitchPlayer } from 'react-twitch-embed';
import { Stream, useStreams } from '../../hooks/useStreams';
import { getState } from '../../utils/dateAndTime';

function getUserFromTwitchLink(link: string) {
    return link.split("twitch.tv/")[1].split("/")[0];
}

function TwitchEmbed(){
    const [running, setRunning] = useState<Stream | undefined>(undefined);
    const [showInactive, setShowInactive] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    const { data: streams, status: streamsStatus } = useStreams();

    function checkRunningStream(){
        const stream = (streams ?? []).find((stream) => getState(stream.start, stream.end) === 'running');
        setRunning(stream);
        setShowInactive(streamsStatus === 'success' && stream === undefined);
    }

    useEffect(checkRunningStream, []);

    const embed = useRef(); // We use a ref instead of state to avoid rerenders.
  
    const handleReady = (e) => {
        embed.current = e;
    };

    const handleOffline = (e) => {
        checkRunningStream();
    };
  
    return (
        <>
        {running && (
            <section className="flex justify-center pt-5 select-none">
                <div className="flex m-5 max-w-lg transform-gpu w-full">
                    <TwitchPlayer channel={getUserFromTwitchLink(running.streamer.stream_link)} autoplay muted onReady={handleReady} onOffline={handleOffline} />
                </div>
            </section>
        )}
        </>
    );
}

export default TwitchEmbed;