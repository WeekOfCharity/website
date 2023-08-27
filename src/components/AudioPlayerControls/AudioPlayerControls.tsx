import { mdiPause, mdiPlay, mdiVolumeHigh, mdiVolumeOff } from '@mdi/js';
import Icon from '@mdi/react';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from "react";
import { AudioDuration } from "../AudioDuration/AudioDuration";
import './AudioPlayerControls.scss';


type Props = {
  playerRef: any;
  playing: boolean;
  volume: number;
  muted: boolean;
  progress: number;
  duration: number;

  handlePlay: () => void;
  toggleMute: () => void;
  handlePause: () => void;
  handleVolumeChange: (newVolume: number) => void;
};
export const AudioPlayerControls = ({
  playerRef,
  playing,
  volume,
  muted,
  progress,
  duration,
  handlePlay,
  handlePause,
  handleVolumeChange,
  toggleMute,
}: Props) => {
  const [played, setPlayed] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const playPauseButtonRef = useRef<HTMLButtonElement>(null);

    const togglePlayAndPause = () => {
        if (playing) {
        handlePause();
        } else {
        handlePlay();
        }
    };

    const handleSeekMouseDown = (e: any) => {
        setSeeking(true);
    };

    const handleSeekChange = (e: any) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = (e: any) => {
        playerRef.current?.seekTo(parseFloat(e.target.value));
        setSeeking(false);
    };

    const handleChangeInVolume =  (e: React.ChangeEvent<HTMLInputElement>) => {
        handleVolumeChange(Number(e.target.value));
    };

    useEffect(() => {
        playPauseButtonRef.current?.focus();
    }, []);

    useMemo(() => {
        setPlayed((prevPlayed) => {
          if (!seeking && prevPlayed !== progress) {
            return progress;
          }
          return prevPlayed;
        });
    }, [progress, seeking]);

    

    return (
      <div className="w-80 h-full bg-blue23-700 flex flex-row justify-between items-center rounded-md px-2">
        {/* play/pause button */}
        <button className="focus:outline-none" ref={playPauseButtonRef} onClick={togglePlayAndPause}>
          {playing ? <Icon path={mdiPause} size="1.25rem" /> : <Icon path={mdiPlay} size="1.25rem" />}
        </button>

        {/* progress bar */}
        <div className="flex items-center justify-center text-xs" >
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="styled-slider w-36 mr-1 rounded-lg"
          />
        
          {/* duration: time played  */}
          <AudioDuration seconds={duration * played} />
          /
          {/* duration: time left */}
          <AudioDuration seconds={duration * (1 - played)} />
        </div>        

        {/* volume control */}
        <div className="flex justify-center items-center text-xs">

          {/* mute button */}
          <button onClick={toggleMute} className="mr-1">
            {muted ? <Icon path={mdiVolumeOff} size="1.25rem" /> : <Icon path={mdiVolumeHigh} size="1.25rem" />}
          </button>

          {/* volume slider */}
          <input
            type="range"
            className="styled-slider w-12 mr-1 rounded-lg"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleChangeInVolume}
          />
        </div>
      </div>
    );
};