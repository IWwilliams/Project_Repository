import classes from "./BarChart.module.css";
import react from "react";
function BarChart(props) {
  return (
    <div className={classes.BarArea}>
      <div className={classes.Header}>
        <h6>{props.Title}</h6>
      </div>

      <div className={classes.Bar}>
        <div
          style={{ width: props.barFill ? props.value + "%" : "0%" }}
          className={`${props.barFill && classes.barFill}`}
        ></div>
      </div>
    </div>
  );
}
export default react.memo(BarChart);
