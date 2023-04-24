import classes from "./AchievementPlack.module.css";
import award from "./award.PNG";
import react from "react";
function AchievementPlack(props) {
  if (props.type === "emblem") {
    return (
      <div className={classes.frame}>
        <div className={classes.container}>
          <div className={classes.emblemContainer}>
            <div className={classes.emblem}>{props.emblem}</div>
          </div>
        </div>
        <div className={classes.labelContainer}>
          <h5 className={classes.lable}>{props.lable}</h5>
        </div>
      </div>
    );
  } else if (props.type === "award") {
    return (
      <div className={classes.frame}>
        <div className={classes.container}>
          <div className={classes.emblemContainer}>
            <img className={classes.award} src={award} alt="award"></img>
          </div>
        </div>
        <div className={classes.labelContainer}>
          <h5 className={classes.lable}>{props.lable}</h5>
        </div>
      </div>
    );
  }
}
export default react.memo(AchievementPlack);
