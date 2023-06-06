import { useState, useRef, useEffect } from "react";
import video360 from "../public/videos/360.mp4";
import video720 from "../public/videos/720.mp4";
import ReactPlayer from "react-player";
import "./main.css";

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

  const [volume, setVolume] = useState(1);
  const [config, setConfig] = useState({
    file: {
      attributes: {
        quality: "270p",
      },
    },
  });
  console.log(config);
  const handleQuality = (res: string) => {
    const newConfig = {
      file: {
        attributes: {
          quality: res,
        },
      },
    };
    setConfig(newConfig);
  };
  // const handleProgress = (state: any) => {
  //   setPlayed(state.playedSeconds);
  // };
  const handleBackward = () => {
    if (videoRef.current) {
      const currentTime = (videoRef.current as any).getCurrentTime();
      if (currentTime > 10) (videoRef.current as any).seekTo(currentTime - 10);
    }
  };
  const handleForward = () => {
    if (videoRef.current) {
      const currentTime = (videoRef.current as any).getCurrentTime();
      const duration = (videoRef.current as any).getDuration();
      if (currentTime < duration - 11)
        (videoRef.current as any).seekTo(currentTime + 10);
    }
  };
  const handleVolumeChange = (event: any) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      <div className="player">
        <ReactPlayer
          width="100%"
          height="100%"
          className="video"
          playing={playing}
          url={video720}
          controls={false}
          ref={videoRef}
          playbackRate={speed}
          // onProgress={handleProgress}
          config={config}
          volume={volume}

          // startTime={startTime}
        ></ReactPlayer>
        <div className="buttons-container">
          <button
            onClick={() => {
              if (speed < 2.5) setSpeed(speed + 0.5);
              if (speed === 2.5) setSpeed(1);
            }}
          >
            speed
          </button>
          <button onClick={handleBackward}>back</button>
          <button
            onClick={() => {
              setPlaying(!playing);
            }}
          >
            Play/Pause
          </button>
          <button onClick={handleForward}>forward</button>
          <button onClick={() => handleQuality("360p")}>HD</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
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
