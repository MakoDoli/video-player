import { useState, useRef, useEffect } from "react";
import video360 from "../public/videos/360.mp4";
import video720 from "../public/videos/720.mp4";
import ReactPlayer from "react-player";
import "./main.css";
import play from "../public/assets/play.png";
import pause from "../public/assets/pause.png";
import back from "../public/assets/backward.png";
import forth from "../public/assets/forward.png";
import gear from "../public/assets/settings.png";
import playerspeed from "../public/assets/playback.png";
import volumeIcon from "../public/assets/volume.png";

function App() {
  // const [count, setCount] = useState(0);

  // const ref = useRef(3);
  // const buttonRef = useRef<HTMLButtonElement | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // const [startTime, setStartTime] = useState(0);
  console.log("Re-render happend");

  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [hd, setHd] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);

  /*----------------------------------
         bakcwards
  ---------------------------------*/

  const handleBackward = () => {
    if (videoRef.current) {
      const currentTime = (videoRef.current as any).getCurrentTime();
      if (currentTime > 10) (videoRef.current as any).seekTo(currentTime - 10);
    }
  };

  /*--------------------------------------
                forward
    -----------------------------------------*/

  const handleForward = () => {
    if (videoRef.current) {
      const currentTime = (videoRef.current as any).getCurrentTime();
      const duration = (videoRef.current as any).getDuration();
      if (currentTime < duration - 11)
        (videoRef.current as any).seekTo(currentTime + 10);
    }
  };

  /*-----------------------------------------
          Volume
  -------------------------------------------*/

  const handleVolumeChange = (event: any) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  /*-----------------------------------------
           Start time after changeing url
  ------------------------------------------*/
  const startTime = useRef(0);

  const currentStart = () => {
    const currentTime = (videoRef.current as any).getCurrentTime();
    startTime.current = currentTime;
    setHd(!hd);
  };

  /*---------------------------------------
         Progress bar
  -----------------------------------------*/
  const handleProgress = (state: any) => {
    setPlayed(state.playedSeconds);
    if (videoRef.current) setDuration((videoRef.current as any).getDuration());
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  console.log(startTime.current);
  return (
    <>
      <div className="player">
        <ReactPlayer
          width="100%"
          height="100%"
          className="video"
          playing={playing}
          url={hd ? video720 : video360}
          controls={false}
          ref={videoRef}
          playbackRate={speed}
          onProgress={handleProgress}
          volume={volume}
          onStart={() => (videoRef.current as any).seekTo(startTime.current)}
        ></ReactPlayer>
        <div className="player-controls">
          <div className="buttons-container">
            <div
              className="button"
              onClick={() => {
                if (speed < 2.5) setSpeed(speed + 0.5);
                if (speed === 2.5) setSpeed(1);
              }}
            >
              <img src={playerspeed} alt=""></img>
            </div>
            <div className="button" onClick={handleBackward}>
              <img src={back} alt="back"></img>
            </div>
            <div
              className="play-button"
              onClick={() => {
                setPlaying(!playing);
              }}
            >
              <img
                className="control-button"
                src={playing ? pause : play}
                alt="play"
              ></img>
            </div>
            <div className="button" onClick={handleForward}>
              <img src={forth} alt="forward"></img>
            </div>
            <div className="button" onClick={currentStart}>
              <img className="gear" src={gear} alt="settings"></img>
            </div>
            <div className="volume">
              <img
                className="volume-slider"
                src={volumeIcon}
                alt="volume"
              ></img>
              <input
                className="volume-bar"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          <div className="progressbar">
            <span>{formatTime(played)}</span>
            <input
              className="bar"
              type="range"
              min={0}
              max={duration}
              value={played}
              step={0.1}
              onChange={(e) =>
                (videoRef.current as any).seekTo(parseFloat(e.target.value))
              }
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* <input ref={inputRef} />
      <button
        onClick={() => {
          if (inputRef.current !== null) console.log(inputRef.current.value);
        }}
      >
        log input
      </button>
      <button
        onClick={() => {
          if (buttonRef.current !== null) {
            buttonRef.current.style.background = "pink";
          }
          console.log("first button clicked");
        }}
      >
        change
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
          console.log("Refbutton clicked");
        }}
        ref={buttonRef}
      >
        inRef count {count}
      </button> */}
    </>
  );
}

export default App;
