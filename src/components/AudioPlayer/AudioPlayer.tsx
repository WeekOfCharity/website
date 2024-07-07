import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { AudioPlayerControls } from "../AudioPlayerControls/AudioPlayerControls";
import { OnProgressProps } from "react-player/base";

type Props = {
  url: string;
};

export const AudioPlayer = ({ url }: Props) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const handleProgress = (state: OnProgressProps) => {
    setProgress(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        loop={false}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="320px"
      />
      <div className="w-80 h-9">
        <AudioPlayerControls
          playerRef={playerRef}
          playing={playing}
          volume={volume}
          muted={muted}
          progress={progress}
          duration={duration}
          toggleMute={toggleMute}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
