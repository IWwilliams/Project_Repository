import classes from "../VideoPage/videopage.module.css";
import Play from "../../UI/Play/Play";
import Typewriter from "../Typewriter/Typewriter";
import react, { useContext, useEffect, useReducer, useRef } from "react";
import Context from "../../Context/Context";
import Video from "../../UI/Video/Video";

const playVideoReducer = (state, action) => {
  switch (action.type) {
    case "PLAY_NOTIFY":
      {
        return { ...state, playNotify: true };
      }
      break;
    case "SCROLL_PAUSE":
      {
        if (action.playing) {
          document.getElementById("vid").pause();
          return {
            ...state,
            play: false,
            fader: false,
            currentTime: document.getElementById("vid").currentTime,
            onScreen: false,
          };
        }
      }
      break;
    case "PAUSE_BUTTON_TRIGGER":
      {
        document.getElementById("vid").pause();
        return {
          ...state,
          play: false,
          fader: false,
          currentTime: document.getElementById("vid").currentTime,
          onScreen: false,
        };
      }
      break;
    case "PLAY_BUTTON_TRIGGER":
      {
        return { ...state, play: true, fader: true, onScreen: true };
      }
      break;
  }
  return { ...state };
};

function VideoPage(props) {
  const ctx = useContext(Context);
  const reference = useRef();
  const [videoState, dispatchVideo] = useReducer(playVideoReducer, {
    play: false,
    playNotify: false,
    fader: false,
    currentTime: 0,
    onScreen: false,
  });

  const fadeHandler = (fader) => {
    return fader ? "fade-me" : "nofade-me";
  };

  const scrollHandlerLeave = (event) => {
    if (!reference.current.muted) {
      if (!!document.getElementById("vid")) {
        dispatchVideo({
          type: "SCROLL_PAUSE",
          playing: videoState.play,
        });
      }
    }
  };

  const scrollHandlerEnter = (event) => {
    ctx.setActivePage("Home-Video");
  };

  const videoHandler = (event) => {
    if (!reference.current.muted) {
      if (!!document.getElementById("vid")) {
        console.log("PAUSE_BUTTON_TRIGGER");
        dispatchVideo({
          type: "PAUSE_BUTTON_TRIGGER",
        });
      }
    } else {
      dispatchVideo({
        type: "PLAY_BUTTON_TRIGGER",
      });
    }
    return;
  };

  useEffect(() => {
    if (window.innerWidth > 700) {
      ctx.setHideNav({ caller: "play", value: videoState.fader });
    }
  }, [videoState.fader]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchVideo({
        type: "PLAY_NOTIFY",
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="Home-Video"
      className={classes["Home-Video"]}
      onMouseLeave={scrollHandlerLeave}
      onMouseEnter={scrollHandlerEnter}
    >
      <Typewriter className={fadeHandler(videoState.fader)} />
      {!videoState.onScreen && (
        <Play
          playNotify={videoState.playNotify}
          play={videoState.play}
          onClick={videoHandler}
        ></Play>
      )}
      <div
        className={`${classes.Overlay} ${
          classes[fadeHandler(videoState.fader)]
        }`}
      ></div>
      <Video
        play={videoState.play}
        reference={reference}
        currentTime={videoState.currentTime}
        onScreen={videoState.onScreen}
      ></Video>
    </div>
  );
}
export default react.memo(VideoPage);
