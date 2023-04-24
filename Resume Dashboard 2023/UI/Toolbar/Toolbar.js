import react from "react";
import classes from "./Toolbar.module.css";
function Toolbar(props) {
  return (
    <div className={props.className}>
      <div className={classes.toolBar}>
        <div
          className={classes.toolbarIcon}
          onClick={() => {
            props.onZoom(3);
          }}
        >
          <div className={classes["gg-zoom-in"]}></div>
        </div>
        <div
          className={classes.toolbarIcon}
          onClick={() => {
            props.onZoom(-3);
          }}
        >
          <div className={classes["gg-zoom-out"]}></div>
        </div>
        <a
          href="https://onedrive.live.com/download?cid=29D85088DB9C0996&resid=29D85088DB9C0996%211233&authkey=ACYEvf6Sx5rL3NY&em=2"
          aria-label="Download Resume"
        >
          <div className={classes.toolbarIcon}>
            <div className={classes["gg-software-download"]}></div>
          </div>
        </a>
      </div>
    </div>
  );
}
export default react.memo(Toolbar);
