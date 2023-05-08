import classes from "../MenuButton/menuButton.module.css";
import Context from "../../Context/Context";
import { useContext } from "react";
function MenuButton(props) {
  const ctx = useContext(Context);
  return (
    <div
      className={`${classes.menuButton} ${props.className} ${classes.menuOpen}`}
      onClick={props.onClick}
    >
      <div
        className={`${classes.bar1} ${
          ctx.classSetter(ctx.hideNav) === "hidden" ? "" : classes.visible
        }`}
      ></div>
      <div
        className={`${classes.bar2} ${
          ctx.classSetter(ctx.hideNav) === "hidden" ? "" : classes.visible
        }`}
      ></div>
      <div
        className={`${classes.bar3} ${
          ctx.classSetter(ctx.hideNav) === "hidden" ? "" : classes.visible
        }`}
      ></div>
    </div>
  );
}
export default MenuButton;
