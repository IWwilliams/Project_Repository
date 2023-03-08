import classes from "./Modal.module.css";
import Button from "./Button";
export default function Modal(props) {
  return (
    <div className={classes.modalContainer}>
      <div className={classes.overlay}>
        <div className={classes.modal}>
          <button onClick={props.cancel}>Cancel</button>
          <div className={classes.modalContent}>{props.children}</div>
        </div>
      </div>
    </div>
  );
}
