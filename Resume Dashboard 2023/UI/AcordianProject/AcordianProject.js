import classes from "./AcordianProject.module.css";
import Project from "./Project";
import react from "react";
function AcordianProject(props) {
  return (
    <div className={classes.outerContainer}>
      <div id={props.Id && props.Id} className={classes.container}>
        {props.projects.map((project) => {
          return (
            <Project
              key={project.title}
              project={project}
              fullScreen={props.fullScreen}
            />
          );
        })}
      </div>
    </div>
  );
}
export default react.memo(AcordianProject);
