import classes from "./JobTasks.module.css";
import arrow from "../../../Components/Dashboard/DashboardSections/arrow.png";
import react, { useEffect, useState } from "react";
function JobTasks(props) {
  const [count, setCount] = useState(0);
  var iterator = 0;
  useEffect(() => {
    if (count < props.jobTasks.length && props.jobFill) {
      setTimeout(
        () => {
          setCount((old) => {
            return old + 1;
          });
        },
        window.innerWidth < 450 ? 50 : 200
      );
    }
  });
  return (
    <>
      {props.jobTasks.map((task) => {
        iterator = iterator + 1;
        return (
          <li
            className={iterator <= count ? classes.phaseIn : classes.hidden}
            key={task.key}
          >
            <div className={classes.bullet}>
              <img src={arrow} alt="arrow" loading="lazy"></img>
            </div>
            <div className={classes.liInfo}>
              <div className={classes.liColumn}>
                {task.responsibility.map((item) => {
                  return item;
                })}
              </div>
              <div className={classes.liColumn}>
                {task.result.map((item) => {
                  return item;
                })}
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
}
export default react.memo(JobTasks);
