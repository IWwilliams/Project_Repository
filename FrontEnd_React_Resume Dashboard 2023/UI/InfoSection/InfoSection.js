import classes from "./InfoSection.module.css";
import DesignLine from "../DesignLine/DesignLine";
import react from "react";
function InfoSection(props) {
  return (
    <div className={`${classes.SectionInfo}`}>
      <div>
        <DesignLine></DesignLine>
      </div>
      <div className={`${classes.info} ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
}
export default react.memo(InfoSection);
