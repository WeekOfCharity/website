import { useEffect, useState } from "react";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useStreams } from "../../hooks/useStreams";
import "./Countdown.scss";
import { useTranslation } from "react-i18next";

type CountdownProps = {
  timerZeroCallback: () => void;
};

function formatNumForCountdown(num) {
  num = num.toString();
  while (num.length < 2) num = "0" + num;
  return num;
}

function Countdown({ timerZeroCallback }: CountdownProps) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(null);

  const { data: configuration, status: configurationStatus } =
    useConfiguration();
  const { data: streams, status: streamsStatus } = useStreams();

  const updateTimer = () => {
    const currentTime = new Date();
    let woc_start_date: Date;
    if (
      streamsStatus === "success" &&
      streams.length > 0 &&
      configurationStatus === "success" &&
      configuration.schedule_complete
    ) {
      woc_start_date = new Date(streams[0].start);
    } else if (configurationStatus === "success" && configuration.woc_start) {
      woc_start_date = new Date(configuration.woc_start);
    } else {
      setTimeLeft(null);
      return;
    }
    const milliseconds = woc_start_date.valueOf() - currentTime.valueOf();
    if (milliseconds > 0) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      hours = hours - days * 24;
      minutes = minutes - days * 24 * 60 - hours * 60;
      seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
      setTimeLeft([
        formatNumForCountdown(days),
        formatNumForCountdown(hours),
        formatNumForCountdown(minutes),
        formatNumForCountdown(seconds),
      ]);
    } else {
      setTimeLeft(["00", "00", "00", "00"]);
      timerZeroCallback();
    }
  };

  useEffect(() => {
    updateTimer();
    const id = setInterval(updateTimer, 1000);
    return () => clearInterval(id);
  }, [configuration, configurationStatus, streams, streamsStatus]);

  return (
    <>
      {timeLeft && (
        <div className="font-pally font-bold text-center max-w-screen-md mx-auto my-5 text-pink23-500 text-6xl md:text-8xl">
          <table style={{ margin: "auto" }}>
            <tr>
              <th className="countdownFieldNumber">{timeLeft[0]}</th>
              <th className="countdownFieldDots">{":"}</th>
              <th className="countdownFieldNumber">{timeLeft[1]}</th>
              <th className="countdownFieldDots">{":"}</th>
              <th className="countdownFieldNumber">{timeLeft[2]}</th>
              <th className="countdownFieldDots">{":"}</th>
              <th className="countdownFieldNumber">{timeLeft[3]}</th>
            </tr>
            <tr className="text-pink23-900" style={{ fontSize: "1rem" }}>
              <td>{t("home.countdown.days").toUpperCase()}</td>
              <td> </td>
              <td>{t("home.countdown.hours").toUpperCase()}</td>
              <td> </td>
              <td>{t("home.countdown.minutes").toUpperCase()}</td>
              <td> </td>
              <td>{t("home.countdown.seconds").toUpperCase()}</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}

export default Countdown;
