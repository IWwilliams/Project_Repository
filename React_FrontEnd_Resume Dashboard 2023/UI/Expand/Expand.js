import classes from "./Expand.module.css";
import react from "react";
function Expand(props) {
  return (
    <div className={classes.container}>
      <div
        className={`${classes.button} ${props.className}`}
        onClick={props.onClick}
      >
        <p>{props.expand ? <div className={classes.expand}></div> : "X"}</p>
      </div>
    </div>
  );
}

export default react.memo(Expand);
