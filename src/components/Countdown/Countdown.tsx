import { useEffect, useState } from 'react';
import { useConfiguration } from '../../hooks/useConfiguration';
import { useStreams } from '../../hooks/useStreams';

function formatNumForCountdown(num){
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  const { data: configuration, status: configurationStatus } = useConfiguration();
  const { data: streams, status: streamsStatus } = useStreams();

  useEffect(() => {
    const id = setInterval(() => {
            const currentTime = new Date();
            var woc_start_date;
            if(streamsStatus === "success" && streams.length > 0){
                woc_start_date = new Date(streams[0].start);
            }else if(configurationStatus === "success" && configuration.woc_start!=null){
                woc_start_date = new Date(configuration.woc_start);
            }else{
                setTimeLeft(null);
                return;
            }
            var seconds = Math.floor((woc_start_date.valueOf() - (currentTime.valueOf()))/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var days = Math.floor(hours/24);

            hours = hours-(days*24);
            minutes = minutes-(days*24*60)-(hours*60);
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
            var left = Math.floor((woc_start_date.valueOf() - (currentTime.valueOf()))/1000);
            setTimeLeft([formatNumForCountdown(days),formatNumForCountdown(hours),formatNumForCountdown(minutes),formatNumForCountdown(seconds)]);
    }, 1000);
    return () => clearInterval(id);
  }, [configuration,configurationStatus,streams,streamsStatus]);

  return (
    <>{timeLeft && (
        <div className="font-pally font-bold text-center max-w-screen-md mx-auto my-5 text-accent-500 text-4xl md:text-7xl w-4/5">
          {timeLeft[0] + ":" + timeLeft[1] + ":" + timeLeft[2] + ":" + timeLeft[3]}
        </div>
      )}</>
  );
}

export default Countdown;
