import classes from "./Job.module.css";
import JobTasks from "./JobTasks/JobTasks";
import react, { useState, useEffect, useContext } from "react";
import useObserver from "../../Objects/useObserver";
import Context from "../../Context/Context";
var jobObserver;
function Job(props) {
  const ctx = useContext(Context);
  const [createObserver] = useObserver();
  const [jobFill, setJobFill] = useState(false);

  useEffect(() => {
    jobObserver = createObserver({
      reactionFunction: function (entries) {
        if (
          entries[0].intersectionRatio > (window.innerWidth < 450 ? 0.3 : 0.5)
        ) {
          setJobFill(true);
          jobObserver.unobserve(document.getElementById(props.company));
        }
      },
      threshold: window.innerWidth < 450 ? 0.3 : 0.5,
      root: null,
    });
    jobObserver.observe(document.getElementById(props.company));
  }, []);

  return (
    <div id={props.company} className={classes.EmploymentSection}>
      <header className={classes.header}>
        <div className={classes.companyName}>
          <h4>{props.company}</h4>
          <p>{props.revenue}</p>
        </div>
        <h5>{props.jobDate}</h5>
      </header>
      <div className={classes.info}>
        <p className={classes.companyDesc}>{props.companyDescription}</p>
        <div className={classes.role}>
          <div className={classes.roleNameContainer}>
            <h5 className={classes.position}>{props.position}</h5>
            <p>{props.location}</p>
          </div>

          {props.prevPosition && (
            <div className={classes.prevPositionContainer}>
              {props.prevPosition.map((role) => {
                return role;
              })}
            </div>
          )}
          <ul className={classes.responsibilities}>
            <li className={classes.roleHeaders}>
              <h6>Responsibility</h6>
              <h6>Result</h6>
            </li>
            <li className={classes.tableLine}>
              <div></div>
              <hr></hr>
            </li>
            <JobTasks jobFill={jobFill} jobTasks={props.jobTasks} />
          </ul>
        </div>
      </div>
    </div>
  );
}
export default react.memo(Job);
