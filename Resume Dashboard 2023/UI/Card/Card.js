import classes from "../Card/card.module.css";
import react from "react";
function Card(props) {
  return (
    <div className={`${props.className} ${classes.card}`}>{props.children}</div>
  );
}
export default react.memo(Card);
