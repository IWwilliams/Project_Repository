import react from "react";
import classes from "../Play/play.module.css";
function Play(props) {
  return (
    <div
      onClick={props.onClick}
      className={`${classes.circleButton} ${
        props.play ? classes.positionLeft : classes.positionCenter
      }
      } ${props.playNotify & !props.play && classes["notify"]}`}
    >
      <div className={props.play ? classes.stop : classes.play}></div>
    </div>
  );
}
export default react.memo(Play);
