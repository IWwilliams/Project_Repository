import classes from "./Video.module.css";
import react, { useEffect, useState } from "react";
import image from "./loadPhoto.jpg";
import loadingGif from "./loading-loading-forever.gif";
function Video(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    props.reference.current?.load();
    if (!props.reference.current.muted) {
      props.reference.current.currentTime = props.currentTime;
    }
    setIsLoading(true);
  }, [props.play]);

  useEffect(() => {
    const video = document.getElementById("preview");
    video.onloadeddata = (event) => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          {props.play && (
            <div className={classes.gifContainer}>
              <img className={classes.loadingGif} src={loadingGif}></img>
            </div>
          )}
          <img className={classes.image} src={image}></img>
        </>
      ) : null}
      <video
        id={isLoading || !props.play ? "preview" : "vid"}
        playsInline
        preload="auto"
        className={isLoading ? classes.Loading : classes.Loaded}
        autoPlay
        loop
        muted={props.play ? false : true}
        ref={props.reference}
        controls={props.onScreen}
        alt="video"
      >
        <source
          src={
            props.play
              ? "https://onedrive.live.com/download?cid=29D85088DB9C0996&resid=29D85088DB9C0996%211232&authkey=APPyb7U_lp4ehhE"
              : "https://onedrive.live.com/download?cid=29D85088DB9C0996&resid=29D85088DB9C0996%211227&authkey=AEDALVPYfVyr-Ks"
          }
          type="video/mp4"
        ></source>
      </video>
    </>
  );
}
export default react.memo(Video);
