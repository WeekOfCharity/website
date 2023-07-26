import { memo, useEffect, useRef, useState } from 'react';
import { TwitchPlayer } from 'react-twitch-embed';
import { Stream, useStreams } from '../../hooks/useStreams';
import { getState } from '../../utils/dateAndTime';

function getUserFromTwitchLink(link: string) {
    if (link) {
        return link.split("twitch.tv/")[1].split("/")[0];
    }
    return "";
}

const TwitchEmbed = memo(function TwitchEmbed(){
    const [running, setRunning] = useState<Stream | undefined>(undefined);
    const [showInactive, setShowInactive] = useState(false);
    const [channelName, setChannelName] = useState("");
    const { data: streams, status: streamsStatus } = useStreams();

    function checkRunningStream(){
        const stream = (streams ?? []).find((stream) => getState(stream.start, stream.end) === 'running');
        setRunning(stream);
        setShowInactive(streamsStatus === 'success' && stream === undefined);
    }

    useEffect(checkRunningStream, [streams, streamsStatus]);

    useEffect(() => {
        if (running) {
            setChannelName(getUserFromTwitchLink(running.streamer.stream_link));
        } else {
            setChannelName("");
        }
    }, [running]);

    const embed = useRef(); // We use a ref instead of state to avoid rerenders.
  
    const handleReady = (e) => {
        embed.current = e;
    };

    const handleOffline = (e) => {
        checkRunningStream();
    };
  
    return (
        <>
        {channelName && (
            <section className="flex justify-center select-none" style={{width : "100vw"}}>
                <TwitchPlayer channel={channelName} autoplay muted onReady={handleReady} onOffline={handleOffline} />
            </section>
        )}
        </>
    );
});

export default TwitchEmbed;