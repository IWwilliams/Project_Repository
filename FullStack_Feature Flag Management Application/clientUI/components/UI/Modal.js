import Button from "./button";
import classes from "../../styles/Modal.module.css";

export default function Modal(props) {
  return (
    <div>
      <div className={classes.modal}>
        <h1 className={classes.header}>{props.title}</h1>
        <h2 className={classes.message}>{props.message}</h2>
        <div className={classes.actions}>
          <Button onClick={props.onCancel}>Return to Feature Flag</Button>
          <Button onClick={props.onConfirm}>Return to Summary</Button>
        </div>
      </div>
      <div className={classes.background}></div>
    </div>
  );
}
