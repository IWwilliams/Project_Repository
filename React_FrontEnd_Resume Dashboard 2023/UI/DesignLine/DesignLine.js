import classes from "./DesignLine.module.css";
import react from "react";
function DesignLine(props) {
  return (
    <div className={`${classes["line-col"]}`}>
      <div className={`${classes["dot"]}`}></div>
      <div className={`${classes["i"]}`}></div>
    </div>
  );
}
export default react.memo(DesignLine);
