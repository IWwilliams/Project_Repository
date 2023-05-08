import classes from "./Swatch.module.css";
import { LIGHT_GREY } from "../../../App";
function Swatch(props) {
  return (
    <section className={`${classes.swatch} ${props.className}`}>
      <div
        className={classes.swatchCircle}
        style={{ backgroundColor: props.swatchColor, borderColor: LIGHT_GREY }}
      ></div>
      <div className={classes.swatchTitle}>{props.swatchTitle}</div>
    </section>
  );
}
export default Swatch;
