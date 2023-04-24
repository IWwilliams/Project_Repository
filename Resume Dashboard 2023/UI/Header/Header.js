import classes from "./header.module.css";
import react from "react";
function Header(props) {
  return <h3 className={classes["header"]}>{props.sectionName}</h3>;
}
export default react.memo(Header);
