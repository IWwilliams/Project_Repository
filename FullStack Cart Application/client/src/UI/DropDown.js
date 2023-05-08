import classes from "./DropDown.module.css";
import { BLUE } from "../App";
function DropDown(props) {
  return (
    <div className={classes.dropdown} style={{ backgroundColor: BLUE }}>
      <div className={classes.lable}>Add Item To Cart</div>
      <div className={classes.dropdownContent}>
        {props.options.map((item) => {
          return (
            <div onClick={props.onClick} key={item.id} id={`item: ${item.id}`}>
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default DropDown;
